var path             = require('path');

var bodyParser       = require('body-parser');
var compress         = require('compression');
var cookieParser     = require('cookie-parser');
var config           = require('getconfig');
var express          = require('express');
var helmet           = require('helmet');
var Moonboots        = require('moonboots-express');
var semiStatic       = require('semi-static');
var serveStatic      = require('serve-static');
var stylizer         = require('stylizer');

var request          = require('request');
var mongoose         = require('mongoose');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var session          = require('express-session');
var RedisStore       = require('connect-redis')(session);
var Redis            = require('redis');
var User             = require('./server/models/user');

process.config       = require('./config');

var app              = express();

// a little helper for fixing paths for various environments
var fixPath = function (pathString) {
  return path.resolve(path.normalize(pathString));
};

// -----------------
// Configure express
// -----------------
app.use(compress());
app.use(serveStatic(fixPath('public')));

// we only want to expose tests in dev
if (config.isDev) {
  app.use(serveStatic(fixPath('test/assets')));
  app.use(serveStatic(fixPath('test/spacemonkey')));
}

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// in order to test this with spacemonkey we need frames
if (!config.isDev) {
  app.use(helmet.xframe());
}
app.use(helmet.xssFilter());
app.use(helmet.nosniff());

app.set('view engine', 'jade');

// -----------------
// Enable the functional test site in development
// -----------------
if (config.isDev) {
  app.get('/test*', semiStatic({
    folderPath: fixPath('test'),
    root: '/test'
  }));
}

// -----------------
// Set our client config cookie
// -----------------
app.use(function (req, res, next) {
  res.cookie('config', JSON.stringify(config.client));
  next();
});

mongoose.connect(process.config.mongoUrl, {user: process.config.mongoUser, pass: process.config.mongoPass});

// ---------------------------------------------------
// Redis Session Store
// ---------------------------------------------------
var redisClient = Redis.createClient(process.config.redis.port, process.config.redis.host, {no_ready_check: true});
redisClient.auth(process.config.redis.auth, function (err) {
    if (err) console.log(err);
});
redisClient.on('connect', function() {
    console.log('Connected to Redis');
});

app.use(session({
  key: process.config.key,
  secret: process.config.redis.secret,
  cookie: process.config.redis.cookie,
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    client: redisClient
  })
}));


// ---------------------------------------------------
// Login Functionality
// ---------------------------------------------------
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('facebook', new FacebookStrategy({
  clientID        : process.config.facebook_api_key,
  clientSecret    : process.config.facebook_api_secret,
  callbackURL     : process.config.fb_callback_url,
  profileFields   : ['id', 'photos', 'emails', 'profileUrl', 'last_name', 'first_name', 'locale']
},
  function(access_token, refresh_token, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'fbId' : profile.id }, function(err, user) {
        if (err)
          return done(err);

          if (!err && user != null) {
            console.log('User ' + user._id + 'signed in');
            done(err, user);
          } else {
            var newUser = new User();
            console.log(profile);
            newUser.fbId    = profile.id;
            newUser.fb_access_token = access_token;
            newUser.first_name  = profile.name.givenName;
            newUser.last_name = profile.name.familyName;
            newUser.fbUrl = profile.profileUrl;
            // newUser.email = profile.emails[0].value;
            newUser.picture = profile.photos[0].value;
            newUser.signupProvider = profile.provider;

            User.create( newUser, function (err, newUser) {
              if (err) done(err, null);
              console.log('User ' + newUser._id + ' created');
              done(null, newUser);
            });
         }
      });
    });
}));

var api = require('./server/api');

// // To add new artists
//  'Phish', 'String Cheese Incident', 'Widespread Panic', 'STS9', 'Greensky Bluegrass', 'Yonder Mountain String Band', 'The Jauntee', 'The Southern Belles', 'The Werks', 'Umphreys McGee'
//                   'Adventure Club', 'Kaskade', 'Alabama Shakes', 'U2', 'Claude von Stroke', 'Feed Me', 'Madeon', 'Porter Robinson', 'Audien', 'Gramatik', 'Griz', 'Bassnectar'
// var artistList = [ 'Phish', 'String Cheese Incident', 'Widespread Panic','Greensky Bluegrass', 'Yonder Mountain String Band', 'The Jauntee', 'The Southern Belles', 'Keller Williams', 'STS9'];
// artistList.forEach(function (current, index, array) {
//   request('http://api.bandsintown.com/artists/' + current + '/events.json?api_version=2.0&app_id=kaybesee&date=all', function(err, response, events) {
//     var artistEvents = events;
//     artistEvents = JSON.parse(artistEvents);
//     artistEvents.forEach( function (current, index, array) {
//       api.addNewEvent(current, function (err, event) {
//         console.log('Added Event ' + event._id);
//       });
//     });
//   });
// });

app.get('/authenticate', function (req, res){
  if(req.session.passport.user) {
    api.getUserById(req.session.passport.user, function (err, user) {
      if(err) return res.json(err);
      return res.json(user);
    });
  }
  else {
    res.json({error: 'User not logged in.'});
  }
});

app.post('/authenticate', function (req, res){
  api.updateUser(req.body, function (user) {
    if (user == null) return res.json('Error updating user ' + req.body._id);
    res.json(user);
  });
});

app.get('/login/facebook', passport.authenticate('facebook'),
        // {scope: ['user_location', 'user_actions.music', 'user_birthday', 'user_friends']}),
  function (req, res){
  req.session.passport.user = req.user;
  res.send(req.session.passport.user);
});

app.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/events',
    failureRedirect : '/more-info'
  })
);

app.get('/logout', function (req, res){
  req.session.destroy();
  res.redirect('/');
});

app.get('/api/events', function (req, res) {
  api.getAllEvents( function (err, events) {
    res.send(events);
  });
});

app.get('/api/events/:id', function (req, res) {
  api.getEventById( req.params.id, function (err, event) {
    res.send(event);
  });
});

app.put('/api/events/:id', function (req, res) {
  console.log(req);
  api.updateEventById( req.params.id, req.body, function (err, event) {
    res.send(event);
  });
});

app.post('/logout', function (req, res){
  req.session.destroy();
  res.redirect('/');
});

app.post('/api/events/create', function (req, res) {
  api.addNewEvent(req.body, function (err, events) {
    if(err) console.log(err);
    res.send(events);
  });
});

app.post('/api/add/events/artist/:artistName', function (req, res) {
  api.addEventsByArtistName( req.params.artistName, function (err, events) {
    if(err) return console.log(err);
    console.log(events);
    res.send(events);
  });
});

app.get('/api/add/events/artist/:artistName', function (req, res) {
  api.getEventsByArtistName( req.params.artistName, function (err, events) {
    if(err) return console.log(err);
    console.log(events);
    res.send(events);
  });
});

app.get('/api/users', function (req, res) {
  api.getAllUsers( function (err, users) {
    res.send(users);
  });
});

app.get('/api/users/:id', function (req, res) {
  api.getUserById(req.params.id, function (err, user) {
    res.send(user);
  });
});

// ---------------------------------------------------
// Configure Moonboots to serve our client application
// ---------------------------------------------------
new Moonboots({
  moonboots: {
    jsFileName: 'ontourjs',
    cssFileName: 'ontourcss',
    main: fixPath('client/app.js'),
    developmentMode: config.isDev,
    libraries: [
      fixPath('public/js/jquery.min.js'),
      fixPath('public/js/kendo.all.min.js')
    ],
    stylesheets: [
      fixPath('public/css/bootstrap.css'),
      fixPath('public/css/app.css'),
      fixPath('public/css/style.css'),
      fixPath('public/css/kendo.common.min.css')
    ],
    browserify: {
      debug: true,
      transforms: ['browserify-handlebars']
    },
    beforeBuildCSS: function (done) {
      if (config.isDev) {
        stylizer({
          infile: fixPath('public/css/app.styl'),
          outfile: fixPath('public/css/app.css'),
          development: true
        }, done);
      } else {
        done();
      }
    }
  },
  server: app
});


// listen for incoming http requests on the port as specified in our config
app.listen(process.env.PORT || config.http.port);

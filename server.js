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


mongoose.connect(process.config.mongoUrl);

var api = require('./server/api');

app.get('/api/events', function (req, res) {
  api.getAllEvents( function (err, results) {
    res.send(results);
  });
});

app.get('/api/events/:id', function (req, res) {
  api.getEventById( req.params.id, function (err, event) {
    res.send(event);
  });
});


// To add new artists
 // 'Phish', 'String Cheese Incident', 'Widespread Panic', 'STS9', 'Greensky Bluegrass', 'Yonder Mountain String Band', 'The Jauntee',
                  // 'Adventure Club', 'Kaskade', 'Alabama Shakes', 'U2', 'Claude von Stroke', 'Feed Me', 'Madeon', 'Porter Robinson', 'Audien'
var artistList = ['Phish', 'Widespread Panic', 'String Cheese Incident'];
artistList.forEach(function (current, index, array) {
  request('http://api.bandsintown.com/artists/' + current + '/events.json?api_version=2.0&app_id=kaybesee&date=all', function(err, response, events) {
    var artistEvents = events;
    artistEvents = JSON.parse(artistEvents);
    artistEvents.forEach( function (current, index, array) {
      console.log('current' + current);
      api.getEventByBitId(current.id, function (err, event){
        if(err) console.log('getEventByBitId error: (' + current.id + ') ' + err);
        if(!event) {
          api.addNewEvent(current, function (err, event) {
            if(err) console.log('addNewEvent error: ' + err);
            console.log('Added Event ' + event._id);
          });
        }
      });
    });
  });
});

// Get all new data.
// request('http://api.bandsintown.com/events/daily?format=json&app_id=YOUR_APP_ID', function(err, response, events) {
//   newEvents = JSON.parse(events);
//   Event.collection.insert(newEvents, function (err, docs){
//     if(err) console.log(err);
//     console.log('%n events were successfully stored.', docs.length);
//   });
// });


// ---------------------------------------------------
// Redis Session Store
// ---------------------------------------------------
app.use(session({
  key: process.config.key,
  secret: process.config.redis.secret,
  cookie: process.config.redis.cookie,
  resave: true,
  saveUninitialized: true,
  store: new RedisStore({
    host: process.config.redis.host,
    port: process.config.redis.port,
    pass: process.config.redis.auth,
    db: 4
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
  profileFields: ['id', 'displayName', 'photos', 'emails', 'profileUrl']
},
  function(access_token, refresh_token, profile, done) {
    process.nextTick(function() {
      User.findOne({ 'fbId' : profile.id }, function(err, user) {
        console.log(user);
        if (err)
          return done(err);

          if (!err && user != null) {
            done(err, user);
          } else {
            var newUser = new User();

            newUser.fbId    = profile.id;
            newUser.fb_access_token = access_token;
            newUser.name  = profile.displayName;
            newUser.fbUrl = profile.profileUrl;
            newUser.email = profile.emails[0].value;
            newUser.picture = profile.photos[0].value;

            User.create( newUser, function (err, newUser) {
              if (err) done(err, null);
              done(null, newUser);
            });
         }
      });
    });
}));

app.get('/authenticate', function (req, res){
  if(req.session.user) return res.json(req.session.user);
  res.status(403).json({error: '/authenticate error'});
});

app.get('/login/facebook', passport.authenticate('facebook'));

app.get('/login/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect : '/events',
    failureRedirect : '/more-info'
  })
);

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
      debug: false,
      transforms: ['browserify-handlebars']
    },
    beforeBuildCSS: function (done) {
      // This re-builds css from stylus each time the app's main css file is
      // requested. Which means you can seamlessly change stylus files and see
      // new styles on refresh.
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
app.listen(config.http.port);
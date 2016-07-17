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
var session          = require('express-session');
var passport         = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User             = require('./server/models/user');
var RedisStore       = require('connect-redis')(session);
var Redis            = require('redis');

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
app.use(bodyParser.urlencoded({ extended: true }));
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

app.get('/authenticate', function (req, res){
  console.log(req);
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

app.post('/dicks', function(req, res){
  console.log('req', req);
})

app.post('/authenticate', function (req, res){
  console.log(req.body);
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

require('./server/routes')(app);

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

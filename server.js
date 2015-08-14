var path         = require('path');

var bodyParser   = require('body-parser');
var compress     = require('compression');
var cookieParser = require('cookie-parser');
var config       = require('getconfig');
var express      = require('express');
var helmet       = require('helmet');
var Moonboots    = require('moonboots-express');
var semiStatic   = require('semi-static');
var serveStatic  = require('serve-static');
var stylizer     = require('stylizer');
var request      = require('request');

var app          = express();

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

// MongoDB Setup
var MongoClient  = require('mongodb').MongoClient;
var assert       = require('assert');
var mongoUrl     = 'mongodb://localhost:27017/ontour';

var artistList = ['String Cheese Incident', 'The Jauntee', 'The Southern Belles', 'The Disco Biscuits',
                  'Greensky Bluegrass'];


// var insertArtistEvent = function(db, events, callback) {
//   db.collection('events').insertMany(events, null, function(err, result) {
//     assert.equal(err, null);
//     callback(err, result);
//   });
// };


// artistList.forEach(function (current, index, array) {
//   request('http://api.bandsintown.com/events/search?artists[]=' + current + '&format=json&app_id=kaybesee', function(err, response, events) {
//     MongoClient.connect(mongoUrl, function (err, db){
//       assert.equal(null, err);
//       console.log(events);
//       insertArtistEvent(db, events, function(err, result) {
//         db.close();
//         console.log('Added ' + result[0].artists[0].name + ' events to database');
//       });
//     });
//   });
// });


var getEvents = function(db, callback) {
   var cursor = db.collection('events').find( );
   var events = []
   cursor.each(function(err, doc) {
      assert.equal(err, null);
      if (doc != null) {
         events.push(doc);
      } else {
         callback(err, events);
      }
   });
};

var insertEvent = function(db, newEvent, callback) {
   db.collection('events').insertOne(newEvent , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + newEvent.id + " into the events collection.");
    callback(result);
  });
};

var updateEvent = function(db, updatedEvent, callback) {
   db.collection('events').insertOne( newEvent , function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + newEvent.id + " into the events collection.");
    callback(result);
  });
};


app.get('/api/events', function (req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    getEvents(db, function(err, events) {
      if (err) return res.status(400).send(err);
      res.status(200).send(events);
      db.close();
    });
  });
});

app.put('/api/events/:id', function (req, res) {
  console.log(req.body);
  // MongoClient.connect(mongoUrl, function(err, db) {
  //   assert.equal(null, err);
  //   updateEvent(db, req.body, function(err, events) {
  //     if (err) return res.status(400).send(err);
  //     res.status(200).send(events);
  //     db.close();
  //   });
  // });
});

app.post('/api/events/create', function (req, res) {
  MongoClient.connect(mongoUrl, function(err, db) {
    assert.equal(null, err);
    insertEvent(db, req.body, function(err, events) {
      if (err) return res.status(400).send(err);
      res.status(200).send(events);
      db.close();
    });
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

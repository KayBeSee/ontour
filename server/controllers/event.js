var Event = require('../models/event.js');
var request = require('request');

// Get Commands
exports.getAll = function(done) {
  Event.find({ }, function (err, events) {
    if (err) return handleError(err);
    done(null, events);
  });
}

exports.getById = function(id, done) {
  Event.findById({'_id' : id }, function (err, event) {
    if (err) return handleError(err);
    done(null, event);
  });
}

exports.getAllByArtistName = function(artistName, done) {
  Event.find({'artists': artistName}, function (err, events) {
    if(err) return handleError(err);
    done(null, events);
  });
}

exports.getAllByVenueName = function(venueName, done) {
  Event.find({'venue': venueName}, function (err, events) {
    if(err) return handleError(err);
    done(null, events);
  });
}

exports.getByBitId = function(id, done) {
  Event.findById({'bitId' : id }, function (err, event) {
    if (err) done(err, null);
    done(null, event);
  });
}

exports.getByArtistName = function(artistName, done) {
  request('http://api.bandsintown.com/artists/' + artistName + '/events.json?api_version=2.0&app_id=kaybesee&date=all', function (err, response, events) {
    if(err) return done(err, null);
    var artistEvents = JSON.parse(events);
    artistEvents.forEach(function (current, index, array) {
      current.city = current.venue.city;
      current.state = current.venue.region
      current.venue = current.venue.name;
      var artistsArray = [];
      current.artists.forEach(function (current, index, array){
        artistsArray.push(current.name);
      });
      current.artists = artistsArray;
    });
    done(null, artistEvents);
  });
}


// Post Commands
var addNew = exports.addNew = function(event, done) {
  var newEvent = new Event({
    bitId: event.id,
    title: event.title,
    datetime: event.datetime,
    ticket_url: event.ticket_url,
    picture: event.picture,
    artists: event.artists,
    venue: event.venue,
    city: event.city,
    state: event.state
  });
  newEvent.save( function (err, event) {
    if (err) done(err, null);
    done(null, event);
  });
}

exports.addByArtistName = function(artistName, done) {
  request('http://api.bandsintown.com/artists/' + artistName + '/events.json?api_version=2.0&app_id=kaybesee&date=all', function (err, response, events) {
    var artistEvents = JSON.parse(events);
    artistEvents.forEach(function (current, index, array) {
      current.city = current.venue.city;
      current.state = current.venue.region
      current.venue = current.venue.name;
      current.picture = current.artists[0].image_url;
      var artistsArray = [];
      current.artists.forEach(function (current, index, array){
        artistsArray.push(current.name);
      });
      current.artists = artistsArray;
      addNew(current, function (err, event) {
        console.log(event);
        console.log('Added Event ' + event._id);
      });
    });
  });
}

// Put Commands
exports.updateById = function(id, updatedEvent, done) {
  Event.findByIdAndUpdate(id, updatedEvent, function (err, event) {
    if (err) return handleError(err);
    done(null, event);
  });
}

// Delete Commands
exports.deleteById = function (id, done){
  Event.findByIdAndRemove(id, function(err, event){
    if (err) return handleError(err);
    done(null, event);
  })
}
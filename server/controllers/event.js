var Event = require('../models/event.js');
var request = require('request');

var addNew = exports.addNew = function(event, done) {
  var newEvent = new Event({
    bitId: event.id,
    title: event.title,
    datetime: event.datetime,
    ticket_url: event.ticket_url,
    ticket_type: event.ticket_type,
    ticket_status: event.ticket_status,
    facebook_rsvp_url: event.facebook_rsvp_url,
    venue: {
      name: event.venue.name,
      city: event.venue.city,
      region: event.venue.region,
      country: event.venue.country,
      latitude: event.venue.latitude,
      longitude: event.venue.longitude
    }
  });
  event.artists.forEach(function (current, index, array){
    newEvent.artists.push({
      name: event.artists[index].name,
      image_url: event.artists[index].image_url,
      thumb_url: event.artists[index].thumb_url,
      facebook_tour_dates_url: event.artists[index].facebook_tour_dates_url,
      facebook_page_url: event.artists[index].facebook_page_url,
      tracker_count: event.artists[index].tracker_count,
      website: event.artists[index].website,
    });
  });
  newEvent.save( function (err, event) {
    if (err) done(err, null);
    done(null, event);
  });
}

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

exports.addByArtistName = function(artistName, done) {
  request('http://api.bandsintown.com/artists/' + artistName + '/events.json?api_version=2.0&app_id=kaybesee&date=all', function (err, response, events) {
    var artistEvents = events;
    artistEvents = JSON.parse(artistEvents);
    artistEvents.forEach( function (current, index, array) {
      addNew(current, function (err, event) {
        console.log('Added Event ' + event._id);
      });
    });
  });
}

exports.getByArtistName = function(artistName, done) {
  request('http://api.bandsintown.com/artists/' + artistName + '/events.json?api_version=2.0&app_id=kaybesee&date=all', function (err, response, events) {
    if(err) return done(err, null);
    var artistEvents = events;
    artistEvents = JSON.parse(artistEvents);
    done(null, artistEvents);
  });
}

exports.updateById = function(id, updatedEvent, done) {
  Event.findByIdAndUpdate(id, updatedEvent, function (err, event) {
    if (err) return handleError(err);
    done(null, event);
  });
}

exports.getByBitId = function(id, done) {
  Event.findById({'bitId' : id }, function (err, event) {
    if (err) done(err, null);
    done(null, event);
  });
}

exports.addVenueToEvent = function (eventId, venue) {
  // TODO: Add venueId to venue array in Event object.
}
exports.removeVenueFromEvent = function (eventId, venueId) {
  // TODO: Remove venueId to venue array in Event object.
}
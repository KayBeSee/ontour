var City = require('../models/city.js');
var Event = require('../models/event.js');
var Venue = require('../models/venue.js');
var request = require('request');

// Get Commands
exports.getAll = function(done) {
  City.find({ }, function (err, cities) {
    if (err) return done(err, null);
    done(null, cities);
  });
}

exports.getByName = function(name, done) {
  City.find({'name' : name }, function (err, city) {
    if (err) done(err, null);
    done(null, city);
  });
}

exports.getVenues = function(cityName, done) {
  Venue.find({'city' : cityName }, function (err, venues) {
    if (err) done(err, null);
    done(null, venues);
  });
}

exports.getEvents = function(cityName, done) {
  Event.find({'city' : cityName }, function (err, events) {
    if (err) done(err, null);
    done(null, events);
  });
}


// Post Commands
var addNew = exports.addNew = function(city, done) {
  var newCity = new City({
    type: 'City',
    name: city.name,
    state: city.state,
    picture: city.picture,
  });
  newCity.save( function (err, city) {
    if (err) done(err, null);
    done(null, city);
  });
}

// Put Commands
exports.updateById = function(id, updatedCity, done) {
  City.findByIdAndUpdate(id, updatedCity, function (err, city) {
    if (err) done(err, null);
    done(null, city);
  });
}

// Delete Commands
exports.deleteById = function (id, done){
  City.findByIdAndRemove(id, function(err, city){
    if (err) return done(err, null);
    done(null, city);
  })
}
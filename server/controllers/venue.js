var Venue = require('../models/venue.js');
var request = require('request');

// Get Commands
exports.getAll = function(done) {
  Venue.find({ }, function (err, venues) {
    if (err) return done(err, null);
    done(null, venues);
  });
}

exports.getByName = function(name, done) {
  Venue.find({'name' : name }, function (err, venue) {
    if (err) done(err, null);
    done(null, venue);
  });
}


// Post Commands
var addNew = exports.addNew = function(venue, done) {
  var newVenue = new Venue({
    type: 'Venue',
    name: venue.name,
    address: venue.address,
    city: venue.city,
    state: venue.state,
    zipcode: venue.zipcode,
    phone: venue.phone,
    picture: venue.picture,
  });
  newVenue.save( function (err, venue) {
    if (err) done(err, null);
    done(null, venue);
  });
}

// Put Commands
exports.updateById = function(id, updatedVenue, done) {
  Venue.findByIdAndUpdate(id, updatedVenue, function (err, venue) {
    if (err) done(err, null);
    done(null, venue);
  });
}

// Delete Commands
exports.deleteById = function (id, done){
  Venue.findByIdAndRemove(id, function(err, venue){
    if (err) return done(err, null);
    done(null, venue);
  })
}
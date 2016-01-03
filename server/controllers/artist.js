var Artist = require('../models/artist.js');
var request = require('request');

// Get Commands
exports.getAll = function(done) {
  Artist.find({ }, function (err, artists) {
    if (err) return console.log(err);
    done(null, artists);
  });
}

exports.getById = function(id, done) {
  Artist.findById({'_id' : id }, function (err, artist) {
    if (err) return console.log(err);
    done(null, artist);
  });
}

exports.getByName = function(artistName, done) {
  Artist.findOne({'name': artistName}, function (err, artist) {
    if(err) return done(err, null);
    done(null, artist);
  });
}

// Post Commands
var addNew = exports.addNew = function(artist, done) {
  var newArtist = new Artist({
    type: 'Artist',
    name: artist.name,
    website: artist.website,
    facebook: artist.facebook,
    twitter: artist.twitter,
    location: artist.location,
    bio: artist.bio,
    picture: artist.picture,
  });
  newArtist.save( function (err, artist) {
    if (err) done(err, null);
    done(null, artist);
  });
}

// Put Commands
exports.updateById = function(id, updatedArtist, done) {
  Artist.findByIdAndUpdate(id, updatedArtist, function (err, artist) {
    if (err) return console.log(err);
    done(null, artist);
  });
}

// Delete Commands
exports.deleteById = function (id, done){
  Artist.findByIdAndRemove(id, function(err, artist){
    if (err) return console.log(err);
    done(null, artist);
  })
}
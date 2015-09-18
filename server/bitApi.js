/* BandsInTown API Wrapper
  If you get confused, listen to the music play.
*/


var Event = require('./models/event.js');
var Artist = require('./models/artist.js');
var Venue = require('./models/venue.js');

exports.insertNewEvent = function(req, res) {
  var eventId;

  new Event({
    bitId: req.body.id,
    name: req.body.name,
    datetime: req.body.datetime,
    venueId: req.body.venue.id,
    artists: req.body.artists,
    ticketUrl: req.body.ticket_url,

  }).save(function (err, event) {
    eventId = event.id;
  });

  // Add artist to Artist db
  req.body.artists.forEach(function (current, index, array) {
    var artist_name_regex = new RegExp(["^", current.name, "$"].join(""), "i"); // to allow for case-insensitive finding
    Artist.find( { 'name' : artist_name_regex }, function (err, artists) {
      if(artists.length > 0) {
        Event.find( { 'id' : eventId }, function (err, event) {
          event.artistIds.push(artists.id);
          console.log(current.name + ' is already in ArtistDB @ Event ' + event.id);
        });
      }
      else {
        new Artist({
          name: current.name
        }).save();
        console.log('Added ' + current.name + ' to ArtistDB');
      }
    });
  });

  // Add venue to venue db, if it doesn't exist


}
var EventController = require('./controllers/event.js');
var UserController = require('./controllers/user.js');


// Event Commands
  // Get
  exports.getAllEvents = function (done) {
    EventController.getAll(done);
  }

  exports.getEventById = function (id, done) {
    EventController.getById(id, done);
  }

  exports.getEventsByArtistName = function (artistName, done) {
    EventController.getAllByArtistName(artistName, done);
  }

   exports.getEventsByVenueName = function (venueName, done) {
    EventController.getAllByVenueName(venueName, done);
  }

  exports.getEventByBitId = function (id, done) {
    EventController.getByBitId(id, done);
  }

  // Put
  exports.updateEventById = function (id, event, done) {
    EventController.updateById(id, event, done);
  }

  // Post
  exports.addNewEvent = function (event, done) {
    EventController.addNew(event, done);
  }

  exports.addEventsByArtistName = function (artistName, done) {
    EventController.addByArtistName(artistName, done);
  }

  // Delete
  exports.deleteEventById = function (id, done) {
    EventController.deleteById(id, done);
  }

// User Commands
  // Get
  exports.getAllUsers = function (done) {
    UserController.getAll(done);
  }

  exports.getUserByFbId = function (id, done) {
    UserController.getByFbId(id, done);
  }

  exports.getUserById = function (id, done) {
    UserController.getById(id, done);
  }

  // Put
  exports.updateUser = function (user, done) {
    UserController.update(user, done);
  }
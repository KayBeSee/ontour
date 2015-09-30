var EventController = require('./controllers/event.js');
var UserController = require('./controllers/user.js');

exports.getAllEvents = function (done) {
  EventController.getAll(done);
}

exports.getEventById = function (id, done) {
  EventController.getById(id, done);
}

exports.getEventByBitId = function (id, done) {
  EventController.getByBitId(id, done);
}

exports.addNewEvent = function (event, done) {
  EventController.addNew(event, done);
}

exports.getUserByFbId = function (id, done) {
  UserController.getByFbId(id, done);
}
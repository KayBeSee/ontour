var EventController = require('./controllers/event.js');
var UserController = require('./controllers/user.js');

exports.getAllEvents = function (done) {
  EventController.getAll(done);
}

exports.getEventsByPage = function (page, done) {
  EventController.getByPage(page, done);
}

exports.getEventById = function (id, done) {
  EventController.getById(id, done);
}

exports.updateEventById = function (id, updatedEvent, done) {
  EventController.updateById(id, updatedEvent, done);
}

exports.getEventByBitId = function (id, done) {
  EventController.getByBitId(id, done);
}

exports.addNewEvent = function (event, done) {
  EventController.addNew(event, done);
}

exports.getAllUsers = function (done) {
  UserController.getAll(done);
}

exports.getUserByFbId = function (id, done) {
  UserController.getByFbId(id, done);
}

exports.getUserById = function (id, done) {
  UserController.getById(id, done);
}

exports.updateUser = function (user, done) {
  UserController.update(user, done);
}
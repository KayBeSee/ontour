var EventController = require('./controllers/event.js');

exports.getAllEvents = function (done) {
  EventController.getAll(done);
}

exports.getEventById = function (id, done) {
  EventController.getById(id, done);
}

exports.addNewEvent = function (event, done) {
  EventController.addNew(event, done);
}
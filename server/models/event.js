// Event Model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

require('./comment');
require('./artist');
require('./venue');

var eventSchema = new Schema({
  name: String,
  festival: Boolean,
  datetime: Date,
  ticket_url: String,
  picture: String,
  artists: [{ type: ObjectId, ref: 'Artist' }],
  venue: { type: ObjectId, ref: 'Venue' }
  });

module.exports = mongoose.model('Event', eventSchema);
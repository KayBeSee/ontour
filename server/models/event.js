// Event Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  id: ObjectId,
  title: String,
  datetime: Date,
  ticket_url: String,
  picture: String,
  artists: [String],
  venue: {
    name: String,
    city: String,
    region: String,
    country: String,
    latitude: String,
    longitude: String
  },
  comments: [{
      _id: String,
      datetime: String,
      message: String,
      score: Number,
      author: {
        _id: ObjectId,
        name: String,
        picture: String,
      }
    }]
  });

module.exports = mongoose.model('Event', eventSchema);
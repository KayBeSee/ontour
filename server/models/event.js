// Event Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var eventSchema = new Schema({
  id: ObjectId,
  bitId: Number,
  title: String,
  datetime: Date,
  ticket_url: String,
  ticket_type: String,
  ticket_status: String,
  facebook_rsvp_url: String,
  artists: [{
    name: String,
    image_url: String,
    thumb_url: String,
    facebook_tour_dates_url: String, //BiT Page
    facebook_page_url: String,
    tracker_count: Number,
    website: String
  }],
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
        photo: String,
      }
    }]
  });

module.exports = mongoose.model('Event', eventSchema);
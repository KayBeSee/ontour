// User Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  id: ObjectId,
  first_name: String,
  last_name: String,
  email: String,
  picture: String,
  location: String,
  fbId: String,
  fbUrl: String,
  fb_access_token: String,
  events: [
    {
      id: ObjectId,
      bitId: Number,
      title: String,
      datetime: Date,
      ticket_url: String,
      facebook_rsvp_url: String,
      artists: [{
        name: String,
        image_url: String,
        thumb_url: String,
        website: String
      }],
      venue: {
        name: String,
        city: String,
        region: String,
        country: String,
        latitude: String,
        longitude: String
      }
    }
  ],
  signupProvider: String
  });

module.exports = mongoose.model('User', userSchema);
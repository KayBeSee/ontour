// User Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  id: ObjectId,
  type: String,
  name: String,
  first_name: String,
  last_name: String,
  email: String,
  picture: String,
  location: String,
  fbId: String,
  fbUrl: String,
  fb_access_token: String,
  events: [{
    id: ObjectId,
    title: String,
    datetime: Date,
    ticket_url: String,
    picture: String,
    artists: [String],
    venue: String,
    city: String,
    state: String
  }],
  signupProvider: String
  });

module.exports = mongoose.model('User', userSchema);
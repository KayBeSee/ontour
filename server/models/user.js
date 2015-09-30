// User Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  picture: String,
  fbId: String,
  fbUrl: String,
  fb_access_token: String,
  events: [ObjectId]
  });

module.exports = mongoose.model('User', userSchema);
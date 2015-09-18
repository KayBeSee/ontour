// User Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var userSchema = new Schema({
  _id: ObjectId,
  username: String,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  events: [ObjectId]
  });

module.exports = mongoose.model('User', userSchema);
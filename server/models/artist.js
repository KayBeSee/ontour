// Event Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var artistSchema = new Schema({
  id: ObjectId,
  name: Number,
  website: String,
  facebook: Date,
  twitter: String,
  cashortrade: String,
  events: String,
  location: String,
  bio: String,
  picture: String,
  events: null
});

module.exports = mongoose.model('Artist', artistSchema);
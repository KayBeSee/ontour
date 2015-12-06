// Artist Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var artistSchema = new Schema({
  id: ObjectId,
  name: String,
  website: String,
  facebook: String,
  twitter: String,
  location: String,
  bio: String,
  picture: String,
});

module.exports = mongoose.model('Artist', artistSchema);
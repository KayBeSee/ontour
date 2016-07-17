// Event Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var citySchema = new Schema({
  type: String,
  name: String,
  state: String,
  picture: String
});

module.exports = mongoose.model('City', citySchema);
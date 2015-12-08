// Event Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var venueSchema = new Schema({
  id: ObjectId,
  name: String,
  address: String,
  city: String,
  state: String,
  zipcode: String,
  phone: String,
  picture: String,
});

module.exports = mongoose.model('Venue', venueSchema);
// Comment Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var postSchema = new Schema({
  datetime: Date,
  message: String,
  score: Number,
  author: { type: ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', postSchema);
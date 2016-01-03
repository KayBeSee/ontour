// Comment Model

var mongoose = require('mongoose')
   ,Schema = mongoose.Schema
   ,ObjectId = Schema.ObjectId;

var commentSchema = new Schema({
  id: ObjectId,
  datetime: Date,
  message: String,
  parentId: String,
  parentName: String,
  parentType: String,
  score: Number,
  author: {
    _id: ObjectId,
    name: String,
    picture: String
  }
});

module.exports = mongoose.model('Comment', commentSchema);
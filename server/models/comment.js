// Comment Model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var commentSchema = new Schema({
  datetime: Date,
  message: String,
  parent: {
    kind: String,
    item: { type: ObjectId, refPath: 'parent.kind' }
  },
  score: Number,
  author: { type: ObjectId, ref: 'User' }
});

commentSchema.plugin(deepPopulate, {});

module.exports = mongoose.model('Comment', commentSchema);
var Comment = require('../models/comment.js');
var request = require('request');

// Get Commands
exports.getAll = function(done) {
  Comment.find({ }, function (err, comments) {
    if (err) return done(err, null);
    done(null, comments);
  });
}

exports.getById = function(id, done) {
  Comment.findById({'_id' : id }, function (err, comment) {
    if (err) return done(err, null);
    done(null, comment);
  });
}

exports.getByParentId = function(id, done) {
  Comment.find({'parentId': id }, function (err, comments) {
    if (err) return done(err, null);
    done(null, comments);
  });
}

// Post Commands
var addNew = exports.addNew = function(comment, done) {
  var newComment = new Comment({
    datetime: comment.datetime,
    message: comment.message,
    parentId: comment.parentId,
    parentName: comment.parentName,
    parentType: comment.parentType,
    score: comment.score,
    author:{
      _id: comment.author._id,
      name: comment.author.name,
      picture: comment.author.picture
    }
  });
  newComment.save( function (err, comment) {
    if (err) done(err, null);
    done(null, comment);
  });
}

// Put Commands
exports.updateById = function(id, updatedComment, done) {
  Comment.findByIdAndUpdate(id, updatedComment, function (err, comment) {
    if (err) return done(err, null);
    done(null, comment);
  });
}

// Delete Commands
exports.deleteById = function (id, done){
  Comment.findByIdAndRemove(id, function(err, comment){
    if (err) return done(err, null);
    done(null, comment);
  })
}
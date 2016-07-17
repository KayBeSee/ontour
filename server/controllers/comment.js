var Comment = require('../models/comment.js');
var request = require('request');

// Get Commands
exports.getAll = function(done) {
  Comment.find().populate('author parent.item').exec( function (err, comments) {
    if (err) return done(err, null);
    done(null, comments);
  });
}

exports.getById = function(id, done) {
  Comment.findById({'_id' : id }).populate('author parent.item').exec( function (err, comment) {
    if (err) return done(err, null);
    done(null, comment);
  });
}

exports.getByParentId = function(id, done) {
  Comment.find({'parent.item': id }).populate('author parent.item').exec( function (err, comments) {
    if (err) return done(err, null);
    done(null, comments);
  });
}

// Post Commands
var addNew = exports.addNew = function(comment, done) {
  var newComment = new Comment({
    datetime: comment.datetime,
    message: comment.message,
    parent: {
      item: comment.parent.item,
      kind: comment.parent.kind
    },
    score: comment.score,
    author: comment.author
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
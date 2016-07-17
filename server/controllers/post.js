var Post = require('../models/post.js');
var Comment = require('../models/comment.js');
var request = require('request');
var Async = require('async');

// Get Commands
exports.getAll = function(done) {
  Async.parallel([
    function(done){
      Post.find().populate('author').exec( function (err, posts) {
        if(err) return done(err, null);
        done(null, posts);
      });
    },
    function(done){
      Comment.find().populate('author parent.item').exec( function (err, comments) {
        if(err) return done(err, null);
        done(null, comments);
      });
    }
  ],
  function(err, results){
    if(err) return done(err, results);
    console.log('posts', results);
    var postsComments = results[0].concat(results[1]);
    console.log('postsComments', postsComments);
    return done(null, postsComments);
  });
}

exports.getById = function(id, done) {
  Post.findById({'_id' : id }).populate('author').exec( function (err, post) {
    if (err) return done(err, null);
    done(null, post);
  });
}

exports.getByParentId = function(id, done) {
  Post.find({'parent.item': id }).populate('author').exec( function (err, posts) {
    if (err) return done(err, null);
    done(null, posts);
  });
}

// Post Commands
var addNew = exports.addNew = function(post, done) {
  var newPost = new Post({
    datetime: post.datetime,
    message: post.message,
    score: post.score,
    author: post.author
  });
  newPost.save( function (err, post) {
    if (err) done(err, null);
    done(null, post);
  });
}

// Put Commands
exports.updateById = function(id, updatedPost, done) {
  Post.findByIdAndUpdate(id, updatedPost, function (err, post) {
    if (err) return done(err, null);
    done(null, post);
  });
}

// Delete Commands
exports.deleteById = function (id, done){
  Post.findByIdAndRemove(id, function(err, post){
    if (err) return done(err, null);
    done(null, post);
  })
}
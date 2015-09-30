var User = require('../models/user.js');

exports.addNew = function(user, done) {
  var newUser = new User({
    // TODO: Add function
  });
}

exports.getAll = function(done) {
  User.find({ }, function (err, users) {
    if (err) return handleError(err);
    done(null, users);
  });
}

exports.getById = function(id, done) {
  User.findById({'id' : id }, function (err, user) {
    if (err) console.log(err);
    done(null, user);
  });
}

exports.getByFbId = function(id, done) {
  User.find({'fbId' : id }, function (err, user) {
    if (err) console.log(err);
    done(null, user);
  });
}
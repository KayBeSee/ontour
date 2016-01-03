var User = require('../models/user.js');

// Get Commands
exports.getAll = function(done) {
  User.find({ }, function (err, users) {
    if (err) return done(err, null);
    done(null, users);
  });
}

exports.getById = function(id, done) {
  User.findById({'_id' : id }, function (err, user) {
    if (err) return done(err, null);
    done(null, user);
  });
}

exports.getByFbId = function(id, done) {
  User.find({'fbId' : id }, function (err, user) {
    if (err) return done(err, null);
    done(null, user);
  });
}

// Post Commands
exports.addNew = function(user, done) {
  var newUser = new User({
    type: 'User',
    // TODO: Add function
  });
}

// Put Commands
exports.update = function(user, done) {
  User.findByIdAndUpdate(user._id, user, done);
}
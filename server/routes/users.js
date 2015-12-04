var api = require('../api');

module.exports = function(app) {
app.get('/api/users', function (req, res) {
  api.getAllUsers( function (err, users) {
    res.send(users);
  });
});

app.get('/api/users/:id', function (req, res) {
  api.getUserById(req.params.id, function (err, user) {
    res.send(user);
  });
});

}
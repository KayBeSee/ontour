var CommentController = require('../controllers/comment');

module.exports = function(app) {

  // Get Routes
  app.get('/api/comments', function (req, res) {
    CommentController.getAll( function (err, comments) {
      res.send(comments);
    });
  });

  app.get('/api/comments/:id', function (req, res) {
    CommentController.getById( req.params.id, function (err, comments) {
      res.send(comments);
    });
  });

  app.get('/api/comments/parent/:id', function (req, res) {
    CommentController.getByParentId(req.params.id, function (err, comment) {
      res.send(comment);
    });
  });

  // Put Routes
  app.put('/api/comments/:id', function (req, res) {
    CommentController.updateById( req.body.id, req.body, function (err, comment) {
      res.send(comment);
    });
  });

  // Post Routes
  app.post('/api/comments', function (req, res) {
    CommentController.addNew(req.body, function (err, comment) {
      if(err) console.log(err);
      res.send(comment);
    });
  });

  // Delete Routes
  app.delete('/api/comments/:id', function (req, res) {
    CommentController.deleteById( req.params.id, function (err, comment) {
      res.send(comment);
    });
  });

}
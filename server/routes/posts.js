var PostController = require('../controllers/post');

module.exports = function(app) {

  // Get Routes
  app.get('/api/posts', function (req, res) {
    PostController.getAll( function (err, posts) {
      res.send(posts);
    });
  });

  app.get('/api/posts/:id', function (req, res) {
    PostController.getById( req.params.id, function (err, posts) {
      res.send(posts);
    });
  });

  app.get('/api/posts/parent/:id', function (req, res) {
    PostController.getByParentId(req.params.id, function (err, post) {
      res.send(post);
    });
  });

  // Put Routes
  app.put('/api/posts/:id', function (req, res) {
    PostController.updateById( req.body.id, req.body, function (err, post) {
      res.send(post);
    });
  });

  // Post Routes
  app.post('/api/posts', function (req, res) {
    PostController.addNew(req.body, function (err, post) {
      console.log('body, bitch:', req.body);
      if(err) console.log(err);
      res.send(post);
    });
  });

  // Delete Routes
  app.delete('/api/posts/:id', function (req, res) {
    PostController.deleteById( req.params.id, function (err, post) {
      res.send(post);
    });
  });

}
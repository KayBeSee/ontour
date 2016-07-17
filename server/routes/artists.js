var ArtistController = require('../controllers/artist');

module.exports = function(app) {

  // Get Routes
  app.get('/api/artists', function (req, res) {
    if(req.query.name){
      ArtistController.searchByName( req.query.name, function (err, artist) {
        res.send(artist);
      });
    }
    else {
      ArtistController.getAll( function (err, venues) {
        res.send(venues);
      });
    }
  });

  app.get('/api/artists/:name', function (req, res) {
    ArtistController.getByName( req.params.name, function (err, artist) {
      res.send(artist);
    });
  });

  // Put Routes
  app.put('/api/artists/:id', function (req, res) {
    ArtistController.updateById( req.params.id, req.body, function (err, event) {
      res.send(event);
    });
  });

  // Post Routes
  app.post('/api/artists/create', function (req, res) {
    ArtistController.addNew(req.body, function (err, artists) {
      if(err) console.log(err);
      res.send(artists);
    });
  });

  // Delete Routes
  app.delete('/api/artists/:id', function (req, res) {
    ArtistController.deleteById( req.params._id, function (err, event) {
      res.send(event);
    });
  });

}
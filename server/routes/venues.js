var VenueController = require('../controllers/venue');

module.exports = function(app) {

  // Get Routes
  app.get('/api/venues', function (req, res) {
    if(req.query.name){
      VenueController.searchByName( req.query.name, function (err, artist) {
        res.send(artist);
      });
    }
    else {
      VenueController.getAll( function (err, venues) {
        res.send(venues);
      });
    }
  });

  app.get('/api/venue', function (req, res) {
    console.log(req.query.name);
    if(req.query.name){
      VenueController.getByName( req.query.name, function (err, artist) {
        res.send(artist);
      });
    }
  });

  // app.get('/api/venue/:name', function (req, res) {
  //   VenueController.getByName( req.params.name, function (err, artist) {
  //     res.send(artist);
  //   });
  // });

  // Put Routes
  app.put('/api/venues/:id', function (req, res) {
    VenueController.updateById( req.params.id, req.body, function (err, venue) {
      res.send(venue);
    });
  });

  // Post Routes
  app.post('/api/venues/create', function (req, res) {
    VenueController.addNew(req.body, function (err, venues) {
      if(err) console.log(err);
      res.send(venues);
    });
  });

  // Delete Routes
  app.delete('/api/venues/:id', function (req, res) {
    VenueController.deleteById( req.params.id, function (err, venue) {
      res.send(venue);
    });
  });

}
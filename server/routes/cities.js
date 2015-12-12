var CityController = require('../controllers/city');

module.exports = function(app) {

  // Get Routes
  app.get('/api/cities', function (req, res) {
    CityController.getAll( function (err, cities) {
      res.send(cities);
    });
  });

  app.get('/api/city/:name', function (req, res) {
    CityController.getByName( req.params.name, function (err, artist) {
      res.send(artist);
    });
  });

  app.get('/api/city/:name/venues', function (req, res) {
    CityController.getVenues( req.params.name, function (err, artist) {
      res.send(artist);
    });
  });

  app.get('/api/city/:name/events', function (req, res) {
    CityController.getEvents( req.params.name, function (err, artist) {
      res.send(artist);
    });
  });

  // Put Routes
  app.put('/api/cities/:id', function (req, res) {
    CityController.updateById( req.params.id, req.body, function (err, city) {
      res.send(city);
    });
  });

  // Post Routes
  app.post('/api/cities/create', function (req, res) {
    CityController.addNew(req.body, function (err, cities) {
      if(err) console.log(err);
      res.send(cities);
    });
  });

  // Delete Routes
  app.delete('/api/cities/:id', function (req, res) {
    CityController.deleteById( req.params.id, function (err, city) {
      res.send(city);
    });
  });

}
var EventController = require('../controllers/event');

module.exports = function(app) {

  // Get Routes
  app.get('/api/events', function (req, res) {
    EventController.getAll( function (err, events) {
      res.send(events);
    });
  });

  app.get('/api/events/:id', function (req, res) {
    EventController.getById( req.params._id, function (err, event) {
      res.send(event);
    });
  });

  app.get('/api/events/artist/:artistName', function (req, res){
    EventController.getAllByArtistName(req.params.artistName, function (err, events) {
      res.send(events);
    })
  });

  app.get('/api/events/venue/:venueName', function (req, res){
    EventController.getAllByVenueName(req.params.venueName, function (err, events) {
      res.send(events);
    })
  });

   app.get('/api/add/events/artist/:artistName', function (req, res) {
    EventController.getByArtistName( req.params.artistName, function (err, events) {
      if(err) return console.log(err);
      res.send(events);
    });
  });

  // Put Routes
  app.put('/api/events/:id', function (req, res) {
    EventController.updateById( req.body._id, req.body, function (err, event) {
      res.send(event);
    });
  });

  // Post Routes
  app.post('/api/events/create', function (req, res) {
    EventController.addNew(req.body, function (err, events) {
      if(err) console.log(err);
      res.send(events);
    });
  });

  app.post('/api/add/events/artist/:artistName', function (req, res) {
    EventController.addByArtistName( req.params.artistName, function (err, events) {
      if(err) return console.log(err);
      res.send(events);
    });
  });

  // Delete Routes
  app.delete('/api/events/:id', function (req, res) {
    EventController.deleteById( req.params._id, function (err, event) {
      res.send(event);
    });
  });

}
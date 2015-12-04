var api = require('../api');

module.exports = function(app) {

  // Get Routes
  app.get('/api/events', function (req, res) {
    api.getAllEvents( function (err, events) {
      res.send(events);
    });
  });

  app.get('/api/events/:id', function (req, res) {
    api.getEventById( req.params.id, function (err, event) {
      res.send(event);
    });
  });

  app.get('/api/events/artist/:artistName', function (req, res){
    api.getEventsByArtistName(req.params.artistName, function (err, events) {
      res.send(events);
    })
  });

  app.get('/api/events/venue/:venueName', function (req, res){
    api.getEventsByVenueName(req.params.venueName, function (err, events) {
      res.send(events);
    })
  })

  // Put Routes
  app.put('/api/events/:id', function (req, res) {
    api.updateEventById( req.params.id, req.body, function (err, event) {
      res.send(event);
    });
  });

  // Post Routes
  app.post('/api/events/create', function (req, res) {
    api.addNewEvent(req.body, function (err, events) {
      if(err) console.log(err);
      res.send(events);
    });
  });

  app.post('/api/add/events/artist/:artistName', function (req, res) {
    api.addEventsByArtistName( req.params.artistName, function (err, events) {
      if(err) return console.log(err);
      res.send(events);
    });
  });

  // Delete Routes
  app.delete('/api/events/:id', function (req, res) {
    api.deleteEventById( req.params.id, function (err, event) {
      res.send(event);
    });
  });

}
/* global app, $, alert */
var PageView = require('./base');
var venuebindings = require('../bindings/_venuebindings');
var EventTable = require('./partials/eventTable');
var Collection = require('ampersand-rest-collection');
var EventModel = require('../models/event');
var VenueModel = require('../models/venue');


module.exports = PageView.extend({
  pageTitle: 'view venue',
  template: require('../templates/pages/venue.hbs'),
  bindings: venuebindings,

  subviews: {
    VenueEventTable: {
      container: '[data-hook=eventsTable]',
      prepareView: function(el) {
        return new EventTable({
          el         : el,
          parent     : this,
          collection : this.collection,
          template: require('../templates/pages/events.hbs')
        });
      }
    }
  },

  initialize: function (spec) {
    var self = this;
    self.collection = new Collection([], {model: EventModel});
    self.model = new VenueModel();
    app.venues.getOrFetch(spec.venueName, function (err, venueModel) {
      if (err) alert('couldn\'t find a model with name: ' + spec.venueName);
      self.model = venueModel;
      self.collection.url = '/api/events/venue/' + venueModel.name;
      self.collection.fetch();
    });
  },

  render: function(){
    this.renderWithTemplate();
    return this;
  }
});

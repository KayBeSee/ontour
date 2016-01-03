/* global app, $, alert */
var PageView          = require('./base');
var citybindings      = require('../bindings/_citybindings');
var EventTable        = require('./partials/eventTable');
var VenueTable        = require('./partials/venueTable');
var Collection        = require('ampersand-rest-collection');
var EventModel        = require('../models/event');
var VenueModel        = require('../models/venue');
var CityModel         = require('../models/city');
var EventsCollection  = require('../models/events');
var VenuesCollection  = require('../models/venues');

module.exports = PageView.extend({
  pageTitle: 'view city',
  template: require('../templates/pages/city.hbs'),
  bindings: citybindings,

  subviews: {
    CityVenueTable: {
      container: '[data-hook=venuesTable]',
      prepareView: function(el) {
        return new VenueTable({
          el         : el,
          parent     : this,
          collection : this.venues,
          template   : require('../templates/pages/venues.hbs')
        });
      }
    },
    CityEventTable: {
      container: '[data-hook=eventsTable]',
      prepareView: function(el) {
        return new EventTable({
          el         : el,
          parent     : this,
          collection : this.events,
          template   : require('../templates/pages/events.hbs')
        });
      }
    }
  },

  initialize: function (spec) {
    var self = this;
    self.model = new CityModel();
    self.venues = new VenuesCollection();
    self.events = new EventsCollection();
    console.log('self.model', self.model);
    app.cities.getOrFetch(spec.cityName, function (err, cityModel) {
      if (err) alert('couldn\'t find a model with name: ' + spec.cityName);
      self.model = cityModel;
      self.venues.url = '/api/city/' + cityModel.name + '/venues';
      self.venues.fetch();
      self.events.url = '/api/city/' + cityModel.name + '/events';
      self.events.fetch();
      self.renderWithTemplate();
    });
  },

  render: function(){
    this.renderWithTemplate();
    return this;
  }
});

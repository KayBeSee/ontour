/* global app, $, alert */
var PageView = require('./base');
var artistbindings = require('../bindings/_artistbindings');
var EventTable = require('./partials/eventTable');
var Collection = require('ampersand-rest-collection');
var EventModel = require('../models/event');
var ArtistModel = require('../models/artist');


module.exports = PageView.extend({
  pageTitle: 'view artist',
  template: require('../templates/pages/artist.hbs'),
  bindings: artistbindings,

  subviews: {
    ArtistEventTable: {
      container: '[data-hook=eventsTable]',
      prepareView: function(el) {
        return new EventTable({
          el         : el,
          parent     : this,
          collection : this.collection,
          template   : require('../templates/pages/events.hbs')
        });
      }
    }
  },

  initialize: function (spec) {
    var self = this;
    self.collection = new Collection([], {model: EventModel});
    self.model = new ArtistModel();
    app.artists.getOrFetch(spec.artistName, function (err, artistModel) {
      if (err) alert('couldn\'t find a model with name: ' + spec.artistName);
      self.model = artistModel;
      self.collection.url = '/api/events/artist/' + artistModel.name;
      self.collection.fetch();
      self.renderWithTemplate();
    });
  }
});

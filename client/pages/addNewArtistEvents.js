/* global app, $, alert */
var PageView = require('./base');
var NewArtistForm = require('../forms/addArtistEvents');
var AmpersandModel = require('ampersand-model');
var EventView = require('./partials/event');  // grab event view
var AmpersandCollection = require('ampersand-rest-collection');
var EventModel = require('../models/event');

module.exports = PageView.extend({
  pageTitle: 'add new artist',
  template: require('../templates/pages/add-new-artist.hbs'),
  events: {
    'click [data-hook=saveEvents': 'saveEvents'
  },
  subviews: {
    AddNewArtistForm: {
      container: '[data-hook=artist-form]',
      prepareView: function (el) {
        return new NewArtistForm({
          el: el,
          parent: this,
          model: new AmpersandModel(),
        });
      }
    }
  },

  initialize: function() {
    this.collection = new AmpersandCollection([], {
      model: EventModel
    });
  },

  render: function() {
    this.renderWithTemplate();
    this.renderCollection(
      this.collection,
      EventView,
      this.queryByHook('event-list'),
      { parent: this }
    );
  },

  saveEvents: function() {
    console.log(this.collection);
    this.collection.create(this.collection);
    app.navigate('events');
  }

});

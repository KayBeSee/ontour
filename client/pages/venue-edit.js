/* global app, alert */
var PageView = require('./base');
var VenueForm = require('../forms/venue');
var Venue     = require('../models/venue');

module.exports = PageView.extend({
  pageTitle: 'edit venue',
  template: require('../templates/pages/venue-edit.hbs'),
  events: {
      'click [data-hook=delete]': 'deleteVenue'
  },
  initialize: function (options) {
    console.log('options', options);
    app.venues.getOrFetch(options.venueName, { all: true }, function (err, model) {
      if (err) alert('couldn\'t find a model with venueName: ' + options.id);
      this.model = model;
      this.model.url = '/api/venues/' + model._id;
    }.bind(this));
  },
  deleteVenue: function(){
    this.model.destroy();
  },
  subviews: {
    EditVenue: {
      container: 'form',
      waitFor: this.model,
      prepareView: function (el) {
        return new VenueForm({
          el: el,
          model: this.model,
          parent: this,
          submitCallback: function (data) {
            this.model.save(data, {
              wait: true,
              error: function(err) {
                console.log('error', err);
              },
              success: function () {
                app.navigate('venues');
              }
            });
          }
        });
      },
    }
  }
});

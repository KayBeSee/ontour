/* global app, alert */
var PageView = require('./base');
var VenueForm = require('../forms/venue');
var Venue     = require('../models/venue');

module.exports = PageView.extend({
  pageTitle: 'edit venue',
  template: require('../templates/pages/venue-edit.hbs'),
  initialize: function () {
      this.model = new Venue();
      this.model.url = '/api/venues/create';
  },
  subviews: {
    AddVenue: {
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
      }
    },
  }
});

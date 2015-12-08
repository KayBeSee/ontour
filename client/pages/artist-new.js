/* global app, alert */
var PageView = require('./base');
var ArtistForm = require('../forms/artist');
var Artist     = require('../models/artist');

module.exports = PageView.extend({
  pageTitle: 'edit artist',
  template: require('../templates/pages/artist-edit.hbs'),
  initialize: function () {
      this.model = new Artist();
      this.model.url = '/api/artists/create';
  },
  subviews: {
    AddArtist: {
      container: 'form',
      waitFor: this.model,
      prepareView: function (el) {
        return new ArtistForm({
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
                app.navigate('artists');
              }
            });
          }
        });
      },
    }
  }
});

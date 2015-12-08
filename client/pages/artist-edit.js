/* global app, alert */
var PageView = require('./base');
var ArtistForm = require('../forms/artist');
var Artist     = require('../models/artist');

module.exports = PageView.extend({
  pageTitle: 'edit artist',
  template: require('../templates/pages/artist-edit.hbs'),
  initialize: function (options) {
    console.log('options', options);
    app.artists.getOrFetch(options.artistName, { all: true }, function (err, model) {
      if (err) alert('couldn\'t find a model with artistName: ' + options.id);
      this.model = model;
      this.model.url = '/api/artists/' + model._id;
    }.bind(this));
  },
  subviews: {
    EditArtist: {
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

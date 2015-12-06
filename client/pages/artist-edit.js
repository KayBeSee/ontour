/* global app, alert */
var PageView = require('./base');
var ArtistForm = require('../forms/artist');
var Artist     = require('../models/artist');

module.exports = PageView.extend({
  pageTitle: 'edit artist',
  template: require('../templates/pages/artist-edit.hbs'),
  initialize: function (options) {
    if (options && options.id) {
      app.artists.getOrFetch(options.id, { all: true }, function (err, model) {
        if (err) alert('couldn\'t find a model with id: ' + options.id);
        this.model = model;
        this.model.url = '/api/artists/' + model.id;
      }.bind(this));
    } else {
      this.model = new Artist();
      this.model.url = '/api/artists/create';
    }
  },
  subviews: {
    EditArtist: {
      container: 'form',
      waitFor: this.model,
      prepareView: function (el) {
        console.log(this.model);
        return new ArtistForm({
          el: el,
          model: this.model,
          parent: this,
          submitCallback: function(obj){
            this.model._id = obj._id;
            this.model.name = obj.name;
            this.model.website = obj.website;
            this.model.facebook = obj.facebook;
            this.model.twitter = obj.twitter;
            this.model.location = obj.location;
            this.model.bio = obj.bio;
            this.model.picture = obj.picture;
            console.log(this.model);
            this.model.save();
          }
        });
      },
    }
  }
});

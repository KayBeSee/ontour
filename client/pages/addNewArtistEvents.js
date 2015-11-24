/* global app, $, alert */
var PageView = require('./base');
var NewArtistForm = require('../forms/addArtistEvents');
var AmpersandModel = require('ampersand-model');


module.exports = PageView.extend({
  pageTitle: 'add new artist',
  template: require('../templates/pages/add-new-artist.hbs'),
  subviews: {
    AddNewArtistForm: {
      container: '[data-hook=artist-form]',
      prepareView: function (el) {
        return new NewArtistForm({
          el: el,
          model: new AmpersandModel ({
          })
        });
      }
    }
  },

  initialize: function() {
    this.model = new AmpersandModel({
    });
  }

});

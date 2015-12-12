/* global app, alert */
var PageView = require('./base');
var CityForm = require('../forms/city');
var City     = require('../models/city');

module.exports = PageView.extend({
  pageTitle: 'edit city',
  template: require('../templates/pages/city-edit.hbs'),
  initialize: function () {
      this.model = new City();
      this.model.url = '/api/cities/create';
  },
  subviews: {
    AddCity: {
      container: 'form',
      waitFor: this.model,
      prepareView: function (el) {
        return new CityForm({
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
                app.navigate('cities');
              }
            });
          }
        });
      }
    },
  }
});

/* global app, alert */
var PageView = require('./base');
var CityForm = require('../forms/city');
var City     = require('../models/city');

module.exports = PageView.extend({
  pageTitle: 'edit city',
  template: require('../templates/pages/city-edit.hbs'),
  events: {
      'click [data-hook=delete]': 'deleteCity'
  },
  initialize: function (options) {
    console.log('options', options);
    app.cities.getOrFetch(options.cityName, { all: true }, function (err, model) {
      if (err) alert('couldn\'t find a model with cityName: ' + options.id);
      this.model = model;
      this.model.url = '/api/cities/' + model._id;
    }.bind(this));
  },
  deleteCity: function(){
    this.model.destroy();
  },
  subviews: {
    EditCity: {
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
      },
    }
  }
});

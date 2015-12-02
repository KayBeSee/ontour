/* global app, alert */
var PageView = require('./base');
var EventForm = require('../forms/event');
var Event     = require('../models/event');

module.exports = PageView.extend({
  pageTitle: 'edit event',
  template: require('../templates/pages/event-edit.hbs'),
  initialize: function (options) {
    if (options && options.id) {
      app.events.getOrFetch(options.id, { all: true }, function (err, model) {
        if (err) alert('couldn\'t find a model with id: ' + options.id);
        this.model = model;
        this.model.url = '/api/events/' + model.id;
      }.bind(this));
    } else {
      this.model = new Event();
      this.model.url = '/api/events/create';
    }
  },
  subviews: {
    form: {
      container: 'form',
      waitFor: 'model',
      prepareView: function (el) {
        return new EventForm({
          el: el,
          model: this.model,
          submitCallback: function (data) {
            this.model.save(data, {
              wait: true,
              error: function(err) {
                console.log('error', err);
              },
              success: function () {
                app.navigate('events');
              }
            });
          }
        });
      }
    }
  }
});

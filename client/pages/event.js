/* global app, $, alert */
var PageView = require('./base');
var eventbindings = require('../bindings/_eventbindings');
var EventModel = require('../models/event');

module.exports = PageView.extend({
  pageTitle: 'view event',
  template: require('../templates/pages/event.hbs'),
  bindings: eventbindings,
  events: {
    'click .attend': 'notAttend',
    'click .notAttend': 'attend',
  },

  initialize: function (spec) {
    var self = this;
    this.model = new EventModel();
    app.events.getOrFetch(spec.id, function (err, eventModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = eventModel;
    });
  },

  render: function() {
    this.renderWithTemplate();
    return this;
  },

  attend: function() {
    window.me.addEvent(this.model);
    window.me.save(window.me);
    this.render();
  },

  notAttend: function() {
    window.me.removeEvent(this.model);
    window.me.save(window.me);
    this.render();
  }

});

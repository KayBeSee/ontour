/* global app, $, alert */
var PageView = require('./base');
var AmpersandCollection = require('ampersand-collection');
var eventbindings = require('../bindings/_eventbindings');

module.exports = PageView.extend({
  pageTitle: 'view event',
  template: require('../templates/pages/event.hbs'),
  bindings: eventbindings,
  events: {
    'click [data-hook=list-item]': 'navigateToPuID',
    'click [data-hook=disabledButton]': 'clickDisable',
    'click [data-hook=editButton]': 'clickEdit',
  },

  initialize: function (spec) {
    var self = this;
    app.events.getOrFetch(spec.id, function (err, eventModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = eventModel;
    });
  },

  render: function(){
    this.renderWithTemplate();
    return this;
  },

});

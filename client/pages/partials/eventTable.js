var PageView   = require('../base');           // grab base page view
var EventView = require('./event');  // grab event view

module.exports = PageView.extend({
  pageTitle: 'Event Collection',
  template: require('../../templates/pages/events.hbs'),

  initialize: function () {
    this.render();
  },

  render: function () {
    this.renderWithTemplate();
    this.renderCollection(
      this.collection,
      EventView,
      this.queryByHook('event-list'),
      { parent: this }
    );
    return this;
  },

  resetCollection: function () {
    this.collection.reset();
  }
});

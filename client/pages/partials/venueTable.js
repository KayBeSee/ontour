var PageView   = require('../base');           // grab base page view
var VenueView = require('./venue');  // grab venue view

module.exports = PageView.extend({
  pageTitle: 'Venue Collection',
  // template: require('../../templates/pages/venues.hbs'),

  initialize: function () {
    this.render();
  },

  render: function () {
    this.renderWithTemplate();
    this.renderCollection(
      this.collection,
      VenueView,
      this.queryByHook('venue-list'),
      { parent: this }
    );
    return this;
  },

  resetCollection: function () {
    this.collection.reset();
  }
});

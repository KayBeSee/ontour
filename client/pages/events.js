var PageView   = require('./base');           // grab base page view
var EventView = require('../pages/partials/event');  // grab event view

module.exports = PageView.extend({
  pageTitle: 'Event Collection',
  template: require('../templates/pages/events.hbs'),

  initialize: function () {
    this.collection.fetch({
      success: function () {
        this.render().kendoGrid();
      }.bind(this)
    });
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

  kendoGrid: function () {
    $('#events').kendoGrid({ // jshint ignore:line
      sortable: true,
      mobile: true,
      pageable: true,
      reorderable: true,
      resizable: true,
      dataSource: {
        pageSize: 10,
        refresh: true,
        serverPaging: false
      }
    });
  },

  resetCollection: function () {
    this.collection.reset();
  }
});

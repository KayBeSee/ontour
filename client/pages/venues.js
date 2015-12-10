var PageView   = require('./base');           // grab base page view
var VenueView = require('../pages/partials/venue');  // grab user view
process.config = require('../../config');


module.exports = PageView.extend({
  pageTitle: 'Venue Collection',
  template: require('../templates/pages/venues.hbs'),

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
      VenueView,
      this.queryByHook('venue-list')
    );
    return this;
  },

  kendoGrid: function () {
    $('#users').kendoGrid({
      dataSource: {
        sort: {
            field: "name",
            dir: "aesc"
        },
        pageSize: 50,
        refresh: true,
        serverPaging: false,
        pageSizes: true,
      },
      sortable: true,
      mobile: true,
      pageable: true,
      reorderable: true,
      resizable: true,
      filterable: {
        mode: "row"
      },
    });
  }
});

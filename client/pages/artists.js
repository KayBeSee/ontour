var PageView   = require('./base');           // grab base page view
var ArtistView = require('../pages/partials/artist');  // grab user view
process.config = require('../../config');


module.exports = PageView.extend({
  pageTitle: 'Artist Collection',
  template: require('../templates/pages/artists.hbs'),

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
      ArtistView,
      this.queryByHook('artist-list')
    );
    return this;
  },

  kendoGrid: function () {
    $('#artists').kendoGrid({
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

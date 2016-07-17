var PageView   = require('./base');           // grab base page view
var PostView = require('../pages/partials/post');  // grab user view
process.config = require('../../config');


module.exports = PageView.extend({
  pageTitle: 'Posts',
  template: require('../templates/pages/cities.hbs'),

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
      PostView,
      this.queryByHook('city-list')
    );
    return this;
  },

  kendoGrid: function () {
    $('#cities').kendoGrid({
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

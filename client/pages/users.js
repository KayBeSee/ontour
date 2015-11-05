var PageView   = require('./base');           // grab base page view
var UserView = require('../pages/partials/user');  // grab user view
process.config = require('../../config');


module.exports = PageView.extend({
  pageTitle: 'User Collection',
  template: require('../templates/pages/users.hbs'),

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
      UserView,
      this.queryByHook('user-list')
    );
    return this;
  },

  kendoGrid: function () {
    $('#users').kendoGrid({
      dataSource: {
        sort: {
            field: "date",
            dir: "aesc"
        },
        pageSize: 50,
        refresh: true,
        serverPaging: false,
        pageSizes: true,
        schema: {
          model: {
            fields: {
              image: {type: 'string'},
              first_name: {type: 'string'},
              last_name: {type: 'string'},
              eventCount: {type: 'string'},
              actions: {type: 'string'}
            }
          }
        }
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

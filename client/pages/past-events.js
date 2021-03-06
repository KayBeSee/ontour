var PageView   = require('./base');           // grab base page view
var EventView = require('../pages/partials/event');  // grab event view
process.config = require('../../config');


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
      { parent: this,
        filter: function(model){
          return Date.now() >  Date.parse(model.datetime);
        }
      }
    );
    return this;
  },

  kendoGrid: function () {
    $('#events').kendoGrid({
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
              date: {type: 'date'},
              artistName: {type: 'string'},
              location: {type: 'string'},
              venue: {type: 'string'},
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
      columns:
        [{
          field: "date",
          format: "{0:MM/dd/yyyy}",
          type: 'date',
          filterable: {
            cell: {
              showOperators: false,
            }
          }
        },
        {
          field: "artists",
          title: "Artists",
          filterable: {
            mode: 'row',
            operators:{
              string: {
                contains: 'Artist Name',
              }
            },
            cell: {
              showOperators: false,
              operator: "contains"
            }
          }
        },
        {
          field: "location",
          filterable: {
            multi: true,
            operators:{
              string: {
                endswith: 'State',
                startswith: 'City'
              }
            },
            cell: {
              operator: "gte"
            }
          }
        },
        {
          field: "venue",
          filterable: {
            cell: {
              showOperators: false,
              operator: "ends"
            }
          }
        },
         {
          field: "actions",
          filterable: false
        }]
    });
  },

  resetCollection: function () {
    this.collection.reset();
  }
});

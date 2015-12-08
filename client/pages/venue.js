/* global app, $, alert */
var PageView = require('./base');
var userbindings = require('../bindings/_userbindings');
var EventTable = require('./partials/eventTable');
var Collection = require('ampersand-collection');
var EventModel = require('../models/event');
var UserModel = require('../models/user');


module.exports = PageView.extend({
  pageTitle: 'view user',
  template: require('../templates/pages/user.hbs'),
  bindings: userbindings,

  subviews: {
    EventTable: {
      container: '[data-hook=eventsTable]',
      prepareView: function(el) {
        return new EventTable({
          el         : el,
          parent     : this,
          collection : this.collection
        });
      }
    }
  },

  initialize: function (spec) {
    var self = this;
    this.collection = new Collection([], {model: EventModel});
    this.model = new UserModel();
    app.users.getOrFetch(spec.id, function (err, userModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = userModel;
      self.collection.add(userModel.events);
    });
  },

  render: function(){
    this.renderWithTemplate(this);
  },

});

/* global app, $, alert */
var PageView = require('./base');
var AmpersandCollection = require('ampersand-collection');

module.exports = PageView.extend({
  pageTitle: 'view event',
  template: require('../templates/pages/user.hbs'),

  initialize: function (spec) {
    var self = this;
    app.users.getOrFetch(spec.id, function (err, userModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = userModel;
    });
  },

  render: function(){
    this.renderWithTemplate();
    return this;
  },

});

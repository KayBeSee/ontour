var View = require('ampersand-view');
var userbindings = require('../../bindings/_userbindings');

module.exports = View.extend({
  template: require('../../templates/partials/user.hbs'),
  bindings: userbindings,
  initialize: function (spec) {
    this.model = spec.model;
  }

});

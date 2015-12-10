var View = require('ampersand-view');
var venuebindings = require('../../bindings/_venuebindings');

module.exports = View.extend({
  template: require('../../templates/partials/venue.hbs'),
  bindings: venuebindings,
  initialize: function (spec) {
    this.model = spec.model;
  }

});

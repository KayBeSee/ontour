var View = require('ampersand-view');
var artistbindings = require('../../bindings/_artistbindings');

module.exports = View.extend({
  template: require('../../templates/partials/artist.hbs'),
  bindings: artistbindings,
  initialize: function (spec) {
    this.model = spec.model;
  }

});

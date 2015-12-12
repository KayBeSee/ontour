var View = require('ampersand-view');
var citybindings = require('../../bindings/_citybindings');

module.exports = View.extend({
  template: require('../../templates/partials/city.hbs'),
  bindings: citybindings,
  initialize: function (spec) {
    this.model = spec.model;
  }

});

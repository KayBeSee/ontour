var View = require('ampersand-view');
var eventbindings = require('../../bindings/_eventbindings');

module.exports = View.extend({
  template: require('../../templates/partials/event.hbs'),
  bindings: eventbindings,
  initialize: function (spec) {
    var self = this;
    window.app.events.getOrFetch(spec.model.id, {all: true}, function (err, model) {
      if (err) window.alert('couldn\'t find a event with id: ' + spec.id);
      self.model = model;
    });
  },
  render: function() {
    this.renderWithTemplate();
  }
});

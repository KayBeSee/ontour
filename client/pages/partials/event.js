var View = require('ampersand-view');
var eventbindings = require('../../bindings/_eventbindings');

module.exports = View.extend({
  template: require('../../templates/partials/event.hbs'),
  bindings: eventbindings,
  events: {
    'click .attend': 'notAttend',
    'click .notAttend': 'attend',
  },
  initialize: function (spec) {
    var self = this;
  },
  render: function() {
    this.renderWithTemplate();
    return this;
  },
  attend: function() {
    window.me.addEvent(this.model);
    window.me.save(window.me);
    this.render();
  },

  notAttend: function() {
    window.me.removeEvent(this.model);
    window.me.save(window.me);
    this.render();
  }
});

var View = require('ampersand-view');
var eventbindings = require('../../bindings/_eventbindings');

module.exports = View.extend({
  template: require('../../templates/partials/event.hbs'),
  bindings: eventbindings,
  events: {
    'click [data-hook=attend]': 'attend',
    'click [data-hook=not-attend': 'notAttend'
  },
  initialize: function (spec) {
  },
  render: function() {
    this.renderWithTemplate();
  },
  attend: function() {
    window.me.events.push(this.model);
    $('#attendButton').replaceWith('<div class="button success" data-hook="not-attend" id="attendButton">Attending</div>');
    window.me.save({events: window.me.events});
  },

  notAttend: function() {
    var pos = window.me.events.indexOf(this.model);
    window.me.events.splice(pos, 1);
    $('#attendButton').replaceWith('<div class="button alert" data-hook="attend" id="attendButton">Not Attending</div>');
    window.me.save({events: window.me.events});
  }
});

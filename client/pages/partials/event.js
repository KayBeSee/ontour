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
    window.app.events.getOrFetch(spec.model._id, {all: true}, function (err, model) {
      if (err) window.alert('couldn\'t find a event with id: ' + spec._id);
      self.model = model;
    });
  },
  render: function() {
    this.renderWithTemplate();
    this.attendButton = this.query('#attend-'+self.model._id);
    console.log(this.attendButton);
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

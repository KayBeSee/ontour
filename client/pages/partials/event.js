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
    this.render().detectAttending();
  },
  render: function() {
    this.renderWithTemplate();
    return this;
  },
  detectAttending: function() {
    if(window.me._id){
      if(window.me.eventIds.indexOf(this.model._id) === -1){
        $('#attend-'+this.model._id).replaceWith('<div class="btn btn-danger btn-xs attend" id="attend-'+this.model._id+'">Not Attending</div>');      }
      else {
        $('#attend-'+this.model._id).replaceWith('<div class="btn btn-success btn-xs notAttend" id="attend-'+this.model._id+'">Attending</div>');
      }
    }
    else { $('#attendButton').remove(); }
  },
  attend: function() {
    console.log('clicked attend');
    window.me.events.push(this.model);
    $('#attend-'+this.model._id).replaceWith('<div class="btn btn-success btn-xs attend" id="attend-'+this.model._id+'">Attending</div>');
    window.me.save({events: window.me.events});
  },

  notAttend: function() {
    console.log('clicked notattend');
    var pos = window.me.events.indexOf(this.model);
    window.me.events.splice(pos, 1);
    $('#attend-'+this.model._id).replaceWith('<div class="btn btn-danger btn-xs notAttend" id="attend-'+this.model._id+'">Attending</div>');
    window.me.save({events: window.me.events});
  }
});

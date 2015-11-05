/* global app, $, alert */
var PageView = require('./base');
var eventbindings = require('../bindings/_eventbindings');

module.exports = PageView.extend({
  pageTitle: 'view event',
  template: require('../templates/pages/event.hbs'),
  bindings: eventbindings,
  events: {
    'click [data-hook=attend]': 'attend',
    'click [data-hook=not-attend': 'notAttend'
  },

  initialize: function (spec) {
    var self = this;
    app.events.getOrFetch(spec.id, function (err, eventModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = eventModel;
    });
  },

  render: function() {
    if(window.me._id){
      this.renderWithTemplate(this).detectAttending();
    } else {
      this.renderWithTemplate(this);
    }
    return this;
  },

  detectAttending: function() {
    if(window.me.events.indexOf(this.model._id) === -1){
      $('#attendButton').replaceWith('<div class="button alert" data-hook="attend" id="attendButton">Not Attending</div>');
    }
    else {
      $('#attendButton').replaceWith('<div class="button success" data-hook="attend" id="attendButton">Attending</div>');
    }
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

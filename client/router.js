/*global me, app*/
var Router         = require('ampersand-router');
var HomePage       = require('./pages/home');
var InfoPage       = require('./pages/info');
var PersonAddPage  = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonViewPage = require('./pages/person-view');
var EventViewPage  = require('./pages/event');
var EventsPage     = require('./pages/events');
var PastEventsPage     = require('./pages/past-events');
var EventEditPage  = require('./pages/event-edit');


module.exports = Router.extend({
  routes: {
    ''                    : 'home',
    'events/:id'          : 'eventById',
    'events/:artist_name' : 'eventByArtist',
    'events/:id/edit'     : 'eventEdit',
    'event/new'           : 'eventCreate',
    'events'              : 'events',
    'past-events'         : 'pastEvents',
    'info'                : 'info',
    'person/add'          : 'personAdd',
    'person/:id'          : 'personView',
    'person/:id/edit'     : 'personEdit',
    '(*path)'             : 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    this.trigger('page', new HomePage({
      model: me
    }));
  },

  eventById: function (id) {
    this.trigger('page', new EventViewPage({
      id: id
    }));
  },

  events: function () {
    this.trigger('page', new EventsPage({
      collection: app.events
    }));
  },

  pastEvents: function () {
    this.trigger('page', new PastEventsPage({
      collection: app.events
    }));
  },

  eventEdit: function (id) {
    this.trigger('page', new EventEditPage({
      id: id,
    }));
  },

  eventCreate: function () {
    this.trigger('page', new EventEditPage());
  },

  info: function () {
    this.trigger('page', new InfoPage({
      model: me
    }));
  },

  personAdd: function () {
    this.trigger('page', new PersonAddPage());
  },

  personEdit: function (id) {
    this.trigger('page', new PersonEditPage({
      id: id
    }));
  },

  personView: function (id) {
    this.trigger('page', new PersonViewPage({
      id: id
    }));
  },

  catchAll: function () {
    this.redirectTo('');
  }
});

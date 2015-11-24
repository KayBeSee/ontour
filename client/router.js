/*global me, app*/
var Router         = require('ampersand-router');
var HomePage       = require('./pages/home');
var EventViewPage  = require('./pages/event');
var EventsPage     = require('./pages/events');
var PastEventsPage = require('./pages/past-events');
var EventEditPage  = require('./pages/event-edit');
var UserViewPage  = require('./pages/user');
var UsersPage     = require('./pages/users');
var NewArtistPage = require('./pages/addNewArtistEvents');


module.exports = Router.extend({
  routes: {
    ''                    : 'home',
    'login'               : 'loginFacebook',
    'logout'              : 'logoutFacebook',
    'users'               : 'users',
    'users/:id'           : 'user',
    'events/:id'          : 'eventById',
    'events/:artist_name' : 'eventByArtist',
    'events/:id/edit'     : 'eventEdit',
    'event/new'           : 'eventCreate',
    'events'              : 'events',
    'newArtist'           : 'newArtist',
    'past-events'         : 'pastEvents',
    '(*path)'             : 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    this.trigger('page', new HomePage({
      model: me
    }));
  },

  loginFacebook: function () {
    window.location.href = './login/facebook';
  },

  logoutFacebook: function () {
    window.location.href = './logout/facebook';
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

  newArtist: function () {
    this.trigger('page', new NewArtistPage());
  },

  users: function () {
    this.trigger('page', new UsersPage({
      collection: app.users
    }));
  },

  user: function (id) {
    this.trigger('page', new UserViewPage({
      id: id
    }));
  },

  catchAll: function () {
    this.redirectTo('');
  }
});

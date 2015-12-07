/*global me, app*/
var Router            = require('ampersand-router');
var HomePage          = require('./pages/home');
var EventViewPage     = require('./pages/event');
var EventsPage        = require('./pages/events');
var PastEventsPage    = require('./pages/past-events');
var EventEditPage     = require('./pages/event-edit');
var UserViewPage      = require('./pages/user');
var UsersPage         = require('./pages/users');
var NewArtistPage     = require('./pages/addNewArtistEvents');
var VenueViewPage     = require('./pages/venue');
var ArtistsPage       = require('./pages/artists');
var ArtistViewPage    = require('./pages/artist');
var ArtistEditPage    = require('./pages/artist-edit');

module.exports = Router.extend({
  routes: {
    ''                    : 'home',
    'login'               : 'loginFacebook',
    'logout'              : 'logoutFacebook',
    'users'               : 'users',
    'users/:id'           : 'user',

    'events'              : 'events',
    'past-events'         : 'pastEvents',
    'events/:id'          : 'eventById',
    'events/:id/edit'     : 'eventEdit',
    'event/new'           : 'eventCreate',

    'pullArtistEvents'    : 'pullArtistEvents',

    'venue/:venueName'    : 'venue',

    'artists'             : 'artists',
    'artists/:artistName' : 'artist',
    'artist/new'          : 'artistCreate',

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

  pullArtistEvents: function () {
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

  venue: function (venueName) {
    this.trigger('page', new VenueViewPage({
      venueName: venueName
    }));
  },

  artists: function () {
    this.trigger('page', new ArtistsPage({
      collection: app.artists
    }));
  },

  artist: function (artistName) {
    this.trigger('page', new ArtistViewPage({
      artistName: artistName
    }));
  },

  artistCreate: function () {
    this.trigger('page', new ArtistEditPage());
  },

  catchAll: function () {
    this.redirectTo('');
  }
});

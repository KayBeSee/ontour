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
var ArtistsPage       = require('./pages/artists');
var ArtistViewPage    = require('./pages/artist');
var ArtistEditPage    = require('./pages/artist-edit');
var ArtistNewPage     = require('./pages/artist-new');
var VenuesPage        = require('./pages/venues');
var VenueViewPage     = require('./pages/venue');
var VenueEditPage     = require('./pages/venue-edit');
var VenueNewPage      = require('./pages/venue-new');
var CitiesPage        = require('./pages/cities');
var CityViewPage      = require('./pages/city');
var CityEditPage      = require('./pages/city-edit');
var CityNewPage       = require('./pages/city-new');

module.exports = Router.extend({
  routes: {
    ''                          : 'home',
    'login'                     : 'loginFacebook',
    'logout'                    : 'logoutFacebook',
    'users'                     : 'users',
    'users/:id'                 : 'user',

    'events'                    : 'events',
    'past-events'               : 'pastEvents',
    'events/:id'                : 'event',
    'events/:id/edit'           : 'eventEdit',
    'event/new'                 : 'eventCreate',

    'pullArtistEvents'          : 'pullArtistEvents',

    'artists'                   : 'artists',
    'artists/:artistName'       : 'artist',
    'artists/:artistName/edit'  : 'artistEdit',
    'artist/new'                : 'artistCreate',

    'venues'                    : 'venues',
    'venues/:venueName'         : 'venue',
    'venues/:venueName/edit'    : 'venueEdit',
    'venue/new'                 : 'venueCreate',

    'cities'                    : 'cities',
    'cities/:cityName'          : 'city',
    'cities/:cityName/edit'     : 'cityEdit',
    'city/new'                  : 'cityCreate',

    '(*path)'                   : 'catchAll'
  },

  // ------- ROUTE HANDLERS ---------
  home: function () {
    this.trigger('page', new HomePage({
      model: me,
      collection: app.posts
    }));
  },

  loginFacebook: function () {
    window.location.href = './login/facebook';
  },

  logoutFacebook: function () {
    window.location.href = './logout/facebook';
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

  event: function (id) {
    this.trigger('page', new EventViewPage({
      id: id
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

  artistEdit: function (artistName) {
    this.trigger('page', new ArtistEditPage({
      artistName: artistName
    }));
  },

  artistCreate: function () {
    this.trigger('page', new ArtistNewPage());
  },

  venues: function () {
    this.trigger('page', new VenuesPage({
      collection: app.venues
    }));
  },

  venue: function (venueName) {
    this.trigger('page', new VenueViewPage({
      venueName: venueName
    }));
  },

  venueEdit: function (venueName) {
    this.trigger('page', new VenueEditPage({
      venueName: venueName
    }));
  },

  venueCreate: function () {
    this.trigger('page', new VenueNewPage());
  },

  cities: function () {
    this.trigger('page', new CitiesPage({
      collection: app.cities
    }));
  },

  city: function (cityName) {
    this.trigger('page', new CityViewPage({
      cityName: cityName
    }));
  },

  cityEdit: function (cityName) {
    this.trigger('page', new CityEditPage({
      cityName: cityName
    }));
  },

  cityCreate: function () {
    this.trigger('page', new CityNewPage());
  },

  catchAll: function () {
    this.redirectTo('');
  }
});

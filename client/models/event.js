var AmpersandModel = require('ampersand-model');
var moment = require('moment');

module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  typeAttribute: 'Event',
  props: {
    _id: 'string',
    name: 'string',
    datetime: 'date',
    ticket_url: 'string',
    picture: 'string',
    artists: 'array',
    venue: {
      _id: 'string',
      name: 'string',
      city: 'string',
      state: 'string'
    }
  },
  derived: {
    title: {
      deps: ['name', 'artists', 'venue'],
      fn: function() {
        if(this.name) {
          return this.name;
        } else {
          var artistNames = this.artists.map(function(artist){ return artist.name});
          return artistNames.join(', ') + ' @ ' + this.venue.name;
        }
      }
    },
    editUrl: {
      deps: ['_id'],
      fn: function() {
        return '/events/' + this._id + '/edit'
      }
    },
    readableDate: {
      deps: ['datetime'],
      fn: function () {
        var date = new Date(this.datetime);
        return moment(date).format('LL');
      }
    },
    sortableDate: {
      deps: ['datetime'],
      fn: function() {
        var date = new Date(this.datetime);
        return date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
      }
    },
    userIsAttending: {
      deps: ['_id'],
      cache: false,
      fn: function() {
        if(window.me._id && window.me.eventIds.indexOf(this._id) === -1){
          return false;
        }
        else { return true; }
      }
    },
  }
});

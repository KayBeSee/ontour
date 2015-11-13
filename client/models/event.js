var AmpersandModel = require('ampersand-model');
var moment = require('moment');


module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: 'string',
    bitId: 'number',
    title: 'string',
    datetime: 'string',
    ticket_url: 'string',
    ticket_type: 'string',
    ticket_status: 'string',
    facebook_rsvp_url: 'string',
    artists: [{
      name: 'string',
      image_url: 'string',
      thumb_url: 'string',
      facebook_tour_dates_url: 'string',
      facebook_page_url: 'string',
      tracker_count: 'number',
      website: 'string'
    }],
    venue: {
      name: 'string',
      city: 'string',
      region: 'string',
      country: 'string',
      latitude: 'number',
      longitude: 'number',
    },
    comments: [{
      message: 'string',
      datetime: 'string',
      author: {
        _id: 'string',
        name: 'string',
        photo: 'string',
      }
    }]
  },
  derived: {
    mainImage: {
      deps: ['artists'],
      fn: function () {
        return this.artists[0].image_url;
      }
    },
    readableDate: {
      deps: ['datetime'],
      fn: function () {
        var date = new Date(this.datetime);
        return moment(date).format('LLLL');
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
        if(window.me._id){
          if(window.me.eventIds.indexOf(this._id) === -1){
            return false;
          }
          else { return true; }
        }
      }
    },
  }
});

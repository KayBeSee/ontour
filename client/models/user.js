var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: ['string'],
    first_name: ['string'],
    last_name: ['string'],
    email: ['string'],
    picture: ['string'],
    fbId: ['string'],
    fbUrl: ['string'],
    fb_access_token: ['string'],
    events: ['array'],
  },
  derived: {
    eventCount: {
      deps: ['events'],
      fn: function() {
        return this.events.length;
      }
    },
    eventIds: {
      deps: ['events'],
      fn: function() {
        return this.events.map(function(event) {return event._id;});
      }
    }
  }
});

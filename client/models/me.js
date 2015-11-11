var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  url: '/authenticate',
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
    eventIds: ['array']
  },
  derived: {
    eventCount: {
      deps: ['events'],
      fn: function() {
        return this.events.length;
      }
    }
  }
});

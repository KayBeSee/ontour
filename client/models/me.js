var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  url: '/authenticate',
  props: {
    _id: ['string'],
    name: ['string'],
    email: ['string'],
    picture: ['string'],
    fbId: ['string'],
    fbUrl: ['string'],
    fb_access_token: ['string'],
    events: ['array']
  }
});

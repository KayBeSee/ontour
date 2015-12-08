var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  idAttribute: 'name',
  props: {
    _id: 'string',
    name: ['string'],
    website: ['string'],
    facebook: ['string'],
    twitter: ['string'],
    location: ['string'],
    bio: ['string'],
    picture: ['string']
  }
});

var AmpersandModel = require('ampersand-model');
var VenuesCollection = require('./venues');
var EventsCollection = require('./events');


module.exports = AmpersandModel.extend({
  idAttribute: 'name',
  props: {
    _id: 'string',
    name: 'string',
    state: 'string',
    picture: 'string'
  },
  collections: {
    events: EventsCollection,
    venues: VenuesCollection
  }
});

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
    // eventIds: ['array']
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
  },
  addEvent: function(model) {
    this.events.push(model);
    this.eventIds.push(model._id);
  },
  removeEvent: function(model){
    var modelPos = this.events.indexOf(model);
    this.events.splice(modelPos, 1);
    var idPos = this.eventIds.indexOf(model._id);
    this.eventIds.splice(idPos, 1);
  }
});

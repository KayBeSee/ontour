var Collection = require('ampersand-rest-collection');
var Event = require('./event');

module.exports = Collection.extend({
  model: Event,
  url: '/api/events',
});

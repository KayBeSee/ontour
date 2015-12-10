var Collection = require('ampersand-rest-collection');
var Venue = require('./venue');


module.exports = Collection.extend({
    model: Venue,
    url: '/api/venues'
});

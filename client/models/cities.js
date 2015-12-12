var Collection = require('ampersand-rest-collection');
var City = require('./venue');


module.exports = Collection.extend({
    model: City,
    url: '/api/cities'
});

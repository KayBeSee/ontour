var Collection = require('ampersand-rest-collection');
var Artist = require('./artist');


module.exports = Collection.extend({
    model: Artist,
    url: '/api/artists'
});

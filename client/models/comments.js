var Collection = require('ampersand-rest-collection');
var Comment = require('./comment');

module.exports = Collection.extend({
  model: Comment,
  url: '/api/comments',
  comparator: 'datetime'
});

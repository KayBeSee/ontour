var AmpersandModel = require('ampersand-model');
var moment = require('moment');


module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: 'string',
    datetime: 'string',
    message: 'string',
    score: 'number',
    author: {
      _id: 'string',
      name: 'string',
      picture: 'string',
    }
  },
  derived: {
    readableDate: {
      deps: ['datetime'],
      fn: function () {
        var date = new Date(this.datetime);
        return moment(date).format('LLLL');
      }
    },
    sortableDate: {
      deps: ['datetime'],
      fn: function() {
        var date = new Date(this.datetime);
        return date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear();
      }
    }
  }
});

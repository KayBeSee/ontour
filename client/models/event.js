var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  idAttribute: '_id',
  props: {
    _id: 'string',
    id: 'number',
    url: 'string',
    datetime: 'string',
    ticket_url: 'string',
    artists: [{
      name: 'string',
      url: 'string',
      mbid: 'string'
    }],
    venue: {
      id: 'number',
      url: 'string',
      name: 'string',
      city: 'string',
      region: 'string',
      country: 'string',
      latitude: 'number',
      longitude: 'number'
    },
    ticket_status: 'string',
    on_sale_datetime: 'string'
    },
  derived: {
    artistName: {
      deps: ['artists'],
      fn: function () {
        return this.artists[0].name;
      }
    },
    readableDate: {
      deps: ['datetime'],
      fn: function () {
        var date = new Date(this.datetime);
        return date.toDateString();
      }
    },
  }
});

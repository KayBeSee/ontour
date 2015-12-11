var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
  idAttribute: 'name',
  props: {
    _id: 'string',
    name: 'string',
    address: 'string',
    city: 'string',
    state: 'string',
    zipcode: 'string',
    phone: 'string',
    picture: 'string'
  }
});

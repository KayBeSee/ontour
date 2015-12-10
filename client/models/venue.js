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
  },
  derived: {
    formattedPhone: {
      deps: ['phone'],
      fn: function() {
        return this.phone.replace((/(\d\d\d)(\d\d\d)(\d\d\d\d)/, '$1-$2-$3'));
      }
    }
  }
});

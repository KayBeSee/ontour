var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
      return [
        new InputView({
          label: 'Name',
          name: 'name',
          value: this.model && this.model.name,
          required: false,
          placeholder: 'Name',
          parent: this
        }),
        new InputView({
          label: 'Address',
          name: 'address',
          value: this.model && this.model.address,
          required: false,
          placeholder: 'Address',
          parent: this
        }),
        new InputView({
          label: 'City',
          name: 'city',
          value: this.model && this.model.city,
          required: false,
          placeholder: 'City',
          parent: this
        }),
        new InputView({
          label: 'State',
          name: 'state',
          value: this.model && this.model.state,
          required: false,
          placeholder: 'State',
          parent: this
        }),
        new InputView({
          label: 'Zipcode',
          name: 'zipcode',
          value: this.model && this.model.zipcode,
          required: false,
          placeholder: 'Zipcode',
          parent: this
        }),
        new InputView({
          label: 'Phone',
          name: 'phone',
          value: this.model && this.model.phone,
          required: false,
          placeholder: 'Phone',
          parent: this
        }),
        new InputView({
          label: 'Picture',
          name: 'picture',
          value: this.model && this.model.picture,
          required: false,
          placeholder: 'Picture',
          parent: this
        })
      ];
    }
});
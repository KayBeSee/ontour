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
          label: 'State',
          name: 'state',
          value: this.model && this.model.state,
          required: false,
          placeholder: 'State',
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
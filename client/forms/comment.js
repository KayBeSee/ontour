var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var Moment = require('moment');

module.exports = FormView.extend({
  fields: function () {
    return [
      new InputView({
          label: 'Message',
          name: 'message',
          value: this.model.message || '',
          required: true,
          placeholder: 'Enter Comment',
          parent: this
      })
    ];
  }
});
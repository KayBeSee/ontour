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
          label: 'Website',
          name: 'website',
          value: this.model && this.model.website,
          required: false,
          placeholder: 'Website',
          parent: this
        }),
        new InputView({
          label: 'Facebook',
          name: 'facebook',
          value: this.model && this.model.facebook,
          required: false,
          placeholder: 'Facebook',
          parent: this
        }),
        new InputView({
          label: 'Twitter',
          name: 'twitter',
          value: this.model && this.model.twitter,
          required: false,
          placeholder: 'Twitter',
          parent: this
        }),
        new InputView({
          label: 'Location',
          name: 'location',
          value: this.model && this.model.location,
          required: false,
          placeholder: 'Location',
          parent: this
        }),
        new InputView({
          label: 'Bio',
          name: 'bio',
          value: this.model && this.model.bio,
          required: false,
          placeholder: 'Bio',
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
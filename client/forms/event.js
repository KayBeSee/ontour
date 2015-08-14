var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
// var CheckboxView = require('ampersand-checkbox-view');
// var SelectView = require('ampersand-select-view');

var ExtendedInput = InputView.extend({
  template: require('../templates/partials/form-input.hbs')
});

module.exports = FormView.extend({
  fields: function () {
    return [
      new ExtendedInput({
        label: 'Event URL',
        name: 'url',
        value: this.model && this.model.url,
        placeholder: 'Event URL',
        required: true,
        parent: this,
      }),
      new ExtendedInput({
        label: 'DateTime',
        name: 'datetime',
        value: this.model && this.model.datetime,
        placeholder: 'Event Datetime',
        required: true,
        parent: this
      }),
      new ExtendedInput({
        label: 'Tickets URL',
        name: 'tickets_url',
        value: this.model && this.model.ticket_url,
        placeholder: 'Ticket Url',
        required: true,
        parent: this
      }),
      new ExtendedInput({
        label: 'Venue Name',
        name: 'venue_name',
        value: this.model && this.model.venue.name,
        placeholder: 'Venue Name',
        required: true,
        parent: this
      }),
      new ExtendedInput({
        label: 'Venue Url',
        name: 'venue_url',
        value: this.model && this.model.venue.url,
        placeholder: 'Venue Url',
        required: true,
        parent: this
      }),
      new ExtendedInput({
        label: 'Venue City',
        name: 'venue_city',
        value: this.model && this.model.venue.city,
        placeholder: 'Venue City',
        required: true,
        parent: this
      }),
      new CheckboxView({
        label: 'Venue Region',
        name: 'venue_region',
        value: this.model && this.model.venue.region,
        placeholder: 'Venue Region',
        required: false,
        parent: this
      }),
      new ExtendedInput({
        label: 'Venue Country',
        name: 'venue_country',
        value: this.model && this.model.venue.country,
        placeholder: 'Venue Country',
        required: false,
        parent: this
      }),
      new ExtendedInput({
        label: 'Ticket Status',
        name: 'ticket_status',
        value: this.model && this.model.ticket_status,
        placeholder: 'Ticket Status',
        required: false,
        parent: this
      }),
      new ExtendedInput({
        label: 'On Sale Datetime',
        name: 'on_sale_datetime',
        value: this.model && this.model.on_sale_datetime,
        placeholder: 'On Sale Datetime',
        required: true,
        parent: this
      })
    ];
  }
});

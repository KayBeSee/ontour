var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Id',
                name: 'id',
                value: this.model._id || '',
                required: false,
                placeholder: 'Id',
                parent: this
            }),
            new InputView({
                label: 'BandsInTown ID',
                name: 'bitId',
                value: this.model.bitId || '',
                required: false,
                placeholder: 'BandsInTown ID',
                parent: this
            }),
            new InputView({
                label: 'Title',
                name: 'title',
                value: this.model.title || '',
                required: false,
                placeholder: 'Title',
                parent: this
            }),
            new InputView({
                label: 'Datetime',
                name: 'datetime',
                value: this.model.datetime || '',
                required: false,
                placeholder: 'Datetime',
                parent: this
            }),
            new InputView({
                label: 'Ticket Url',
                name: 'ticket_url',
                value: this.model.ticket_url || '',
                required: false,
                placeholder: 'Ticket Url',
                parent: this
            }),
            new InputView({
                label: 'Ticket Type',
                name: 'ticket_type',
                value: this.model.ticket_type || '',
                required: false,
                placeholder: 'Ticket Type',
                parent: this
            }),
            new InputView({
                label: 'Ticket Status',
                name: 'ticket_status',
                value: this.model.ticket_status || '',
                required: false,
                placeholder: 'Ticket Status',
                parent: this
            }),
            new InputView({
                label: 'Venue ID',
                name: 'venueId',
                value: this.model.venue.id || '',
                required: false,
                placeholder: 'Venue ID',
                parent: this
            }),
            new InputView({
                label: 'Venue Url',
                name: 'venueUrl',
                value: this.model.venue.url || '',
                required: false,
                placeholder: 'Venue Url',
                parent: this
            }),
            new InputView({
                label: 'Venue Name',
                name: 'venueName',
                value: this.model.venue.name || '',
                required: false,
                placeholder: 'Venue Name',
                parent: this
            }),
            new InputView({
                label: 'Venue City',
                name: 'venueCity',
                value: this.model.venue.city || '',
                required: false,
                placeholder: 'Venue City',
                parent: this
            }),
            new InputView({
                label: 'Venue Region',
                name: 'venueRegion',
                value: this.model.venue.region || '',
                required: false,
                placeholder: 'Venue Region',
                parent: this
            }),
            new InputView({
                label: 'Venue Country',
                name: 'venueCountry',
                value: this.model.venue.country || '',
                required: false,
                placeholder: 'Venue Country',
                parent: this
            }),
            new InputView({
                label: 'Venue Latitude',
                name: 'venueLatitude',
                value: this.model.venue.latitude || '',
                required: false,
                placeholder: 'Venue Latitude',
                parent: this
            }),
            new InputView({
                label: 'Venue Longitude',
                name: 'venueLongitude',
                value: this.model.venue.longitude || '',
                required: false,
                placeholder: 'Venue Longitude',
                parent: this
            }),
            new InputView({
                label: 'Artist Name',
                name: 'artistName',
                value: this.model.artists[0].name || '',
                required: false,
                placeholder: 'Artist Name',
                parent: this
            }),
            new InputView({
                label: 'Artist Url',
                name: 'artistUrl',
                value: this.model.artists[0].website || '',
                required: false,
                placeholder: 'Artist Url',
                parent: this
            }),
            new InputView({
                label: 'Artist Image',
                name: 'artistImage',
                value: this.model.artists[0].image_url || '',
                required: false,
                placeholder: 'Artist Image URL',
                parent: this
            }),
            new InputView({
                label: 'facebook_page_url',
                name: 'facebook_page_url',
                value: this.model.artists[0].facebook_page_url || '',
                required: false,
                placeholder: 'Facebook Page Url',
                parent: this
            })
        ];
    }
});
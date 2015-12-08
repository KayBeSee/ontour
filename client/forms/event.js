var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var ArrayInput = require('ampersand-array-input-view');


module.exports = FormView.extend({
    fields: function () {
        return [
            new InputView({
                label: 'Title',
                name: 'title',
                value: this.model && this.model.title,
                required: false,
                placeholder: 'Title',
                parent: this
            }),
            new InputView({
                label: 'Date',
                name: 'datetime',
                value: this.model.datetime,
                required: false,
                placeholder: 'Date',
                parent: this,
                template: ['<label>',
                              '<span data-hook="label"></span>',
                              '<input class="form-input" id="date">',
                              '<div data-hook="message-container" class="message message-below message-error">',
                                  '<p data-hook="message-text"></p>',
                              '</div>',
                          '</label>'
                      ].join('')
            }),
            new InputView({
                label: 'Ticket Url',
                name: 'ticket_url',
                value: this.model && this.model.ticket_url,
                required: false,
                placeholder: 'Ticket Url',
                parent: this
            }),
            new InputView({
                label: 'Picture',
                name: 'picture',
                value: this.model && this.model.picture,
                required: false,
                placeholder: 'Picture',
                parent: this
            }),
            new InputView({
                label: 'Venue',
                name: 'venue',
                value: this.model && this.model.venue,
                required: false,
                placeholder: 'Venue Name',
                parent: this
            }),
            new InputView({
                label: 'City',
                name: 'city',
                value: this.model && this.model.city,
                required: false,
                placeholder: 'Venue City',
                parent: this
            }),
            new InputView({
                label: 'State',
                name: 'state',
                value: this.model && this.model.state,
                required: false,
                placeholder: 'Venue State',
                parent: this
            }),
            new ArrayInput({
                label: 'Artists',
                name: 'artists',
                value: this.model && this.model.artists || [],
                required: false,
                placeholder: 'Artists',
                parent: this
            })
        ];
    }
});
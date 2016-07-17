var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var ArrayInput = require('ampersand-array-input-view');
var AutoCompleteView = require('../../autocomplete_view.js');
var ArrayAutoCompleteView = require('../../array_autocomplete_view.js');
var VenuesCollection = require('../models/venues');
var ArtistsCollection = require('../models/artists');


module.exports = FormView.extend({
    submitCallback: function(obj) {
        console.log('submitCallback', obj);
        this.model.type = "Event";
        this.model.name = obj.name;
        this.model.datetime = obj.datetime;
        this.model.ticket_url = obj.ticket_url;
        this.model.picture = obj.picture;
        this.model.artists = obj.artists;
        this.model.venue = obj.venue;
        this.parent.collection.add(this.model);
        this.parent.collection.save(this.model);
    },
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
            new AutoCompleteView({
                label: 'Venue',
                name: 'venue',
                collection: new VenuesCollection(),
                queryKey: 'name',
                idAttribute: '_id',
                textAttribute: '_id',
                placeholder: 'Type Venue Name',
                minKeywordLength: 3,
                maxResults: 10,
                value: this.model && this.model.venue,
                type: 'text',
                parent: this
            }),
            new ArrayAutoCompleteView({
                label: 'Artists',
                name: 'artists',
                collection: new ArtistsCollection(),
                queryKey: 'name',
                idAttribute: '_id',
                textAttribute: '_id',
                placeholder: 'Type Artist Name',
                minKeywordLength: 3,
                maxResults: 10,
                value: this.model && this.model.artists || [],
                type: 'text',
                parent: this
            }),
            // new ArrayInput({
            //     label: 'Artists',
            //     name: 'artists',
            //     value: this.model && this.model.artists || [],
            //     required: false,
            //     placeholder: 'Artists',
            //     parent: this
            // })
        ];
    }
});
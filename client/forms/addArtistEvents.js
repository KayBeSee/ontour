var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var AmpersandCollection = require('ampersand-rest-collection');

module.exports = FormView.extend({
  submitCallback: function(obj){
    this.parent.collection.url = '/api/add/events/artist/' + obj.artistName;
    this.parent.collection.fetch({
      success: function(collection, response, options){
        this.parent.collection.reset(collection.models);
      }.bind(this),
      error: function(err) {
        console.log('shit', err);
      }
    });
  },
  fields: function () {
    return [
      new InputView({
          label: 'Artist Name',
          name: 'artistName',
          value: this.model.artistName || '',
          required: true,
          placeholder: 'Enter Artist Name',
          parent: this
      })
    ];
  }
});
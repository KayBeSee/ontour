var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var AmpersandModel = require('ampersand-model');

module.exports = FormView.extend({
  submitCallback: function(obj){
    console.log('obj', obj);
    this.model.url = '/api/add/events/artist/' + obj.artistName;
    this.model.save({
      success: function(){
        app.navigate('/events');
      },
      error: function() {

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
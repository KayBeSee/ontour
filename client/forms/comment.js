var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var Moment = require('moment');
var CommentModel = require('../models/comment');


module.exports = FormView.extend({
  submitCallback: function(obj){
    this.parent.collection.url = '/api/comments'
    console.log('this.parent.model.getType)()', this.parent.model.getType());
    this.model = new CommentModel();
    this.model.datetime =  Moment().format('MMM D, YYYY');
    this.model.message = obj.message;
    this.model.parentId = this.parent.model._id;
    this.model.parentName = this.parent.model.name;
    this.model.parentType = this.parent.model.type;
    this.model.score = 0;
    this.model.author = {};
    this.model.author._id = window.me._id;
    this.model.author.name = window.me.first_name + ' ' + window.me.last_name;
    this.model.author.picture = window.me.picture;
    this.parent.collection.add(this.model);
    this.parent.collection.create(this.model);
  },
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
/* global app, $, alert */
var PageView = require('./base');
var eventbindings = require('../bindings/_eventbindings');
var EventModel = require('../models/event');
var CommentsView = require('./partials/comments');
var Collection = require('ampersand-rest-collection');
var CommentModel = require('../models/comment');
var CommentForm = require('../forms/comment');


module.exports = PageView.extend({
  pageTitle: 'view event',
  template: require('../templates/pages/event.hbs'),
  bindings: eventbindings,
  events: {
    'click .attend': 'notAttend',
    'click .notAttend': 'attend',
  },

  subviews: {
    Comments: {
      container: '[data-hook=comments]',
      waitFor: this.model,
      prepareView: function(el) {
        return new CommentsView({
          el         : el,
          parent     : this,
          collection : this.collection
        });
      }
    },
    CommentForm: {
      container: '[data-hook=comment-form]',
      waitFor: this.model,
      prepareView: function (el) {
        return new CommentForm({
          el: el,
          model: new CommentModel(),
          parent: this,
          submitCallback: function(obj){
            this.parent.collection.url = '/api/comments'
            this.model = new CommentModel();
            this.model.datetime =  Date.now();
            this.model.message = obj.message;
            this.model.parent = {};
            this.model.parent.item = this.parent.model._id;
            this.model.parent.kind = 'Event';
            this.model.score = 0;
            this.model.author = window.me._id;
            this.parent.collection.add(this.model);
            this.parent.collection.create(this.model);
          }
        });
      }
    }
  },

  initialize: function (spec) {
    var self = this;
    self.collection = new Collection([], {model: CommentModel});
    self.model = new EventModel();
    app.events.getOrFetch(spec.id, function (err, eventModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = eventModel;
      self.collection.url = '/api/comments/parent/' + spec.id;
      self.collection.fetch();
    });
  },

  attend: function() {
    window.me.addEvent(this.model);
    window.me.save(window.me);
    this.render();
  },

  notAttend: function() {
    window.me.removeEvent(this.model);
    window.me.save(window.me);
    this.render();
  }

});

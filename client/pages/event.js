/* global app, $, alert */
var PageView = require('./base');
var eventbindings = require('../bindings/_eventbindings');
var EventModel = require('../models/event');
var CommentsView = require('./partials/comments');
var Collection = require('ampersand-collection');
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
          parent: this
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
      self.collection.add(eventModel.comments);
    });
  },

  render: function() {
    this.renderWithTemplate();
    return this;
  },

  attend: function() {
    window.me.addEvent(this.model);
    window.me.save();
  },

  notAttend: function() {
    window.me.removeEvent(this.model);
    window.me.save();
  }

});

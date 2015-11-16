/* global app, $, alert */
var PageView = require('./base');
var eventbindings = require('../bindings/_eventbindings');
var EventModel = require('../models/event');
var CommentsView = require('./partials/comments');
var Collection = require('ampersand-collection');
var CommentModel = require('../models/comment');


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
    }
  },

  initialize: function (spec) {
    var self = this;
    this.collection = new Collection([], {model: CommentModel});
    this.model = new EventModel();
    app.events.getOrFetch(spec.id, function (err, eventModel) {
      if (err) alert('couldn\'t find a model with id: ' + spec.id);
      self.model = eventModel;
      self.collection.add(eventModel.comments);
    });
    console.log(self, this, this.model, this.collection);
  },

  render: function() {
    this.renderWithTemplate();
    return this;
  },

  attend: function() {
    this.model.comments.push({
      _id: '1234',
      datetime: 'date mon',
      message: 'Mr. Palmer is concerned',
      score: 0,
      author: {
        _id: window.me._id,
        name: window.me.first_name,
        photo: window.me.picture
      }
    });
    this.model.save(this.model);
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

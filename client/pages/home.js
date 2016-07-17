var PageView = require('./base');
var PostView = require('./partials/post');
var CommentForm = require('../forms/comment');
var PostModel = require('../models/post');
var Collection = require('ampersand-rest-collection');

module.exports = PageView.extend({
  pageTitle: 'home',
  template: require('../templates/pages/home.hbs'),
  subviews: {
    // Comments: {
    //   container: '[data-hook=post-list]',
    //   waitFor: this.model,
    //   prepareView: function(el) {
    //     return new PostsView({
    //       el         : el,
    //       parent     : this,
    //       collection : this.collection
    //     });
    //   }
    // },


    CommentForm: {
      container: '[data-hook=post-form]',
      waitFor: this.model,
      prepareView: function (el) {
        return new CommentForm({
          el: el,
          model: new PostModel(),
          parent: this,
          submitCallback: function(obj){
            this.model.datetime =  Date.now();
            this.model.message = obj.message;
            this.model.score = 0;
            this.model.author = window.me._id;
            this.parent.collection.add(this.model);
            this.parent.collection.create(this.model);
          }
        });
      }
    }
  },
  initialize: function () {
    this.collection.fetch({
      success: function () {
      }.bind(this)
    });
  },
  render: function() {
    this.renderWithTemplate();
    this.renderCollection(
      this.collection,
      PostView,
      this.queryByHook('post-list'),
      { parent: this }
    );
    return this;
  }
});

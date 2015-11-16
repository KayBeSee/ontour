var PageView   = require('../base');           // grab base page view
var CommentView = require('./comment');  // grab user view

module.exports = PageView.extend({
  template: require('../../templates/partials/comments.hbs'),

  initialize: function () {
    this.render();
  },

  render: function () {
    this.renderWithTemplate();
    this.renderCollection(
      this.collection,
      CommentView,
      this.queryByHook('comment-list'),
      { parent: this }
    );
    return this;
  }
});

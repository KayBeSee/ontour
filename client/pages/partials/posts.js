var PageView   = require('../base');           // grab base page view
var PostView = require('./post');  // grab user view

module.exports = PageView.extend({
  template: require('../../templates/partials/posts.hbs'),

  initialize: function () {
    this.render();
  },

  render: function () {
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

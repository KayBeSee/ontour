var View = require('ampersand-view');
var commentBindings = require('../../bindings/_commentbindings');

module.exports = View.extend({
  template: require('../../templates/partials/post.hbs'),
  bindings: commentBindings,
  events: {
    'click [data-hook=upvote]': 'upVote',
    'click [data-hook=downvote]': 'downVote',
  },
  initialize: function (options) {
    var self = this;
  },
  render: function() {
    this.renderWithTemplate();
    return this;
  },
  upVote: function() {
    self.model.score += 1;
    self.model.save(self.model);
  },

  downVote: function() {
    self.model.score -= 1;
    self.model.save(self.model);
  },
});

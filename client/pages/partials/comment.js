var View = require('ampersand-view');
var commentBindings = require('../../bindings/_commentbindings');

module.exports = View.extend({
  template: require('../../templates/partials/comment.hbs'),
  bindings: commentBindings,
  events: {
    'click [data-hook=upvote]': 'upVote',
    'click [data-hook=downvote]': 'downVote',
  },
  initialize: function (options) {
    console.log(options.model);
    var self = this;
    self.model = options.model;
  },
  render: function() {
    this.renderWithTemplate();
    return this;
  },
  upVote: function() {
    self.model.score += 1;
    self.model.save(self.model);
    console.log('this', this);
    console.log('this.parent', this.parent);
    console.log('this.parent.parent.model', this.parent.parent.model);
  },

  downVote: function() {
    self.model.score -= 1;
    self.model.save(self.model);
  },
});

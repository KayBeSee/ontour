var View = require('ampersand-view');
var commentBindings = require('../../bindings/_commentbindings');

module.exports = View.extend({
  template: require('../../templates/partials/comment.hbs'),
  bindings: commentBindings,
  events: {
    'click .upVote': 'downVote',
    'click .downVote': 'upVote',
  },
  initialize: function (options) {
    console.log('comments options: ', options);
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
  },

  downVote: function() {
    self.model.score -= 1;
    self.model.save(self.model);
  },
});

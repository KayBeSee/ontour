module.exports = {
  'model._id': {
    hook: '_id'
  },
  'model.datetime': {
    hook: 'datetime'
  },
  'model.message': {
    hook: 'message'
  },
  'model.score': {
    hook: 'score'
  },
  'model.author.first_name': {
    hook: 'author-first-name'
  },
  'model.author.last_name': {
    hook: 'author-last-name'
  },
  'model.author.photo': {
    hook: 'author-photo'
  },
  'model.author.viewUrl': {
    hook: 'author-view-url'
  },
  'model.parent.item.name': {
    hook: 'event-name'
  }
};
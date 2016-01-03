  module.exports = {
    'model._id': {
      hook: '_id'
    },
    'model.bitId': {
      hook: 'bitId'
    },
    'model.url': {
      hook: 'url'
    },
    'model.title':{
      hook: 'title'
    },
    'model.datetime': {
      hook: 'datetime'
    },
    'model.readableDate': {
      hook: 'readableDate'
    },
    'model.ticket_url': {
      hook: 'ticket_url',
      type: 'attribute',
      name: 'href'
    },
    'model.artists': {
      hook: 'artists',
      type: 'text'
    },
    'model.venue': {
      hook: 'venue'
    },
    'model.city': {
      hook: 'city'
    },
    'model.state': {
      hook: 'state'
    },
    'model.picture': {
      hook: 'picture',
      name: 'src',
      type: 'attribute'
    },
    'model.comments': {
      hook: 'comments'
    },
    'model.editUrl': {
      hook: 'editUrl',
      type: 'attribute',
      name: 'href'
    }
  };
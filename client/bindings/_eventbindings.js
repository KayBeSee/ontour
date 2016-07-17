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
    'model.artists.names': {
      hook: 'artists',
      type: 'text'
    },
    'model.venue.name': {
      hook: 'venue-name',
      type: 'text',
    },
    'model.venue.url': {
      hook: 'venue-name',
      type: 'attribute',
      name: 'href'
    },
    'model.venue.city': {
      hook: 'venue-city'
    },
    'model.venue.state': {
      hook: 'venue-state'
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
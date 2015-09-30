module.exports = {
  localUrl:                 process.env.localUrl || 'localhost:3000',
  mongoUrl:                 process.env.mongoUrl || 'mongodb://localhost:27017/ontour',
  facebook_api_key:         '692945770843019',
  facebook_api_secret:      'b217798f8c49810c6b86cf4395d7b0d0',
  fb_callback_url:          'http://localhost:3000/login/facebook/callback',

  redis: {
    host: 'localhost',
    port: 6379,
    auth: null,
    key: 'ontour.sid',
    secret: 'secret',
    cookie: null,
  },

};



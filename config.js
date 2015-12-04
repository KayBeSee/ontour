module.exports = {
  mongoUrl:                 process.env.MONGO_URL || 'mongodb://localhost:27017/ontour',
  mongoUser:                process.env.mongoUser,
  mongoPass:                process.env.mongoPass,
  facebook_api_key:         '692945770843019',
  facebook_api_secret:      'b217798f8c49810c6b86cf4395d7b0d0',
  fb_callback_url:          '/login/facebook/callback',

  redis: {
    host: process.env.redisHost || 'localhost',
    port: process.env.redisPort || 6379,
    auth: process.env.redisAuth || 'null',
    key: process.env.redisKey || 'ontour.sid',
    secret: process.env.redisSecret || 'icculus',
    cookie: null,
  },

};



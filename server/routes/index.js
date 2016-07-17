module.exports = function(app) {
  require('./events')(app);
  require('./venues')(app);
  require('./artists')(app);
  require('./comments')(app);
  require('./users')(app);
  require('./cities')(app);
  require('./posts')(app);
}
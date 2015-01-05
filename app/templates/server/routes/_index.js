var index = require('./index.server.routes')

module.exports = function(app) {
  app.use('/', index)
}
var posts = require('./post.server.routes')
var index = require('./index.server.routes')

module.exports = function(app) {
  app.use('/', index)
  app.use('/api', posts)
}
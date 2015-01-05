var express = require('express'),
  morgan = require('morgan')

module.exports = function() {

  var app = express()

  // express config
  app.set('views', './server/views/templates')
  app.set('view engine', 'jade')
  app.set('port', process.env.PORT || 3000)
  app.set('x-powered-by', false)

  // where your static files are located
  app.use(express.static('./client'))
  app.use(express.static('./client/assets'))

  // logs to the console
  if (app.get('env') === 'development') {
    app.use(require('connect-livereload')({
      port: 35729
    }))
    app.use(morgan('dev'))
  }

  // REQUIRE ALL YOUR MAIN ROUTES HERE
  require('../routes')(app)

  // ERROR ROUTES HERE
  require('../routes/error')(app)

  return app
}
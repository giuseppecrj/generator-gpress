var express = require('express'),
  config = require('./config'),
  bodyParser = require('body-parser'),
  morgan = require('morgan'),
  session = require('express-session'),
  methodOverride = require('method-override')

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

  // bodyParser (make form posts possible)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded())

  // makes put and delete requests available for all browsers
  app.use(methodOverride('X-HTTP-Method-Override'))

  // remembers sessions through the use of cookes
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }))

  // REQUIRE ALL YOUR MAIN ROUTES HERE
  require('../routes')(app)

  // ERROR ROUTES HERE
  require('../routes/error')(app)

  return app
}
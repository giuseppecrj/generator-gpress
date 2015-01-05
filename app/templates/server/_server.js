process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('./config/express'),
  app = express()

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'))
})
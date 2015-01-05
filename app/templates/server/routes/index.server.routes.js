var express = require('express'),
  app = express.Router()

var ctrl = require('../controllers/index.server.controller')

app.get('/', ctrl.index)

app.get('/api', ctrl.api)

module.exports = app
var express = require('express'),
  app = express.Router()

var ctrl = require('../controllers/index.server.controller')

app.get('/', ctrl.renderIndex)

module.exports = app
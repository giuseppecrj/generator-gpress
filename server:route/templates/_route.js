var express = require('express'),
  app = express.Router()

var ctrl = require('../controllers/<%= routeLower %>.server.controller')

app.get('/', ctrl.render)

module.exports = app
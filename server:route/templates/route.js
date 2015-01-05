var express = require('express'),
  app = express.Router()

var ctrl = require('../controllers/<%= routeLower %>.server.controller')

app.route('/<%= routeLower %>s')
  .get(ctrl.list)
  .post(ctrl.create)

app.param('<%= routeLower %>Id', ctrl.find)

app.route('/<%= routeLower %>s/:<%= routeLower %>Id')
  .get(ctrl.read)
  .put(ctrl.update)
  .delete(ctrl.delete)

module.exports = app
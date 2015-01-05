var express = require('express'),
  app = express.Router()

var ctrl = require('../controllers/post.server.controller')

app.route('/posts')
  .get(ctrl.list)
  .post(ctrl.create)

app.param('postId', ctrl.find)

app.route('/posts/:postId')
  .get(ctrl.read)
  .put(ctrl.update)
  .delete(ctrl.delete)

module.exports = app
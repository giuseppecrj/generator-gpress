var Post = require('mongoose').model('Post'),
  ok = require('okay')

exports.list = function(req, res, next) {
  Post
    .find()
    .exec(ok(next, function(posts) {
      if (posts.length === 0) {
        res.json('No posts have been created')
      } else {
        res.json(posts)
      }
    }))
}

exports.create = function(req, res, next) {
  var post = new Post()
  post.set(req.body)
  post.save(ok(next, function(post) {
    res.json(post)
  }))
}

exports.find = function(req, res, next, id) {
  Post
    .findById(id)
    .exec(ok(next, function(post) {
      req.post = post
      next()
    }))
}

exports.read = function(req, res) {
  res.json(req.post)
}

exports.update = function(req, res, next) {
  Post
    .findById(req.post.id)
    .exec(ok(next, function(post) {
      post.set(req.body)
      post.save(ok(next, function(post) {
        res.json(post)
      }))
    }))
}

exports.delete = function(req, res, next) {
  Post
    .findById(req.post.id)
    .exec(ok(next, function(post) {
      post.remove(ok(next, function(post) {
        res.json(post)
      }))
    }))
}
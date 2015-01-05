var <%= modelNameUpper %> = require('mongoose').model('<%= modelNameUpper %>'),
  ok = require('okay')

exports.list = function(req, res, next) {
  <%= modelNameUpper %>
    .find()
    .exec(ok(next, function(<%= modelNameLower %>) {
      if (<%= modelNameLower %>.length === 0) {
        res.json('No <%= modelNameLower %>s have been created')
      } else {
        res.json(<%= modelNameLower %>)
      }
    }))
}

exports.create = function(req, res, next) {
  var <%= modelNameLower %> = new <%= modelNameUpper %>()
  <%= modelNameLower %>.set(req.body)
  <%= modelNameLower %>.save(ok(next, function(<%= modelNameLower %>) {
    res.json(<%= modelNameLower %>)
  }))
}

exports.find = function(req, res, next, id) {
  <%= modelNameUpper %>
    .findById(id)
    .exec(ok(next, function(<%= modelNameLower %>) {
      req.<%= modelNameLower %> = <%= modelNameLower %>
      next()
    }))
}

exports.read = function(req, res) {
  res.json(req.<%= modelNameLower %>)
}

exports.update = function(req, res, next) {
  <%= modelNameUpper %>
    .findById(req.<%= modelNameLower %>.id)
    .exec(ok(next, function(<%= modelNameLower %>) {
      <%= modelNameLower %>.set(req.body)
      <%= modelNameLower %>.save(ok(next, function(<%= modelNameLower %>) {
        res.json(<%= modelNameLower %>)
      }))
    }))
}

exports.delete = function(req, res, next) {
  <%= modelNameUpper %>
    .findById(req.<%= modelNameLower %>.id)
    .exec(ok(next, function(<%= modelNameLower %>) {
      <%= modelNameLower %>.remove(ok(next, function(<%= modelNameLower %>) {
        res.json(<%= modelNameLower %>)
      }))
    }))
}
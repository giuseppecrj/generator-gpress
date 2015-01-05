exports.index = function(req, res) {
  res.render('index', {
    title: '<%= appname %>',
    description: '<%= desc %>'
  })
}

exports.api = function(req, res) {
  res.render('index', {
    title: 'API',
    description: 'This is your api page'
  })
}
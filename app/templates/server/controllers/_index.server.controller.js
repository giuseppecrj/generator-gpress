exports.renderIndex = function(req, res) {
  res.render('index', {
    title: '<%= appname %>',
    description: '<%= desc %>'
  })
}
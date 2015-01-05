var errorhandler = require('errorhandler')

module.exports = function(app) {

  app.use(function(req, res, next) {
    var err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  if (app.get('env') === 'development') {

    app.use(errorhandler())

  } else if (app.get('env') === 'production') {

    app.use(function(err, req, res, next) {
      res.status(err.status || 500)
      res.render('error', {
        message: err.message,
        status: err.status
      })
    })

  }



}
var config = require('./config'),
  mongoose = require('mongoose')

module.exports = function() {
  var db = mongoose.connect(config.db)
  mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to %s', config.db)
  })
  mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: %s', err)
  })
  mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected')
  })

  // CAPTURE APP TERMINATION / RESTART EVENTS
  // To be called when process is restarted or terminated
  gracefulShutdown = function(msg, callback) {
      mongoose.connection.close(function() {
        console.log('Mongoose disconnected through %s', msg)
        callback()
      })
    }
    // For nodemon restarts
  process.once('SIGUSR2', function() {
      gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2')
      })
    })
    // For app termination
  process.on('SIGINT', function() {
      gracefulShutdown('app termination', function() {
        process.exit(0)
      })
    })
    // For Heroku app termination
  process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
      process.exit(0)
    })
  })

  // REQUIRE ALL YOUR MODELS HERE
  require('../models/post.server.model')

  return db
}
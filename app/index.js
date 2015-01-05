'use strict'
var yeoman = require('yeoman-generator')
var chalk = require('chalk')
var yosay = require('yosay')

module.exports = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.Base.apply(this, arguments)

    this.option('skip-message', {
      type: String,
      required: false,
      desc: 'Skips the intro yeoman message'
    })
    this.option('skip-install', {
      type: String,
      required: false,
      desc: 'Skips installing dependencies'
    })

    this.makeSecret = function() {
      var text = ""
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      for (var i = 0; i < 10; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  },
  initializing: function() {
    this.pkg = require('../package.json')
  },
  prompting: function() {
    var done = this.async()

    if (!this.options['skip-message']) {
      this.log(yosay(chalk.bold.yellow('Welcome to the marvelous ' + chalk.bold.red('G-PRESS') + ' generator')))
      this.log('Let\'s start with a couple of question to get you set up. \n')
    }

    this.prompts = [{
      type: 'input',
      name: 'name',
      message: 'What\'s your project\'s name?',
      'default': this.appname
    }, {
      type: 'input',
      name: 'desc',
      message: 'What\'s your project\'s description?',
      'default': 'This is my projects website'
    }, {
      type: 'confirm',
      name: 'api',
      message: 'Will you be needing an api?',
      'default': false,
      store: true
    }]

    this.prompt(this.prompts, function(answers) {
      this.appname = answers.name
      this.desc = answers.desc
      this.api = answers.api
      done()
    }.bind(this))
  },
  configuring: function() {

    if (this.api) {
      this.copy('package.json')
      this.copy('gruntfile.js')
    } else {
      this.copy('_gruntfile.js', 'gruntfile.js')
      this.copy('_package.json', 'package.json')
      this.copy('_bower.json', 'bower.json')
    }

  },
  writing: {
    folders: function() {
      // client
      this.mkdir('client/assets/images')
      this.mkdir('client/assets/javascripts')
      this.mkdir('client/assets/stylesheets')

      // server
      if (this.api) {
        this.mkdir('server/config/env')
        this.mkdir('server/models')
      }

      this.mkdir('server/controllers')
      this.mkdir('server/routes')
      this.mkdir('server/views/layouts')
      this.mkdir('server/views/templates')
      this.mkdir('data')
    },
    files: function() {
      // client
      this.copy('client/assets/images/favicon.png')
      this.copy('client/assets/javascripts/script.js')
      this.copy('client/assets/stylesheets/style.css')

      //views
      this.copy('server/views/layouts/main.jade')
      this.copy('server/views/templates/error.jade')
      this.copy('server/views/templates/index.jade')
      this.copy('server/routes/error.js')

      if (this.api) {

        this.copy('server/config/mongoose.js')
        this.copy('server/config/config.js')
        this.copy('server/config/express.js')
        this.copy('server/config/env/development.js')
        this.copy('server/config/env/production.js')
        this.copy('server/controllers/index.server.controller.js')
        this.copy('server/controllers/post.server.controller.js')
        this.copy('server/models/post.server.model.js')
        this.copy('server/routes/index.js')
        this.copy('server/routes/index.server.routes.js')
        this.copy('server/routes/post.server.routes.js')
        this.copy('server/server.js')

      } else {

        // config
        this.copy('server/config/_express.js', 'server/config/express.js')

        // controllers
        this.copy('server/controllers/_index.server.controller.js', 'server/controllers/index.server.controller.js')

        // routes
        this.copy('server/routes/_index.js', 'server/routes/index.js')
        this.copy('server/routes/_index.server.routes.js', 'server/routes/index.server.routes.js')

        this.copy('server/_server.js', 'server/server.js')

      }
    }
  },
  installing: function() {
    this.installDependencies({
      bower: true,
      npm: true,
      skipInstall: !this.options['skip-install'],
      // skipInstall: this.options['skip-install'],
    })
  }
})
'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.NamedBase.extend({
  initializing: function() {
    this.log(this.name)
  },
  prompting: function() {
    var done = this.async()
    this.prompts = [{
      type: 'input',
      name: 'routeName',
      message: 'What is your routes name?',
      'default': this.name
    }, {
      type: 'confirm',
      name: 'api',
      message: 'Is this for an api?',
      'default': true
    }]

    this.prompt(this.prompts, function(answers) {
      this.route = answers.routeName
      this.routeLower = answers.routeName.toLowerCase()

      if (answers.api) {
        this.api = answers.api
      }
      done()
    }.bind(this))
  },
  writing: function() {
    if (this.api) {
      this.copy('route.js', './server/routes/' + this.routeLower + '.server.routes.js')
    } else {
      this.copy('_route.js', './server/routes/' + this.routeLower + '.server.routes.js')
    }
  }
})
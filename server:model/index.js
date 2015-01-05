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
      name: 'modelName',
      message: 'What is your model\'s name?',
      'default': this.name
    }]

    this.prompt(this.prompts, function(answers) {
      this.model = answers.modelName
      this.modelNameUpper = this._.capitalize(answers.modelName.toLowerCase())
      this.modelNameLower = answers.modelName.toLowerCase()
      done()
    }.bind(this))
  },
  writing: function() {
    this.copy('model.js', './server/models/' + this.modelNameLower + '.server.model.js')
  }
})
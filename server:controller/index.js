'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.NamedBase.extend({
  prompting: function() {
    var done = this.async()

    this.prompts = [{
      type: 'confirm',
      name: 'api',
      message: 'Is this for your api?',
      'default': false
    }, {
      when: function(answers) {
        return answers && answers.api
      },
      type: 'confirm',
      name: 'model',
      message: 'Do you have a model already?',
      'default': false
    }, {
      when: function(answers) {
        return answers && answers.model
      },
      type: 'input',
      name: 'modelName',
      message: 'What name does your model have?',
      'default': this.name
    }]

    this.prompt(this.prompts, function(answers) {
      this.api = answers.api
      if (answers.model) {
        this.model = answers.model
        this.modelName = answers.modelName
        this.modelNameUpper = this._.capitalize(answers.modelName.toLowerCase())
        this.modelNameLower = answers.modelName.toLowerCase()
      }
      done()
    }.bind(this))
  },
  writing: function() {
    if (this.api && this.model) {

      this.copy('controller.js', './server/controllers/' + this.modelNameLower + '.server.controller.js')

    } else if (this.api && !this.model) {

      var done = this.async()
      this.invoke('gpress:server:model', {
        args: this.name
      }, function() {
        done()
      })

      this.modelNameUpper = this._.capitalize(this.name.toLowerCase())
      this.modelNameLower = this.name.toLowerCase()

      this.copy('controller.js', './server/controllers/' + this._.dasherize(this.name).toLowerCase() + '.server.controller.js')

    } else {
      this.copy('_controller.js', './server/controllers/' + this._.dasherize(this.name).toLowerCase() + '.server.controller.js')
    }
  }
})
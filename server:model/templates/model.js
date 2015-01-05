var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var <%= modelNameLower %>Schema = new Schema({
  title: {
    type: String
  },
  text: {
    type: String
  }
})

mongoose.model('<%= modelNameUpper %>', <%= modelNameLower %>Schema, '<%= modelNameLower %>s')
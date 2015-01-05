var mongoose = require('mongoose'),
  Schema = mongoose.Schema

var postSchema = new Schema({
  title: {
    type: String
  },
  text: {
    type: String
  }
})

mongoose.model('Post', postSchema, 'posts')
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt)

  var livereloadPort = 35729

  grunt.initConfig({
    watch: {
      options: {
        livereload: livereloadPort
      },
      views: {
        files: ['./server/views/**/*.jade']
      }
    },
    nodemon: {
      dev: {
        script: './server/server.js'
      }
    },
    concurrent: {
      watch: ['nodemon', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.registerTask('default', ['concurrent:watch']);
}
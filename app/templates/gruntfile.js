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
    shell: {
      mongodb: {
        command: 'mongod --dbpath ./data --port 1234',
        options: {
          async: true,
          stdout: false,
          stderr: true,
          failOnError: true,
          execOptions: {
            cwd: '.'
          }
        }
      }
    },
    concurrent: {
      watch: ['nodemon', 'shell:mongodb', 'watch'],
      options: {
        logConcurrentOutput: true
      }
    }
  })

  grunt.registerTask('default', ['concurrent:watch']);
}
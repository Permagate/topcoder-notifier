/**
 * Gruntfile
 */
'use strict';

/**
 * Start Gruntfile
 */
module.exports = function(grunt) {

  var paths = {
    js: ['./*.js', './test/**/*.js']
  };
  
  /**
   * Grunt Configuration
   */
  grunt.initConfig({
    jshint: {
      all: {
        src: paths.js,
        options: {
          jshintrc: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js'
      }
    }
  });

  /**
   * Load Grunt Plugins
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-nodemon');

  /**
   * Register Grunt Tasks
   */
  grunt.registerTask('default', ['jshint', 'nodemon']);
};

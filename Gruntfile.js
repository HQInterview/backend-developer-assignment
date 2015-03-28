'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
//    copy: {
//      bootstrap: {
//        files: [
//          {
//            expand: true,
//            cwd: 'node_modules/bootstrap/dist/',
//            src: ['**'],
//            dest: 'public/bootstrap/dist/'
//          }
//        ]
//      }
//    },
    bootlint: {
      options: {
        stoponerror: false,
        relaxerror: []
      },
      files: ['public/*.html']
    },
    nodeunit: {
      files: ['test/**/*_test.js'],
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      root: {
        src: ['*.js']
      },
      lib: {
        src: ['lib/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      },
    },
    coveralls: {
      options: {
        // LCOV coverage file relevant to every target
        src: 'coverage-results/lcov.info',

        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false
      },
      your_target: {
        // Target-specific LCOV coverage file
        src: 'coverage-results/extra-results-*.info'
      },
    },
    watch: {
      bootlint: {
        files: '<%= bootlint.files %>',
        tasks: ['bootlint']
      },
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      root: {
        files: '<%= jshint.root.src %>',
        tasks: ['jshint:root', 'nodeunit']
      },
      lib: {
        files: '<%= jshint.lib.src %>',
        tasks: ['jshint:lib', 'nodeunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'nodeunit']
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-bootlint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  //grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-coveralls');

  // Default task.
  grunt.registerTask('default', ['jshint', 'nodeunit', 'bootlint']);
};

'use strict';

module.exports = function(grunt) {

  var _ = require('lodash'),
    rjs_opts_dev = {
      almond: true,
      baseUrl: 'src',
      paths: {
        'jquery': '../bower_components/jquery/dist/jquery',
        'base64': '../bower_components/base64/base64',
        'lodash': '../bower_components/lodash/dist/lodash'
      },
      include: 'api',
      exclude: ['jquery'],
      name: '../bower_components/almond/almond',
      out: 'dist/ev-lib-api.js',
      wrap: {
        start: '<%= banner %>' + grunt.file.read('wrap/wrap.start'),
        end: grunt.file.read('wrap/wrap.end')
      },
      optimize: 'none'
    },
    rjs_opts_prod = _.extend({}, rjs_opts_dev, {
      out: 'dist/ev-lib-api.min.js',
      optimize: 'uglify'
    });

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/**\n' +
      ' * <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * <%= pkg.title %>\n' +
      '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' +
      ' * Copyright (c) <%= grunt.template.today("yyyy") %> Symphony Video, Inc.\n' +
      ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n' +
      ' */\n',
    // Task configuration.
    clean: {
      files: ['dist']
    },
    qunit: {
      all: {
        options: {
          urls: ['http://localhost:8000/test']
        }
      }
    },
    jshint: {
      gruntfile: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: 'Gruntfile.js'
      },
      src: {
        options: {
          jshintrc: 'src/.jshintrc'
        },
        src: ['src/**/*.js']
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/**/*.js']
      },
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      app: {
        files: '<%= jshint.app.src %>',
        tasks: ['jshint:app', 'qunit']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'qunit']
      },
    },
    requirejs: {
      development: {
        options: rjs_opts_dev
      },
      production: {
        options: rjs_opts_prod
      }
    },
    connect: {
      test: {
        options: {}
      },
      development: {
        options: {
          keepalive: true,
        }
      }
    },
    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: 'src',
          outdir: 'docs'
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-yuidoc');

  // Default task.
  grunt.registerTask('default', ['jshint', 'test', 'clean', 'requirejs', 'yuidoc']);
  grunt.registerTask('demo', ['connect:development']);
  grunt.registerTask('test', ['connect:test', 'qunit']);

};

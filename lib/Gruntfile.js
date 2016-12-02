'use strict';
module.exports = function(grunt) {
  grunt.initConfig({

    browserify: {
      js: {
        src: ['../javasripts/main.js'],
        dest: '../dist/app.js'
      },

      options: {
        transform: ["hbsfy"],
        browserifyOptions: {
          paths: [
            "./node_modules"
          ]
        }
      }

    },

    jshint: {
      files: ['../javascripts/**/*.js'], //this is the folder where all JS code should be located.
      //It looks for ANY file that ends in '.js' in the 'javascripts' folder
      options: {
        predef: ["document", "console", "Module", "$", "require"], //predefined
        esnext: true,
        globalstrict: true,
        globals: {}, //put global variables here ex: {"Sandwich": true, "require": true}
        browserify: true
      }
    },
    sass: {
      dist: {
        files: {
          '../css/styles.css': '../sass/styles.scss' //if your scss files is named something different, you’ll have to change this path.
            //this creates a file called main.css FROM sass/styles.scss
        }
      }
    },
    watch: { //this performs the tasks above automatically whenever something is changed.
      javascripts: {
        files: ['../javascripts/**/*.js'],
        tasks: ['jshint', 'browserify']
      },
      sass: {
        files: ['../sass/**/*.scss'],
        tasks: ['sass']
      },
      hbs: {
        files: ['../templates/**/*.hbs'],
        tasks: ['browserify']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['jshint', 'sass', 'browserify', 'watch']);
  //now, just typing 'grunt' will run this and the watch task will take over.
};

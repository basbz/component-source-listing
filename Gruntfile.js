/*global module:false*/
module.exports = function(grunt) {
  grunt.initConfig({
    jsx: {
      files: '**/jsx/**/*.jsx'
    },

    watch: {
      jsx: {
        files: '<%= jsx.files %>',
        tasks: ['jsx']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerMultiTask('jsx', function () {
    var reactTransform  = require('react-tools').transform,
        pattern = /^(.*)\/jsx\/(.+)\.jsx$/;


    this.filesSrc.forEach(function (file) {
      grunt.file.write(file.replace(pattern, "$1/components/$2.js"), reactTransform("/** @jsx React.DOM */\n" + grunt.file.read(file)));
    });
  });
};

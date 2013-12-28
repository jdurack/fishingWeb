module.exports = (grunt) =>

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      
    uglify:
      options:
      build:
        src: 'js/bb/<%= pkg.name %>.js'
        dest: 'js/bb/<%= pkg.name %>.min.js'

  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', ['uglify']
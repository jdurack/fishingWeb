module.exports = (grunt) =>

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    coffee:
      #expand: true
      cwd: 'bb'
      src: ['**/*.coffee']
      dest: 'public'
      ext: '.js'
    uglify:
      build:
        src: 'js/bb/<%= pkg.name %>.js'
        dest: 'js/bb/<%= pkg.name %>.min.js'
    watch:
      app:
        files: 'bb/**/*.coffee'
        tasks: ['coffee']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['coffee']
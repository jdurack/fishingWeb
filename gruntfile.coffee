module.exports = (grunt) =>

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      vendor:
        src: [
            'vendor/js/jquery.min.js'
          , 'vendor/js/underscore.min.js'
          , 'vendor/js/backbone.min.js'
        ]
        dest: 'public/js/vendor.js'
    coffee:
      bb:
        src: ['bb/**.coffee']
        dest: 'public/js/app.js'
      node:
        expand: true
        cwd: "nodeCoffee"
        src: ["**/*.coffee"]
        dest: "nodeJS"
        ext: ".js"
    watch:
      coffee:
        files: '**/*.coffee'
        tasks: ['coffee:bb','coffee:node']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['concat:vendor','watch']
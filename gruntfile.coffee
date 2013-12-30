module.exports = (grunt) =>

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    concat:
      vendor:
        src: [
            'vendor/js/jquery.min.js'
          , 'vendor/js/underscore.min.js'
          , 'vendor/js/backbone.min.js'
          , 'vendor/js/handlebars.js'
        ]
        dest: 'public/js/vendor.js'
    coffee:
      bb:
        src: [
            'bb/app.coffee'
          , 'bb/util.coffee'
          , 'bb/constants.coffee'
          , 'bb/router.coffee'
          , 'bb/template/*.coffee'
          , 'bb/view/*.coffee'
          , 'bb/model/*.coffee'
          , 'bb/decorator/*.coffee'
          , 'bb/collection/*.coffee'
        ]
        dest: 'public/js/app.js'
      node:
        expand: true
        cwd: "nodeCoffee"
        src: ["**/*.coffee"]
        dest: "nodeJS"
        ext: ".js"
    handlebars:
      templates:
        options:
          namespace: 'Fishing.Template'
          #wrapped: 'false'
        files:
          'public/js/templates.js': [
              'bb/template/mainLayout.html'
              'bb/template/report.html'
            ]
    watch:
      bbCoffee:
        files: 'bb/**/*.coffee'
        tasks: ['coffee:bb']
      nodeCoffee:
        files: 'nodeCoffee/**/*.coffee'
        tasks: ['coffee:node']
      templates:
        files: 'bb/template/**/*.html'
        tasks: ['handlebars:templates']

  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-handlebars'
  grunt.loadNpmTasks 'grunt-contrib-watch'

  grunt.registerTask 'default', ['concat:vendor','watch']
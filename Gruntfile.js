module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      main: {
        options: {
          port: 9001
        }
      }
    },
    jshint: {
      files: ['src/**/*.js', 'demo/**/*.js'],
      options: {
        jshintrc: 'jshint.json'
      }
    },
    watch: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'dist/**/*','demo/**/*'],
      tasks: ['build'],
      options: {
        livereload: true,
        livereloadOnError: false,
        spawn: false
      },
    },
    copy: {
      main: {
        files: [
        {src:'src/chameleon-navbar.js',dest:'dist/chameleon-navbar.js'},
        {src:'src/chameleon-navbar.css',dest:'dist/chameleon-navbar.css'}
        ]
      }
    },
    uglify: {
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    }    
  });


  // Default task(s).
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('build', ['jshint','copy', 'uglify']);

};
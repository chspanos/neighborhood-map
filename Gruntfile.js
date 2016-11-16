
module.exports = function(grunt) {

  grunt.initConfig({

    /* Clear out the distribution resource directories if existing */
    clean: {
      dev: {
        src: ['dist/css', 'dist/js']
      },
    },

    /* Generate the distribution resource directories if missing */
    mkdir: {
      dev: {
        options: {
          create: ['dist/css', 'dist/js', 'dist/js/lib']
        },
      },
    },

    /* Minify CSS style files */
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/css',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css'
        }]
      }
    },

    /* Copy JS library files */
    copy: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/js/lib',
          src: '*.js',
          dest: 'dist/js/lib'
        }]
      }
    },

    /* Minify JS files */
    uglify: {
      target: {
        /*files: [{
          expand: true,
          cwd: 'src/js',
          src: '*.js',
          dest: 'dist/js'
        }]*/
        files: { 'dist/js/built.min.js': 'dist/js/built.js'}
      }
    },

    /* Concatonate JS files into a single file */
    concat: {
      dist: {
        src: ['src/js/model.js', 'src/js/mapview.js', 'src/js/foursquareview.js', 'src/js/wikiview.js', 'src/js/viewmodel.js'],
        dest: 'dist/js/built.js',
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {'dist/index.html': 'src/altindex.html'}
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.registerTask('default', ['clean', 'mkdir', 'cssmin', 'copy', 'concat', 'uglify', 'htmlmin']);

};

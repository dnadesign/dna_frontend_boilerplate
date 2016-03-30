/**
 * Core Helix logic for managing Grunt projects.
 *
 *
 */
var _ = require('underscore')

/**
 * Returns the media query bucket name for the given file. The bucket name
 * is the bit between the component name and the less extension.
 *
 * @param string
 */
var extractBucketForPath = function (file) {
  var match = file.match(/.[A-Z0-9_]+.less$/)

  if (match && match.length > 0) {
    match = match[0]
      .replace('.less', '')
      .replace('/', '')
      .replace('.', '')
      .toLowerCase()

    return match
  }

  return 'base'
}

/**
 * Generates a media query string based on a bucket name.
 *
 * Not all MQ syntaxes are supported. More will be added on an as needed
 * basis.
 *
 * Supported Types are:
 *
 *  x800 (min-width: 800px)
 *  y900 (min-height: 900px)
 *  y800- (max-width: 800px)
 *  y900- (max-height: 900px)
 *  screen
 *  print
 *  300dpi
 *  2dppx
 *
 *
 * Multiple values should use an _ to separate.
 */
var generateMqForBucket = function (bucketName) {
  var rules = bucketName.split('_')
  var queryParts = [],
    query,
    type = ''

  if (bucketName == 'base') {
    return false
  }

  _.each(rules, function (rule) {
    if (rule == 'screen') {
      type = 'screen'
    } else if (rule == 'print') {
      type = 'print'
    }
    else if (rule.match('^x[0-9]*$')) {
      queryParts.push('min-width: ' + rule.substr(1) + 'px')
    }
    else if (rule.match('^x[0-9]*')) {
      queryParts.push('max-width: ' + rule.match('^x[0-9]*')[0] + 'px')
    }
    else if (rule.match('^y[0-9]*$')) {
      queryParts.push('min-height: ' + rule.substr(1) + 'px')
    }
    else if (rule.match('^y[0-9]*')) {
      queryParts.push('max-height: ' + rule.match('^x[0-9]*')[0] + 'px')
    }
    else if (rule.match('^[0-9]*dppx$') || rule.match('^[0-9]*dppx$')) {
      queryParts.push('min-resolution: ' + rule)
    }
  })

  if (queryParts.length > 0) {
    return '@media ' + type + ' (' + queryParts.join(') and (') + ')'
  }

  return false
}

module.exports = {
  setupGrunt: function (grunt) {
    grunt.registerTask('dna', 'DNA component system.', function () {
      var buckets = {
        'base': []
      }

      var defaultRunList = []

      var jsFiles = grunt.file.expand('build/components/**/*.js'),
        lessFiles = grunt.file.expand('build/components/**/*.less')

      // Add JS files to watch list, if any exist
      if ( ! _.isEmpty(jsFiles)) {
        grunt.config.merge({
          'concat': {
            'dnajs': {
              dest: 'dist/working/production.js',
              src: jsFiles
            }
          }
        })
        grunt.config.merge({
          'watch': {
            'dnajs': {
              files: jsFiles,
              tasks: ['concat:dnajs']
            }
          }
        })
      }

      // for each of the less files extract the media query information from
      // the file path and generate buckets of data
      _.each(lessFiles, function (file) {
        // skip mixins components.
        if (/mixins/.test(file)) {
          return
        }

        var bucketName = extractBucketForPath(file)

        if (typeof buckets[bucketName] == 'undefined') {
          buckets[bucketName] = []
        }

        buckets[bucketName].push(file)
      })

      // iterate through each of the bucket of queries. Related files should
      // be grouped together and output to the file system in two versions.
      // One has media queries wrapped, one does not (_dumb). Each file being
      // generated automatically includes all the mixins.
      var banner = "@import '../../build/components/mixins/all.less';\n",
        footer = '',
        watch = {},
        concat = {},
        less = {},
        stripmq = {}
      _.each(buckets, function (files, key, list) {
        var bannerForKey = [],
          footerForKey = [],
          mq = generateMqForBucket(key)

        bannerForKey.push(banner)

        if (mq) {
          footerForKey.push('\n}')
          bannerForKey.push(mq + ' {\n')
        }

        watch[key] = {
          files: files,
          tasks: [
            'concat:' + key
          ]
        }

        watch[key + '_compiled'] = {
          files: 'dist/working/' + key + '.less',
          tasks: [
            'less:' + key
          ]
        }

        concat[key] = {
          options: {
            banner: bannerForKey.join('\n'),
            footer: footerForKey.join('\n'),
            process: function (src, filepath) {
              return '// Source: ' + filepath + '\n' + src
            }
          },
          src: files,
          dest: 'dist/working/' + key + '.less'
        }

        defaultRunList.push('concat:' + key)
        defaultRunList.push('less:' + key)

        var fileLessMap = {}
        fileLessMap['dist/working/' + key + '.css'] = 'dist/working/' + key + '.less'

        less[key] = {
          files: fileLessMap,
          paths: ['less'],
          compress: true
        }
      })

      concat['production'] = {
        src: 'dist/working/*.css',
        dest: 'dist/working/production.css'
      }

      watch['less'] = {
        files: [
          'dist/working/*.css'
        ],
        tasks: [
          'concat:production',
          'kss'
        ]
      }

      watch['stripmq'] = {
        files: [
          'dist/production.min.css'
        ],
        tasks: [
          'stripmq:production'
        ]
      }

      stripmq['production'] = {
        options: {
          width: 1000,
          type: 'screen'
        },
        files: {
          'dist/production_dumb.min.css': ['dist/working/production.css']
        }
      }

      grunt.config.merge({
        kss: {
          options: {
            verbose: true
          },
          dist: {
            src: ['build/components/*/'],
            dest: 'styleguide'
          }
        },
        concat: concat,
        less: less,
        watch: watch,
        stripmq: stripmq,
        cssmin: {
          options: {
            shorthandCompacting: false,
            roundingPrecision: -1
          },
          target: {
            files: {
              'dist/production.min.css': ['dist/working/production.css'],
            }
          }
        }
      })

      defaultRunList.push('concat:production')
      defaultRunList.push('stripmq:production')
      defaultRunList.push('cssmin')
      defaultRunList.push('kss')
      defaultRunList.push('watch')

      grunt.task.run(defaultRunList)
    })

    grunt.loadNpmTasks('grunt-css')
    grunt.loadNpmTasks('grunt-contrib-less')
    grunt.loadNpmTasks('grunt-contrib-concat')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-kss')
    grunt.loadNpmTasks('grunt-imageoptim')
    grunt.loadNpmTasks('grunt-modernizr')
    grunt.loadNpmTasks('grunt-stripmq')
  },
  /**
   * Builds a custom modernizr build.
   *
   */
  setupModernizr: function (grunt) {
    var modernizr = {
      dist: {
        'devFile': 'build/global/vendor/modernizr/modernizr.js',
        'outputFile': 'build/global/vendor/modernizr/modernizr.custom.min.js',
        'extra': {
          'shiv': true,
          'printshiv': true,
          'load': true,
          'mq': true,
          'cssclasses': true
        },
        'extensibility': {
          'addtest': true,
          'prefixed': false,
          'teststyles': true,
          'testprops': true,
          'testallprops': true,
          'hasevents': false,
          'prefixes': true,
          'domprefixes': true,
          'cssclassprefix': ''
        },
        'uglify': true,
        'tests': [
          'fontface',
          'multiplebgs',
          'opacity',
          'rgba',
          'cssanimations',
          'generatedcontent',
          'cssgradients',
          'csstransforms',
          'csstransitions',
          'input',
          'inputtypes',
          'touch'
        ],
        'parseFiles': false,
        'matchCommunityTests': false
      }
    }
  }
}

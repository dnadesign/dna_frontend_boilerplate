module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! DNA Designed Communications Limited | Copyright 2012 */'
		},
		less: {
			xsmall: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/xsmall.min.css': [
						'build/global/css/reset.less',
						'build/global/css/utility.less',
						'build/global/css/elements/**/*.xsmall.less',
						'build/components/**/css/*.xsmall.less'
					],
					'css/build/xsmall.retina.min.css': [
						'build/components/**/css/*.xsmall.retina.less'
					]
				}
			},
			small: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/small.min.css': [
						'build/global/css/elements/**/*.small.less',
						'build/components/**/css/*.small.less'
					],
					'css/build/small.retina.min.css': [
						'build/components/**/css/*.small.retina.less'
					]
				}
			},
			medium: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/medium.min.css': [
						'build/global/css/elements/**/*.medium.less',
						'build/components/**/css/*.medium.less'
					],
					'css/build/medium.retina.min.css': [
						'build/components/**/css/*.medium.retina.less'
					]
				}
			},
			large: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/large.min.css': [
						'build/global/css/elements/**/*.large.less',
						'build/components/**/css/*.large.less'
					],
					'css/build/large.retina.min.css': [
						'build/components/**/css/*.large.retina.less'
					]
				}
			},
			xlarge: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/xlarge.min.css': [
						'build/global/css/elements/**/*.xlarge.less',
						'build/components/**/css/*.xlarge.less'
					],
					'css/build/xlarge.retina.min.css': [
						'build/components/**/css/*.xlarge.retina.less'
					]
				}
			},
			xxlarge: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/xxlarge.min.css': [
						'build/global/css/elements/**/*.xxlarge.less',
						'build/components/**/css/*.xxlarge.less'
					],
					'css/build/xxlarge.retina.min.css': [
						'build/components/**/css/*.xxlarge.retina.less'
					]
				}
			},
			xxxlarge: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/xxxlarge.min.css': [
						'build/global/css/elements/**/*.xxxlarge.less',
						'build/components/**/css/*.xxxlarge.less'
					],
					'css/build/xxxlarge.retina.min.css': [
						'build/components/**/css/*.xxxlarge.retina.less'
					]
				}
			},
			xxxxlarge: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/build/xxxxlarge.min.css': [
						'build/global/css/elements/**/*.xxxxlarge.less',
						'build/components/**/css/*.xxxxlarge.less'
					],
					'css/build/xxxxlarge.retina.min.css': [
						'build/components/**/css/*.xxxxlarge.retina.less'
					]
				}
			},
			print: {
				options: {
					paths: ['less'],
					compress: true
				},
				files: {
					'css/dist/print.css': [
						'build/global/css/print.less'
					],
				}
			}
		},
		imageoptim: {
			// these paths should match directories
			files: [
				'images',
			],
			options: {
				quitAfter: true
			}
		},
		concat: {
			css_xsmall: {
				src: [
					'<banner>',
					'build/global/css/helpers/fonts.css',
					'css/build/xsmall.min.css',
					'build/global/css/helpers/queries.xsmall.retina.css',
					'css/build/xsmall.retina.min.css',
					'build/global/css/helpers/queries.close.css'
				],
				dest: 'css/dist/xsmall.min.css'
			},
			css_small: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.small.css',
					'css/build/small.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.small.retina.css',
					'css/build/small.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/small.min.css',
				seperator: '\n'
			},
			css_medium: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.medium.css',
					'css/build/medium.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.medium.retina.css',
					'css/build/medium.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/medium.min.css',
				seperator: '\n'
			},
			css_large: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.large.css',
					'css/build/large.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.large.retina.css',
					'css/build/large.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/large.min.css',
				seperator: '\n'
			},
			css_xlarge: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.xlarge.css',
					'css/build/xlarge.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.xlarge.retina.css',
					'css/build/xlarge.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/xlarge.min.css',
				seperator: '\n'
			},
			css_xxlarge: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.xxlarge.css',
					'css/build/xxlarge.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.xxlarge.retina.css',
					'css/build/xxlarge.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/xxlarge.min.css',
				seperator: '\n'
			},
			css_xxxlarge: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.xxxlarge.css',
					'css/build/xxxlarge.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.xxxlarge.retina.css',
					'css/build/xxxlarge.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/xxxlarge.min.css',
				seperator: '\n'
			},
			css_xxxxlarge: {
				src: [
					'<banner>',
					'build/global/css/helpers/queries.xxxxlarge.css',
					'css/build/xxxxlarge.min.css',
					'build/global/css/helpers/queries.close.css',
					'build/global/css/helpers/queries.xxxxlarge.retina.css',
					'css/build/xxxxlarge.retina.min.css',
					'build/global/css/helpers/queries.close2.css'
				],
				dest: 'css/dist/xxxxlarge.min.css',
				seperator: '\n'
			},
			css_production: {
				src: [
					'<banner>',
					'css/dist/xsmall.min.css',
					'css/dist/small.min.css',
					'css/dist/medium.min.css',
					'css/dist/large.min.css',
					'css/dist/xlarge.min.css',
					'css/dist/xxlarge.min.css',
					'css/dist/xxxlarge.min.css',
					'css/dist/xxxxlarge.min.css',
					'css/dist/print.css'
				],
				dest: 'css/dist/production.min.css',
				seperator: '\n'
			},
			js: {
				src: [
					'build/global/js/vendor/jquery-1.9.1.min.js',
					'build/global/js/vendor/jquery-migrate-1.1.1.min.js',
					'build/global/js/vendor/modernizr.custom.min.js',
					'build/global/js/vendor/modernizr-extensions.src.js',
					'build/global/js/vendor/ios-orientationchange-fix.src.js',
					'build/global/js/vendor/response.src.js',
					'build/global/js/vendor/jquery.placeholder.1.3.src.js',
					//**
					'build/global/js/do.src.js',
					'build/global/js/jquery.whim.src.js',
					'build/global/js/browser_detection.src.js',
					'build/global/js/responseTrigger.src.js',
					//**
					'build/components/**/js/vendor/*.js',
					'build/components/**/js/*.js',
					//**
					'build/global/js/start.src.js'
				],
				dest: 'js/site.src.js',
				seperator: '\n'
			}
		},
		uglify: {
			site: {
				files: {
					'js/site.min.js': ['js/site.src.js'],
				}
			},

		},
		watch: {
			// if you have issues with either spawn or TOO many files use the commnd below and restart terminal
			// echo 'ulimit -n 4096' | sudo tee -a /etc/profile
			css_xsmall: {
				files: [
					'build/global/css/elements/**/*.xsmall.less',
					'build/global/css/elements/**/*.xsmall.retina.less',
					'build/components/**/css/*.xsmall.less',
					'build/components/**/css/*.xsmall.retina.less',
					'build/global/css/*.less',
					'build/global/css/helpers/*.css',
					'build/global/css/vendor/*.less'
				],
				tasks: [
					'less:xsmall',
					'concat:css_xsmall',
					'concat:css_production',
				]
			},
			css_small: {
				files: [
					'build/global/css/elements/**/*.small.less',
					'build/global/css/elements/**/*.small.retina.less',
					'build/components/**/css/*.small.less',
					'build/components/**/css/*.small.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:small',
					'concat:css_small',
					'concat:css_production',
				]
			},
			css_medium: {
				files: [
					'build/global/css/elements/**/*.medium.less',
					'build/global/css/elements/**/*.medium.retina.less',
					'build/components/**/css/*.medium.less',
					'build/components/**/css/*.medium.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:medium',
					'concat:css_medium',
					'concat:css_production',
				]
			},
			css_large: {
				files: [
					'build/global/css/elements/**/*.large.less',
					'build/global/css/elements/**/*.large.retina.less',
					'build/components/**/css/*.large.less',
					'build/components/**/css/*.large.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:large',
					'concat:css_large',
					'concat:css_production',
				]
			},
			css_xlarge: {
				files: [
					'build/global/css/elements/**/*.xlarge.less',
					'build/global/css/elements/**/*.xlarge.retina.less',
					'build/components/**/css/*.xlarge.less',
					'build/components/**/css/*.xlarge.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:xlarge',
					'concat:css_xlarge',
					'concat:css_production',
				]
			},
			css_xxlarge: {
				files: [
					'build/global/css/elements/**/*.xxlarge.less',
					'build/global/css/elements/**/*.xxlarge.retina.less',
					'build/components/**/css/*.xxlarge.less',
					'build/components/**/css/*.xxlarge.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:xxlarge',
					'concat:css_xxlarge',
					'concat:css_production',
				]
			},
			css_xxxlarge: {
				files: [
					'build/global/css/elements/**/*.xxxlarge.less',
					'build/global/css/elements/**/*.xxxlarge.retina.less',
					'build/components/**/css/*.xxxlarge.less',
					'build/components/**/css/*.xxxlarge.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:xxxlarge',
					'concat:css_xxxlarge',
					'concat:css_production',
				]
			},
			css_xxxxlarge: {
				files: [
					'build/global/css/elements/**/*.xxxxlarge.less',
					'build/global/css/elements/**/*.xxxxlarge.retina.less',
					'build/components/**/css/*.xxxxlarge.less',
					'build/components/**/css/*.xxxxlarge.retina.less',
					'build/vendor/*.less',
					'build/global/css/helpers/*.css'
				],
				tasks: [
					'less:xxxxlarge',
					'concat:css_xxxxlarge',
					'concat:css_production',
				]
			},
			css_print: {
				files: [
					'build/print.less',
				],
				tasks: [
					'less:print',
					'concat:css_production',
				]
			},
			js: {
				files: [
					'build/components/**/js/*.js',
				],
				tasks: [
					'concat:js'
				]
			}
		}
	});

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['less', 'concat', 'watch']);
};

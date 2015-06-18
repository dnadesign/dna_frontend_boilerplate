/**
 * Helix Gruntfile
 *
 * Helix is built from the ground up on the idea of components. Each component
 * should be able to provide it's own metadata.
 */
module.exports = function(grunt) {

	//prepare frontend boilerplate
	var
		concat = {}, less = {}, modernizr = {}, watch = {},
		sizes = [ //defaults in comments
			'base', //this always shows
			'small', //30em
			'medium', //46.875em
			'large', //56em
			'xlarge', //62em
			'xxlarge', //70em
			'xxxlarge', //80em
			'xxxxlarge' //100em
		],
		basename = sizes[0],
		components_css_dir = "build/components/**/css",
		global_css_dir = "build/global/css",
		dist_dir = 'css/dist';

	less['grid'] = {
		options: {
			paths: ['less'],
			compress: true
		},
		files: {
			'css/dist/grid.media.min.css': global_css_dir+'/mixins/grid.media.less',
			'css/dist/grid.dumb.min.css': global_css_dir+'/mixins/grid.dumb.less'
		}
	};

	for (var i = 0; i < sizes.length; i++) {

		var size = sizes[i], lessfiles = {};
		lessfiles['css/build/'+size+'.min.css'] = [
			global_css_dir+'/elements/**/*.'+size+'.less',
			components_css_dir+'/*.'+size+'.less'
		];
		lessfiles['css/build/'+size+'.retina.min.css'] = [components_css_dir+'/*.'+size+'.retina.less'];
		less[size] = {
			options: {
				paths: ['less'],
				compress: true
			},
			files: lessfiles
		};
		concat["css_"+size] = {
			src: [
				global_css_dir+'/media_queries/queries.'+size+'.css',
				'css/build/'+size+'.min.css',
				global_css_dir+'/media_queries/queries.close.css',
				global_css_dir+'/media_queries/queries.'+size+'.retina.css',
				'css/build/'+size+'.retina.min.css',
				global_css_dir+'/media_queries/queries.close2.css'
			],
			dest: 'css/dist/'+size+'.min.css',
			seperator: '\n'
		};
		concat["css_"+size+"_dumb"] = {
			src: [
				'css/build/'+size+'.min.css'
			],
			dest: 'css/dist/'+size+'_dumb.min.css',
			seperator: '\n'
		};
		watch["css_"+size] = {
			files: [
				global_css_dir+'/elements/**/*.'+size+'.less',
				global_css_dir+'/elements/**/*.'+size+'.retina.less',
				components_css_dir+'/*.'+size+'.less',
				components_css_dir+'/*.'+size+'.retina.less',
				global_css_dir+'/mixins/*.css',
				global_css_dir+'/media_queries/*.css'
			],
			tasks: [
				'less:'+size,
				'concat:css_'+size,
				'concat:css_'+size+'_dumb',
				'concat:css_production',
				'concat:css_production_dumb'
			]
		};

	};
	//add in specific locations

	less[basename].files['css/build/'+basename+'.min.css'].unshift(global_css_dir+'/utility.less');
	less[basename].files['css/build/'+basename+'.min.css'].unshift(global_css_dir+'/reset.less');

	less['print'] = {
		options: {
			paths: ['less'],
			compress: true
		},
		files: {
			'css/dist/print.css': [
				global_css_dir+'/print.less'
			],
		}
	};

	concat['css_production'] = {
		src: [
			'<banner>',
			'css/dist/grid.media.min.css',
			'css/dist/base.min.css',
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
	};
	concat['css_production_dumb'] = {
		src: [
			'<banner>',
			'css/dist/grid.dumb.min.css',
			'css/dist/base_dumb.min.css',
			'css/dist/small_dumb.min.css',
			'css/dist/medium_dumb.min.css',
			'css/dist/large_dumb.min.css',
			'css/dist/xlarge_dumb.min.css',
			'css/dist/print.css'
		],
		dest: 'css/dist/production_dumb.min.css',
		seperator: '\n'
	};
	concat['js'] = {
		src: [
			// modernizr at the top of the page so not included here
			'build/global/js/vendor/jquery-1.9.1.min.js',
			'build/global/js/vendor/jquery-migrate-1.1.1.min.js',
			'build/global/js/vendor/ios-orientationchange-fix.src.js',
			'build/global/js/vendor/response.src.js',
			'build/global/js/vendor/highcharts.js',
			'build/global/js/do.src.js',
			'build/global/js/browser_detection.src.js',
			'build/global/js/responseTrigger.src.js',
			'build/components/**/js/vendor/*.js',
			'build/components/**/js/*.js',
			'build/global/js/start.src.js',
		],
		dest: 'js/dist/site.src.js',
		seperator: '\n'
	};

	modernizr['dist'] = {
        "devFile" : "build/global/js/vendor/modernizr/modernizr.js",
        "outputFile" : "build/global/js/vendor/modernizr/modernizr.custom.dist.js",
        "extra" : {
            "shiv" : true,
            "printshiv" : true,
            "load" : true,
            "mq" : true,
            "cssclasses" : true
        },
        "extensibility" : {
            "addtest" : true,
            "prefixed" : false,
            "teststyles" : true,
            "testprops" : true,
            "testallprops" : true,
            "hasevents" : false,
            "prefixes" : true,
            "domprefixes" : true,
            "cssclassprefix": ""
        },
        "uglify" : true,
        "tests" : [
        	"fontface",
        	"multiplebgs",
        	"opacity",
        	"rgba",
        	"cssanimations",
        	"generatedcontent",
        	"cssgradients",
        	"csstransforms",
        	"csstransitions",
        	"input",
        	"inputtypes",
        	"touch"
        ],
        "parseFiles" : false,
        "matchCommunityTests" : false
	};

	//additional watch print, and watch js
	watch['css_print'] = {
		files: [
			'build/print.less',
		],
		tasks: [
			'less:print',
			'concat:css_production',
			'concat:css_production_dumb'
		]
	};
	watch['js'] = {
		files: [
			'build/global/js/vendor/*.js',
			'build/global/js/*.js',
			'build/components/**/js/vendor/*.js',
			'build/components/**/js/*.js',
		],
		tasks: [
			'concat:js'
		]
	};

	//do grunt configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! DNA Designed Communications Limited | Copyright 2015 */'
		},
		imageoptim: {
			// these paths should match directories
			files: ['images'],
			options: {
				quitAfter: true
			}
		},
		less: less,
		concat: concat,
		modernizr: modernizr,
		watch: watch
	});

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-kss');
	grunt.loadNpmTasks('grunt-imageoptim');
	grunt.loadNpmTasks("grunt-modernizr");


	grunt.registerTask('default', ['less', 'concat', 'watch']);
};

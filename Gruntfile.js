module.exports = function(grunt) {

	//prepare frontend boilerplate
	var 
		less = {}, concat = {}, watch = {},
		sizes = [ //defaults in comments
			'xsmall', //this always shows
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
				global_css_dir+'/helpers/queries.'+size+'.css',
				'css/build/'+size+'.min.css',
				global_css_dir+'/helpers/queries.close.css',
				global_css_dir+'/helpers/queries.'+size+'.retina.css',
				'css/build/'+size+'.retina.min.css',
				global_css_dir+'/queries.close2.css'
			],
			dest: 'css/dist/'+size+'.min.css',
			seperator: '\n'
		};
		watch["css_"+size] = {
			files: [
				global_css_dir+'/elements/**/*.'+size+'.less',
				global_css_dir+'/elements/**/*.'+size+'.retina.less',
				components_css_dir+'/*.'+size+'.less',
				components_css_dir+'/*.'+size+'.retina.less',
				global_css_dir+'/mixins/*.css',
				global_css_dir+'/helpers/*.css'
			],
			tasks: [
				'less:'+size,
				'concat:css_'+size,
				'concat:css_production'
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
	};
	concat['js'] = {
		src: [

		],
		dest: 'js/dist/site.src.js',
		seperator: '\n'
	};
	//additional watch print, and watch js
	watch['css_print'] = {
		files: [
			'build/print.less',
		],
		tasks: [
			'less:print',
			'concat:css_production'
		]
	};
	watch['js'] = {
		files: [
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
			banner: '/*! DNA Designed Communications Limited | Copyright 2012 */'
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
		watch: watch
	});

	grunt.loadNpmTasks('grunt-css');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-imageoptim');


	grunt.registerTask('default', ['less', 'concat', 'watch']);
};

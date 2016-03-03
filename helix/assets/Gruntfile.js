var helix = require( "./build/helix/lib/grunt.js");

/**
 * Helix Gruntfile
 *
 * Helix is built from the ground up on the idea of components. Each component
 * should be able to provide it's own metadata.
 */
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
	});

	helix.setupGrunt(grunt);
	helix.setupModernizr(grunt);

	grunt.registerTask('default', ['dna']);
};
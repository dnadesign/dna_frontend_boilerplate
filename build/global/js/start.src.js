/**
 * Start any application specific calls to via ready to avoid
 * boiler place throughout the core code.
 *
 * Params:
 *	event
 */
jQuery(document).ready(function(e) {
	// prevent caching of ajax GET requests in IE
	$.ajaxSetup({
		cache: false
	});

	DO.Fire('app:ready', [], true);
});
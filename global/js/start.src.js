/**
 * Start any application specific calls to via ready to avoid
 * boiler place throughout the core code.
 *
 * Params:
 *	event
 */
jQuery(document).ready(function(e) {
	$.ajaxSetup({
		cache: false
	});

	radio.Fire('app:ready', [], true);
});
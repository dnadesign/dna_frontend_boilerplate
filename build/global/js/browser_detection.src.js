"use strict";

DO.Subscribe('app:ready', function(e, $) {

	// detect js
	var html = $('html');
	html.removeClass('no-js');

	// detect android
	if (navigator.userAgent.toLowerCase().indexOf('android') > -1) {
		html.addClass('android');
		if(navigator.userAgent.toLowerCase().indexOf('android 2') > -1 || navigator.userAgent.toLowerCase().indexOf('android 3') > -1) {
			html.addClass('android_old');
		}
	}
	if (navigator.userAgent.toLowerCase().indexOf('webkit') > -1) {
		// needed to normalise fonts
		html.addClass('webkit');
	}
	if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
		// needed to normalise CSS animations in plan carousel
		html.addClass('chrome');
	}
	if (navigator.userAgent.toLowerCase().indexOf('safari') > -1 && navigator.userAgent.toLowerCase().indexOf('chrome') == -1) {
		// needed to normalise CSS animations in plan carousel
		html.addClass('safari');
	}
	if (navigator.userAgent.toLowerCase().indexOf('ipad') > -1) {
		// needed to disable animation
		html.addClass('ipad');
	}
	if (navigator.userAgent.toLowerCase().indexOf('iphone') > -1) {
		// needed to disable animation
		html.addClass('iphone');
	}
	if (navigator.userAgent.toLowerCase().indexOf('msie 10') > -1) {
		html.addClass('lte10');
	}
	if (Modernizr.mq('only all')) {
		// needed so lower IE doesn't get retina styles
		html.addClass('mq');
	} else {
		html.addClass('no-mq');
	}

	if ($('html').hasClass('lte8')) {
		Modernizr.load([{
			load: '/app/build/global/js/vendor/respond.src.js'
		}]);
	} else {
		DO.Fire('app:css_loaded', [], true);
	}

});
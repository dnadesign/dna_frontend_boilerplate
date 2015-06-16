"use strict";

DO.Subscribe('app:css_loaded', function(e, $) {
	$('.carousel').each(function() {
		$(this).Rubik({
			hasControls: $(this).data('has-controls'),
			hasPager: $(this).data('has-pager'),
			startAt: $(this).data('start-at')
		});
	});
});
DO.Subscribe('ajax:success', function(e, $) {
	$('.carousel').each(function() {
		var carousel = $(this);
		if (!carousel.data('Rubik')) {
			carousel.Rubik({
				hasControls: carousel.data('has-controls'),
				hasPager: carousel.data('has-pager'),
				startAt: carousel.data('start-at')
			});
		}
	});
});
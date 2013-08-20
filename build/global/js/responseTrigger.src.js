$(window).data('breakpoints', {
	x: [0, 480, 750, 896, 992, 1120, 1280, 1600],
	y: [0, 480, 560, 750, 896]
});

DO.Subscribe('app:ready', function(e, $) {

	var html = $('html');
	var breakpoint = DO.CurrentBreakpoint();

	Response.create({
		mode: 'src',
		prefix: 'src',
		breakpoints: $(window).data('breakpoints').x
	});

	Response.action(function() {
		if(DO.CurrentBreakpoint() !== breakpoint) {
			DO.Fire('app:breakpointchange');

			var from = breakpoint;
			breakpoint = DO.CurrentBreakpoint();

			if(!/large$/.test(from) && /large$/.test(breakpoint)) {
				DO.Fire('app:breakpointchangetodesktop');
			}

			if(/large$/.test(from) && !/large$/.test(breakpoint)) {
				DO.Fire('app:breakpointchangetomobile');
			}
		}
	});

});

DO.Subscribe('ajax:success', function(e, $) {
	Response.create({
		mode: 'src',
		prefix: 'src',
		breakpoints: $(window).data('breakpoints').x
	});
});

DO.Subscribe(['app:breakpointchange', 'app:ready'], function(e, $) {
	var html = $("html");

	html.attr('class',
		html.attr('class')
			.replace(/response_[\w]*(\s|\w$)/g, '')
			.replace(/[\s]+/g, ' ')
	);

	html.addClass('response_'+ DO.CurrentBreakpoint());
});
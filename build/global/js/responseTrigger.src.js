$(window).data('breakpoints', {
	x: [0, 480, 750, 896, 992, 1120, 1280, 1600],
	y: []
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
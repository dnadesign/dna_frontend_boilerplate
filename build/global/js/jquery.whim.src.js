(function ($) {
	"use strict";

	window.savedBreakpoint = 'xsmall';

	var	methods = {
		bodyFontSize: function () {
			if (!$.fn.whim.settings.body) {
				$.fn.whim.settings.body = $('body');
			}
			return parseInt($.fn.whim.settings.body.css('font-size'), 10);
		},

		virtualPx: function () {
			return Response.viewportW() / this.whim('bodyFontSize') * $.fn.whim.settings.baseFontSize;
		},

		actualPx: function (virtual) {
			return virtual / $.fn.whim.settings.baseFontSize * this.whim('bodyFontSize');
		},

		currentBreakpoint : function () {
			var breakpoint = null,
				breakPoints = $(window).data('breakpoints').x,
				breakPointsLabels = [],
				labels = ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge', 'xxxlarge', 'xxxxlarge'],
				i = 0;

			$(breakPoints).each(function () {
				breakPointsLabels[i] = [this, labels[i]];
				i = i + 1;
			});

			// makes operation more effiecient cos we stop as soon as it's true
			breakPointsLabels.reverse();
			for (i = 0; i < $(breakPointsLabels).length; i = i + 1) {
				if (Response.band(this.whim('actualPx', breakPointsLabels[i][0]))) {
					breakpoint = breakPointsLabels[i][1];
					break;
				}
			}

			return breakpoint;
		},

		trigger: function (breakpoint) {
			if (breakpoint === this.whim('currentBreakpoint')) {
				return false;
			}
			window.savedBreakpoint = this.whim('currentBreakpoint');
			return window.savedBreakpoint;
		}
	};

	$.fn.whim = function (method) {
		var returnData;
		if (methods[method]) {
			returnData = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			returnData = methods.init.apply(this, arguments);
		} else {
			returnData = $.error('Method ' +  method + ' does not exist on jQuery.whim');
		}
		return returnData;

	};

	$.fn.whim.settings = {
		baseFontSize: 10,
		body: null
	};

})(jQuery);
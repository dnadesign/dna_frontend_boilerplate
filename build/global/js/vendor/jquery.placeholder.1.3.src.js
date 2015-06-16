/*!
 * jQuery Placeholder plugin
 *
 * This plugin is used to support the HTML5 placeholder attribute on most non-HTML5-compliant browsers.
 *
 * Usage: $.Placeholder.init();
 *
 * Date: Sept 2011
 * Author: Otacon (byf1987_at_gmail.com)
 * Project page: https://code.google.com/p/jquery-placeholder-js/
 * Version: 1.3
 * Changelog:
		1.3 Added cleanBeforeSubmit global function, so that user can call before submitting form by JS. thanks to Krzysztof (kot**********ztof_at_gmail.com) for contributing this idea and some codes.
		1.2 Added semicolons to the end of function, so that the min version work. thanks to Tony (ty*****_at_gmail.com) for pointing this out and providing fix.
	1.1	Updated the code to meet jQuery plugin format. Added parameterized init.
	1.0 Initial release.
 * Tested on: Chrome (latest dev version); IE6 (IETester); IE8 (IETester)
 * Known Issues:
 * Placeholder for Password is currently not supported
 *
 * Edited 2012/07/20 by John Milmine changed from using color style attrbiutes to just adding and removing class, so css can handle styling.
 * Edited 2013/07/20 by John Milmine changed to create label rather than setting value ot
 */
(function ($) {
	"use strict";
	$.Placeholder = {
		settings : {
			dataName: 'placeholder'
		},

		// -- Bind event to components --
		init : function (settings) {
			// Merge default settings with the ones provided
			if (settings) {
				$.extend($.Placeholder.settings, settings);
			}

			// -- Util Methods --
			var getContent = function (element) {
				return $(element).val();
			},

			setContent = function (element, content) {
				$(element).prev().html(content);
			},

			getPlaceholder = function (element) {
				return $(element).data($.Placeholder.settings.dataName);
			},

			isContentEmpty = function (element) {
				var content = getContent(element);
				return (content.length === 0);
			},

			setPlaceholderStyle = function (element) {
				$(element).addClass('placeholder-active');
			},

			clearPlaceholderStyle = function (element) {
				$(element).removeClass('placeholder-active');
			},

			showPlaceholder = function (element) {
				$(element).prev().show();
			},

			hidePlaceholder = function (element) {
				$(element).prev().hide();
			},

			// -- Event Handlers --
			inputBlurred = function () {
				if (isContentEmpty(this)) {
					showPlaceholder(this);
				}
			},

			keydown = function (e) {
				console.log(e.keyCode);
				if ($.inArray(e.keyCode, [16, 224, 18, 17]) !== -1) {
					// shift, option, control, apple keys
					return true;
				} else if ($.inArray(e.keyCode, [8, 46]) === -1) {
					// delete and backspace
					hidePlaceholder(this);
				} else if (isContentEmpty(this)) {
					showPlaceholder(this);
				} else {
					hidePlaceholder(this);
				}
			},

			parentFormSubmitted = function () {
			},

			setupElement = function(el) {
				el.before('<label for="' + el.attr('id') + '" class="fake_placeholder">' + el.attr('placeholder') + '</label>');
				el.data($.Placeholder.settings.dataName, el.attr('placeholder'));
				el.attr('placeholder', '');
			};

			// -- Execution --
			$('input[type="text"], input[type="password"], textarea').each(function () {
				var el = $(this);
				if (el.attr('placeholder') && !el.prev().hasClass('fake_placeholder')) {
					setupElement(el);
					el.blur(inputBlurred);
					el.keydown(keydown);

					// triggers show place holder on module init
					el.trigger('blur');
				}
			});
			return this;
		},

		// When form is submitted by JS, call this before submit to avoid submitting the placeholder value
		cleanBeforeSubmit : function (theForm) {
			// Choose all forms if not given
			if (!theForm) {
				theForm = $('form');
			}

			// Triggering this event will do the necessary cleanup
			$(theForm).find('textarea, input[type="text"]').trigger('parentformsubmitted');

			return theForm;
		}
	};
})(jQuery);
$.Placeholder.init();

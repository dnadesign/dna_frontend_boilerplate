/**
 * Standard Library for tracking events such as form completion, outbound links
 * and button clicks.
 *
 */
DO.Subscribe(['app:ready'], function(e, $) {

	/**
	 * Standard outbound and external file count tracking component.
	 *
	 */
	$("body").on("click", function() {
		if (!String.prototype.endsWith) {
			String.prototype.endsWith = function(searchString, position) {
				var subjectString = this.toString();

				if (position === undefined || position > subjectString.length) {
					position = subjectString.length;
				}

				position -= searchString.length;
				var lastIndex = subjectString.indexOf(searchString, position);
				return lastIndex !== -1 && lastIndex === position;
			};
		}

		// abandon if link already aborted or analytics is not available
		if (e.isDefaultPrevented() || typeof ga !== "function") {
			return;
		}

		// abandon if no active link or link within domain
		var link = $(e.target).closest("a");

		if (link.length != 1 || (baseURI == link[0].host && !link[0].href.toLowerCase().endsWith('.pdf'))) {
			return;
		}

		// cancel event and record outbound link
		e.preventDefault();
		var href = link[0].href;

		var category = href.toLowerCase().endsWith('.pdf') ? 'Download' : 'Outbound';

		var loadPage = function() {
			document.location = href;
		};
		
		ga('send', {
			'hitType': 'event',
			'eventCategory': category,
			'eventAction': 'Link',
			'eventLabel': href,
			'hitCallback': loadPage
		});

		setTimeout(loadPage, 1000);
	});
	
	/**
	 * Tab change
	 *
	 */
	$("body").on('click.trackGaTabChange', '[role=tab]', function() {
		if(!$(this).data('gatracked')) {
			if(typeof ga !== "undefined") {
				var label = $(this).text();

				ga('send', {
					'hitType': 'event',
					'eventCategory': 'Tab Change',
					'eventAction': 'Changed',
					'eventLabel': window.location.href + ':  '+label
				});

				$(this).data('gatracked', true);
			}
		}
	});

	/**
	 * Form engagement.
	 *
	 */
	$("body").on('focus.trackGaChange', 'input, textarea, select', function() {
		var form = $(this).parents('form');

		if(!form.data('tracked')) {
			if(typeof ga !== "undefined") {
				ga('send', {
					'hitType': 'event',
					'eventCategory': 'Form Engagement',
					'eventAction': 'Started',
					'eventLabel': window.location.href + ': ' + form.attr('action')
				});
			}

			form.data('tracked', true);
		}

		if(!$(this).data('gatracked')) {
			if(typeof ga !== "undefined") {
				var label = form.find('[for='+ $(this).attr('ID') +']').text();

				if(!label) {
					label = $(this).parents('.field').find('label').first().text();
				}

				ga('send', {
					'hitType': 'event',
					'eventCategory': 'Form Engagement',
					'eventAction': 'Changed',
					'eventLabel': window.location.href + ': ' + form.attr('action') + ' '+label
				});

				$(this).data('gatracked', true);
			}
		}
	});


	$("body").on('click.trackGaButtonClick', '.button', function(e) {
		var button = $(this);

		if(!button.data('tracked')) {
			if(typeof ga !== "undefined") {
				var loadPage = function() {
					document.location = href;
				};

				setTimeout(loadPage, 1000);

				ga('send', {
					'hitType': 'event',
					'eventCategory': 'Button',
					'eventAction': 'Click',
					'useBeacon': true,
					'eventLabel': window.location.href + ': ' + button.attr('name'),
					'hitCallback': loadPage
				});
			}

			button.data('tracked', true);
		}

	});

	$("body").on('submit.trackGaFormSubmit', 'form', function() {
		
		var form = $(this);

		if(!form.data('tracked')) {
			if(typeof ga !== "undefined") {
				ga('send', {
					'hitType': 'event',
					'eventCategory': 'Form Engagement',
					'eventAction': 'Started',
					'eventLabel': window.location.href + ': ' + form.attr('action')
				});
			}

			form.data('tracked', true);
		}

		if($(this).data('submitted')) {
			return;
		}

		if(form.get(0).checkValidity() === true) {
			if(typeof ga !== "undefined") {
				$(this).data('submitted', true);

				ga("send", "event", 'Form Engagement', 'Submitted', window.location.href + ": "+ form.attr('action'), {
					useBeacon: true
				});
			}
		}
	});
});

(function ($) {
	"use strict";

	$.fn.Rubik = function (settings) {

		var opts =  $.extend({}, $.fn.Rubik.defaults);
		opts = $.extend(opts, settings);

		return this.each(function (i, el) {

			var c = $(this),
				current = 1,
				holder,
				inner,
				pager = $('.' + opts.domPagerClass, c),
				prev = $('.' + opts.domPrevClass, c),
				next = $('.' + opts.domNextClass, c),
				pagerLinks = pager.find('.a'),
				pages,
				slides,
				slidesPerPage,
				slidesPerPageCached = 0,
				timerStopped = false,
				timer = $.timer(function () {
					Rubik.goTo(current + 1);
				}).set({ time : opts.autoStartWait }),
				windowResizeBinded = false,
				swipe,

				// Set up all events and functions
				Rubik = {

					// checks width of items vs container, rebuilds paging
					assessContainers: function () {

						var slideCount = 9999,
							pageCount = 0,
							page;

						slidesPerPage = Math.round(holder.width() / $(slides[0]).outerWidth());

						if (slidesPerPageCached === slidesPerPage) {
							return;
						}
						slidesPerPageCached = slidesPerPage;
						// unwrap slides
						slides.each(function () {
							var slide = $(this);
							if (slide.parent('.' + opts.domPageClass).length > 0) {
								slide.detach();
								inner.append(slide);
							}
						});
						// remove page divs
						inner.find('.' + opts.domPageClass).remove();
						// wrap slides in new pages
						slides.each(function () {
							var slide = $(this);
							slideCount = slideCount + 1;
							if (slideCount > slidesPerPage) {
								page = $('<div class="' + opts.domPageClass + '"/>');
								inner.append(page);
								slideCount = 1;
								pageCount = pageCount + 1;
							}
							slide.detach();
							page.append(slide);
						});

						pages = inner.find('.' + opts.domPageClass).css({
							width: (1 / pageCount * 100) + '%'
						});
						inner.css({
							width: (pageCount * 100) + '%'
						});

						Rubik.setupControls();
						Rubik.setupEvents();
						Rubik.setupCurrent(opts.startAt);
						Rubik.goTo(current, true);
						if (Modernizr.csstransforms && Modernizr.touch) {
							holder.each(function () {
								swipe = new Swipe(this, {
									callback: function(event, index, elem) {
										current = index + 1;
										$(elem).parent().parent().parent().data('Rubik').update();
									}
								});
							});
						}
						opts.assessCallback(c, current);
					},

					disable: function() {
						prev.css({
							visibility: 'hidden'
						});
						next.css({
							visibility: 'hidden'
						});
					},

					enable: function() {
						prev.css({
							visibility: 'visible'
						});
						next.css({
							visibility: 'visible'
						});
					},

					// animates between items
					goTo: function (pos, noAnimate, dontReset) {
						// distance to animate
						var movementAmount = (parseInt($(pages[0]).outerWidth(), 10)) / holder.width() * 100,
							innerWidth = (parseInt(inner.outerWidth(), 10)) / holder.width() * 100;
						// check if we're within bounds
						if (pos < 1) {
							return false;
						}

						if (Math.round((pos - 1) * movementAmount) > Math.round(innerWidth - 100)) {
							return false;
						}
						// reset current position before animation
						if (dontReset !== true) {
							if (Modernizr.csstransitions) {
								inner.css({
									x: (-1 * (current - 1) * movementAmount / pages.length) + '%'
								});
							} else {
								inner.css({
									left: (-1 * (current - 1) * movementAmount) + '%'
								});
							}
						}

						current = pos;
						// setup for animation
						inner.stop();
						if (noAnimate) {
							// don't do animation
							if (Modernizr.csstransitions) {
								inner.transition(
									{
										x: (-1 * (pos - 1) * movementAmount / pages.length) + '%'
									},
									0,
									'in-out'
								);
							} else {
								inner.css(
									{
										'left': (-1 * (current - 1) * movementAmount) + '%'
									}
								);
							}
						} else {
							//	do animation
							if (Modernizr.csstransitions) {
								inner.transition(
									{
										x: (-1 * (pos - 1) * movementAmount / pages.length) + '%'
									},
									opts.transitionSpeedCSS,
									'in-out'
								);
							} else {
								inner.animate(
									{
										'left': (-1 * (pos - 1) * movementAmount) + '%'
									},
									opts.transitionSpeed,
									opts.transitionEasing
								);
							}
						}
						Rubik.update();
						if (swipe) {
							swipe.setPos(current - 1);
						}
					},

					// makes carousel go to next item
					gotoNext: function () {
						Rubik.stopAutoScroll();
						Rubik.goTo(current + 1);
						if (opts.autoStart && opts.autoStartRestartAfterWait > 0) {
							var newTimer = $.timer(Rubik.startAutoScroll);
							newTimer.once(opts.autoStartRestartAfterWait);
						}
						return (current - 1) / (pages.length - 1);
					},

					// makes carousel go to prev item
					gotoPrev: function () {
						Rubik.stopAutoScroll();

						Rubik.goTo(current - 1);

						if (opts.autoStart && opts.autoStartRestartAfterWait > 0) {
							var newTimer = $.timer(Rubik.startAutoScroll);
							newTimer.once(opts.autoStartRestartAfterWait);
						}
						return (current - 1) / (pages.length - 1);
					},

					// makes carousel go to first item
					gotoStart: function () {
						Rubik.stopAutoScroll();

						Rubik.goTo(1);

						if (opts.autoStart && opts.autoStartRestartAfterWait > 0) {
							var newTimer = $.timer(Rubik.startAutoScroll);
							newTimer.once(opts.autoStartRestartAfterWait);
						}
						return (current - 1) / (pages.length - 1);
					},

					resize: function() {
						Rubik.setupDimensions();
						Rubik.assessContainers();
					},

					// creates paging HTML
					setupControls: function () {
						if (pages.length > 1) {
							if (opts.hasControls) {
								if (prev.length === 0) {
									c.append('<span class="' + opts.domPrevClass + '">Previous</span>');
									prev = $('.'  + opts.domPrevClass, c);
								}
								if (next.length === 0) {
									c.append('<span class="' + opts.domNextClass + '">Next</span>');
									next = $('.' + opts.domNextClass, c);
								}
							}
							if (opts.hasPager) {
								pager.remove();
								c.append('<ul class="' + opts.domPagerClass + '"/>');
								pager = $('.' + opts.domPagerClass, c);
								var i;
								for (i = 1; i <= pages.length; i = i + 1) {
									pager.append('<li><span class="a" data-pos="' + i + '">Page ' + i + '</span></li>');
								}
								pagerLinks = pager.find('.a');
							}
						} else {
							if (pager.length > 0) {
								pager.hide();
							}
							prev.hide();
							next.hide();
						}
					},

					// sets which item to show first
					setupCurrent: function (startAt) {
						switch (startAt) {
						case 'start':
							current = 1;
							break;
						case 'middle':
							current = Math.ceil(pages.length / 2);
							break;
						case 'end':
							current = pages.length;
							break;
						}
					},

					// make neccesasry CSS updates
					setupDimensions: function () {
						var height = 0,
							slideHeight = 0;

						slides.css({
							height: 'auto'
						});

						inner.css({
							position: 'absolute'
						});
						slides.each(function () {
							slideHeight = $(this).height();
							if (slideHeight > height) {
								height = slideHeight;
							}
						});
						slides.css({
							height: '100%'
						});
						holder.css({
							paddingTop: height,
							height: 0
						});
						inner.css({
							height: height
						});
					},

					// setup events on HTML including:
					// next and prev
					// paging links
					// window resize
					setupEvents: function () {
						prev.unbind('touchend click').on('touchend click', function (e) {
							switch (e.type) {
								case 'touchend':
									if (prev.data('dragged')) {
										prev.data('dragged', false);
										return false; /* already handled don't do click */
									}
									e.preventDefault();
									prev.data('handled', true);
									break;
								case 'click':
									e.preventDefault(); /* stop a's href being called */
									if (prev.data('handled')) {
										prev.data('handled', false);
										return false; /* already handled don't do click */
									}
									break;
							}
							Rubik.gotoPrev();
						});

						next.unbind('touchend click').on('touchend click', function (e) {
							switch (e.type) {
								case 'touchend':
									if (next.data('dragged')) {
										next.data('dragged', false);
										return false; /* already handled don't do click */
									}
									e.preventDefault();
									next.data('handled', true);
									break;
								case 'click':
									e.preventDefault(); /* stop a's href being called */
									if (next.data('handled')) {
										next.data('handled', false);
										return false; /* already handled don't do click */
									}
									break;
							}
							Rubik.gotoNext();
						});

						pagerLinks.unbind('click').on('touchend click', function (e) {
							switch (e.type) {
								case 'touchend':
									if (pagerLinks.data('dragged')) {
										pagerLinks.data('dragged', false);
										return false; /* already handled don't do click */
									}
									e.preventDefault();
									pagerLinks.data('handled', true);
									break;
								case 'click':
									e.preventDefault(); /* stop a's href being called */
									if (pagerLinks.data('handled')) {
										pagerLinks.data('handled', false);
										return false; /* already handled don't do click */
									}
									break;
							}
							Rubik.stopAutoScroll();
							var num = parseInt($(this).data('pos'), 10),
								newTimer;

							Rubik.goTo(num);

							if (opts.autoStart && opts.autoStartRestartAfterWait > 0) {
								newTimer = $.timer(Rubik.startAutoScroll);
								newTimer.once(opts.autoStartRestartAfterWait);
							}
						});

						if (!windowResizeBinded) {
							var win = $(window),
								win_w = win.width(),
								win_h = win.height(),
								timeout;

							win.on('resize', function (e) {
								// IE wants to constantly run resize for some reason
								// Let’s make sure it is actually a resize event
								var win_w_new = win.width(),
									win_h_new = win.height();

								if (win_w !== win_w_new || win_h !== win_h_new) {
									// timer shennanigans
									clearTimeout(timeout);
									timeout = setTimeout(
										function () {
											Rubik.resize();
										},
										200
									);
									// Update the width and height
									win_w = win_w_new;
									win_h = win_h_new;
								}
							});
							windowResizeBinded = true;
						}
					},

					// make original HTML as simple as possible
					// this function creates additional markup needed
					setupHTML: function() {
						c.wrapInner('<div class="' + opts.domInnerClass + '" />');
						inner = c.children('.' + opts.domInnerClass);
						c.wrapInner('<div class="' + opts.domHolderClass + '" />');
						holder = c.children('.' + opts.domHolderClass);
						slides = inner.children();
						slides.each(function() {
							var el = $(this)
							el.data('pos', el.index() + 1);
						});
					},

					// sets up timers for auto-play
					setupTimers: function () {
						if (opts.autoStart && pages.length > 1) {
							pagerLinks.mouseenter(c.stopAutoScroll);
							pagerLinks.mouseleave(c.startAutoScroll);
							c.mouseenter(c.stopAutoScroll);
							c.mouseleave(c.startAutoScroll);
							timer.play();
						}
					},

					// called when touch drag completes
					snap: function () {
						var distance;
						if (Modernizr.csstransitions) {
							distance = inner.css('transform')._translateX;
							distance = parseInt(distance.substr(0, distance.length - 1), 10) / 100 * -1;
							distance = distance / ((pages.length - 1) / pages.length);
						} else {
							distance = -1 * parseInt(inner.css('left'), 10) / c.width() / (inner.width() / holder.width() - 1);
						}
						Rubik.goTo(Math.round(distance * (pages.length - 1)) + 1, false, true);
						return (current - 1) / (pages.length - 1);
					},

					// starts auto play timers
					startAutoScroll: function () {
						if (timerStopped) {
							timer.play();
						}
					},

					// stops auto play timers
					stopAutoScroll: function () {
						timerStopped = true;
						timer.stop();
					},

					//
					update: function () {
						var pagerPos;
						if (pager.length > 0) {
							pagerPos = current;
							if (pagerPos > pages.length) {
								pagerPos = pagerPos - pages.length;
							}
							pager.find('.active').removeClass('active');
							pager.find('.a[data-pos="' + pagerPos + '"]').addClass('active');
						}
						if (current <= 1) {
							prev.hide();
						} else {
							prev.show();
						}
						if (current >= pages.length) {
							next.hide();
						} else {
							next.show();
						}
					}
				};

			if (c.find('.' + opts.domInnerClass).length > 0) {
				return true;
			}
			Rubik.setupHTML();
			Rubik.setupDimensions();
			Rubik.assessContainers();
			Rubik.setupTimers();
			c.addClass('carousel_ready');
			c.data('Rubik', Rubik);
		});
	};

	$.fn.Rubik.defaults = {
		autoStart: false,
		autoStartRestartAfterWait: 6000,
		autoStartWait: 6000,
		assessCallback: function() {},
		domHolderClass: 'carousel_holder',
		domInnerClass: 'carousel_items',
		domPrevClass: 'carousel_previous',
		domNextClass: 'carousel_next',
		domPageClass: 'carousel_page',
		domPagerClass: 'carousel_pager',
		hasControls: true,
		hasPager: true,
		startAt: 1,
		transitionEasing: 'easeOutQuint',
		transitionSpeed: 2000,
		transitionSpeedCSS: 800
	};

})(jQuery);
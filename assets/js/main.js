/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			$window.on('load', function() {

				$('#two').poptrox({
					caption: function($a) { return $a.next('h3').text(); },
					overlayColor: '#2c2c2c',
					overlayOpacity: 0.85,
					popupCloserText: '',
					popupLoaderText: '',
					selector: '.work-item a.image',
					usePopupCaption: true,
					usePopupDefaultStyling: false,
					usePopupEasyClose: false,
					usePopupNav: true,
					windowMargin: (breakpoints.active('<=small') ? 0 : 50)
				});

			});
			$window.on('load', function() {
				var $sections = $('section');
				var $navLinks = $('#heading-list ul li a');
			
				// Function to check and highlight the active section
				function highlightCurrentSection() {
					var scrollPosition = $window.scrollTop();
					var windowBottom = scrollPosition + $window.height();
					var documentHeight = $(document).height();
			
					var foundSection = false;
			
					$sections.each(function() {
						var sectionTop = $(this).offset().top - 50; // Offset for header height
						var sectionBottom = sectionTop + $(this).outerHeight();
			
						if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
							var id = $(this).attr('id');
							$navLinks.removeClass('active');
							$navLinks.filter('[href="#' + id + '"]').addClass('active');
							foundSection = true;
						}
					});
			
					// If no section is found and we're at the bottom of the page, activate the last section
					if (!foundSection && windowBottom >= documentHeight - 10) {
						var lastSection = $sections.last().attr('id');
						$navLinks.removeClass('active');
						$navLinks.filter('[href="#' + lastSection + '"]').addClass('active');
					}
				}
			
				// Call the function when scrolling
				$window.on('scroll', highlightCurrentSection);
			
				// Trigger highlight on page load
				highlightCurrentSection();
			});
			

})(jQuery);
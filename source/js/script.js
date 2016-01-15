(function($) {


	//--------------------------
	//  Utils Ui
	//--------------------------
		 
	var UtilsUi = {
		
		config: {
			selectors: {
				selector: $('.selector'),
			},
		},

		init: function(settings) {
			$.extend(this.config, settings);
		},
	};


	//--------------------------
	//  Navigation Ui
	//--------------------------
		 
	var NavigationUi = {
		
		config: {
			selectors: {
				page: 		 $('html'),
				body: 		 $('body'),
				toggleMenu:  $('.js-toggle-menu'),
				navigation:  $('.js-nav'),
			},
			delay: 0
		},

		init: function(settings) {
			$.extend(this.config, settings);
			NavigationUi.setup();
		},
		
		setup: function() {
			this.config.selectors.toggleMenu.click(NavigationUi.toggle);
		},
		
		toggle: function() {
			var config = NavigationUi.config;
			config.selectors.toggleMenu.toggleClass('active');
			config.selectors.navigation.toggleClass('open');
		},
	};


	//--------------------
	//  ReplaceSvg
	//--------------------
		
	var ReplaceSvg = {

		config: {
			elements: $("img[src$='.svg']"),
			fallback: "png"
		},

		init: function(settings) {
			$.extend(this.config, settings);
			
			var elements = this.config.elements,
				fallback = this.config.fallback;
			
			elements.each(function(){
				var src = $(this).attr("src").replace("svg", fallback);
				$(this).attr("src", src);
			});
		}
	};


	//------------------------------------------------------------
	// iOS Keyboard fix
	//
	// Fixes problems with position:fixed when keyboard is open
	// => toggle position:absolute & position:fixed on focus/blur
	//
	// "Why not MSStream?"
	// => Microsoft injected the word "iPhone" in IE11's userAgent
	//------------------------------------------------------------
		
	var iOSKeyboardFix = {
		
		init: function() {

			var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
			
			if (iOS) {
				$("input,textarea,select").on('focus', function(){
					$(".js-toggle-menu").css({position:'absolute'});
				});
				$("input,textarea,select").on('blur', function(){
					$(".js-toggle-menu").css({position:'fixed'});
				});				
			}
		}
	};
	

	//--------------------------------
	// MediaQueries
	// @dependency: plugins/enquire.js
	//--------------------------------
		
	var MediaQueriesUi = {

		config: {
			page: $('html')
		},

		init: function(settings) {
			$.extend(this.config, settings);
			this.setup();
		},
		
		setup: function() {
			var config = MediaQueriesUi.config;
		}
	};	
	  
	//------------------
	//  Initialization
	//------------------
	
	$(document).ready(function() {
		
		var $page = $('html'), isMobile = $('html').hasClass('mobile');
		
		// Fastclick => plugins.js/fastclick
		// FastClick.attach(document.body);
		
		// Replace inline svg
		if (!Modernizr.svg) {
			ReplaceSvg.init();
		}
		
		// Media Queries
		MediaQueriesUi.init();
		
		// Navigation
		NavigationUi.init();
		
		// Utils 
		UtilsUi.init();

		// Keyboard fix for iOS devices
		iOSKeyboardFix.init();

	});

})(jQuery);
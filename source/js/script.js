(function($) {

	//--------------------
	//  External Scripts
	//--------------------


	// ReplaceSvg
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
	
	  
	//------------------
	//  Initialization
	//------------------
	
	$(document).ready(function() {
		
		if (!Modernizr.svg) {
			ReplaceSvg.init();
		}
		
	});

})(jQuery);
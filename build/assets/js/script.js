/**
 * Utilities
 */
 
var sfish_utils = {
	
	init: function(container) {
		
		// responsive image maps
		if (container.find($("img[usemap]")).length) {
			$('img[usemap]').rwdImageMaps();	
		}
		
		// gallery - lightbox
		if (container.find($(".js-lightbox")).length) {
			$(".js-lightbox").fancybox({
				openEffect: "fade",
				closeEffect: "fade",
				nextEffect: "fade",
				prevEffect: "fade",
				padding: 0,
			});
		}		
	}
}

$(document).ready(function() {
	sfish_utils.init($('body'));
});


/**
 * Fallback für non-svg browsers
 */
 
if (!Modernizr.svg) {
	
	var sfish_svg = {
		init: function(settings) {
			sfish_svg.opts = {
				elements: $("img[src$='.svg']"),
				fallback: ".png"
			};
			$.extend(sfish_svg.opts, settings);
			sfish_svg.setup();
		},
		
		setup: function() {
			sfish_svg.opts.elements.each(function(){
				var src = $(this).attr("src").replace(".svg", sfish_svg.opts.fallback);
				$(this).attr("src", src);
			});
		}
	}
	
	$(document).ready(sfish_svg.init);
}
;(function($){
    "use strict";

    var bindToClass      = 'carousel',
		containerWidth   = 0,
        scrollWidth      = 0,
        posFromLeft      = 0,    // Stripe position from the left of the screen
        stripePos        = 0,    // When relative mouse position inside the thumbs stripe
        animated         = null,
        el, $el, ratio, scrollPos, nextMore, prevMore, pos, padding;

    // calculate the thumbs container width, if the window has been resized
    function calc(e){
        el  = this;
        $el = $(el);

        nextMore = prevMore  = false; // reset

        containerWidth       = el.clientWidth;
        scrollWidth          = el.scrollWidth; // the "<ul>"" width
        padding              = 0.22 * containerWidth; // padding in percentage of the area which the mouse movement affects

        posFromLeft          = $el.offset().left;
        stripePos            = e.pageX - padding - posFromLeft;
        pos                  = stripePos / (containerWidth - padding*2);
        scrollPos            = (scrollWidth - containerWidth ) * pos;

        $el.animate({scrollLeft:scrollPos}, 200, 'easeInOutCirc');

        clearTimeout(animated);
        animated = setTimeout(function(){
            animated = null;
        }, 200);

        return this;
    }

    // move the stripe left or right according to mouse position
    function move(e){
        // don't move anything until inital movement on 'mouseenter' has finished
        if( animated ) return;

        ratio     = scrollWidth / containerWidth;
        stripePos = e.pageX - padding - posFromLeft; // the mouse X position, "normalized" to the carousel position

        if( stripePos < 0)
            stripePos = 0;

        pos       = stripePos / (containerWidth - padding*2); // calculated position between 0 to 1
        // calculate the percentage of the mouse position within the carousel
        scrollPos = (scrollWidth - containerWidth ) * pos;

        el.scrollLeft = scrollPos;

        // check if element has reached an edge
        prevMore = el.scrollLeft > 0;
        nextMore = el.scrollLeft < (scrollWidth - containerWidth);

        $el[prevMore ? "addClass" : "removeClass"]('left');
        $el[nextMore ? "addClass" : "removeClass"]('right');
    }

    $.fn.carousel = function(options){
        if( $.support.mouse ){
            $(document)
                .on('mouseenter.carousel', '.' + bindToClass, calc)
                .on('mousemove.carousel', '.' + bindToClass, move);

        }
        /*
        // Enable scrolling gesture on mobile
        if( $.support.touch && !$.support.mouse ){
            $(this).css('overflow', 'auto');
        }
        */
    };

    // Activate it generally for all items with the "carousel" class
    $.fn.carousel();

})(jQuery);

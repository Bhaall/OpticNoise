onl.mod.animation = {
	init: function(){
		onl.log('onl.animation.init');

    $('body').imagesLoaded(function() {
      initAnimation();
    });

    initAnimation = function() {
      var $els = $('.cr-animate-gen');
      $els.each(function() {
        $(this).css('opacity', '0');
      });
      $els.each(function() {
        $(this).bind('cr-animate', function() {
          var animationDelay;
          $(this).css('opacity', '');
          $(this).addClass('animated ' + $(this).data('gen'));
          animationDelay = $(this).data('gen-delay');
          $(this).css('animation-delay', animationDelay);
        });
      });
      $els.each(function() {
        $(this).waypoint((function() {
          $(this).trigger('cr-animate');
        }), {
          triggerOnce: true,
          offset: '90%'
        });
      });
    };
	}
};

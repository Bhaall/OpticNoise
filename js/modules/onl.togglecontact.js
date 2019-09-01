/**
 * contact
 * @description
 *  	toggle for contact section
 */

onl.mod.togglecontact = {
	init: function(){
		onl.log('onl.togglecontact.init');

		$(function() {
			var $ = jQuery;
			$('#header #nav .contact a').click(function(e){
				e.preventDefault();
				$('.header-contact-info').slideToggle();
				$(this).parent().toggleClass("open");
			});
		});
	}
};
/**
 * roster filter
 * @description
 *  	alpha filter for artist roster
 */
 (function($){$.fn.filterable=function(settings){settings=$.extend({useHash:true,animationSpeed:1000,show:{width:'show',opacity:'show'},hide:{width:'hide',opacity:'hide'},useTags:true,tagSelector:'#artist-filter a',selectedTagClass:'current',allTag:'all'},settings);return $(this).each(function(){$(this).bind("filter",function(e,tagToShow){if(settings.useTags){$(settings.tagSelector).parent().removeClass(settings.selectedTagClass);$(settings.tagSelector+'[href='+'\\'+tagToShow+']').parent().addClass(settings.selectedTagClass)}$(this).trigger("filterartist",[tagToShow.substr(1)])});$(this).bind("filterartist",function(e,classToShow){if(classToShow==settings.allTag){$(this).trigger("show")}else{$(this).trigger("show",['.'+classToShow]);$(this).trigger("hide",[':not(.'+classToShow+')'])}if(settings.useHash){location.hash='#'+classToShow}});
 $(this).bind("show",function(e,selectorToShow){
   $(this).children(selectorToShow).fadeIn();
 });
 $(this).bind("hide",function(e,selectorToHide){
   $(this).children(selectorToHide).fadeOut();
 });
 if(settings.useHash){if(location.hash!='')$(this).trigger("filter",[location.hash]);else $(this).trigger("filter",['#'+settings.allTag])}if(settings.useTags){$(settings.tagSelector).click(function(){$('#artist-list').trigger("filter",[$(this).attr('href')]);$(settings.tagSelector).parent().removeClass('current');$(this).parent().addClass('current')})}})}})(jQuery);


onl.mod.rosterfilter = {
	init: function(){
		onl.log('onl.rosterfilter.init');
		$('#artist-list').filterable();
	}
};

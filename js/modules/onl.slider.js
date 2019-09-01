
function rotateImages(){
	var curPhoto = $("div.current"),
	nxtPhoto = curPhoto.next(),
	curTab = $(".ui-tabs-nav li.current"),
	nxtTab = curTab.next();

	if (nxtPhoto.length == 0) {
		nxtPhoto = $("#featured-artist div:first");
		nxtTab = $(".ui-tabs-nav li:first-child");
	}
	curPhoto.removeClass("current").addClass("previous");
	curTab.removeClass("current").addClass("previous");
	nxtPhoto.css({opacity:0.0}).addClass("current").animate({opacity:1.0}, 1000, function(){
		curPhoto.removeClass("previous");
		curTab.removeClass("previous");
	});
	nxtTab.addClass("current");
}

onl.mod.slider = {
	init: function(){
		onl.log("onl.slider.init");
		$("div.ui-tabs-panel").animate({opacity:1.0}, 1000 );		
		$("div.ui-tabs-panel").first().addClass("current");
		$(".ui-tabs-nav li").first().addClass("current");
		setInterval("rotateImages()", 3000);
	}
};
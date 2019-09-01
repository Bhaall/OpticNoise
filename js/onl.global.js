/* Normalized hide address bar for iOS & Android (c) Scott Jehl, scottjehl.com MIT License */
(function(a){var b=a.document;if(!location.hash&&a.addEventListener){window.scrollTo(0,1);var c=1,d=function(){return a.pageYOffset||b.compatMode==="CSS1Compat"&&b.documentElement.scrollTop||b.body.scrollTop||0},e=setInterval(function(){if(b.body){clearInterval(e);c=d();a.scrollTo(0,c===1?0:1)}},15);a.addEventListener("load",function(){setTimeout(function(){if(d()<20){a.scrollTo(0,c===1?0:1)}},0)})}})(this);

if (window.onl) _onl = onl;

onl = {
	info : 'Optic Noise Global JavaScript',
	greeting : 'Welcome to OpTic NoISe!',
	log : function() {
		try{console.log.apply(console,arguments);} catch(e) {}
	},
	infolog : function() {
		try{console.info.apply(console,arguments);} catch(e) {}
	},
	scriptsLoc : location.pathname.split('/').slice(0,-1).join('/') + '/js/modules/',
	mod : {
		'cookie' : {},
		'slider' : {},
		'soundmanager' : {},
		'mpcarousel' : {},
		'sahcarousel' : {},
		'initaccess' : {},
		'initdownload' : {},
		'mediaplayer' : {},
		'rosterfilter' : {},
		'waypoints' : {},
		'imagesloaded' : {},
		'animation' : {},
		'togglecontact' : {},
		'materialripple' : {}
	},
	loaded : [],
	init : function() {
		var dteNow = new Date();
		var currYear = dteNow.getFullYear();
		$("#year").text(currYear);

		var path = location.pathname.split('/').slice(0,-1);
		var valueToMatch = 'html';
		path = $.grep(path, function(val) { return val != valueToMatch; });
		onl.scriptsLoc = path.join('/') + '/js/modules/';

		$.each(onl.mod, function(moduleName) {
			$.extend(onl.mod[moduleName], {
				className : '.mod-' + moduleName,
				load : function(m) {
					if($.inArray(moduleName, onl.loaded) < 0) {

						var s = document.createElement('script');
						s.src = onl.scriptsLoc + 'onl.' + moduleName.replace(/_/g,'-') + '.js';
						$('head').append(s);

						// var headElem = document.getElementsByTagName('head')[0];
						// var newScript = document.createElement('script');
						// newScript.type = 'text/javascript';
						// newScript.src = onl.scriptsLoc + 'onl.' + moduleName.replace(/_/g,'-') + '.js';
						// headElem.appendChild(newScript);

						(function(){
							if(!onl.mod[moduleName].init){
								setTimeout(arguments.callee, 30);
								return;
							}
							onl.mod[moduleName].init(m);
						})();

						onl.loaded.push(moduleName);
					}
				}
			});

			var module = $('.'+moduleName.replace(/_/g,'-'));
			if (module.size()){
				onl.mod[moduleName].load(module);
			}
		});
	}
};
onl.infolog('%c' + onl.greeting, "color:#fff; background-color:#990000; padding: 5px;");
onl.init();

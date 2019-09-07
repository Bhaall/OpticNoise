angular.module('onAdmin', [
  'ui.router',
  'onAdmin.services',
  'onAdmin.directives',
  'onAdmin.filters',
  'onAdmin.controllers',
  'ngTable',
  'textAngular',
  'angular-clipboard'
])
.config(function($provide){
  $provide.decorator('taOptions', ['taRegisterTool', '$delegate', function(taRegisterTool, taOptions){
    taRegisterTool('colorRed', {
      iconclass: "fas fa-square red",
      action: function(){
        this.$editor().wrapSelection('forecolor', '#990000');
      }
    });
    taOptions.toolbar[1].push('colorRed');
    return taOptions;
  }]);
})
.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider){
	$stateProvider
	.state('index', {
		url: '/',
		templateUrl: 'main.html',
		abstract: true
	})
	.state('index.home', {
		url: '',
		templateUrl: 'pages/home.html',
		controller  : 'homeCtrl',
		data : {
			title: 'dashboard'
	  }
	})
	.state('index.artists', {
		url: 'artists',
		templateUrl : 'pages/artists.html',
		controller  : 'artistsCtrl',
		data : {
			title: 'all artists',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Artists",link:"#/artists"}]
		}
	})
	.state('index.artists-no-songs', {
		url: 'artists-no-songs',
		templateUrl : 'pages/artists-no-songs.html',
		controller  : 'artistsNoSongsCtrl',
		data : {
			title: 'artists with no zero songs',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Artists with no songs",link:"#/artists-no-songs"}]
		}
	})
	.state('index.edit-artist/:id', {
		url: 'edit-artist/:id',
		templateUrl : 'pages/edit-artist.html',
		controller  : 'editArtistCtrl',
		data : {
			title: 'edit artist',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Artists","link":"#/artists"},{label:"Edit artist"}]
		}
	})
	.state('index.add-artist', {
		url: 'add-artist',
		templateUrl : 'pages/add-artist.html',
		controller  : 'addArtistCtrl',
		data : {
			title: 'new artist',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Artists","link":"#/artists"},{label:"New artist",link:"#/add-artist"}]
		}
	})
  .state('index.about', {
    url: 'about',
    templateUrl : 'pages/about.html',
    controller  : 'aboutCtrl',
    data : {
      title: 'about page',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"About Page","link":"#/about"}]
    }
  })
  .state('index.edit-about/:id', {
    url: 'edit-about/:id',
    templateUrl : 'pages/edit-about.html',
    controller  : 'editAboutCtrl',
    data : {
      title: 'edit about page',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Edit About Page"}]
    }
  })
  .state('index.contact', {
    url: 'about',
    templateUrl : 'pages/contact.html',
    controller  : 'contactCtrl',
    data : {
      title: 'contact page',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Contact Page","link":"#/contact"}]
    }
  })
  .state('index.edit-contact/:id', {
    url: 'edit-contact/:id',
    templateUrl : 'pages/edit-contact.html',
    controller  : 'editContactCtrl',
    data : {
      title: 'edit contact page',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Edit Contact Page"}]
    }
  })
  .state('index.supe', {
    url: 'supe',
    templateUrl : 'pages/supe-password.html',
    controller  : 'supeCtrl',
    data : {
      title: 'supervisor password',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Supervisor Password","link":"#/supe"}]
    }
  })
  .state('index.edit-supe-password/:id', {
    url: 'edit-supe-password/:id',
    templateUrl : 'pages/edit-supe-password.html',
    controller  : 'editSupeCtrl',
    data : {
      title: 'edit supervisor password',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Edit Supervisor Password"}]
    }
  })
  .state('index.settings', {
    url: 'settings',
    templateUrl : 'pages/settings.html',
    controller  : 'settingsCtrl',
    data : {
      title: 'site settings',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Site Settings","link":"#/settings"}]
    }
  })
  .state('index.edit-settings/:id', {
    url: 'edit-settings/:id',
    templateUrl : 'pages/edit-settings.html',
    controller  : 'editSettingsCtrl',
    data : {
      title: 'site settings',
      breadcrumb  : [{label:"Home",link:"#/"},{label:"Edit Site Settings"}]
    }
  })
	.state('index.users', {
	  url: 'users',
		templateUrl : 'pages/users.html',
		controller  : 'usersCtrl',
		data : {
		    title: 'users',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"Users",link:"#/users"}]
		}
	})
	.state('index.user-profile', {
	    url: 'user-profile/:id',
		templateUrl : 'partials/user-profile.html',
		controller  : 'userProfileCtrl',
		data : {
		    title: 'users',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"Users","link":"#/users"},{label:"User Profile"}]
		}
	})
	.state('index.songs', {
	    url: 'songs',
		templateUrl : 'pages/songs.html',
		controller  : 'songsCtrl',
		data : {
		    title: 'all songs',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"songs","link":"#/songs"}]
		}
	})
	.state('index.songs-no-file', {
		url: 'songs-no-file',
		templateUrl : 'pages/songs-no-file.html',
		controller  : 'songsNoFileCtrl',
		data : {
			title: 'songs with no mp3 file',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Songs with no mp3 file","link":"#/songs-no-file"}]
		}
	})
	.state('index.songs-no-comp', {
		url: 'songs-no-comp',
		templateUrl : 'pages/songs-no-comp.html',
		controller  : 'songsNoCompCtrl',
		data : {
			title: 'songs not in comps',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Songs that are in zero comps","link":"#/songs-no-comp"}]
		}
	})
	.state('index.add-song', {
		url: 'add-song',
		templateUrl : 'pages/add-song.html',
		controller  : 'addSongCtrl',
		data : {
			title: 'new song',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Songs","link":"#/songs"},{label:"New song","link":"#/add-song"}]
		}
	})
	.state('index.add-song-to-artist/:id', {
		url: 'add-song-to-artist/:id',
		templateUrl : 'pages/add-song-to-artist.html',
		controller  : 'addSongToArtist',
		data : {
			title: 'new song',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Artists","link":"#/artists"},{label:"Add song to artist"}]
		}
	})
	.state('index.edit-song/:id', {
		url: 'edit-song/:id',
		templateUrl : 'pages/edit-song.html',
		controller  : 'editSongCtrl',
		data : {
			title: 'edit song',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Songs","link":"#/songs"},{label:"Edit song"}]
		}
	})
	.state('index.sah', {
		url: 'sah',
		templateUrl : 'pages/sah.html',
		controller  : 'sahCtrl',
		data : {
			title: 'scene and heard',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Scene and Heard","link":"#/sah"}]
		}
	})
	.state('index.sah-items/:id', {
		url: 'sah-items/:id',
		templateUrl : 'pages/sah-items.html',
		controller  : 'sahItemsCtrl',
		data : {
			title: 'scene and heard items',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Scene and Heard","link":"#/sah"},{label:"Scene and Heard Items"}]
		}
	})
	.state('index.add-sah-item/:id', {
		url: 'add-sah-item/:id',
		templateUrl : 'pages/add-sah-item.html',
		controller  : 'addSahItemCtrl',
		data : {
			title: 'add scene and heard item',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Scene and Heard","link":"#/sah"},{label:"Add Scene and Heard Item"}]
		}
	})
	.state('index.edit-sah-item/:sceneID/:id', {
		url: 'edit-sah-item/:sceneID/item/:id',
		templateUrl : 'pages/edit-sah-item.html',
		controller  : 'editSahItemCtrl',
		data : {
			title: 'edit scene and heard item',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Scene and Heard","link":"#/sah"},{label:"edit Scene and Heard Item"}]
		}
	})
	.state('index.slider', {
		url: 'slider',
		templateUrl : 'pages/slider.html',
		controller  : 'sliderCtrl',
		data : {
			title: 'featured artists',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Featured Artists","link":"#/slider"}]
		}
	})
	.state('index.fon', {
	    url: 'fon',
		templateUrl : 'pages/fon.html',
		controller  : 'fonCtrl',
		data : {
		    title: 'new signings',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"New Signings","link":"#/fon"}]
		}
	})
	.state('index.comps', {
	    url: 'comps',
		templateUrl : 'pages/comps.html',
		controller  : 'compsCtrl',
		data : {
		    title: 'comps',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"Comps","link":"#/comps"}]
		}
	})
	.state('index.edit-comp/:id', {
		url: 'edit-comp/:id',
		templateUrl : 'pages/edit-comp.html',
		controller  : 'editCompCtrl',
		data : {
			title: 'edit comp',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Comps","link":"#/comps"},{label:"Edit Comp"}]
		}
	})
	.state('index.add-comp', {
		url: 'add-comp',
		templateUrl : 'pages/add-comp.html',
		controller  : 'addCompCtrl',
		data : {
			title: 'new comp',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Comps","link":"#/comps"},{label:"New comp",link:"#/add-comp"}]
		}
	})
	.state('index.add-song-to-comp/:comp_id', {
		url: 'add-song-to-comp/:comp_id',
		templateUrl : 'pages/add-song-to-comp.html',
		controller  : 'addSongToCompCtrl',
		data : {
			title: 'add song to comp',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Comps","link":"#/comps"},{label:"Add song to comp"}]
		}
	})
	.state('index.add-artist-to-comp/:comp_id', {
		url: 'add-artist-to-comp/:comp_id',
		templateUrl : 'pages/add-artist-to-comp.html',
		controller  : 'addArtistToCompCtrl',
		data : {
			title: 'add artist to comp',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Comps","link":"#/comps"},{label:"Add artist to comp"}]
		}
	})
	.state('index.add-song-artist-to-comp/:comp_id/:id', {
		url: 'add-song-artist-to-comp/:comp_id/artist/:id',
		templateUrl : 'pages/add-song-artist-to-comp.html',
		controller  : 'addSongArtistToCompCtrl',
		data : {
			title: 'add song to comp',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Comps","link":"#/comps"},{label:"Add song to comp"}]
		}
	})
	.state('index.dropboxes', {
	    url: 'dropboxes',
		templateUrl : 'pages/dropboxes.html',
		controller  : 'dropboxesCtrl',
		data : {
		    title: 'dropboxes',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"Dropboxes","link":"#/dropboxes"}]
		}
	})
	.state('index.add-dropbox', {
	    url: 'add-dropbox',
		templateUrl : 'pages/add-dropbox.html',
		controller  : 'addDropboxCtrl',
		data : {
		    title: 'add dropbox',
		    breadcrumb  : [{label:"Home",link:"#/"},{label:"Dropboxes","link":"#/dropboxes"},{label:"Add Dropbox"}]
		}
	})
	.state('index.edit-dropbox/:id', {
		url: 'edit-dropbox/:id',
		templateUrl : 'pages/edit-dropbox.html',
		controller  : 'editDropboxCtrl',
		data : {
			title: 'edit dropbox',
			breadcrumb  : [{label:"Home",link:"#/"},{label:"Dropboxes","link":"#/dropboxes"},{label:"Edit Dropbox"}]
		}
	})
	.state('index.error-404', {
		url: 'error-404',
		templateUrl: 'pages/error-404.html',
		data: {title: '404 Not Found'}
	})
	.state('index.error-500', {
		url: 'error-500',
		templateUrl: 'pages/error-500.html',
		data: {title: '500 Server Error'}
	})
	.state('login', {
		url: '/login',
		templateUrl: 'login.html',
		controller  : 'loginCtrl',
		data : {
			title: 'Login'
		}
	});

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

}])
.run(['$location', '$rootScope', '$state', function($location, $rootScope, $state) {
	$rootScope.$on('$stateChangeStart', function(event, current, previous){
		if (typeof current.data != "undefined") {
			$rootScope.title = current.data.title;
			$rootScope.breadcrumb = current.data.breadcrumb;
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/home'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/users'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/artists'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/add-artist'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/artists-no-songs'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/songs'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/songs-no-file'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}])
.run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/songs-no-comp'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/add-song'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/slider'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/fon'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/sah'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/comps'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/add-comp'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/dropboxes'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();
			connected.then(function(msg){
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]).run(['$rootScope', '$location', 'loginService', function($rootScope, $location, loginService) {
	var routespermission=['/add-dropbox'];
	$rootScope.$on('$stateChangeStart', function(){
		if( routespermission.indexOf($location.path()) !=-1) {
			var connected=loginService.islogged();

			connected.then(function(msg){
				console.log(msg.data);
				if(!msg.data) $location.path('/login');
			});
		}
	});
}]);

// init jquery functions and plugins
$.fn.refreshMe = function(opts){

	var $this = this,
	defaults = {
		ms:1500,
		selector:"parents('.panel')",
		started:function(){},
		completed:function(){}
	},
	settings = $.extend(defaults, opts);

	var container = $(settings.selector);
	var panelToRefresh = container.find('.refresh-container');
	var dataToRefresh = container.find('.refresh-data');

	var ms = settings.ms;
	var started = settings.started;
	var completed = settings.completed;

	var spinIcon;
	if ($this.hasClass("fa")) {
		spinIcon=$this;
	}
	else{
		spinIcon=$this.find('.fa');
	}

	var containerCss = {position:"relative"};
	container.css(containerCss);

	var overlay = $('<div class="refresh-overlay"><div id="preloader-logo"><img src="../images/on_mark_spinner.png" alt="Logo" style="opacity:0.7"></div></div>');
	var css = {
		position:"absolute",
		top:0,
		right:0,
		background:"rgba(200,200,200,0.25)",
		width:"100%",
		height:"100%",
		"text-align":"center",
		"z-index":4
	};
	overlay.css(css);

	$this.on('click', function(){
		spinIcon.addClass("fa-spin");
		overlay.insertBefore(panelToRefresh);
		if (dataToRefresh) {
			started(dataToRefresh);
		}
		setTimeout(function(){
			if (dataToRefresh) {
				completed(dataToRefresh);
			}
			overlay.remove();
			spinIcon.removeClass("fa-spin");
		},ms);
		return false;
	});
};


$.fn.pageMe = function(opts){
	var $this = this,
	defaults = {
		perPage: 7,
		showPrevNext: false,
    numbersPerPage: 5,
    hidePageNumbers: false,
    pagerSelector: ".pagination"
	},
	settings = $.extend(defaults, opts);

	var listElement = $this;
	var perPage = parseInt(settings.perPage);
	var children = listElement.children();
	var pager = $(settings.pagerSelector);

	if (typeof settings.childSelector!="undefined") {
		children = listElement.find(settings.childSelector);
	}

	if (typeof settings.pagerSelector!="undefined") {
		pager = $(settings.pagerSelector);
	}

	var numItems = children.size();
	var numPages = Math.ceil(numItems/perPage);

	pager.data("curr",0);

	if (settings.showPrevNext){
		$('<li class="disabled"><a href="javascript:;" class="prev_link">«</a></li>').appendTo(pager);
	}

	var curr = 0;
	while(numPages > curr && (settings.hidePageNumbers==false)){
		$('<li><a href="javascript:;" class="page_link">'+(curr+1)+'</a></li>').appendTo(pager);
		curr++;
	}

	if (settings.numbersPerPage>1) {
		$('.page_link').hide();
		$('.page_link').slice(pager.data("curr"), settings.numbersPerPage).show();
	}

	if (settings.showPrevNext){
		$('<li><a href="javascript:;" class="next_link">»</a></li>').appendTo(pager);
	}

	pager.find('.page_link:first').addClass('active');
	if (numPages<=1) {
		pager.find('.next_link').parent().removeClass("disabled");
	}
	pager.children().eq(1).addClass("active");

	children.hide();
	children.slice(0, perPage).show();

	pager.find('li .page_link').click(function(){
		var clickedPage = $(this).html().valueOf()-1;
		goTo(clickedPage);
		return false;
	});
	pager.find('li .prev_link').click(function(){
		if ($(this).parent().hasClass("disabled")){
			return false;
		}
		previous();
		return false;
	});
	pager.find('li .next_link').click(function(){
		if ($(this).parent().hasClass("disabled")){
			return false;
		}
		next();
		return false;
	});

	function previous(){
		var goToPage = parseInt(pager.data("curr")) - 1;
		goTo(goToPage);
	}

	function next(){
		var goToPage = parseInt(pager.data("curr")) + 1;
		goTo(goToPage);
	}

	function goTo(page){
		var startAt = page * perPage,
		endOn = startAt + perPage;

		children.css('display','none').slice(startAt, endOn).show();

		if (page>=1) {
			pager.find('.prev_link').parent().removeClass("disabled");
		}
		else {
			pager.find('.prev_link').parent().addClass("disabled");
		}

		if (page<(numPages-1)) {
			pager.find('.next_link').parent().removeClass("disabled");
		}
		else {
			pager.find('.next_link').parent().addClass("disabled");
		}

		pager.data("curr",page);

		if (settings.numbersPerPage>1) {
			$('.page_link').slice(page, settings.numbersPerPage+page).show();
		}
		pager.children().removeClass("active");
		pager.children().eq(page+1).addClass("active");
	}
};

$.fn.aniMe = function(opts){
	var $this = this,
	defaults = {
		aniClass: 'slide-down',
		container: 'window',
		repeat: false
	},
	settings = $.extend(defaults, opts);

	var ele = $this;
	var aniClass = settings.aniClass;
	var container = settings.container;
	var repeat = settings.repeat;

	if (typeof ele.offset()!="undefined") {
		var pos = ele.offset().top;
		var topOfWindow = $(container).scrollTop();

		if (pos < topOfWindow+500) {
			ele.addClass(aniClass);
			if (repeat) {
				setTimeout(function(){
					ele.removeClass(aniClass);
				},1500);
			}
		}
	}
};

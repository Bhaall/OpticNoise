angular.module('onAdmin.controllers', [])
.controller('appCtrl', ['$scope', '$window', '$http', '$filter', '$location', '$sce', 'settingsRepo', 'userRepo', 'supeRepo', 'aboutRepo', 'contactRepo', 'getNewSignings', 'artistsActiveCount', 'artistsCount', 'artistsNoSongsCount', 'songsCount', 'songsActiveCount', 'songsNoFileCount', 'songsNoCompCount', 'getTopPlayedSongs', 'getTopDownloadedSongs', 'getTopCompsList', 'getTopDropboxesList', 'noty', 'loginService', 'profileRepo', 'sahCount', 'sahItemCount', 'compsCount', 'compsActiveCount', 'dropboxesCount', 'dropboxesActiveCount', 'artistsRepo', 'songsRepo', 'featuredRepo', 'compsRepo', 'compsRecent', 'dropboxesRepo', function($scope, $window, $http, $filter, $location, $sce, settingsRepo, userRepo, supeRepo, aboutRepo, contactRepo, getNewSignings, artistsActiveCount, artistsCount, artistsNoSongsCount, songsCount, songsActiveCount, songsNoFileCount, songsNoCompCount, getTopPlayedSongs, getTopDownloadedSongs, getTopCompsList, getTopDropboxesList, noty, loginService, profileRepo, sahCount, sahItemCount, compsCount, compsActiveCount, dropboxesCount, dropboxesActiveCount, artistsRepo, songsRepo, featuredRepo, compsRepo, compsRecent, dropboxesRepo){

	$scope.noty = noty;
	$scope.date = Date.now();
	$scope.reload = function(){
		$window.location.reload();
	}
	$scope.go = function (path) {
		$location.path(path);
	};
	$scope.renderHtml = function(html) {
		return $sce.trustAsHtml(html);
	};
	$scope.isActive = function(path) {
		if ($location.path() == path) {
			return true;
		} else {
			return false;
		}
	};

	$scope.refreshCounters = function() {

		getNewSignings.fetchFon().success(function(data) {
			$scope.signing_artists = data;
		});

		profileRepo.fetchProfile().success(function(data) {
			for (var i = 0; i < data.length; i++) {
				$scope.current_user = data[i];
			}
		});

		settingsRepo.fetchSettings().success(function(data) {
			$scope.settings = data;
		});

		userRepo.fetchUsers().success(function(data) {
			$scope.users = data;
		});

		aboutRepo.fetchAbout().success(function(data) {
			$scope.abouts = data;
		});

		contactRepo.fetchContact().success(function(data) {
			$scope.contacts = data;
		});

		supeRepo.fetchSupe().success(function(data) {
			$scope.supes = data;
		});

		artistsRepo.fetchArtists().success(function(data) {
			$scope.artists = data;
		});

		artistsActiveCount.fetchActiveArtistsCount().success(function(data) {
			$scope.allActiveArtistsTotal = data;
		});

		songsRepo.fetchSongs().success(function(data) {
			$scope.songs = data;
		});

		compsRepo.fetchComps().success(function(data) {
			$scope.comps = data;
		});

		compsRecent.fetchMostRecentComps().success(function(data) {
			$scope.recentComps = data;
		});

		dropboxesRepo.fetchDropboxes().success(function(data) {
			$scope.dropboxes = data;
		});

		artistsNoSongsCount.fetchArtistsNoSongsCount().success(function(data) {
			$scope.artistNoSongsTotal = data;
		});

		artistsCount.fetchArtistsCount().success(function(data) {
			$scope.allArtistsTotal = data;
		});

		songsCount.fetchSongsCount().success(function(data) {
			$scope.allSongsTotal = data;
		});

		songsActiveCount.fetchActiveSongsCount().success(function(data) {
			$scope.allActiveSongsTotal = data;
		});

		songsNoFileCount.fetchSongsNoFileCount().success(function(data) {
			$scope.songsNoFileTotal = data;
		});

		songsNoCompCount.fetchSongsNoCompCount().success(function(data) {
			$scope.songsNoCompTotal = data;
		});

		getTopPlayedSongs.fetchTopSongs().success(function(data) {
			$scope.topSongs = data;
		});

		getTopDownloadedSongs.fetchTopSongsDownload().success(function(data) {
			$scope.topSongsDownload = data;
		});

		getTopCompsList.fetchTopComps().success(function(data) {
			$scope.topComps = data;
		});

		getTopDropboxesList.fetchTopDropboxes().success(function(data) {
			$scope.topDropboxes = data;
		});

		sahCount.fetchSahCount().success(function(data) {
			$scope.sahTotal = data;
		});

		sahItemCount.fetchSahItemCount().success(function(data) {
			$scope.sahItemTotal = data;
		});

		featuredRepo.fetchFeatured().success(function(data) {
			$scope.fon = data;
		});

		compsCount.fetchCompsCount().success(function(data) {
			$scope.allCompsTotal = data;
		});

		compsActiveCount.fetchCompsActiveCount().success(function(data) {
			$scope.allCompsActiveTotal = data;
		});

		dropboxesCount.fetchDropboxesCount().success(function(data) {
			$scope.allDropboxesTotal = data;
		});

		dropboxesActiveCount.fetchDropboxesActiveCount().success(function(data) {
			$scope.allDropboxesActiveTotal = data;
		});
	};

	// check if logged in before getting profile data
	var connected=loginService.islogged();
	connected.then(function(msg){
		if(msg.data) {
			profileRepo.fetchProfile().success(function(data) {
				for (var i = 0; i < data.length; i++) {
					$scope.current_user = data[i];
				}
			});
			$scope.refreshCounters();
		}
	});

	$scope.timeAgo = utils.timeAgo;

	$scope.logout=function(){
		loginService.logout();
	};
}])
.controller('homeCtrl', ['$scope', '$rootScope', 'loginService', function($scope, $rootScope, loginService) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};

	$rootScope.showPlayer=false;
	$scope.refreshCounters();
	$scope.logout=function(){
		loginService.logout();
	};

	$scope.refresh = function() {
		var iFrame1 = $("#statframe1");
		var iFrame2 = $("#statframe2");
		var iFrame3 = $("#statframe3");
		iFrame1.attr("src",iFrame1.attr("src"));
		iFrame2.attr("src",iFrame2.attr("src"));
		iFrame3.attr("src",iFrame3.attr("src"));
		$rootScope.setLoading(false);
	};

}])
.controller('loginCtrl', ['$scope', 'loginService',  function($scope, loginService) {
	$scope.msgtxt='';
	$scope.submitted = false;

	$scope.master = {};
	$scope.user = {};
	$scope.user.username = '';
	$scope.user.password = '';

	$scope.login=function(data){
		loginService.login(data, $scope);
	};
}])
.controller('aboutCtrl', ['$scope', 'aboutRepo', '$filter', '$rootScope', function ($scope, aboutRepo, $filter, $rootScope) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.sortingOrder = 'about_id';
	$scope.pageSizes = [5,10,25,50];
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 5;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$rootScope.setLoading(true);
	aboutRepo.fetchAbout().success(function(data) {
		$scope.items = data;
		$scope.search = function () {
			$scope.filteredItems = $filter('filter')($scope.items, function (item) {
				for(var attr in item) {
					if (searchMatch(item[attr], $scope.query))
						return true;
				}
				return false;
			});
			$scope.currentPage = 0;
			$scope.groupToPages();
		};
		$scope.search();
		$scope.setLoading(false);
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'About data status: ' + status,body:'There was a problem.'});
	});
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	$scope.perPage = function () {
		$scope.groupToPages();
	};

	$scope.groupToPages = function () {
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	};

	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
		return false;
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedItems.length - 1) {
			$scope.currentPage++;
		}
		return false;
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

}])
.controller('editAboutCtrl', ['$scope', '$rootScope', 'noty', '$location', '$sce', '$stateParams', 'getAboutPage', 'updateAbout', '$filter', function($scope, $rootScope, noty, $location, $sce, $stateParams, getAboutPage, updateAbout, $filter) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);

	var id = $stateParams.id;

	getAboutPage.fetchAboutByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.about = data[i];
				$rootScope.aboutid = $scope.about.about_id;
			}
			$rootScope.setLoading(false);
		}
		else {
			$rootScope.setLoading(false);
			$location.path("/about");
		}
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'About data status: ' + status,body:'There was a problem.'});
	});

	$scope.update = function(about){
	  updateAbout.putAboutByID(id, about).success(function(data) {
	    $scope.about = data;
	    $scope.noty.add({title:'About data',body:'About page has been updated.'});
	  }).
	  error(function(data, status, headers, config) {
	    $scope.noty.add({type: 'Error', title:'About data status: ' + status,body:'There was a problem.'});
	  });
	};

	$scope.renderItemText = function(html){
		return $sce.trustAsHtml(html);
	};

}])
.controller('contactCtrl', ['$scope', 'contactRepo', '$filter', '$rootScope', function ($scope, contactRepo, $filter, $rootScope) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.sortingOrder = 'contact_id';
	$scope.pageSizes = [5,10,25,50];
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 5;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$rootScope.setLoading(true);
	aboutRepo.fetchContact().success(function(data) {
		$scope.items = data;
		$scope.search = function () {
			$scope.filteredItems = $filter('filter')($scope.items, function (item) {
				for(var attr in item) {
					if (searchMatch(item[attr], $scope.query))
						return true;
				}
				return false;
			});
			$scope.currentPage = 0;
			$scope.groupToPages();
		};
		$scope.search();
		$scope.setLoading(false);
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Contact data status: ' + status,body:'There was a problem.'});
	});
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	$scope.perPage = function () {
		$scope.groupToPages();
	};

	$scope.groupToPages = function () {
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	};

	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
		return false;
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedItems.length - 1) {
			$scope.currentPage++;
		}
		return false;
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

}])
.controller('editContactCtrl', ['$scope', '$rootScope', 'noty', '$location', '$sce', '$stateParams', 'getContactPage', 'updateContact', '$filter', function($scope, $rootScope, noty, $location, $sce, $stateParams, getContactPage, updateContact, $filter) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);

	var id = $stateParams.id;

	getContactPage.fetchContactByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.contact = data[i];
				$rootScope.contactid = $scope.contact.contact_id;
			}
			$rootScope.setLoading(false);
		}
		else {
			$rootScope.setLoading(false);
			$location.path("/contact");
		}
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Contact data status: ' + status,body:'There was a problem.'});
	});

	$scope.update = function(contact){
	  updateContact.putContactByID(id, contact).success(function(data) {
	    $scope.contact = data;
	    $scope.noty.add({title:'Contact data',body:'Contact page has been updated.'});
	  }).
	  error(function(data, status, headers, config) {
	    $scope.noty.add({type: 'Error', title:'Contact data status: ' + status,body:'There was a problem.'});
	  });
	};

	$scope.renderItemText = function(html){
		return $sce.trustAsHtml(html);
	};

}])
.controller('settingsCtrl', ['$scope', 'settingsRepo', '$filter', '$rootScope', function ($scope, settingsRepo, $filter, $rootScope) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.sortingOrder = 'SiteName';
	$scope.pageSizes = [5,10,25,50];
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 5;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$rootScope.setLoading(true);
	settingsRepo.fetchSettings().success(function(data) {
		$scope.items = data;
		$scope.search = function () {
			$scope.filteredItems = $filter('filter')($scope.items, function (item) {
				for(var attr in item) {
					if (searchMatch(item[attr], $scope.query))
						return true;
				}
				return false;
			});
			$scope.currentPage = 0;
			$scope.groupToPages();
		};
		$scope.search();
		$scope.setLoading(false);
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Settings data status: ' + status,body:'There was a problem.'});
	});
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	$scope.perPage = function () {
		$scope.groupToPages();
	};

	$scope.groupToPages = function () {
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	};

	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
		return false;
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedItems.length - 1) {
			$scope.currentPage++;
		}
		return false;
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

}])
.controller('editSettingsCtrl', ['$scope', '$rootScope', 'noty', '$location', '$stateParams', 'getSetting', 'updateSetting', '$filter', '$sce', 'asyncScript', function($scope, $rootScope, noty, $location, $stateParams, getSetting, updateSetting, $filter, $sce, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);
	asyncScript.load('jasny',function(){});

	var id = $stateParams.id;

	getSetting.fetchSettingByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.setting = data[i];
				$rootScope.settingid = $scope.setting.id;
				$scope.sitename = $scope.setting.SiteName;
				if ($scope.setting.logo === '') {
					$scope.logoClass = 'new';
					$scope.setting.logo = '';
				}
				else {
					$scope.logoClass = 'exists';
					$scope.setting.logo = '../images/'+$scope.setting.logo;
				}
			}
			$rootScope.setLoading(false);
		}
		else {
			$rootScope.setLoading(false);
			$location.path("/settings");
		}
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Setting data status: ' + status,body:'There was a problem.'});
	});

	$scope.update = function(setting){
		if($scope.logos){
			if($scope.logos.length > 0){
				var vFD = new FormData(document.getElementById('EditSettingsForm'));
				var oXHR = new XMLHttpRequest();
				oXHR.open('POST', 'api/update_logo/'+id);
				oXHR.send(vFD);
			}
			else {
				$scope.setting.logo = '';
			}
		}
	  updateSetting.putSettingByID(id, setting).success(function(data) {
	    $scope.setting = data;
	    $scope.noty.add({title:'Setting data',body:'Setting has been updated.'});
	  }).
	  error(function(data, status, headers, config) {
	    $scope.noty.add({type: 'Error', title:'Setting data status: ' + status,body:'There was a problem.'});
	  });
	};

}])
.controller('supeCtrl', ['$scope', 'supeRepo', '$filter', '$rootScope', function ($scope, supeRepo, $filter, $rootScope) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.sortingOrder = 'itemPassword';
	$scope.pageSizes = [5,10,25,50];
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 5;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$rootScope.setLoading(true);
	supeRepo.fetchSupe().success(function(data) {
		$scope.items = data;
		$scope.search = function () {
			$scope.filteredItems = $filter('filter')($scope.items, function (item) {
				for(var attr in item) {
					if (searchMatch(item[attr], $scope.query))
						return true;
				}
				return false;
			});
			$scope.currentPage = 0;
			$scope.groupToPages();
		};
		$scope.search();
		$scope.setLoading(false);
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Supervisor Password status: ' + status,body:'There was a problem.'});
	});
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	$scope.perPage = function () {
		$scope.groupToPages();
	};

	$scope.groupToPages = function () {
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	};

	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
		return false;
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedItems.length - 1) {
			$scope.currentPage++;
		}
		return false;
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

}])
.controller('editSupeCtrl', ['$scope', '$rootScope', 'noty', '$location', '$stateParams', 'getSupePassword', 'updateSupe', '$filter', function($scope, $rootScope, noty, $location, $stateParams, getSupePassword, updateSupe, $filter) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);

	var id = $stateParams.id;

	getSupePassword.fetchSupeByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.supe = data[i];
				$rootScope.id = $scope.supe.id;
			}
			$rootScope.setLoading(false);
		}
		else {
			$rootScope.setLoading(false);
			$location.path("/supe");
		}
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Supervisor Password status: ' + status,body:'There was a problem.'});
	});

	$scope.update = function(supe){
	  updateSupe.putSupeByID(id, supe).success(function(data) {
	    $scope.supe = data;
	    $scope.noty.add({title:'Supervisor Password',body:'Supervisor Password has been updated.'});
	  }).
	  error(function(data, status, headers, config) {
	    $scope.noty.add({type: 'Error', title:'Supervisor Password status: ' + status,body:'There was a problem.'});
	  });
	};

}])
.controller('usersCtrl', ['$scope', 'userRepo', '$filter', '$rootScope', function ($scope, userRepo, $filter, $rootScope) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.sortingOrder = 'firstName';
	$scope.pageSizes = [5,10,25,50];
	$scope.reverse = false;
	$scope.filteredItems = [];
	$scope.groupedItems = [];
	$scope.itemsPerPage = 5;
	$scope.pagedItems = [];
	$scope.currentPage = 0;
	$rootScope.setLoading(true);
	userRepo.fetchUsers().success(function(data) {
		$scope.items = data;
		$scope.search = function () {
			$scope.filteredItems = $filter('filter')($scope.items, function (item) {
				for(var attr in item) {
					if (searchMatch(item[attr], $scope.query))
						return true;
				}
				return false;
			});
			$scope.currentPage = 0;
			$scope.groupToPages();
		};
		$scope.search();
		$scope.setLoading(false);
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Users data status: ' + status,body:'There was a problem.'});
	});
	var searchMatch = function (haystack, needle) {
		if (!needle) {
			return true;
		}
		return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	};

	$scope.perPage = function () {
		$scope.groupToPages();
	};

	$scope.groupToPages = function () {
		$scope.pagedItems = [];

		for (var i = 0; i < $scope.filteredItems.length; i++) {
			if (i % $scope.itemsPerPage === 0) {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
			} else {
				$scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
			}
		}
	};

	$scope.range = function (start, end) {
		var ret = [];
		if (!end) {
			end = start;
			start = 0;
		}
		for (var i = start; i < end; i++) {
			ret.push(i);
		}
		return ret;
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
		return false;
	};

	$scope.nextPage = function () {
		if ($scope.currentPage < $scope.pagedItems.length - 1) {
			$scope.currentPage++;
		}
		return false;
	};

	$scope.setPage = function () {
		$scope.currentPage = this.n;
	};

}])
.controller('userProfileCtrl', ['$scope', '$rootScope', '$stateParams', 'getProfile', 'saveProfile', 'asyncScript', function ($scope, $rootScope, $stateParams, getProfile, saveProfile, asyncScript) {
	var id = $stateParams.id;
	asyncScript.load('jasny',function(){});
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.setLoading(true);
	$rootScope.showPlayer=false;
	getProfile.fetchProfileByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.profile = data[i];

				if ($scope.profile.portrait === '') {
					$scope.profile.portraitExists = false;
					$scope.portraitClass = 'new';
				}
				else {
					$scope.profile.portraitExists = true;
					$scope.portraitClass = 'exists';
					$scope.path = "img/people/";
				}
			}
			$rootScope.setLoading(false);
		}
		else {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Profile data',body:'There was a problem fetching the profile data. Please try again...?'});
		}
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Profile data status: ' + status,body:'There was a problem.'});
	});

	$scope.submitted = false;
	$scope.update = function(profile){
		$rootScope.setLoading(true);
		if ($scope.registrationForm.$valid) {
			var iBytesUploaded = 0;
			var iBytesTotal = 0;
			var iPreviousBytesLoaded = 0;
			var iMaxFilesize = 1048576;
			var oTimer = 0;
			var sResultFileSize = '';

			var oProgress = document.getElementById('progress');
			oProgress.style.display = 'block';
			oProgress.style.width = '0px';

			function secondsToTime(secs) {
		    var hr = Math.floor(secs / 3600);
		    var min = Math.floor((secs - (hr * 3600))/60);
		    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

		    if (hr < 10) {hr = "0" + hr; }
		    if (min < 10) {min = "0" + min;}
		    if (sec < 10) {sec = "0" + sec;}
		    if (hr) {hr = "00";}
		    return hr + ':' + min + ':' + sec;
			};

			function bytesToSize(bytes) {
		    var sizes = ['Bytes', 'KB', 'MB'];
		    if (bytes == 0) return 'n/a';
		    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
			};

			function uploadProgress(e) {
		    if (e.lengthComputable) {
			  iBytesUploaded = e.loaded;
			  iBytesTotal = e.total;
			  var iPercentComplete = Math.round(e.loaded * 100 / e.total);
			  var iBytesTransfered = bytesToSize(iBytesUploaded);

			  document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
			  document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
			  document.getElementById('b_transfered').innerHTML = iBytesTransfered;
			  if (iPercentComplete == 100) {
				var oUploadResponse = document.getElementById('upload_response');
				oUploadResponse.innerHTML = '<h1>Please wait...processing</h1>';
				oUploadResponse.style.display = 'block';
			  }
		    } else {
			  document.getElementById('progress').innerHTML = 'unable to compute';
		    }
			}

			function uploadFinish(e) {
		    var oUploadResponse = document.getElementById('upload_response');
		    oUploadResponse.innerHTML = e.target.responseText;
		    oUploadResponse.style.display = 'block';

		    document.getElementById('progress_percent').innerHTML = '100%';
		    document.getElementById('progress').style.width = '100%';
		    document.getElementById('remaining').innerHTML = '00:00:00';

		    clearInterval(oTimer);
			}

			function uploadError(e) { // upload error
		    document.getElementById('error2').style.display = 'block';
		    clearInterval(oTimer);
			}

			function uploadAbort(e) { // upload abort
		    document.getElementById('abort').style.display = 'block';
		    clearInterval(oTimer);
			}

			var vFD = new FormData(document.getElementById('registrationForm'));

			if($scope.portraits){
				if($scope.portraits.length > 0){
					var oXHR = new XMLHttpRequest();
					oXHR.upload.addEventListener('progress', uploadProgress, false);
					oXHR.addEventListener('load', uploadFinish, false);
					oXHR.addEventListener('error', uploadError, false);
					oXHR.addEventListener('abort', uploadAbort, false);
					oXHR.open('POST', 'api/handlePortrait.php');
					oXHR.send(vFD);

					for (var i = 0; i < $scope.portraits.length; i++) {
						$scope.profile.portrait = $scope.portraits[i].name;
					}
					$scope.profile.portraitExists = true;
				}
				else {
					$scope.profile.portrait = '';
					$scope.profile.portraitExists = false;
				}
			}

			saveProfile.putProfileByID(id, profile).success(function(data) {
				$scope.profile = data;
				$rootScope.setLoading(false);
				$scope.noty.add({title:'Profile data',body:'Profile has been updated.'});
			}).
			error(function(data, status, headers, config) {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Profile data status: ' + status,body:'There was a problem.'});
			});
		}
		else {
			$rootScope.setLoading(false);
			$scope.registrationForm.submitted = true;
		}
	};

}])
.controller('artistsCtrl', ['$scope', '$rootScope', '$filter', 'artistsRepo', 'deleteArtists', 'ngTableParams',  function($scope, $rootScope, $filter, artistsRepo, deleteArtists, ngTableParams) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.setLoading(true);
	$rootScope.showPlayer=false;

	$scope.refresh = function() {
		artistsRepo.fetchArtists().success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.artistTotal = $scope.data.length;

				for (var i = 0; i < $scope.data.length; i++) {
					if($scope.data[i].active==='y') {
						$scope.data[i].activeTxt = "yes";
					}
					else if($scope.data[i].active==='n') {
						$scope.data[i].activeTxt = "no";
					}
				}
				$scope.tableParams.reload();
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Artist data',body:'There was a problem fetching the artist data. Please try again...?'});
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {
		    INartistName: ''
		},
		sorting: {
		    INartistName: 'asc'
		}
	}, {
		total: function () { return getData().length; },
		getData: function($defer, params) {
			var data = $scope.data;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		$scope: { $data: {} }
	});

	$scope.delete = function(artist) {
		var deleteArtist = confirm('Are you absolutely sure you want to delete ' + artist.INartistName + '?');
		if (deleteArtist) {
			deleteArtists.deleteArtistByID(artist.id);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

	$scope.refresh();
}])
.controller('artistsNoSongsCtrl', ['$scope', '$rootScope', '$filter', 'artistsNoSongsRepo', 'deleteArtists', 'ngTableParams',  function($scope, $rootScope, $filter, artistsNoSongsRepo, deleteArtists, ngTableParams) {

	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.setLoading(true);
	$rootScope.showPlayer=false;

	$scope.refresh = function() {
		artistsNoSongsRepo.fetchArtists().success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.artistTotal = $scope.data.length;

				for (var i = 0; i < $scope.data.length; i++) {
					if($scope.data[i].active==='y') {
						$scope.data[i].activeTxt = "yes";
					}
					else if($scope.data[i].active==='n') {
						$scope.data[i].activeTxt = "no";
					}
				}
				$scope.tableParams.reload();
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Artist data',body:'There was a problem fetching the artist data. Please try again...?'});
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {
		    INartistName: ''
		},
		sorting: {
		    INartistName: 'asc'
		}
	}, {
		total: function () { return getData().length; },
		getData: function($defer, params) {
			var data = $scope.data;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		$scope: { $data: {} }
	});

	$scope.refresh();

	$scope.delete = function(artist) {
		var deleteArtist = confirm('Are you absolutely sure you want to delete ' + artist.INartistName + '?');
		if (deleteArtist) {
			deleteArtists.deleteArtistByID(artist.id);
			$scope.refresh();
		}
	};
}])
.controller('editArtistCtrl', ['$scope', '$rootScope', 'noty', '$location', '$stateParams', 'getArtist', 'getArtistSongs', 'updateArtist', 'getArtistLinks', 'getMaxHomeSort', 'deleteArtists', 'getCompInfoArtist', '$filter', '$sce', 'asyncScript', function($scope, $rootScope, noty, $location, $stateParams, getArtist, getArtistSongs, updateArtist, getArtistLinks, getMaxHomeSort, deleteArtists, getCompInfoArtist, $filter, $sce, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;
	$rootScope.setLoading(true);
	asyncScript.load('jasny',function(){});

	var id = $stateParams.id;
	getArtist.fetchArtistByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.artist = data[i];
				$rootScope.artistid = $scope.artist.INartistID;
				$scope.name = $scope.artist.INartistName;
				if($scope.artist.marker) {
					$scope.showname = $scope.artist.marker + ' ' + $scope.artist.INartistName;
				}
				else {
					$scope.showname = $scope.artist.INartistName;
				}
				if ($scope.artist.album_pic === '') {
					$scope.albumClass = 'new';
					$scope.artist.albumImage = '';
				}
				else {
					$scope.albumClass = 'exists';
					$scope.artist.albumImage = '../images/artists/'+$scope.artist.album_pic;
				}
				if ($scope.artist.slider_pic === '') {
					$scope.sliderClass = 'new';
					$scope.artist.sliderImage = '';
				}
				else {
					$scope.sliderClass = 'exists';
					$scope.artist.sliderImage = '../images/artists/'+$scope.artist.slider_pic;
				}

				$scope.artist.dateAdded = $filter('timestampDateFormat')($scope.artist.date_added);
			}
			getArtistLinks.fetchArtistNavLinks($scope.name).success(function(data) {
				$scope.linksdata = data;
				for (var i = 0; i < $scope.linksdata.length; i++) {
					$scope.links = $scope.linksdata[i];
				}
			}).
			error(function(data, status, headers, config) {
				$scope.noty.add({type: 'Error', title:'Artist links data status: '  + status,body:status,body:'There was a problem.'});
			});

			getMaxHomeSort.fetchMaxHomeSort().success(function(data) {
				$scope.max = data;
			}).
			error(function(data, status, headers, config) {
				$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
			});

			$rootScope.setLoading(false);
		}
		else {
			$rootScope.setLoading(false);
			$location.path("/artists");
		}
	}).
	error(function(data, status, headers, config) {
		$rootScope.setLoading(false);
		$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
	});

	getArtistSongs.fetchSongsByArtist(id).success(function(data) {
		if(data){
			$scope.songs = data;
			$scope.songCount = $scope.songs.length;
			for (var i = 0; i < $scope.songs.length; i++) {
				if($scope.songs[i].roster_flag==='y') {
					$scope.songs[i].rosterClass = "label-success";
					$scope.songs[i].rosterTxt = "yes";
				}
				else if($scope.songs[i].roster_flag==='n') {
					$scope.songs[i].rosterClass = "label-warning";
					$scope.songs[i].rosterTxt = "no";
				}
			}
		}
	}).
	error(function(data, status, headers, config) {
		$scope.noty.add({type: 'Error', title:'Song data status: '  + status,body:status,body:'There was a problem.'});
	});

	getCompInfoArtist.fetchCompByArtist(id).success(function(data) {
		$scope.compinfo = data;
		if ($scope.compinfo.length==0) {
			$scope.emptyCompInfo=true;
		}
		else {
			$scope.emptyCompInfo=false;
		}
	}).
	error(function(data, status, headers, config) {
		$scope.noty.add({type: 'Error', title:'Song data status: '  + status,body:status,body:'There was a problem.'});
	});

	$scope.update = function(artist){
		if($scope.album_pics){
			if($scope.album_pics.length > 0){
				var vFD = new FormData(document.getElementById('EditArtistForm'));
				var oXHR = new XMLHttpRequest();
				oXHR.open('POST', 'api/update_album/'+id);
				oXHR.send(vFD);
			}
			else {
				$scope.artist.album_pic = '';
			}
		}

		if($scope.slider_pics){
			if($scope.slider_pics.length > 0){
				var vFD2 = new FormData(document.getElementById('EditArtistForm'));
				var oXHR2 = new XMLHttpRequest();
				oXHR2.open('POST', 'api/update_slider/'+id);
				oXHR2.send(vFD2);
			}
			else {
				$scope.artist.slider_pic = '';
			}
		}

		updateArtist.putArtistByID(id, artist).success(function(data) {
			$scope.artist = data;
			$scope.refreshCounters();
			$scope.noty.add({title:'Artist data',body:'Artist has been updated.'});
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.delete = function(artist) {
		var deleteArtist = confirm('Are you absolutely sure you want to delete ' + artist.INartistName + '?');
		if (deleteArtist) {
			deleteArtists.deleteArtistByID(artist.INartistID);
			$scope.refreshCounters();
			$location.path("/artists");
		}
	};

	$scope.renderItemText = function(html){
		return $sce.trustAsHtml(html);
	};
}])
.controller('addArtistCtrl', ['$scope', '$rootScope', 'addArtists', '$location', 'getMaxHomeSort', 'asyncScript',  function($scope, $rootScope, addArtists, $location, getMaxHomeSort, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};

	getMaxHomeSort.fetchMaxHomeSort().success(function(data) {
		$scope.max = data;
	}).
	error(function(data, status, headers, config) {
		$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
	});

	asyncScript.load('jasny',function(){
	});

	$scope.master = {};
	$scope.artist = {};
	$scope.artist.marker = '';
	$scope.artist.INroster_desc = '';
	$scope.artist.INlabel = '';
	$scope.artist.INsync = '';
	$scope.artist.album_pic = '';
	$scope.artist.active = 'y';
	$scope.artist.home_status = 'n';
	$scope.artist.home_order = 0;
	$scope.artist.slider_status = 'n';
	$scope.artist.slider_pic = '';

	$scope.add_new = function(artist, AddArtistForm) {
		$rootScope.setLoading(true);
		if($scope.album_pics){
			if($scope.album_pics.length > 0){
				var vFD = new FormData(document.getElementById('AddArtistForm'));
				var oXHR = new XMLHttpRequest();
				oXHR.open('POST', 'api/upload_album');
				oXHR.send(vFD);
			}
			else {
				$scope.artist.album_pic = '';
			}
		}
		else {
			$scope.artist.album_pic = '';
		}

		if($scope.slider_pics){
			if($scope.slider_pics.length > 0){
				var vFD2 = new FormData(document.getElementById('AddArtistForm'));
				var oXHR2 = new XMLHttpRequest();
				oXHR2.open('POST', 'api/upload_slider');
				oXHR2.send(vFD2);
			}
			else {
				$scope.artist.slider_pic = '';
			}
		}
		else {
			$scope.artist.slider_pic = '';
		}

		addArtists.addNewArtist(artist).success(function(data) {
			var id = data.id;
			$scope.reset();
			$rootScope.setLoading(false);
			$scope.refreshCounters();
			$location.path("/edit-artist/"+id).replace();
		});

		$scope.reset = function() {
			$scope.artist = angular.copy($scope.master);
		};

		$scope.reset();
	};
}])
.controller('songsCtrl', ['$scope', '$rootScope', '$filter', 'songsRepo', 'deleteSongs', 'ngTableParams',  function($scope, $rootScope, $filter, songsRepo, deleteSongs, ngTableParams) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.setLoading(true);
	$rootScope.showPlayer=true;

	$scope.refresh = function() {
		songsRepo.fetchSongs().success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.songsTotal = $scope.data.length;

				for (var i = 0; i < $scope.data.length; i++) {
					if($scope.data[i].roster_flag==='y') {
						$scope.data[i].rosterTxt = "yes";
					}
					else if($scope.data[i].roster_flag==='n') {
						$scope.data[i].rosterTxt = "no";
					}
				}

				$scope.songsTableParams.reload();
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Song data',body:'There was a problem fetching the song data. Please try again...?'});
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Song data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.songsTableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {
		    song_title: ''
		},
		sorting: {
		    song_title: 'asc'
		}
	}, {
		total: function () { return getData().length; },
		getData: function($defer, params) {
			var data = $scope.data;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		$scope: { $data: {} }
	});

	$scope.delete = function(song) {
		var deleteSong = confirm('Are you absolutely sure you want to delete ' + song.song_title + '?');
		if (deleteSong) {
			deleteSongs.deleteSongByID(song.song_id);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

	$scope.refresh();
}])
.controller('songsNoFileCtrl', ['$scope', '$rootScope', '$filter', 'songsNoFileRepo', 'deleteSongs', 'ngTableParams',  function($scope, $rootScope, $filter, songsNoFileRepo, deleteSongs, ngTableParams) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.setLoading(true);
	$rootScope.showPlayer=false;

	$scope.refresh = function() {
		songsNoFileRepo.fetchSongs().success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.songsTotal = $scope.data.length;

				for (var i = 0; i < $scope.data.length; i++) {
					if($scope.data[i].roster_flag==='y') {
						$scope.data[i].rosterTxt = "yes";
					}
					else if($scope.data[i].roster_flag==='n') {
						$scope.data[i].rosterTxt = "no";
					}
				}

				$scope.tableParams.reload();
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Artist data',body:'There was a problem fetching the artist data. Please try again...?'});
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {
		    song_title: ''
		},
		sorting: {
		    song_title: 'asc'
		}
	}, {
		total: function () { return getData().length; },
		getData: function($defer, params) {
			var data = $scope.data;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		$scope: { $data: {} }
	});

	$scope.delete = function(song) {
		var deleteSong = confirm('Are you absolutely sure you want to delete ' + song.song_title + '?');
		if (deleteSong) {
			deleteSongs.deleteSongByID(song.song_id);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

	$scope.refresh();

}])
.controller('songsNoCompCtrl', ['$scope', '$rootScope', '$filter', 'songsNoCompRepo', 'deleteSongs', 'ngTableParams',  function($scope, $rootScope, $filter, songsNoCompRepo, deleteSongs, ngTableParams) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.setLoading(true);
	$rootScope.showPlayer=true;

	$scope.refresh = function() {
		songsNoCompRepo.fetchSongs().success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.songsTotal = $scope.data.length;

				for (var i = 0; i < $scope.data.length; i++) {
					if($scope.data[i].roster_flag==='y') {
						$scope.data[i].rosterTxt = "yes";
					}
					else if($scope.data[i].roster_flag==='n') {
						$scope.data[i].rosterTxt = "no";
					}
				}

				$scope.tableParams.reload();
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Artist data',body:'There was a problem fetching the artist data. Please try again...?'});
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {
		    song_title: ''
		},
		sorting: {
		    song_title: 'asc'
		}
	}, {
		total: function () { return getData().length; },
		getData: function($defer, params) {
			var data = $scope.data;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		$scope: { $data: {} }
	});

	$scope.delete = function(song) {
		var deleteSong = confirm('Are you absolutely sure you want to delete ' + song.song_title + '?');
		if (deleteSong) {
			deleteSongs.deleteSongByID(song.song_id);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

	$scope.refresh();

}])
.controller('addSongCtrl', ['$scope', '$rootScope', 'addSongs', 'getArtistsForSelector', '$location', 'asyncScript', '$timeout',  function($scope, $rootScope, addSongs, getArtistsForSelector, $location, asyncScript, $timeout) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;
	asyncScript.load('jasny',function(){});

	getArtistsForSelector.fetchArtistsSelector().success(function(data) {
		for (var i = 0; i < data.length; i++) {
			if(data[i].marker) {
				data[i].artist_name = data[i].marker + " " + data[i].INartistName;
			}
			else {
				data[i].artist_name = data[i].INartistName;
			}
		}
		$scope.artists = data;
	});

	$scope.master = {};
	$scope.song = {};
	$scope.song.song_title = '';
	$scope.song.song_comments = '';
	$scope.song.roster_flag = 'y';
	$scope.song.song_file = ''
	$scope.song.artistID = '';

	$scope.add_new = function(song, AddSongForm) {
		$rootScope.setLoading(true);

		addSongs.addNewSong(song).success(function(data) {
			var id = data.id;

			if($scope.song_files){
				if($scope.song_files.length > 0){
					var iBytesUploaded = 0;
					var iBytesTotal = 0;
					var iPreviousBytesLoaded = 0;
					var iMaxFilesize = 1048576;
					var oTimer = 0;
					var sResultFileSize = '';

					var oProgress = document.getElementById('progress');
					oProgress.style.display = 'block';
					oProgress.style.width = '0px';

					function secondsToTime(secs) {
				    var hr = Math.floor(secs / 3600);
				    var min = Math.floor((secs - (hr * 3600))/60);
				    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

				    if (hr < 10) {hr = "0" + hr; }
				    if (min < 10) {min = "0" + min;}
				    if (sec < 10) {sec = "0" + sec;}
				    if (hr) {hr = "00";}
				    return hr + ':' + min + ':' + sec;
					};

					function bytesToSize(bytes) {
				    var sizes = ['Bytes', 'KB', 'MB'];
				    if (bytes == 0) return 'n/a';
				    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
				    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
					};

					function uploadProgress(e) {
						if (e.lengthComputable) {
							iBytesUploaded = e.loaded;
							iBytesTotal = e.total;
							var iPercentComplete = Math.round(e.loaded * 100 / e.total);
							var iBytesTransfered = bytesToSize(iBytesUploaded);

							document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
							document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
							document.getElementById('b_transfered').innerHTML = iBytesTransfered;
							if (iPercentComplete == 100) {
								var oUploadResponse = document.getElementById('upload_response');
								oUploadResponse.innerHTML = '<span>Please wait...processing</span>';
								oUploadResponse.style.display = 'block';
							}
						} else {
							document.getElementById('progress').innerHTML = 'unable to compute';
						}
					}

					function uploadFinish(e) {
						var oUploadResponse = document.getElementById('upload_response');
						oUploadResponse.innerHTML = e.target.responseText;
						oUploadResponse.style.display = 'block';

						document.getElementById('progress_percent').innerHTML = '100%';
						document.getElementById('progress').style.width = '100%';
						document.getElementById('remaining').innerHTML = '00:00:00';

						clearInterval(oTimer);

						$timeout(function() {
							$rootScope.setLoading(false);
							$scope.refreshCounters();
							$location.path("/edit-song/"+id).replace();
							$scope.reset();
						}, 1000);
					}

					function uploadError(e) {
						document.getElementById('error2').style.display = 'block';
						clearInterval(oTimer);
					}

					function uploadAbort(e) {
						document.getElementById('abort').style.display = 'block';
						clearInterval(oTimer);
					}

					var vFD = new FormData(document.getElementById('AddSongForm'));
					var oXHR = new XMLHttpRequest();
					oXHR.upload.addEventListener('progress', uploadProgress, false);
					oXHR.addEventListener('load', uploadFinish, false);
					oXHR.addEventListener('error', uploadError, false);
					oXHR.addEventListener('abort', uploadAbort, false);
					oXHR.open('POST', 'api/update_mp3/'+id);
					oXHR.send(vFD);
				}
				else {
					$scope.song.song_file = '';
					$rootScope.setLoading(false);
					$scope.refreshCounters();
					$location.path("/edit-song/"+id).replace();
					$scope.reset();
				}
			}
			else {
				$scope.song.song_file = '';
				$rootScope.setLoading(false);
				$scope.refreshCounters();
				$location.path("/edit-song/"+id).replace();
				$scope.reset();
			}
		});

		$scope.reset = function() {
			$scope.song = angular.copy($scope.master);
		};

		//$scope.reset();
	};
}])
.controller('addSongToArtist', ['$scope', '$rootScope', '$location', '$stateParams', 'getArtist', 'addSongs', '$timeout', 'asyncScript', function($scope, $rootScope, $location, $stateParams, getArtist, addSongs, $timeout, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;
	$rootScope.setLoading(true);
	asyncScript.load('jasny',function(){});

	var id = $stateParams.id;
	$scope.artistid = $stateParams.id;

	$scope.refresh = function() {
		getArtist.fetchArtistByID(id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.artist = data[i];
					$rootScope.artistid = $scope.artist.INartistID;
					$scope.name = $scope.artist.INartistName;
					if($scope.artist.marker) {
						$scope.showname = $scope.artist.marker + ' ' + $scope.artist.INartistName;
					}
					else {
						$scope.showname = $scope.artist.INartistName;
					}
				}

				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/artists");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.refresh();

	$scope.master = {};
	$scope.song = {};
	$scope.song.song_title = '';
	$scope.song.song_comments = '';
	$scope.song.roster_flag = 'y';
	$scope.song.song_file = ''
	$scope.song.artistID = id;

	$scope.add_new = function(song, AddSongToArtistForm) {
		$rootScope.setLoading(true);

		addSongs.addNewSong(song).success(function(data) {
			var id = data.id;

			if($scope.song_files){
				if($scope.song_files.length > 0){
					var iBytesUploaded = 0;
					var iBytesTotal = 0;
					var iPreviousBytesLoaded = 0;
					var iMaxFilesize = 1048576;
					var oTimer = 0;
					var sResultFileSize = '';

					var oProgress = document.getElementById('progress');
					oProgress.style.display = 'block';
					oProgress.style.width = '0px';

					function secondsToTime(secs) {
				    var hr = Math.floor(secs / 3600);
				    var min = Math.floor((secs - (hr * 3600))/60);
				    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

				    if (hr < 10) {hr = "0" + hr; }
				    if (min < 10) {min = "0" + min;}
				    if (sec < 10) {sec = "0" + sec;}
				    if (hr) {hr = "00";}
				    return hr + ':' + min + ':' + sec;
					};

					function bytesToSize(bytes) {
				    var sizes = ['Bytes', 'KB', 'MB'];
				    if (bytes == 0) return 'n/a';
				    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
				    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
					};

					function uploadProgress(e) {
						if (e.lengthComputable) {
							iBytesUploaded = e.loaded;
							iBytesTotal = e.total;
							var iPercentComplete = Math.round(e.loaded * 100 / e.total);
							var iBytesTransfered = bytesToSize(iBytesUploaded);

							document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
							document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
							document.getElementById('b_transfered').innerHTML = iBytesTransfered;
							if (iPercentComplete == 100) {
								var oUploadResponse = document.getElementById('upload_response');
								oUploadResponse.innerHTML = '<span>Please wait...processing</span>';
								oUploadResponse.style.display = 'block';
							}
						} else {
							document.getElementById('progress').innerHTML = 'unable to compute';
						}
					}

					function uploadFinish(e) {
						var oUploadResponse = document.getElementById('upload_response');
						oUploadResponse.innerHTML = e.target.responseText;
						oUploadResponse.style.display = 'block';

						document.getElementById('progress_percent').innerHTML = '100%';
						document.getElementById('progress').style.width = '100%';
						document.getElementById('remaining').innerHTML = '00:00:00';

						clearInterval(oTimer);

						$timeout(function() {
							$rootScope.setLoading(false);
							$scope.refreshCounters();
							$location.path("/edit-artist/"+$scope.artistid).replace();
							$scope.reset();
						}, 1000);
					}

					function uploadError(e) {
						document.getElementById('error2').style.display = 'block';
						clearInterval(oTimer);
					}

					function uploadAbort(e) {
						document.getElementById('abort').style.display = 'block';
						clearInterval(oTimer);
					}

					var vFD = new FormData(document.getElementById('AddSongToArtistForm'));
					var oXHR = new XMLHttpRequest();
					oXHR.upload.addEventListener('progress', uploadProgress, false);
					oXHR.addEventListener('load', uploadFinish, false);
					oXHR.addEventListener('error', uploadError, false);
					oXHR.addEventListener('abort', uploadAbort, false);
					oXHR.open('POST', 'api/update_mp3/'+id);
					oXHR.send(vFD);
				}
				else {
					$scope.song.song_file = '';
					$rootScope.setLoading(false);
					$scope.refreshCounters();
					$location.path("/edit-artist/"+$scope.artistid).replace();
					$scope.reset();
				}
			}
			else {
				$scope.song.song_file = '';
				$rootScope.setLoading(false);
				$scope.refreshCounters();
				$location.path("/edit-artist/"+$scope.artistid).replace();
				$scope.reset();
			}
		});

		$scope.reset = function() {
			$scope.song = angular.copy($scope.master);
		};
	};
}])
.controller('editSongCtrl', ['$scope', '$rootScope', 'noty', '$location', '$stateParams', 'getSong', 'getSongLinks', 'updateSong', 'updateSongCount', 'updateSongDownloads', 'deleteSongs', 'removeSongFile', '$filter', 'asyncScript', 'getCompInfoSong', '$timeout', function($scope, $rootScope, noty, $location, $stateParams, getSong, getSongLinks, updateSong, updateSongCount, updateSongDownloads, deleteSongs, removeSongFile, $filter, asyncScript, getCompInfoSong, $timeout) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;
	$rootScope.setLoading(true);

	asyncScript.load('jasny',function(){});

	var id = $stateParams.id;

	$scope.refresh = function() {
		getSong.fetchSongByID(id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.song = data[i];
					$scope.name = $scope.song.song_title;
					$scope.artistID = $scope.song.artistID;
					$rootScope.songid = $scope.song.song_id;
					$scope.song.dateAdded = $filter('timestampDateFormat')($scope.song.date_added);
					$scope.song.lastDownload = $filter('timestampDateTimeFormat')($scope.song.last_download);
					$scope.song.lastPlayed = $filter('timestampDateTimeFormat')($scope.song.last_played);
					// clear song_files from model
					$scope.song_files = '';
				}

				getSongLinks.fetchSongNavLinks($scope.artistID, $scope.name).success(function(data) {
					$scope.linksdata = data;
					for (var i = 0; i < $scope.linksdata.length; i++) {
						$scope.links = $scope.linksdata[i];
					}
				}).
				error(function(data, status, headers, config) {
					$scope.noty.add({type: 'Error', title:'Song links data status: '  + status,body:status,body:'There was a problem.'});
				});

				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/songs");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Song data status: ' + status,body:'There was a problem.'});
		});

		getCompInfoSong.fetchCompBySong(id).success(function(data) {
			$scope.compinfo = data;
			if ($scope.compinfo.length==0) {
				$scope.emptyCompInfo=true;
			}
			else {
				$scope.emptyCompInfo=false;
			}
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Song data status: '  + status,body:status,body:'There was a problem.'});
		});
	};

	$scope.refresh();

	$scope.update = function(song){
		var iBytesUploaded = 0;
		var iBytesTotal = 0;
		var iPreviousBytesLoaded = 0;
		var iMaxFilesize = 1048576;
		var oTimer = 0;
		var sResultFileSize = '';

		var oProgress = document.getElementById('progress');
		oProgress.style.display = 'block';
		oProgress.style.width = '0px';

		function secondsToTime(secs) {
	    var hr = Math.floor(secs / 3600);
	    var min = Math.floor((secs - (hr * 3600))/60);
	    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

	    if (hr < 10) {hr = "0" + hr; }
	    if (min < 10) {min = "0" + min;}
	    if (sec < 10) {sec = "0" + sec;}
	    if (hr) {hr = "00";}
	    return hr + ':' + min + ':' + sec;
		};

		function bytesToSize(bytes) {
	    var sizes = ['Bytes', 'KB', 'MB'];
	    if (bytes == 0) return 'n/a';
	    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
		};

		function uploadProgress(e) {
			if (e.lengthComputable) {
				iBytesUploaded = e.loaded;
				iBytesTotal = e.total;
				var iPercentComplete = Math.round(e.loaded * 100 / e.total);
				var iBytesTransfered = bytesToSize(iBytesUploaded);

				document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
				document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
				document.getElementById('b_transfered').innerHTML = iBytesTransfered;
				if (iPercentComplete == 100) {
					var oUploadResponse = document.getElementById('upload_response');
					oUploadResponse.innerHTML = '<span>Please wait...processing</span>';
					oUploadResponse.style.display = 'block';
				}
			} else {
				document.getElementById('progress').innerHTML = 'unable to compute';
			}
		}

		function uploadFinish(e) {
			var oUploadResponse = document.getElementById('upload_response');
			oUploadResponse.innerHTML = e.target.responseText;
			oUploadResponse.style.display = 'block';

			document.getElementById('progress_percent').innerHTML = '100%';
			document.getElementById('progress').style.width = '100%';
			document.getElementById('remaining').innerHTML = '00:00:00';

			clearInterval(oTimer);

			$timeout(function() {
				$scope.refresh();
			}, 1000);
		}

		function uploadError(e) {
			document.getElementById('error2').style.display = 'block';
			clearInterval(oTimer);
		}

		function uploadAbort(e) {
			document.getElementById('abort').style.display = 'block';
			clearInterval(oTimer);
		}

		updateSong.putSongByID(id, song).success(function(data) {
			$scope.song = data;

			if($scope.song_files){
				if($scope.song_files.length > 0){
					var vFD = new FormData(document.getElementById('EditSongForm'));
					var oXHR = new XMLHttpRequest();
					oXHR.upload.addEventListener('progress', uploadProgress, false);
					oXHR.addEventListener('load', uploadFinish, false);
					oXHR.addEventListener('error', uploadError, false);
					oXHR.addEventListener('abort', uploadAbort, false);
					oXHR.open('POST', 'api/update_mp3/'+id);
					oXHR.send(vFD);
				}
				else {
					$scope.artist.album_pic = '';
				}
			}
			else {
				$scope.refresh();
				$scope.refreshCounters();
			}
			$scope.noty.add({title:'Song data',body:'Song has been updated.'});
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Song data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.delete = function(song) {
		var deleteSong = confirm('Are you absolutely sure you want to delete ' + song.song_title + '?');
		if (deleteSong) {
			deleteSongs.deleteSongByID(song.song_id);
			$scope.refreshCounters();
			$location.path("/songs");
		}
	};

	$scope.deleteFile = function(song) {
		var deleteMP3 = confirm('Are you absolutely sure you want to delete the file for ' + song.song_title + '?');
		if (deleteMP3) {
			removeSongFile.removeSongFileByID(song.song_id);
			$scope.refresh();
		}
	};

	$scope.resetCount = function(song) {
		var resetSongCount = confirm('Are you absolutely sure you want to reset?');
		if (resetSongCount) {
			updateSongCount.putSongCount(id, song);
			$scope.noty.add({title:'Song count',body:'Song count has been reset.'});
			$scope.refresh();
		}
	};

	$scope.resetDownloads = function(song) {
		var resetSongDownloads = confirm('Are you absolutely sure you want to reset?');
		if (resetSongDownloads) {
			updateSongDownloads.putSongDownload(id, song);
			$scope.noty.add({title:'Song downloads',body:'Song downloads has been reset.'});
			$scope.refresh();
		}
	};
}])
.controller('fonCtrl', ['$scope', '$rootScope', 'getNewSignings', 'updateNewSigningsSort', 'getArtistsForFon', 'updateFon', 'removeFon', function($scope, $rootScope, getNewSignings, updateNewSigningsSort, getArtistsForFon, updateFon, removeFon) {

	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);

	$scope.refresh = function() {
		getNewSignings.fetchFon().success(function(data) {
			if(data.length){
				$scope.fon = data;

				for (var i = 0; i < $scope.fon.length; i++) {
					$scope.home_order = $scope.fon[i].home_order;
				}

				$scope.isDisabled = false;
				if ($scope.fon.length > 2) {
					$scope.isDisabled = true;
				}

				$scope.disabled_status = '';
				if ($scope.fon.length > 2) {
					$scope.disabled_status = 'disabled';
				}

				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'New Signings data status: ' + status,body:'There was a problem.'});
		});

		getArtistsForFon.fetchArtistsFon().success(function(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].marker) {
					data[i].artist_name = data[i].marker + " " + data[i].INartistName;
				}
				else {
					data[i].artist_name = data[i].INartistName;
				}
			}
			$scope.artists = data;
		});

	};

	$scope.refresh();

	$scope.updateSortOrder = function() {
		for (var i = 0; i < $scope.fon.length; i++) {
			updateNewSigningsSort.putFonSort($scope.fon[i].INartistID, $scope.fon[i].home_order)
		}
		$scope.noty.add({title:'FON',body:'Sort order has been updated.'});
		$scope.refresh();
	};

	$scope.setFon = function(artist, AddFONForm) {
		updateFon.putFonByID(artist.INartistID).success(function(data) {
			var id = data.id;
			$scope.artist = data;
			$scope.noty.add({title:'FON data',body:'Fon has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'FON data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.remove = function(artist, FONForm) {
		removeFon.putFonByID(artist.INartistID).success(function(data) {
			var id = data.id;
			$scope.artist = data;
			$scope.noty.add({title:'FON data',body:'Fon has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'FON data status: ' + status,body:'There was a problem.'});
		});
	};

}])
.controller('sahCtrl', ['$scope', '$rootScope', '$filter', 'sahRepo', 'updateSAHSortOrder', 'updateSAHActive', 'addSahHolder', 'deleteSahs', 'updateSah', 'ngTableParams',  function($scope, $rootScope, $filter, sahRepo, updateSAHSortOrder, updateSAHActive, addSahHolder, deleteSahs, updateSah, ngTableParams) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);

	$scope.refresh = function() {
		sahRepo.fetchSah().success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.sahTotal = $scope.data.length;

				for (var i = 0; i < $scope.data.length; i++) {
					$scope.data[i].scene_order = parseFloat($scope.data[i].scene_order);

					if ($scope.data[i].sceneActive == "y") {
						$scope.data[i].checked = true;
					} else {
						$scope.data[i].checked = "" ;
					}
				}
				$scope.tableParams.reload();
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Scene and Heard data',body:'There was a problem fetching SAH data. Please try again...?'});
			}

			$scope.master = {};
			$scope.sahholder = {};
			$scope.sahholder.sceneName = '';

			$scope.sahholder.scene_order = parseInt($scope.sahTotal)+1;
			$scope.add_new = function(sahholder, AddSAHForm) {
				$rootScope.setLoading(true);

				addSahHolder.addNewSah(sahholder).success(function(data) {
					var id = data.id;
					$scope.reset();
					$rootScope.setLoading(false);
					$scope.refresh();
					$scope.refreshCounters();
				});

				$scope.reset = function() {
					$scope.sahholder = angular.copy($scope.master);
				};
			};

		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Scene and Heard data status: ' + status,body:'There was a problem.'});
		});
		$rootScope.setLoading(false);
	};

	$scope.refresh();

	$scope.tableParams = new ngTableParams({
		page: 1,
		count: 10,
		filter: {
		    scene_order: ''
		},
		sorting: {
		    scene_order: 'desc'
		}
	}, {
		total: function () { return getData().length; },
		getData: function($defer, params) {
			var data = $scope.data;
			var filteredData = params.filter() ? $filter('filter')(data, params.filter()) : data;
			var orderedData = params.sorting() ? $filter('orderBy')(filteredData, params.orderBy()) : data;

			params.total(orderedData.length);
			$defer.resolve(orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count()));
		},
		$scope: { $data: {} }
	});

	$scope.updateSortOrder = function() {
		for (var i = 0; i < $scope.data.length; i++) {
			updateSAHSortOrder.putSahSort($scope.data[i].sceneID, $scope.data[i].scene_order)
		}
		$scope.noty.add({title:'SAH',body:'Sort order has been updated.'});
		$scope.refresh();
		$scope.refreshCounters();
	};

	$scope.setActive = function() {
		$scope.activeID = ($('input[name="DelItem"]:checked')).val();
		updateSAHActive.putSahActive($scope.activeID);
		$scope.noty.add({title:'SAH',body:'Active status has been updated.'});
		$scope.refresh();
		$scope.refreshCounters();
	};

	$scope.delete = function(sah) {
		var deleteSah = confirm('Are you absolutely sure you want to delete ' + sah.sceneName + '?');
		if (deleteSah) {
			deleteSahs.deleteSahByID(sah.sceneID);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

	$scope.saveSah = function(id, data) {
		$rootScope.setLoading(true);
		updateSah.updateSahHolderName(id, data).success(function(data) {
			$rootScope.setLoading(false);
			$scope.refreshCounters();
			$scope.refresh();
		});
	};
}])
.controller('sahItemsCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$sce', 'getSahItems', 'getSahLinks', 'updateSAHItemSortOrder', 'deleteSahItems', function($scope, $rootScope, $filter, $stateParams, $sce, getSahItems, getSahLinks, updateSAHItemSortOrder, deleteSahItems) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);
	$scope.id = $stateParams.id;
	$scope.refresh = function() {
		getSahItems.fetchItemsBySah($scope.id).success(function(data) {
			if(data.length){
				$scope.data = data;
				$scope.itemTotal = $scope.data.length;
				for (var i = 0; i < $scope.data.length; i++) {
					$scope.data[i].itemOrder = parseFloat($scope.data[i].itemOrder);
					$scope.sceneName = $scope.data[i].sceneName;
					$scope.scene_order = $scope.data[i].scene_order;
				}
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$scope.noty.add({type: 'Error', title:'Scene and Heard data',body:'There was a problem fetching SAH data. Please try again...?'});
			}

			getSahLinks.fetchSahNavLinks($scope.scene_order).success(function(data) {
				$scope.linksdata = data;
				for (var i = 0; i < $scope.linksdata.length; i++) {
					$scope.links = $scope.linksdata[i];
				}
			}).
			error(function(data, status, headers, config) {
				$scope.noty.add({type: 'Error', title:'SAH links data status: '  + status,body:status,body:'There was a problem.'});
			});
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Scene and Heard data status: ' + status,body:'There was a problem.'});
		});

		$rootScope.setLoading(false);
	};

	$scope.refresh();

	$scope.renderItemText = function(html){
		return $sce.trustAsHtml(html);
	};

	$scope.updateSortOrder = function() {
		for (var i = 0; i < $scope.data.length; i++) {
			updateSAHItemSortOrder.putSahItemSort($scope.data[i].itemID, $scope.data[i].itemOrder)
		}
		$scope.noty.add({title:'SAH Items',body:'Sort order has been updated.'});
		$scope.refresh();
		$scope.refreshCounters();
	};

	$scope.delete = function(item) {
		var deleteSahItem = confirm('Are you absolutely sure you want to delete the item ' + item.itemHeader + '?');
		if (deleteSahItem) {
			deleteSahItems.deleteSahItemByID(item.itemID);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};
}])
.controller('addSahItemCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$location', '$sce', 'addSahItems', 'getSahItems', 'asyncScript', function($scope, $rootScope, $filter, $stateParams, $location, $sce, addSahItems, getSahItems, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	var id = $stateParams.id;
	$scope.id = $stateParams.id;
	asyncScript.load('jasny',function(){});

	getSahItems.fetchItemsBySah(id).success(function(data) {
		if(data.length){
			$scope.data = data;
			$scope.itemTotal = $scope.data.length;
		}

		$scope.master = {};
		$scope.item = {};
		$scope.item.itemHeader = '';
		$scope.item.itemMedia = '';
		$scope.item.itemText = '';
		$scope.item.itemOrder = $scope.itemTotal+1;

		$scope.add_new = function(item, AddSAHItemForm) {
			$rootScope.setLoading(true);
			var id = $stateParams.id;

			addSahItems.addNewSahItem(id, item).success(function(data) {
				$scope.reset();
				$rootScope.setLoading(false);
				$location.path("/sah-items/"+id).replace();
			});

			$scope.reset = function() {
				$scope.item = angular.copy($scope.master);
			};
		};
	});

}]).controller('editSahItemCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$location', '$sce', 'getSahItem', 'updateSahItem', 'getSahItemLinks', 'deleteSahItems', 'asyncScript', function($scope, $rootScope, $filter, $stateParams, $location, $sce, getSahItem, updateSahItem, getSahItemLinks, deleteSahItems, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	var id = $stateParams.id;
	$scope.id = $stateParams.id;
	$scope.sceneID = $stateParams.sceneID;

	asyncScript.load('jasny',function(){});

	getSahItem.fetchSahItemByID(id).success(function(data) {
		if(data.length){
			for (var i = 0; i < data.length; i++) {
				$scope.item = data[i];

				getSahItemLinks.fetchSahItemNavLinks($scope.item.sceneID, $scope.item.itemOrder).success(function(data) {
					$scope.linksdata = data;
					for (var i = 0; i < $scope.linksdata.length; i++) {
						$scope.links = $scope.linksdata[i];
					}
				}).
				error(function(data, status, headers, config) {
					$scope.noty.add({type: 'Error', title:'item links data status: ' + status,body:status,body:'There was a problem.'});
				});

			}
		}
	});

	$scope.update = function(item){
		updateSahItem.putSahItemByID(id, item).success(function(data) {
			$scope.item = data;
			$scope.noty.add({title:'Item data',body:'Item has been updated.'});
			$location.path("/sah-items/"+$scope.sceneID).replace();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Item data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.delete = function(item) {
		var deleteItem = confirm('Are you absolutely sure you want to delete ' + item.itemHeader + '?');
		if (deleteItem) {
			deleteSahItems.deleteSahItemByID(item.itemID);
			$scope.refreshCounters();
			$location.path("/sah-items/"+$scope.sceneID).replace();
		}
	};
}])
.controller('sliderCtrl', ['$scope', '$rootScope', 'featuredRepo', 'removeFeatured', 'getArtistsForFeatured', 'updateFeatured', function($scope, $rootScope, featuredRepo, removeFeatured, getArtistsForFeatured, updateFeatured) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.refresh = function() {
		featuredRepo.fetchFeatured().success(function(data) {
			if(data.length){
				$scope.featured = data;
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Featured data status: ' + status,body:'There was a problem.'});
		});

		getArtistsForFeatured.fetchArtistsFeatured().success(function(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].marker) {
					data[i].artist_name = data[i].marker + " " + data[i].INartistName;
				}
				else {
					data[i].artist_name = data[i].INartistName;
				}
			}
			$scope.artists = data;
		});
	};

	$scope.refresh();

	$scope.remove = function(artist, SliderForm) {
		removeFeatured.putFeaturedByID(artist.INartistID).success(function(data) {
			var id = data.id;
			$scope.artist = data;
			$scope.noty.add({title:'Featured data',body:'Artist was removed.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Featured data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setFeatured = function(artist, AddSliderForm) {
		updateFeatured.putFeaturedByID(artist.INartistID).success(function(data) {
			var id = data.id;
			$scope.artist = data;
			$scope.noty.add({title:'Featured data',body:'Artist was added.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Featured data status: ' + status,body:'There was a problem.'});
		});
	};

}]).controller('compsCtrl', ['$scope', '$rootScope', '$filter', 'compsRepo', 'updateCompsSortOrder', 'updateCompCount', 'deleteComps', 'updateCompActive', 'updateCompInActive', 'updateCompInCarousel', 'updateCompOutCarousel', function($scope, $rootScope, $filter, compsRepo, updateCompsSortOrder, updateCompCount, deleteComps, updateCompActive, updateCompInActive, updateCompInCarousel, updateCompOutCarousel) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.refresh = function() {
		compsRepo.fetchComps().success(function(data) {
			if(data.length){
				$scope.comps = data;
				for (var i = 0; i < $scope.comps.length; i++) {
					if($scope.comps[i].active==='y') {
						$scope.comps[i].activeTxt = "active";
					}
					else if($scope.comps[i].active==='n') {
						$scope.comps[i].activeTxt = "Inactive";
					}
					if($scope.comps[i].comp_flag==='y') {
						$scope.comps[i].statusTxt = "In Carousel";
					}
					else if($scope.comps[i].comp_flag==='n') {
						$scope.comps[i].statusTxt = "Not in Carousel";
					}
					$scope.comps[i].copy2 = "http://www.optic-noise.com/download_comp.php?id="+$scope.comps[i].comp_id;
					$scope.comps[i].copy3 = "http://www.optic-noise.com/comp.php?id="+$scope.comps[i].comp_id;
				}
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Comps data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.refresh();

	$scope.copyDone = function (dwnLink) {
		$scope.noty.add({title:'Comp link',body:'Copied to clipboard: ' + dwnLink});
	}

	$scope.updateSortOrder = function() {
		for (var i = 0; i < $scope.comps.length; i++) {
			updateCompsSortOrder.putCompsSort($scope.comps[i].comp_id, $scope.comps[i].sort)
		}
		$scope.noty.add({title:'Comps',body:'Sort order has been updated.'});
		$scope.refresh();
		$scope.refreshCounters();
	};

	$scope.resetCount = function(comp) {
		var resetCompCount = confirm('Are you absolutely sure you want to reset?');
		if (resetCompCount) {
			updateCompCount.putCompCount(comp.comp_id, comp);
			$scope.noty.add({title:'Comp count',body:'Comp count has been reset.'});
			$scope.refresh();
		}
	};

	$scope.delete = function(comp) {
		var deleteComp = confirm('Are you absolutely sure you want to delete ' + comp.comp_name + '?');
		if (deleteComp) {
			deleteComps.deleteCompByID(comp.comp_id);
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been deleted.'});
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

	$scope.setActive = function(comp) {
		updateCompActive.putCompActive(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setInActive = function(comp) {
		updateCompInActive.putCompInActive(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setInCarousel = function(comp) {
		updateCompInCarousel.putCompInCarousel(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setOutCarousel = function(comp) {
		updateCompOutCarousel.putCompOutCarousel(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

}]).controller('editCompCtrl', ['$scope', '$rootScope', '$location', '$filter', '$sce', '$stateParams', 'getComp', 'updateComp', 'getCompLinks', 'deleteComps', '$filter', 'updateCompCount', 'getSongsForSelector', 'getCompsPlaylist', 'deleteCompsPlaylistItem', 'getMaxCompPlaylistSort', 'addCompsPlaylistItem', 'updateCompActive', 'updateCompInActive', 'updateCompInCarousel', 'updateCompOutCarousel', 'updatePlaylistSortOrder', 'asyncScript', function($scope, $rootScope, $location, $filter, $sce, $stateParams, getComp, updateComp, getCompLinks, deleteComps, $filter, updateCompCount, getSongsForSelector, getCompsPlaylist, deleteCompsPlaylistItem, getMaxCompPlaylistSort, addCompsPlaylistItem, updateCompActive, updateCompInActive, updateCompInCarousel, updateCompOutCarousel, updatePlaylistSortOrder, asyncScript) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;

	asyncScript.load('jasny',function(){});

	$rootScope.setLoading(true);
	var id = $stateParams.id;
	$scope.refresh = function() {
		getComp.fetchCompByID(id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.comp = data[i];
					$scope.name = $scope.comp.comp_name;
					$scope.sorting = $scope.comp.sort;
					$scope.comp.dateAdded = $filter('timestampDateFormat')($scope.comp.date_added);
					$scope.comp.lastDownload = $filter('timestampDateTimeFormat')($scope.comp.last_download);
					$scope.comp.sort = parseInt($scope.comp.sort);
					if($scope.comp.active==='y') {
						$scope.comp.activeTxt = "active";
					}
					else if($scope.comp.active==='n') {
						$scope.comp.activeTxt = "Inactive";
					}
					if($scope.comp.comp_flag==='y') {
						$scope.comp.statusTxt = "In Carousel";
					}
					else if($scope.comp.comp_flag==='n') {
						$scope.comp.statusTxt = "Not in Carousel";
					}
					$scope.comp.image = '../images/comps/'+$scope.comp.comp_pic;
					$scope.comp.copy2 = "http://www.optic-noise.com/download_comp.php?id="+$scope.comp.comp_id;
					$scope.comp.copy3 = "http://www.optic-noise.com/comp.php?id="+$scope.comp.comp_id;
				}
				getCompLinks.fetchCompNavLinks($scope.sorting).success(function(data) {
					$scope.linksdata = data;
					for (var i = 0; i < $scope.linksdata.length; i++) {
						$scope.links = $scope.linksdata[i];
					}
				}).
				error(function(data, status, headers, config) {
					$scope.noty.add({type: 'Error', title:'Comp links data status: '  + status,body:status,body:'There was a problem.'});
				});

				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/comps");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});

		getSongsForSelector.fetchSongsSelector().success(function(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].marker) {
					data[i].artist_name = data[i].marker + " " + data[i].INartistName;
				}
				else {
					data[i].artist_name = data[i].INartistName;
				}
			}
			$scope.songs = data;
		});

		getCompsPlaylist.fetchCompPlaylist(id).success(function(data) {
			for (var i = 0; i < data.length; i++) {
				if(data[i].marker) {
					data[i].artist_name = data[i].marker + " " + data[i].INartistName;
				}
				else {
					data[i].artist_name = data[i].INartistName;
				}
			}
			$scope.playlist = data;
		});

		getMaxCompPlaylistSort.fetchMaxCompPlaylistSortOrder(id).success(function(data) {
			$scope.max = data;
			$scope.newsort = parseInt($scope.max)+1 || 1;
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
		});

	};

	$scope.refresh();

	$scope.renderCompDesc = function(html){
		return $sce.trustAsHtml(html);
	};

	$scope.copyDone = function (dwnLink) {
		$scope.noty.add({title:'Download link',body:'Copied to clipboard: ' + dwnLink});
	};

	$scope.addSelected = function(SongID, addSongToPlaylistForm) {
		var selectedInfo = new Object();
		selectedInfo.CompID = id;
		selectedInfo.SongID = SongID;
		selectedInfo.item_sort = $scope.newsort;

		addCompsPlaylistItem.addNewCompPlaylistItem(selectedInfo).success(function(data) {
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp playlist status: ' + status,body:'There was a problem.'});
		});
	}

	$scope.update = function(comp){
		if($scope.comp_pics){
			if($scope.comp_pics.length > 0){
				var vFD = new FormData(document.getElementById('EditCompForm'));
				var oXHR = new XMLHttpRequest();
				oXHR.open('POST', 'api/update_comp_pic/'+id);
				oXHR.send(vFD);
			}
			else {
				$scope.comp.comp_pic = '';
			}
		};

		updateComp.putCompByID(id, comp).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:'Comp data',body:'Comp has been updated.'});
			$scope.refresh();
			$scope.refreshCounters();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});

		for (var i = 0; i < $scope.playlist.length; i++) {
			updatePlaylistSortOrder.putPlaylistSort($scope.playlist[i].comp_items_id, $scope.playlist[i].item_sort)
		}
	};

	$scope.updatePlaylistSortOrder = function() {
	  for (var i = 0; i < $scope.playlist.length; i++) {
	    updatePlaylistSortOrder.putPlaylistSort($scope.playlist[i].comp_items_id, $scope.playlist[i].item_sort)
	  }
	  $scope.noty.add({title:'Playlist',body:'Sort order has been updated.'});
	  $scope.refresh();
	};

	$scope.resetCount = function(comp) {
		var resetCompCount = confirm('Are you absolutely sure you want to reset?');
		if (resetCompCount) {
			updateCompCount.putCompCount(id, comp);
			$scope.noty.add({title:'Comp count',body:'Comp count has been reset.'});
			$scope.refresh();
		}
	};

	$scope.delete = function(comp) {
		var deleteComp = confirm('Are you absolutely sure you want to delete ' + comp.comp_name + '?');
		if (deleteComp) {
			deleteComps.deleteCompByID(comp.comp_id);
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been deleted.'});
			$scope.refreshCounters();
			$location.path("/comps");
		}
	};

	$scope.deletePlaylistItem = function(song) {
		var deletePlaylistItem = confirm('Are you absolutely sure you want to remove this item?');
		if (deletePlaylistItem) {
			deleteCompsPlaylistItem.deleteCompPlaylistItemByID(song);
			$scope.refreshCounters();
			$scope.refresh();
		}
	};

	$scope.setActive = function(comp) {
		updateCompActive.putCompActive(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setInActive = function(comp) {
		updateCompInActive.putCompInActive(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setInCarousel = function(comp) {
		updateCompInCarousel.putCompInCarousel(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setOutCarousel = function(comp) {
		updateCompOutCarousel.putCompOutCarousel(comp.comp_id).success(function(data) {
			$scope.comp = data;
			$scope.noty.add({title:comp.comp_name,body:comp.comp_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});
	};

}]).controller('addSongToCompCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$location', '$timeout', 'asyncScript', 'getArtistsForSelector', 'getComp', 'getMaxCompPlaylistSort', 'addSongsToComp', function($scope, $rootScope, $filter, $stateParams, $location, $timeout, asyncScript, getArtistsForSelector, getComp, getMaxCompPlaylistSort, addSongsToComp) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;
	var comp_id = $stateParams.comp_id;
	$scope.comp_id = $stateParams.comp_id;

	asyncScript.load('jasny',function(){});

	getArtistsForSelector.fetchArtistsSelector().success(function(data) {
		for (var i = 0; i < data.length; i++) {
			if(data[i].marker) {
				data[i].artist_name = data[i].marker + " " + data[i].INartistName;
			}
			else {
				data[i].artist_name = data[i].INartistName;
			}
		}
		$scope.artists = data;
	});

	$rootScope.setLoading(true);

	$scope.refresh = function() {
		getComp.fetchCompByID(comp_id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.comp = data[i];

				}
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/edit-comp/"+comp_id).replace();
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});


		getMaxCompPlaylistSort.fetchMaxCompPlaylistSortOrder(comp_id).success(function(data) {
			$scope.max = data;
			$scope.song.item_sort = parseInt($scope.max)+1 || 1;
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
		});

	};

	$scope.refresh();

	$scope.master = {};
	$scope.song = {};
	$scope.song.song_title = '';
	$scope.song.song_comments = '';
	$scope.song.roster_flag = 'y';
	$scope.song.song_file = '';
	$scope.song.item_sort = $scope.song.item_sort;

	$scope.add_new = function(song, AddSongToCompForm) {
		$rootScope.setLoading(true);
		var comp_id = $scope.comp_id;

		addSongsToComp.addNewSong(comp_id, song).success(function(data) {
			var id = data.id;

			if($scope.song_files){
				if($scope.song_files.length > 0){
					var iBytesUploaded = 0;
					var iBytesTotal = 0;
					var iPreviousBytesLoaded = 0;
					var iMaxFilesize = 1048576;
					var oTimer = 0;
					var sResultFileSize = '';

					var oProgress = document.getElementById('progress');
					oProgress.style.display = 'block';
					oProgress.style.width = '0px';

					function secondsToTime(secs) {
				    var hr = Math.floor(secs / 3600);
				    var min = Math.floor((secs - (hr * 3600))/60);
				    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

				    if (hr < 10) {hr = "0" + hr; }
				    if (min < 10) {min = "0" + min;}
				    if (sec < 10) {sec = "0" + sec;}
				    if (hr) {hr = "00";}
				    return hr + ':' + min + ':' + sec;
					};

					function bytesToSize(bytes) {
				    var sizes = ['Bytes', 'KB', 'MB'];
				    if (bytes == 0) return 'n/a';
				    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
				    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
					};

					function uploadProgress(e) {
						if (e.lengthComputable) {
							iBytesUploaded = e.loaded;
							iBytesTotal = e.total;
							var iPercentComplete = Math.round(e.loaded * 100 / e.total);
							var iBytesTransfered = bytesToSize(iBytesUploaded);

							document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
							document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
							document.getElementById('b_transfered').innerHTML = iBytesTransfered;
							if (iPercentComplete == 100) {
								var oUploadResponse = document.getElementById('upload_response');
								oUploadResponse.innerHTML = '<span>Please wait...processing</span>';
								oUploadResponse.style.display = 'block';
							}
						} else {
							document.getElementById('progress').innerHTML = 'unable to compute';
						}
					}

					function uploadFinish(e) {
						var oUploadResponse = document.getElementById('upload_response');
						oUploadResponse.innerHTML = e.target.responseText;
						oUploadResponse.style.display = 'block';

						document.getElementById('progress_percent').innerHTML = '100%';
						document.getElementById('progress').style.width = '100%';
						document.getElementById('remaining').innerHTML = '00:00:00';

						clearInterval(oTimer);

						$timeout(function() {
							$rootScope.setLoading(false);
							$scope.refreshCounters();
							$location.path("/edit-comp/"+comp_id).replace();
							$scope.reset();
						}, 1000);
					}

					function uploadError(e) {
						document.getElementById('error2').style.display = 'block';
						clearInterval(oTimer);
					}

					function uploadAbort(e) {
						document.getElementById('abort').style.display = 'block';
						clearInterval(oTimer);
					}

					var vFD = new FormData(document.getElementById('AddSongToCompForm'));
					var oXHR = new XMLHttpRequest();
					oXHR.upload.addEventListener('progress', uploadProgress, false);
					oXHR.addEventListener('load', uploadFinish, false);
					oXHR.addEventListener('error', uploadError, false);
					oXHR.addEventListener('abort', uploadAbort, false);
					oXHR.open('POST', 'api/update_mp3/'+id);
					oXHR.send(vFD);
				}
				else {
					$scope.song.song_file = '';
					$rootScope.setLoading(false);
					$scope.refreshCounters();
					$location.path("/edit-comp/"+comp_id).replace();
					$scope.reset();
				}
			}
			else {
				$scope.song.song_file = '';
				$rootScope.setLoading(false);
				$scope.refreshCounters();
				$location.path("/edit-comp/"+comp_id).replace();
				$scope.reset();
			}
		});

		$scope.reset = function() {
			$scope.song = angular.copy($scope.master);
		};
	};

}]).controller('addArtistToCompCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$location', '$timeout', 'getComp', 'addArtistsToComp', function($scope, $rootScope, $filter, $stateParams, $location, $timeout, getComp, addArtistsToComp) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	var comp_id = $stateParams.comp_id;
	$scope.comp_id = $stateParams.comp_id;

	$rootScope.setLoading(true);

	$scope.refresh = function() {
		getComp.fetchCompByID(comp_id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.comp = data[i];

				}
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/edit-comp/"+comp_id).replace();
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});

	};

	$scope.refresh();

	$scope.master = {};
	$scope.artist = {};
	$scope.artist.marker = '';
	$scope.artist.INroster_desc = '';
	$scope.artist.INlabel = '';
	$scope.artist.INsync = '';
	$scope.artist.active = 'y';


	$scope.add_new = function(artist, AddArtistForm) {
		$rootScope.setLoading(true);
		var comp_id = $scope.comp_id;
		addArtistsToComp.addNewArtist(comp_id, artist).success(function(data) {
			var id = data.id;
			$location.path("/add-song-artist-to-comp/"+comp_id+"/artist/"+id).replace();
		});

		$scope.reset = function() {
			$scope.artist = angular.copy($scope.master);
		};
	};

}]).controller('addSongArtistToCompCtrl', ['$scope', '$rootScope', '$filter', '$stateParams', '$location', '$timeout', 'asyncScript', 'getArtist', 'getComp', 'getMaxCompPlaylistSort', 'addSongsToComp', function($scope, $rootScope, $filter, $stateParams, $location, $timeout, asyncScript, getArtist, getComp, getMaxCompPlaylistSort, addSongsToComp) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=true;
	var comp_id = $stateParams.comp_id;
	$scope.comp_id = $stateParams.comp_id;
	var id = $stateParams.id;
	asyncScript.load('jasny',function(){});
	$rootScope.setLoading(true);

	$scope.refresh = function() {
		getComp.fetchCompByID(comp_id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.comp = data[i];
				}
				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/edit-comp/"+comp_id).replace();
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Comp data status: ' + status,body:'There was a problem.'});
		});

		getArtist.fetchArtistByID(id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.artist = data[i];
					$rootScope.artistid = $scope.artist.INartistID;
					$scope.name = $scope.artist.INartistName;
					if($scope.artist.marker) {
						$scope.showname = $scope.artist.marker + ' ' + $scope.artist.INartistName;
					}
					else {
						$scope.showname = $scope.artist.INartistName;
					}
				}

				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/edit-comp/"+comp_id).replace();
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Artist data status: ' + status,body:'There was a problem.'});
		});

		getMaxCompPlaylistSort.fetchMaxCompPlaylistSortOrder(comp_id).success(function(data) {
			$scope.max = data;
			$scope.song.item_sort = parseInt($scope.max)+1 || 1;
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
		});

	};

	$scope.refresh();

	$scope.master = {};
	$scope.song = {};
	$scope.song.song_title = '';
	$scope.song.song_comments = '';
	$scope.song.roster_flag = 'y';
	$scope.song.song_file = '';
	$scope.song.item_sort = $scope.song.item_sort;
	$scope.song.artistID = id;

	$scope.add_new = function(song, AddSongArtistToCompForm) {
		$rootScope.setLoading(true);
		var comp_id = $scope.comp_id;

		addSongsToComp.addNewSong(comp_id, song).success(function(data) {
			var id = data.id;

			if($scope.song_files){
				if($scope.song_files.length > 0){
					var iBytesUploaded = 0;
					var iBytesTotal = 0;
					var iPreviousBytesLoaded = 0;
					var iMaxFilesize = 1048576;
					var oTimer = 0;
					var sResultFileSize = '';

					var oProgress = document.getElementById('progress');
					oProgress.style.display = 'block';
					oProgress.style.width = '0px';

					function secondsToTime(secs) {
				    var hr = Math.floor(secs / 3600);
				    var min = Math.floor((secs - (hr * 3600))/60);
				    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

				    if (hr < 10) {hr = "0" + hr; }
				    if (min < 10) {min = "0" + min;}
				    if (sec < 10) {sec = "0" + sec;}
				    if (hr) {hr = "00";}
				    return hr + ':' + min + ':' + sec;
					};

					function bytesToSize(bytes) {
				    var sizes = ['Bytes', 'KB', 'MB'];
				    if (bytes == 0) return 'n/a';
				    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
				    return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
					};

					function uploadProgress(e) {
						if (e.lengthComputable) {
							iBytesUploaded = e.loaded;
							iBytesTotal = e.total;
							var iPercentComplete = Math.round(e.loaded * 100 / e.total);
							var iBytesTransfered = bytesToSize(iBytesUploaded);

							document.getElementById('progress_percent').innerHTML = iPercentComplete.toString() + '%';
							document.getElementById('progress').style.width = (iPercentComplete * 4).toString() + 'px';
							document.getElementById('b_transfered').innerHTML = iBytesTransfered;
							if (iPercentComplete == 100) {
								var oUploadResponse = document.getElementById('upload_response');
								oUploadResponse.innerHTML = '<span>Please wait...processing</span>';
								oUploadResponse.style.display = 'block';
							}
						} else {
							document.getElementById('progress').innerHTML = 'unable to compute';
						}
					}

					function uploadFinish(e) {
						var oUploadResponse = document.getElementById('upload_response');
						oUploadResponse.innerHTML = e.target.responseText;
						oUploadResponse.style.display = 'block';

						document.getElementById('progress_percent').innerHTML = '100%';
						document.getElementById('progress').style.width = '100%';
						document.getElementById('remaining').innerHTML = '00:00:00';

						clearInterval(oTimer);

						$timeout(function() {
							$rootScope.setLoading(false);
							$scope.refreshCounters();
							$location.path("/edit-comp/"+comp_id).replace();
							$scope.reset();
						}, 1000);
					}

					function uploadError(e) {
						document.getElementById('error2').style.display = 'block';
						clearInterval(oTimer);
					}

					function uploadAbort(e) {
						document.getElementById('abort').style.display = 'block';
						clearInterval(oTimer);
					}

					var vFD = new FormData(document.getElementById('AddSongArtistToCompForm'));
					var oXHR = new XMLHttpRequest();
					oXHR.upload.addEventListener('progress', uploadProgress, false);
					oXHR.addEventListener('load', uploadFinish, false);
					oXHR.addEventListener('error', uploadError, false);
					oXHR.addEventListener('abort', uploadAbort, false);
					oXHR.open('POST', 'api/update_mp3/'+id);
					oXHR.send(vFD);
				}
				else {
					$scope.song.song_file = '';
					$rootScope.setLoading(false);
					$scope.refreshCounters();
					$location.path("/edit-comp/"+comp_id).replace();
					$scope.reset();
				}
			}
			else {
				$scope.song.song_file = '';
				$rootScope.setLoading(false);
				$scope.refreshCounters();
				$location.path("/edit-comp/"+comp_id).replace();
				$scope.reset();
			}
		});

		$scope.reset = function() {
			$scope.song = angular.copy($scope.master);
		};
	};

}]).controller('addCompCtrl', ['$scope', '$rootScope', '$filter', '$location', 'asyncScript', 'getMaxCompSort', 'addComps', function($scope, $rootScope, $filter, $location, asyncScript, getMaxCompSort, addComps) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	asyncScript.load('jasny',function(){});

	getMaxCompSort.fetchMaxCompSort().success(function(data) {
		$scope.max = data;

		$scope.master = {};
		$scope.comp = {};
		$scope.comp.comp_name = '';
		$scope.comp.comp_desc = '';
		$scope.comp.comp_file = '';
		$scope.comp.comp_flag = 'y';
		$scope.comp.comp_pic = '';
		$scope.comp.sort = parseInt($scope.max)+1;
		$scope.comp.count = 0;
		$scope.comp.active = 'y';

		$scope.add_new = function(comp, AddCompForm) {
			$rootScope.setLoading(true);
			addComps.addNewComp(comp).success(function(data) {
				var id = data.id;
				if($scope.comp_pics){
					if($scope.comp_pics.length > 0){
						var vFD = new FormData(document.getElementById('AddCompForm'));
						var oXHR = new XMLHttpRequest();
						oXHR.open('POST', 'api/upload_comp_pic');
						oXHR.send(vFD);
					}
					else {
						$scope.comp.comp_pic = '';
					}
				}
				else {
					$scope.comp.comp_pic = '';
				}

				$scope.reset();
				$rootScope.setLoading(false);
				$scope.refreshCounters();
				$location.path("/edit-comp/"+id).replace();
			});

			$scope.reset = function() {
				$scope.comp = angular.copy($scope.master);
			};

			$scope.reset();
		};

	}).
	error(function(data, status, headers, config) {
		$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
	});

}]).controller('dropboxesCtrl', ['$scope', '$rootScope', '$filter', 'dropboxesRepo', 'updateDropboxesSortOrder', 'deleteDropboxes', 'updateDropboxCount', 'updateDropboxActive', 'updateDropboxInActive', function($scope, $rootScope, $filter, dropboxesRepo, updateDropboxesSortOrder, deleteDropboxes, updateDropboxCount, updateDropboxActive, updateDropboxInActive) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	$scope.refresh = function() {
		dropboxesRepo.fetchDropboxes().success(function(data) {
			if(data.length){
				$scope.dropboxes = data;
				for (var i = 0; i < $scope.dropboxes.length; i++) {
					if($scope.dropboxes[i].active==='y') {
						$scope.dropboxes[i].activeTxt = "active";
					}
					else if($scope.dropboxes[i].active==='n') {
						$scope.dropboxes[i].activeTxt = "Inactive";
					}
					$scope.dropboxes[i].copy2 = "http://www.optic-noise.com/download_dropbox.php?id="+$scope.dropboxes[i].dropbox_id;
				}
				$rootScope.setLoading(false);
			}
			else {
				$scope.dropboxes = data;
				$rootScope.setLoading(false);
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Dropboxes data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.refresh();

	$scope.copyDone = function (dwnLink) {
		$scope.noty.add({title:'Download link',body:'Copied to clipboard: ' + dwnLink});
	};

	$scope.updateSortOrder = function() {
		for (var i = 0; i < $scope.dropboxes.length; i++) {
			updateDropboxesSortOrder.putDropboxesSort($scope.dropboxes[i].dropbox_id, $scope.dropboxes[i].sort)
		}
		$scope.noty.add({title:'Dropboxes',body:'Sort order has been updated.'});
		$scope.refresh();
		$scope.refreshCounters();
	};

	$scope.resetCount = function(dropbox) {
		var resetDropboxCount = confirm('Are you absolutely sure you want to reset?');
		if (resetDropboxCount) {
			updateDropboxCount.putDropboxCount(dropbox.dropbox_id, dropbox);
			$scope.noty.add({title:'Dropbox count',body:'Dropbox count has been reset.'});
			$scope.refresh();
		}
	};

	$scope.setActive = function(dropbox) {
		updateDropboxActive.putDropboxActive(dropbox.dropbox_id).success(function(data) {
			$scope.dropbox = data;
			$scope.noty.add({title:dropbox.dropbox_name,body:dropbox.dropbox_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Dropbox data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setInActive = function(dropbox) {
		updateDropboxInActive.putDropboxInActive(dropbox.dropbox_id).success(function(data) {
			$scope.dropbox = data;
			$scope.noty.add({title:dropbox.dropbox_name,body:dropbox.dropbox_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Dropbox data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.delete = function(dropbox) {
		var deleteDropbox = confirm('Are you absolutely sure you want to delete ' + dropbox.dropbox_name + '?');
		if (deleteDropbox) {
			deleteDropboxes.deleteDropboxByID(dropbox.dropbox_id);
			$scope.refresh();
			$scope.refreshCounters();
		}
	};

}]).controller('addDropboxCtrl', ['$scope', '$rootScope', 'getMaxDropboxSort', 'addDropboxes', '$location',  function($scope, $rootScope, getMaxDropboxSort, addDropboxes, $location) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;

	getMaxDropboxSort.fetchMaxDropboxSort().success(function(data) {
		$scope.max = data;

		$scope.master = {};
		$scope.dropbox = {};
		$scope.dropbox.dropbox_name = '';
		$scope.dropbox.dropbox_file = '';
		$scope.dropbox.sort = parseInt($scope.max)+1;

		$scope.add_new = function(dropbox, AddDropboxForm) {
			$rootScope.setLoading(true);

			addDropboxes.addNewDropbox(dropbox).success(function(data) {
				var id = data.id;
				$scope.reset();
				$rootScope.setLoading(false);
				$scope.refreshCounters();
				$location.path("/dropboxes").replace();
			});

			$scope.reset = function() {
				$scope.dropbox = angular.copy($scope.master);
			};

			$scope.reset();
		};
	}).
	error(function(data, status, headers, config) {
		$scope.noty.add({type: 'Error', title:'Max sort status: '  + status,body:status,body:'There was a problem.'});
	});
}]).controller('editDropboxCtrl', ['$scope', '$rootScope', '$location', '$filter', '$stateParams', 'getDropbox', 'updateDropbox', 'getDropboxLinks', 'deleteDropboxes', '$filter', 'updateDropboxActive', 'updateDropboxInActive', 'updateDropboxCount', function($scope, $rootScope, $location, $filter, $stateParams, getDropbox, updateDropbox, getDropboxLinks, deleteDropboxes, $filter, updateDropboxActive, updateDropboxInActive, updateDropboxCount) {
	$rootScope.setLoading = function(loading) {
		$rootScope.isLoading = loading;
	};
	$rootScope.showPlayer=false;
	$rootScope.setLoading(true);

	var id = $stateParams.id;
	$scope.refresh = function() {
		getDropbox.fetchDropboxByID(id).success(function(data) {
			if(data.length){
				for (var i = 0; i < data.length; i++) {
					$scope.dropbox = data[i];
					$scope.name = $scope.dropbox.dropbox_name;
					$scope.sorting = $scope.dropbox.sort;
					$scope.dropbox.dateAdded = $filter('timestampDateFormat')($scope.dropbox.date_added);
					$scope.dropbox.lastDownload = $filter('timestampDateTimeFormat')($scope.dropbox.last_download);
					$scope.dropbox.sort = parseInt($scope.dropbox.sort);
					if($scope.dropbox.active==='y') {
						$scope.dropbox.activeTxt = "active";
					}
					else if($scope.dropbox.active==='n') {
						$scope.dropbox.activeTxt = "Inactive";
					}
					$scope.dropbox.copy2 = "http://www.optic-noise.com/download_dropbox.php?id="+$scope.dropbox.dropbox_id;
				}
				getDropboxLinks.fetchDropboxNavLinks($scope.sorting).success(function(data) {
					$scope.linksdata = data;
					for (var i = 0; i < $scope.linksdata.length; i++) {
						$scope.links = $scope.linksdata[i];
					}
				}).
				error(function(data, status, headers, config) {
					$scope.noty.add({type: 'Error', title:'Dropbox links data status: '  + status,body:status,body:'There was a problem.'});
				});

				$rootScope.setLoading(false);
			}
			else {
				$rootScope.setLoading(false);
				$location.path("/dropboxes");
			}
		}).
		error(function(data, status, headers, config) {
			$rootScope.setLoading(false);
			$scope.noty.add({type: 'Error', title:'Dropbox data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.refresh();

	$scope.copyDone = function (dwnLink) {
		$scope.noty.add({title:'Download link',body:'Copied to clipboard: ' + dwnLink});
	}

	$scope.update = function(dropbox){
		updateDropbox.putDropboxByID(id, dropbox).success(function(data) {
			$scope.dropbox = data;
			$scope.refresh();
			$scope.refreshCounters();
			$scope.noty.add({title:'Dropbox data',body:'Dropbox has been updated.'});
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Dropbox data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.resetCount = function(dropbox) {
		var resetDropboxCount = confirm('Are you absolutely sure you want to reset?');
		if (resetDropboxCount) {
			updateDropboxCount.putDropboxCount(id, dropbox);
			$scope.noty.add({title:'Dropbox count',body:'Dropbox count has been reset.'});
			$scope.refresh();
		}
	};

	$scope.delete = function(dropbox) {
		var deleteDropbox = confirm('Are you absolutely sure you want to delete ' + dropbox.dropbox_name + '?');
		if (deleteDropbox) {
			deleteDropboxes.deleteDropboxByID(dropbox.dropbox_id);
			$scope.refreshCounters();
			$location.path("/dropboxes");
		}
	};

	$scope.setActive = function(dropbox) {
		updateDropboxActive.putDropboxActive(dropbox.dropbox_id).success(function(data) {
			$scope.dropbox = data;
			$scope.noty.add({title:dropbox.dropbox_name,body:dropbox.dropbox_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Dropbox data status: ' + status,body:'There was a problem.'});
		});
	};

	$scope.setInActive = function(dropbox) {
		updateDropboxInActive.putDropboxInActive(dropbox.dropbox_id).success(function(data) {
			$scope.dropbox = data;
			$scope.noty.add({title:dropbox.dropbox_name,body:dropbox.dropbox_name + ' has been updated.'});
			$scope.refresh();
		}).
		error(function(data, status, headers, config) {
			$scope.noty.add({type: 'Error', title:'Dropbox data status: ' + status,body:'There was a problem.'});
		});
	};

}]);


/* utility functions ----------------------------------------------------------*/
var utils = {};
utils.timeAgo = function(date_str){
	date_str = date_str.replace('+0000','Z');
	var time_formats = [
		[60, 'just now', 1],
		[120, '1 minute ago', '1 minute from now'],
		[3600, 'minutes ago', 60],
		[7200, '1 hour ago', '1 hour from now'],
		[86400, 'hours ago', 3600],
		[172800, 'yesterday', 'tomorrow'],
		[604800, 'days ago', 86400],
		[1209600, 'last week', 'next week'],
		[2419200, 'weeks ago', 604800],
		[4838400, 'last month', 'next month'],
		[29030400, 'months ago', 2419200],
		[58060800, 'last year', 'next year'],
		[2903040000, 'years ago', 29030400],
		[5806080000, 'last century', 'next century'],
		[58060800000, 'centuries ago', 2903040000]
	];
	var time = ('' + date_str).replace(/-/g,"/").replace(/[TZ]/g," ").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	if(time.substr(time.length-4,1)==".") time =time.substr(0,time.length-4);
	var seconds = (new Date - new Date(time)) / 1000;
	var token = '', list_choice = 1;
	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = '';
		list_choice = 2;
	}
	var i = 0, format;
	while (format = time_formats[i++])
	if (seconds < format[0]) {
		if (typeof format[2] == 'string')
			return format[list_choice];
		else
			return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
	}
	return time;
};

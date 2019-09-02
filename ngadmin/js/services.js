'use strict';

/* Services */
angular.module('onAdmin.services', []).
value('version', '1.0').
factory('loginService', ['$http', '$location', 'sessionService', function($http, $location, sessionService) {
	return{
		login:function(data,scope){
			var $promise=$http.post('api/login.php',data);
			$promise.then(function(msg){
				var uid=msg.data;
				if(uid){
					sessionService.set('uid',uid);
					$location.path('/home');
				}
				else  {
					scope.msgtxt='Nope, please try again.';
					scope.form1.username.$setValidity("server", false);
					scope.form1.password.$setValidity("server", false);
					$location.path('/login');
				}
			});
		},
		logout:function(){
			sessionService.destroy('uid');
			sessionService.destroy('AdminID');
			sessionService.destroy('username');
			$location.path('/login');
		},
		islogged:function(){
			var $checkSessionServer=$http.post('api/check_session.php');
			return $checkSessionServer;
		}
	}
}]).
factory('sessionService', ['$http', function($http) {
	return{
		set:function(key,value){
			return sessionStorage.setItem(key,value);
		},
		get:function(key){
			return sessionStorage.getItem(key);
		},
		destroy:function(key){
			$http.post('api/destroy_session.php');
			return sessionStorage.removeItem(key);
		}
	};
}]).
factory('getTopPlayedSongs', ['$http', function($http) {
  return new getTopSongs($http);
}]).
factory('getTopDownloadedSongs', ['$http', function($http) {
  return new getTopSongsDownload($http);
}]).
factory('getTopCompsList', ['$http', function($http) {
  return new getTopComps($http);
}]).
factory('getTopDropboxesList', ['$http', function($http) {
  return new getTopDropboxes($http);
}]).
factory('artistsRepo', ['$http', function($http) {
	return new artistsRepository($http);
}]).
factory('artistsActiveCount', ['$http', function($http) {
	return new getActiveArtistsCount($http);
}]).
factory('artistsCount', ['$http', function($http) {
	return new getArtistsCount($http);
}]).
factory('artistsNoSongsRepo', ['$http', function($http) {
	return new artistsNoSongsRepository($http);
}]).
factory('artistsNoSongsCount', ['$http', function($http) {
	return new getArtistsNoSongsCount($http);
}]).
factory('getArtist', ['$http', function($http) {
	return new getArtistByID($http);
}]).
factory('getArtistSongs', ['$http', function($http) {
	return new getSongsByArtist($http);
}]).
factory('getArtistLinks', ['$http', function($http) {
	return new getArtistNavLinks($http);
}]).
factory('getMaxHomeSort', ['$http', function($http) {
	return new getMaxHomeSortOrder($http);
}]).
factory('getArtistsForSelector', ['$http', function($http) {
	return new getArtistsSelector($http);
}]).
factory('deleteArtists', ['$http', function($http) {
	return new deleteArtist($http);
}]).
factory('addArtists', ['$http', function($http) {
	return new addArtist($http);
}]).
factory('userRepo', ['$http', function($http) {
  return new userRepository($http);
}]).
factory('aboutRepo', ['$http', function($http) {
  return new aboutRepository($http);
}]).
factory('getAboutPage', ['$http', function($http) {
  return new getAboutByID($http);
}]).
factory('updateAbout', ['$http', function($http) {
  return new updateAboutByID($http);
}]).
factory('contactRepo', ['$http', function($http) {
  return new contactRepository($http);
}]).
factory('getContactPage', ['$http', function($http) {
  return new getContactByID($http);
}]).
factory('updateContact', ['$http', function($http) {
  return new updateContactByID($http);
}]).
factory('supeRepo', ['$http', function($http) {
  return new supeRepository($http);
}]).
factory('getSupePassword', ['$http', function($http) {
  return new getSupePassword($http);
}]).
factory('updateSupe', ['$http', function($http) {
  return new updateSupeByID($http);
}]).
factory('settingsRepo', ['$http', function($http) {
  return new settingsRepository($http);
}]).
factory('getSetting', ['$http', function($http) {
  return new getSettingsByID($http);
}]).
factory('updateSetting', ['$http', function($http) {
  return new updateSettingByID($http);
}]).
factory('profileRepo', ['$http', function($http) {
  return new profileRepository($http);
}]).
factory('getProfile', ['$http', function($http) {
  return new getProfileByID($http);
}]).
factory('saveProfile', ['$http', function($http) {
  return new saveProfileByID($http);
}]).
factory('updateArtist', ['$http', function($http) {
  return new updateArtistByID($http);
}]).
factory('songsRepo', ['$http', function($http) {
	return new songsRepository($http);
}]).
factory('songsNoFileRepo', ['$http', function($http) {
	return new songsNoFileRepository($http);
}]).
factory('songsNoFileCount', ['$http', function($http) {
	return new getSongsNoFileCount($http);
}]).
factory('songsNoCompRepo', ['$http', function($http) {
	return new songsNoCompRepository($http);
}]).
factory('songsNoCompCount', ['$http', function($http) {
	return new getSongsNoCompCount($http);
}]).
factory('songsCount', ['$http', function($http) {
	return new getSongsCount($http);
}]).
factory('songsActiveCount', ['$http', function($http) {
	return new getActiveSongsCount($http);
}]).
factory('getSong', ['$http', function($http) {
	return new getSongByID($http);
}]).
factory('addSongs', ['$http', function($http) {
	return new addSong($http);
}]).
factory('updateSong', ['$http', function($http) {
  return new updateSongByID($http);
}]).
factory('updateSongCount', ['$http', function($http) {
  return new updateSongCountByID($http);
}]).
factory('updateSongDownloads', ['$http', function($http) {
    return new updateSongDownloadsByID($http);
}]).
factory('removeSongFile', ['$http', function($http) {
    return new removeSongFileByID($http);
}]).
factory('getSongLinks', ['$http', function($http) {
	return new getSongNavLinks($http);
}]).
factory('deleteSongs', ['$http', function($http) {
	return new deleteSong($http);
}]).
factory('getCompInfoArtist', ['$http', function($http) {
	return new getCompByArtist($http);
}]).
factory('getCompInfoSong', ['$http', function($http) {
	return new getCompBySong($http);
}]).
factory('getNewSignings', ['$http', function($http) {
	return new getFon($http);
}]).
factory('updateNewSigningsSort', ['$http', function($http) {
  return new updateFonSort($http);
}]).
factory('getArtistsForFon', ['$http', function($http) {
	return new getArtistsFon($http);
}]).
factory('updateFon', ['$http', function($http) {
    return new updateFonByID($http);
}]).
factory('removeFon', ['$http', function($http) {
    return new removeFonByID($http);
}]).
factory('sahCount', ['$http', function($http) {
	return new getSahCount($http);
}]).
factory('sahRepo', ['$http', function($http) {
	return new sahRepository($http);
}]).
factory('updateSAHSortOrder', ['$http', function($http) {
    return new updateSahSort($http);
}]).
factory('updateSAHActive', ['$http', function($http) {
    return new updateSAHActiveByID($http);
}]).
factory('addSahHolder', ['$http', function($http) {
	return new addSah($http);
}]).
factory('deleteSahs', ['$http', function($http) {
	return new deleteSah($http);
}]).
factory('updateSah', ['$http', function($http) {
	return new updateSahHolder($http);
}]).
factory('getSahItems', ['$http', function($http) {
	return new getItemsBySah($http);
}]).
factory('getSahLinks', ['$http', function($http) {
	return new getSahNavLinks($http);
}]).
factory('updateSAHItemSortOrder', ['$http', function($http) {
    return new updateSahItemSort($http);
}]).
factory('deleteSahItems', ['$http', function($http) {
	return new deleteSahItem($http);
}]).
factory('addSahItems', ['$http', function($http) {
	return new addSahItem($http);
}]).
factory('getSahItem', ['$http', function($http) {
	return new getSahItemByID($http);
}]).
factory('updateSahItem', ['$http', function($http) {
    return new updateSahItemByID($http);
}]).
factory('sahItemCount', ['$http', function($http) {
	return new getSahItemCount($http);
}]).
factory('getSahItemLinks', ['$http', function($http) {
	return new getSahItemNavLinks($http);
}]).
factory('featuredRepo', ['$http', function($http) {
	return new featuredRepository($http);
}]).
factory('removeFeatured', ['$http', function($http) {
    return new removeFeaturedByID($http);
}]).
factory('getArtistsForFeatured', ['$http', function($http) {
	return new getArtistsFeatured($http);
}]).
factory('updateFeatured', ['$http', function($http) {
    return new updateFeaturedByID($http);
}]).
factory('compsCount', ['$http', function($http) {
	return new getCompsCount($http);
}]).
factory('compsActiveCount', ['$http', function($http) {
	return new getCompsActiveCount($http);
}]).
factory('compsRepo', ['$http', function($http) {
	return new compsRepository($http);
}]).
factory('compsRecent', ['$http', function($http) {
	return new compsMostRecent($http);
}]).
factory('updateCompsSortOrder', ['$http', function($http) {
  return new updateCompsSort($http);
}]).
factory('updateCompCount', ['$http', function($http) {
  return new updateCompCountByID($http);
}]).
factory('deleteComps', ['$http', function($http) {
	return new deleteComp($http);
}]).
factory('getComp', ['$http', function($http) {
	return new getCompByID($http);
}]).
factory('updateComp', ['$http', function($http) {
  return new updateCompByID($http);
}]).
factory('getMaxCompPlaylistSort', ['$http', function($http) {
	return new getMaxCompPlaylistSortOrder($http);
}]).
factory('getCompLinks', ['$http', function($http) {
	return new getCompNavLinks($http);
}]).
factory('getSongsForSelector', ['$http', function($http) {
	return new getSongsSelector($http);
}]).
factory('getCompsPlaylist', ['$http', function($http) {
	return new getCompPlaylist($http);
}]).
factory('deleteCompsPlaylistItem', ['$http', function($http) {
	return new deleteCompPlaylistItem($http);
}]).
factory('addCompsPlaylistItem', ['$http', function($http) {
	return new addCompPlaylistItem($http);
}]).
factory('updateCompActive', ['$http', function($http) {
  return new updateCompActiveByID($http);
}]).
factory('updateCompInActive', ['$http', function($http) {
  return new updateCompInActiveByID($http);
}]).
factory('updateCompInCarousel', ['$http', function($http) {
  return new updateCompInCarouselByID($http);
}]).
factory('updateCompOutCarousel', ['$http', function($http) {
  return new updateCompOutCarouselByID($http);
}]).
factory('getMaxCompSort', ['$http', function($http) {
	return new getMaxCompSortOrder($http);
}]).
factory('addComps', ['$http', function($http) {
	return new addComp($http);
}]).
factory('addSongsToComp', ['$http', function($http) {
	return new addSongToComp($http);
}]).
factory('addArtistsToComp', ['$http', function($http) {
	return new addArtistToComp($http);
}]).
factory('updatePlaylistSortOrder', ['$http', function($http) {
  return new updatePlaylistSort($http);
}]).
factory('dropboxesCount', ['$http', function($http) {
	return new getDropboxesCount($http);
}]).
factory('dropboxesActiveCount', ['$http', function($http) {
	return new getDropboxesActiveCount($http);
}]).
factory('dropboxesRepo', ['$http', function($http) {
	return new dropboxesRepository($http);
}]).
factory('updateDropboxesSortOrder', ['$http', function($http) {
  return new updateDropboxesSort($http);
}]).
factory('deleteDropboxes', ['$http', function($http) {
	return new deleteDropbox($http);
}]).
factory('addDropboxes', ['$http', function($http) {
	return new addDropbox($http);
}]).
factory('getMaxDropboxSort', ['$http', function($http) {
	return new getMaxDropboxSortOrder($http);
}]).
factory('updateDropbox', ['$http', function($http) {
  return new updateDropboxByID($http);
}]).
factory('addDropboxes', ['$http', function($http) {
	return new addDropbox($http);
}]).
factory('getDropbox', ['$http', function($http) {
	return new getDropboxByID($http);
}]).
factory('updateDropboxActive', ['$http', function($http) {
  return new updateDropboxActiveByID($http);
}]).
factory('updateDropboxInActive', ['$http', function($http) {
  return new updateDropboxInActiveByID($http);
}]).
factory('getDropboxLinks', ['$http', function($http) {
	return new getDropboxNavLinks($http);
}]).
factory('updateDropboxCount', ['$http', function($http) {
  return new updateDropboxCountByID($http);
}]).
factory('uuid', function() {
  var svc = {
    new: function() {
      function _p8(s) {
        var p = (Math.random().toString(16)+"000000000").substr(2,8);
        return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
      }
        return _p8() + _p8(true) + _p8(true) + _p8();
      },
      empty: function() {
        return '00000000-0000-0000-0000-000000000000';
      }
    };
    return svc;
}).
service('asyncScript', ['$window', function($window) {
    var libs = {
      datepicker:		'//cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.3.0/js/bootstrap-datepicker.min.js',
      moment:				'//cdnjs.cloudflare.com/ajax/libs/moment.js/2.6.0/moment.min.js',
      jasny:				'//cdnjs.cloudflare.com/ajax/libs/jasny-bootstrap/3.1.3/js/jasny-bootstrap.min.js'
    };
    return {
      load: function(name,cb) {
        if (!$window["loader_"+name]) {
          $.getScript(libs[name],function(){
            $window["loader_"+name] = true;
              cb();
            });
        }
        else {
          cb();
      	}
      }
    }

}]).
service('noty', ['$rootScope', function($rootScope) {
	var queue = $rootScope.queue||[];

	return {
		queue: queue,
		add: function( item ) {
			queue.push(item);
			setTimeout(function(){
				var ele = $('.alerts .alert').eq(0);
				ele.fadeOut(3000,function(){
					ele.remove();
				});
				queue.shift();
				$rootScope.$apply();
			},5000);
		},
		pop: function(){
			return queue.pop();
		}
	};
}]);

/* data repositories -------------------------------- */
window.userRepository = function($http) {
	this.$http = $http;
	this.fetchUsers = function() {
		var url = 'api/users';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.supeRepository = function($http) {
	this.$http = $http;
	this.fetchSupe = function() {
		var url = 'api/supe';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSupePassword = function($http) {
	this.$http = $http;
	this.fetchSupeByID = function(id) {
		var url = 'api/supe/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		});
	};
};
window.updateSupeByID = function($http) {
	this.$http = $http;
	this.putSupeByID = function(id, supe) {
		return this.$http.put('api/supe/'+id, supe)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.settingsRepository = function($http) {
	this.$http = $http;
	this.fetchSettings = function() {
		var url = 'api/settings';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSettingsByID = function($http) {
	this.$http = $http;
	this.fetchSettingByID = function(id) {
		var url = 'api/setting/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		});
	};
};
window.updateSettingByID = function($http) {
	this.$http = $http;
	this.putSettingByID = function(id, setting) {
		return this.$http.put('api/setting/'+id, setting)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.profileRepository = function($http) {
	this.$http = $http;
	this.fetchProfile = function() {
		var url = 'api/profile';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getProfileByID = function($http) {
	this.$http = $http;
	this.fetchProfileByID = function(id) {
		var url = 'api/profile/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.saveProfileByID = function($http) {
	this.$http = $http;
	this.putProfileByID = function(id, profile) {
		return this.$http.put('api/profile/'+id, profile)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.aboutRepository = function($http) {
	this.$http = $http;
	this.fetchAbout = function() {
		var url = 'api/about';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getAboutByID = function($http) {
	this.$http = $http;
	this.fetchAboutByID = function(id) {
		var url = 'api/about/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		});
	};
};
window.updateAboutByID = function($http) {
	this.$http = $http;
	this.putAboutByID = function(id, about) {
		return this.$http.put('api/about/'+id, about)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
    });
	};
};
window.contactRepository = function($http) {
	this.$http = $http;
	this.fetchContact = function() {
		var url = 'api/contact';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getContactByID = function($http) {
	this.$http = $http;
	this.fetchContactByID = function(id) {
		var url = 'api/contact/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		});
	};
};
window.updateContactByID = function($http) {
	this.$http = $http;
	this.putContactByID = function(id, contact) {
		return this.$http.put('api/contact/'+id, contact)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
    });
	};
};
window.getTopSongs = function($http) {
	this.$http = $http;
	this.fetchTopSongs = function() {
		var url = 'api/top-songs';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('top songs data error!');
    });
	};
};
window.getTopSongsDownload = function($http) {
	this.$http = $http;
	this.fetchTopSongsDownload = function() {
		var url = 'api/top-songs-download';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('top songs data error!');
    });
	};
};
window.getTopComps = function($http) {
	this.$http = $http;
	this.fetchTopComps = function() {
		var url = 'api/top-comps';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('top comps data error!');
    });
	};
};
window.getTopDropboxes = function($http) {
	this.$http = $http;
	this.fetchTopDropboxes = function() {
		var url = 'api/top-dropboxes';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('top dropboxes data error!');
    });
	};
};
window.artistsRepository = function($http) {
	this.$http = $http;
	this.fetchArtists = function() {
		var url = 'api/artists';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.artistsActiveRepository = function($http) {
	this.$http = $http;
	this.fetchActiveArtists = function() {
		var url = 'api/artists';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getArtistsCount = function($http) {
	this.$http = $http;
	this.fetchArtistsCount = function() {
		var url = 'api/artists_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getActiveArtistsCount = function($http) {
	this.$http = $http;
	this.fetchActiveArtistsCount = function() {
		var url = 'api/active_artists_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.artistsNoSongsRepository = function($http) {
	this.$http = $http;
	this.fetchArtists = function() {
		var url = 'api/artists_nosongs';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getArtistsNoSongsCount = function($http) {
	this.$http = $http;
	this.fetchArtistsNoSongsCount = function() {
		var url = 'api/artists_nosongs_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getArtistByID = function($http) {
	this.$http = $http;
	this.fetchArtistByID = function(id) {
		var url = 'api/artists/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.getArtistsSelector = function($http) {
	this.$http = $http;
	this.fetchArtistsSelector = function() {
		var url = 'api/artists_select';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSongsByArtist = function($http) {
	this.$http = $http;
	this.fetchSongsByArtist = function(id) {
		var url = 'api/artist_songs/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.getArtistNavLinks = function($http) {
	this.$http = $http;
	this.fetchArtistNavLinks = function(name) {
		var url = 'api/artist_links/';
		return this.$http.get(url+name)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.getMaxHomeSortOrder = function($http) {
	this.$http = $http;
	this.fetchMaxHomeSort = function() {
		var url = 'api/max_homesortorder';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('max sort error!');
    });
	};
};
window.updateArtistByID = function($http) {
	this.$http = $http;
	this.putArtistByID = function(id, artist) {
		return this.$http.put('api/artists/'+id, artist)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.deleteArtist = function($http) {
	this.$http = $http;
	this.deleteArtistByID = function(id) {
		return this.$http.delete('api/artists/'+id);
	};
};
window.addArtist = function($http) {
	this.$http = $http;
	this.addNewArtist = function(artist) {
		return this.$http.post('api/add_artist', artist)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.songsRepository = function($http) {
	this.$http = $http;
	this.fetchSongs = function() {
		var url = 'api/songs';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.songsNoFileRepository = function($http) {
	this.$http = $http;
	this.fetchSongs = function() {
		var url = 'api/songs_nofile';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSongsNoFileCount = function($http) {
	this.$http = $http;
	this.fetchSongsNoFileCount = function() {
		var url = 'api/songs_nofile_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.songsNoCompRepository = function($http) {
	this.$http = $http;
	this.fetchSongs = function() {
		var url = 'api/songs_nocomp';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSongsNoCompCount = function($http) {
	this.$http = $http;
	this.fetchSongsNoCompCount = function() {
		var url = 'api/songs_nocomp_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSongsCount = function($http) {
	this.$http = $http;
	this.fetchSongsCount = function() {
		var url = 'api/songs_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getActiveSongsCount = function($http) {
	this.$http = $http;
	this.fetchActiveSongsCount = function() {
		var url = 'api/songs_active_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSongByID = function($http) {
	this.$http = $http;
	this.fetchSongByID = function(id) {
		var url = 'api/songs/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.addSong = function($http) {
	this.$http = $http;
	this.addNewSong = function(song) {
		return this.$http.post('api/add_song', song)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.updateSongByID = function($http) {
	this.$http = $http;
	this.putSongByID = function(id, song) {
		return this.$http.put('api/songs/'+id, song)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.updateSongCountByID = function($http) {
	this.$http = $http;
	this.putSongCount = function(id, song) {
		return this.$http.put('api/song_count/'+id, song)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.updateSongDownloadsByID = function($http) {
	this.$http = $http;
	this.putSongDownload = function(id, song) {
		return this.$http.put('api/song_downloads/'+id, song)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.removeSongFileByID = function($http) {
	this.$http = $http;
	this.removeSongFileByID = function(id, song) {
		return this.$http.put('api/song_file/'+id, song)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.deleteSong = function($http) {
	this.$http = $http;
	this.deleteSongByID = function(id) {
		return this.$http.delete('api/songs/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.getSongNavLinks = function($http) {
	this.$http = $http;
	this.fetchSongNavLinks = function(artistID, name) {
		var url = 'api/song_links/'+artistID +'/'+name;
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.getCompByArtist = function($http) {
	this.$http = $http;
	this.fetchCompByArtist = function(id) {
		var url = 'api/comp_info_artist/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('comp data error!');
    });
	};
};
window.getCompBySong = function($http) {
	this.$http = $http;
	this.fetchCompBySong = function(id) {
		var url = 'api/comp_info_song/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('comp data error!');
    });
	};
};
window.getFon = function($http) {
	this.$http = $http;
	this.fetchFon = function() {
		var url = 'api/fon';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.updateFonSort = function($http) {
	this.$http = $http;
	this.putFonSort = function(id, artist) {
		return this.$http.put('api/update_fon_sort/'+id, artist)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.getArtistsFon = function($http) {
	this.$http = $http;
	this.fetchArtistsFon = function() {
		var url = 'api/artists_fon';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.updateFonByID = function($http) {
	this.$http = $http;
	this.putFonByID = function(id) {
		return this.$http.put('api/update_fon/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.removeFonByID = function($http) {
	this.$http = $http;
	this.putFonByID = function(id) {
		return this.$http.put('api/remove_fon/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.getSahCount = function($http) {
	this.$http = $http;
	this.fetchSahCount = function() {
		var url = 'api/sah_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.sahRepository = function($http) {
	this.$http = $http;
	this.fetchSah = function() {
		var url = 'api/sah';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.updateSahSort = function($http) {
	this.$http = $http;
	this.putSahSort = function(id, sah) {
		return this.$http.put('api/update_sah_sort/'+id, sah)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.addSah = function($http) {
	this.$http = $http;
	this.addNewSah = function(sah) {
		return this.$http.post('api/add_sah', sah)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.updateSAHActiveByID = function($http) {
	this.$http = $http;
	this.putSahActive = function(id) {
		return this.$http.put('api/update_sah_active/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.deleteSah = function($http) {
	this.$http = $http;
	this.deleteSahByID = function(id) {
		return this.$http.delete('api/sah/'+id);
	};
};
window.updateSahHolder = function($http) {
	this.$http = $http;
	this.updateSahHolderName = function(id, name) {
		var url = 'api/sah/'+id +'/'+name;
		return this.$http.put(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.getItemsBySah = function($http) {
	this.$http = $http;
	this.fetchItemsBySah = function(id) {
		var url = 'api/sah_items/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.updateSahItemSort = function($http) {
	this.$http = $http;
	this.putSahItemSort = function(id, item) {
		return this.$http.put('api/update_sahitem_sort/'+id, item)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.deleteSahItem = function($http) {
	this.$http = $http;
	this.deleteSahItemByID = function(id) {
		return this.$http.delete('api/sah_items/'+id);
	};
};
window.addSahItem = function($http) {
	this.$http = $http;
	this.addNewSahItem = function(id, item) {
		return this.$http.post('api/add_sah_item/'+id, item)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.getSahItemByID = function($http) {
	this.$http = $http;
	this.fetchSahItemByID = function(id) {
		var url = 'api/sah_item/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.updateSahItemByID = function($http) {
	this.$http = $http;
	this.putSahItemByID = function(id, item) {
		return this.$http.put('api/sah_item/'+id, item)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.getSahNavLinks = function($http) {
	this.$http = $http;
	this.fetchSahNavLinks = function(order) {
		var url = 'api/sah_links/';
		return this.$http.get(url+order)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('sah data error!');
    });
	};
};
window.getSahItemCount = function($http) {
	this.$http = $http;
	this.fetchSahItemCount = function() {
		var url = 'api/sah_item_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getSahItemNavLinks = function($http) {
	this.$http = $http;
	this.fetchSahItemNavLinks = function(itemID, sort) {
		var url = 'api/sah_item_links/'+itemID +'/'+sort;
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.featuredRepository = function($http) {
	this.$http = $http;
	this.fetchFeatured = function() {
		var url = 'api/featured';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.removeFeaturedByID = function($http) {
	this.$http = $http;
	this.putFeaturedByID = function(id) {
		return this.$http.put('api/remove_featured/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.getArtistsFeatured = function($http) {
	this.$http = $http;
	this.fetchArtistsFeatured = function() {
		var url = 'api/artists_featured';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.updateFeaturedByID = function($http) {
	this.$http = $http;
	this.putFeaturedByID = function(id) {
		return this.$http.put('api/update_featured/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.getCompsCount = function($http) {
	this.$http = $http;
	this.fetchCompsCount = function() {
		var url = 'api/comps_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getCompsActiveCount = function($http) {
	this.$http = $http;
	this.fetchCompsActiveCount = function() {
		var url = 'api/comps_active_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.compsRepository = function($http) {
	this.$http = $http;
	this.fetchComps = function() {
		var url = 'api/comps';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.compsMostRecent = function($http) {
	this.$http = $http;
	this.fetchMostRecentComps = function() {
		var url = 'api/recent_comps';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.updateCompsSort = function($http) {
	this.$http = $http;
	this.putCompsSort = function(id, comp) {
		return this.$http.put('api/update_comps_sort/'+id, comp)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('dropboxes data error!');
    });
	};
};
window.updateCompCountByID = function($http) {
	this.$http = $http;
	this.putCompCount = function(id, comp) {
		return this.$http.put('api/comp_count/'+id, comp)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.deleteComp = function($http) {
	this.$http = $http;
	this.deleteCompByID = function(id) {
		return this.$http.delete('api/comps/'+id);
	};
};
window.getCompByID = function($http) {
	this.$http = $http;
	this.fetchCompByID = function(id) {
		var url = 'api/comps/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('dropbox data error!');
    });
	};
};
window.updateCompByID = function($http) {
	this.$http = $http;
	this.putCompByID = function(id, comp) {
		return this.$http.put('api/comps/'+id, comp)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('comp data error!');
    });
	};
};
window.getSongsSelector = function($http) {
	this.$http = $http;
	this.fetchSongsSelector = function() {
		var url = 'api/songs_select';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getCompPlaylist = function($http) {
	this.$http = $http;
	this.fetchCompPlaylist = function(id) {
		var url = 'api/comp_playlist/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		});
	};
};
window.deleteCompPlaylistItem = function($http) {
	this.$http = $http;
	this.deleteCompPlaylistItemByID = function(id) {
		return this.$http.delete('api/comp_playlist_item/'+id);
	};
};
window.getMaxCompPlaylistSortOrder = function($http) {
	this.$http = $http;
	this.fetchMaxCompPlaylistSortOrder = function(id) {
		var url = 'api/max_comp_playlist_sortorder/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('max sort error!');
    });
	};
};
window.addCompPlaylistItem = function($http) {
	this.$http = $http;
	this.addNewCompPlaylistItem = function(playlist) {
		return this.$http.post('api/comp_playlist', playlist)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('comp data error!');
    });
	};
};
window.updateCompActiveByID = function($http) {
	this.$http = $http;
	this.putCompActive = function(id) {
		return this.$http.put('api/comp_active/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.updateCompInActiveByID = function($http) {
	this.$http = $http;
	this.putCompInActive = function(id) {
		return this.$http.put('api/comp_inactive/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.updateCompInCarouselByID = function($http) {
	this.$http = $http;
	this.putCompInCarousel = function(id) {
		return this.$http.put('api/comp_carousel/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.updateCompOutCarouselByID = function($http) {
	this.$http = $http;
	this.putCompOutCarousel = function(id) {
		return this.$http.put('api/comp_carousel_out/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.getMaxCompSortOrder = function($http) {
	this.$http = $http;
	this.fetchMaxCompSort = function() {
		var url = 'api/max_compsortorder';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('max sort error!');
    });
	};
};
window.addComp = function($http) {
	this.$http = $http;
	this.addNewComp = function(comp) {
		return this.$http.post('api/add_comp', comp)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('comp data error!');
    });
	};
};
window.addSongToComp = function($http) {
	this.$http = $http;
	this.addNewSong = function(id, song) {
		return this.$http.post('api/add_song_to_comp/'+id, song)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
window.updatePlaylistSort = function($http) {
	this.$http = $http;
	this.putPlaylistSort = function(id, playlist) {
		return this.$http.put('api/update_playlist_sort/'+id, playlist)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('dropboxes data error!');
    });
	};
};
window.addArtistToComp = function($http) {
	this.$http = $http;
	this.addNewArtist = function(id, artist) {
		return this.$http.post('api/add_artist_to_comp/'+id, artist)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.getCompNavLinks = function($http) {
	this.$http = $http;
	this.fetchCompNavLinks = function(sort) {
		var url = 'api/comp_links/';
		return this.$http.get(url+sort)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('comp data error!');
    });
	};
};
window.getDropboxesCount = function($http) {
	this.$http = $http;
	this.fetchDropboxesCount = function() {
		var url = 'api/dropboxes_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.getDropboxesActiveCount = function($http) {
	this.$http = $http;
	this.fetchDropboxesActiveCount = function() {
		var url = 'api/dropboxes_active_count';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.dropboxesRepository = function($http) {
	this.$http = $http;
	this.fetchDropboxes = function() {
		var url = 'api/dropboxes';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		});
	};
};
window.updateDropboxesSort = function($http) {
	this.$http = $http;
	this.putDropboxesSort = function(id, dropbox) {
		return this.$http.put('api/update_dropboxes_sort/'+id, dropbox)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('dropboxes data error!');
    });
	};
};
window.deleteDropbox = function($http) {
	this.$http = $http;
	this.deleteDropboxByID = function(id) {
		return this.$http.delete('api/dropboxes/'+id);
	};
};
window.addDropbox = function($http) {
	this.$http = $http;
	this.addNewDropbox = function(dropbox) {
		return this.$http.post('api/add_dropbox', dropbox)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('dropbox data error!');
    });
	};
};
window.getMaxDropboxSortOrder = function($http) {
	this.$http = $http;
	this.fetchMaxDropboxSort = function() {
		var url = 'api/max_dropboxsortorder';
		return this.$http.get(url)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('max sort error!');
    });
	};
};
window.updateDropboxByID = function($http) {
	this.$http = $http;
	this.putDropboxByID = function(id, dropbox) {
		return this.$http.put('api/dropboxes/'+id, dropbox)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.getDropboxByID = function($http) {
	this.$http = $http;
	this.fetchDropboxByID = function(id) {
		var url = 'api/dropboxes/';
		return this.$http.get(url+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('dropbox data error!');
    });
	};
};
window.updateDropboxActiveByID = function($http) {
	this.$http = $http;
	this.putDropboxActive = function(id) {
		return this.$http.put('api/dropbox_active/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
		});
	};
};
window.updateDropboxInActiveByID = function($http) {
	this.$http = $http;
	this.putDropboxInActive = function(id) {
		return this.$http.put('api/dropbox_inactive/'+id)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('fon data error!');
    });
	};
};
window.getDropboxNavLinks = function($http) {
	this.$http = $http;
	this.fetchDropboxNavLinks = function(sort) {
		var url = 'api/dropbox_links/';
		return this.$http.get(url+sort)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('artist data error!');
    });
	};
};
window.updateDropboxCountByID = function($http) {
	this.$http = $http;
	this.putDropboxCount = function(id, dropbox) {
		return this.$http.put('api/dropbox_count/'+id, dropbox)
		.success(function(data) {
			return data;
		}).error(function(data, status) {
      //alert('song data error!');
    });
	};
};
/* end data repositories -------------------------------- */

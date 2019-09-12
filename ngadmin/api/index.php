<?php
if(!isset($_SESSION)){
    session_start();
}

require 'Slim/Slim.php';
\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

// PROFILE CALLS
$app->get('/profile', 'getProfile');
$app->get('/profile/:id', 'getProfileByID');
$app->put('/profile/:id', 'updateProfile');

// DASHBOARD
$app->get('/top-songs', 'getTopSongs');
$app->get('/top-songs-download', 'getTopSongsDownload');
$app->get('/top-comps', 'getTopComps');
$app->get('/top-dropboxes', 'getTopDropboxes');
$app->get('/users', 'getUsers');

// SITE SETTINGS
$app->get('/settings', 'getSettings');
$app->get('/setting/:id', 'getSetting');
$app->put('/setting/:id', 'updateSetting');
$app->post('/update_logo/:id', 'updateLogoImage');

// ABOUT PAGE
$app->get('/about', 'getAbout');
$app->get('/about/:id', 'getAboutPage');
$app->put('/about/:id', 'updateAbout');

// CONTACT PAGE
$app->get('/contact', 'getContact');
$app->get('/contact/:id', 'getContactPage');
$app->put('/contact/:id', 'updateContact');

// SUPERVISOR Password
$app->get('/supe', 'getSupe');
$app->get('/supe/:id', 'getSupePassword');
$app->put('/supe/:id', 'updateSupe');

// ARTISTS
$app->get('/artists', 'getArtists');
$app->get('/active_artists_count', 'getActiveArtistsCount');
$app->get('/artists_count', 'getArtistsCount');
$app->get('/artists_nosongs', 'getArtistsNoSongs');
$app->get('/artists_nosongs_count', 'getArtistsNoSongsCount');
$app->get('/artists/:id', 'getArtist');
$app->get('/max_homesortorder', 'getMaxHomeSortOrder');
$app->get('/artist_songs/:id', 'getArtistSongs');
$app->get('/artists_select', 'getArtistsForSelector');
$app->post('/add_artist', 'addArtist');
$app->put('/artists/:id', 'updateArtist');
$app->delete('/artists/:id', 'deleteArtist');
$app->post('/upload_album', 'uploadAlbumPic');
$app->post('/upload_slider', 'uploadSliderPic');
$app->post('/update_album/:id', 'updateAlbumPic');
$app->post('/update_slider/:id', 'updateSliderPic');
$app->get('/comp_info_artist/:id', 'getCompByArtist');
$app->get('/artist_links/:name', function ($name) {
  getArtistLinks($name);
});

// SONGS
$app->get('/songs', 'getSongs');
$app->get('/songs_nofile', 'getSongsNoFile');
$app->get('/songs_nofile_count', 'getSongsNoFileCount');
$app->get('/songs_nocomp', 'getSongsNoComp');
$app->get('/songs_nocomp_count', 'getSongsNoCompCount');
$app->get('/songs_count', 'getSongsCount');
$app->get('/songs_active_count', 'getActiveSongsCount');
$app->get('/songs/:id', 'getSong');
$app->post('/add_song', 'addSong');
$app->put('/songs/:id', 'updateSong');
$app->put('/song_count/:id', 'updateSongCount');
$app->put('/song_downloads/:id', 'updateSongDownloads');
$app->put('/song_file/:id', 'removeSongFile');
$app->post('/update_mp3/:id', 'updateMP3');
$app->post('/upload_mp3', 'uploadMP3');
$app->delete('/songs/:id', 'deleteSong');
$app->get('/comp_info_song/:id', 'getCompBySong');
$app->get('/song_links/:id/:name', function ($id, $name) {
  getSongLinks($id, $name);
});

// NEW SIGNINGS
$app->get('/fon', 'getNewSignings');
$app->put('/update_fon_sort/:id', 'updateFonSort');
$app->get('/artists_fon', 'getArtistsForFon');
$app->put('/update_fon/:id', 'updateFon');
$app->put('/remove_fon/:id', 'removeFon');

// SCENE & HEARD
$app->get('/sah_count', 'getSahCount');
$app->get('/sah', 'getSah');
$app->put('/update_sah_sort/:id', 'updateSahSort');
$app->put('/update_sah_active/:id', 'updateSahActive');
$app->post('/add_sah', 'addSah');
$app->delete('/sah/:id', 'deleteSah');
$app->put('/sah/:id/:name', function ($id, $name) {
  updateSah($id, $name);
});
$app->get('/sah_items/:id', 'getSahItems');
$app->get('/sah_links/:order', function ($order) {
  getSahLinks($order);
});
$app->put('/update_sahitem_sort/:id', 'updateSahItemSort');
$app->delete('/sah_items/:id', 'deleteSahItem');
$app->post('/add_sah_item/:id', 'addSahItem');
$app->get('/sah_item/:id', 'getSahItem');
$app->put('/sah_item/:id', 'updateSahItem');
$app->get('/sah_item_count', 'getSahItemCount');
$app->get('/sah_item_links/:id/:sort', function ($id, $sort) {
  getSahItemLinks($id, $sort);
});

// FEATURED ARTISTS
$app->get('/featured', 'getFeatured');
$app->put('/remove_featured/:id', 'removeFeatured');
$app->get('/artists_featured', 'getArtistsForFeatured');
$app->put('/update_featured/:id', 'updateFeatured');

// COMPS
$app->get('/comps_count', 'getCompsCount');
$app->get('/comps_active_count', 'getCompsActiveCount');
$app->get('/comps', 'getComps');
$app->get('/recent_comps', 'getMostRecentComp');
$app->put('/update_comps_sort/:id', 'updateCompsSort');
$app->put('/comp_count/:id', 'updateCompCount');
$app->delete('/comps/:id', 'deleteComp');
$app->get('/comps/:id', 'getComp');
$app->put('/comps/:id', 'updateComp');
$app->get('/songs_select', 'getSongsForSelector');
$app->get('/comp_playlist/:id', 'getCompPlaylist');
$app->put('/comp_playlist_count/:id', 'addToCompPlaylistCount');
$app->put('/comp_playlist_count_remove/:id', 'removeFromCompPlaylistCount');
$app->delete('/comp_playlist_item/:id', 'deleteCompPlaylistItem');
$app->get('/max_comp_playlist_sortorder/:id', 'getMaxCompPlaylistSortOrder');
$app->post('/comp_playlist', 'updateCompPlaylist');
$app->post('/update_comp_pic/:id', 'updateCompPic');
$app->put('/comp_active/:id', 'updateCompSetActive');
$app->put('/comp_inactive/:id', 'updateCompSetInActive');
$app->put('/comp_carousel/:id', 'updateCompSetInCarousel');
$app->put('/comp_carousel_out/:id', 'updateCompSetOutCarousel');
$app->get('/max_compsortorder', 'getMaxCompSortOrder');
$app->post('/add_comp', 'addComp');
$app->post('/upload_comp_pic', 'uploadCompPic');
$app->post('/add_song_to_comp/:id', 'addSongToComp');
$app->post('/add_artist_to_comp/:id', 'addArtistToComp');
$app->put('/update_playlist_sort/:id', 'updatePlaylistSort');
$app->get('/comp_links/:sort', function ($sort) {
  getCompLinks($sort);
});

// DROPBOXES
$app->get('/dropboxes_count', 'getDropboxesCount');
$app->get('/dropboxes_active_count', 'getDropboxesActiveCount');
$app->get('/dropboxes', 'getDropboxes');
$app->put('/update_dropboxes_sort/:id', 'updateDropboxesSort');
$app->delete('/dropboxes/:id', 'deleteDropbox');
$app->post('/add_dropbox', 'addDropbox');
$app->get('/max_dropboxsortorder', 'getMaxDropboxSortOrder');
$app->put('/dropboxes/:id', 'updateDropbox');
$app->get('/dropboxes/:id', 'getDropbox');
$app->put('/dropbox_active/:id', 'updateDropboxSetActive');
$app->put('/dropbox_inactive/:id', 'updateDropboxSetInActive');
$app->put('/dropbox_count/:id', 'updateDropboxCount');
$app->get('/dropbox_links/:sort', function ($sort) {
  getDropboxLinks($sort);
});

$app->run();

// PROFILE FUNCTIONS
function getProfile() {
	$sql = "select AdminID, email, username, firstname, lastname, portrait, sitename, site, db_alias, last_login, current_login from admin where AdminID='$_SESSION[AdminID]' order by username";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$profile = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($profile);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getProfileByID($id) {
	$sql = "select AdminID, email, username, firstname, lastname, portrait, pootymorning, pootyafternoon, pootyevening, pootynight, sitename, site, db_alias, last_login, current_login from admin where AdminID=".$id." order by username";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$profile = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($profile);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateProfile($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $profile = json_decode($body);
	$sql = "update admin set email=:email, username=:username, firstname=:firstname, lastname=:lastname, portrait=:portrait, pootymorning=:pootymorning, pootyafternoon=:pootyafternoon, pootyevening=:pootyevening, pootynight=:pootynight, sitename=:sitename, site=:site, password=:password where AdminID=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("email", $profile->email);
    $stmt->bindParam("username", $profile->username);
		$stmt->bindParam("firstname", $profile->firstname);
		$stmt->bindParam("lastname", $profile->lastname);
		$stmt->bindParam("portrait", $profile->portrait);
    $stmt->bindParam("pootymorning", $profile->pootymorning);
    $stmt->bindParam("pootyafternoon", $profile->pootyafternoon);
    $stmt->bindParam("pootyevening", $profile->pootyevening);
    $stmt->bindParam("pootynight", $profile->pootynight);
    $stmt->bindParam("sitename", $profile->sitename);
    $stmt->bindParam("site", $profile->site);
		$stmt->bindParam("password", $profile->password);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($profile);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// DASHBOARD FUNCTIONS
function getTopSongs() {
	$sql = "select INartistID, INartistName, marker, song_title, song_file, song_id, song_count, last_played from indies left join songs on indies.INartistID = songs.artistID where roster_flag = 'y' order by song_count desc limit 0, 10";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getTopSongsDownload() {
  $sql = "select INartistID, INartistName, marker, song_title, song_file, song_id, song_downloads, last_download from indies left join songs on indies.INartistID = songs.artistID where roster_flag = 'y' order by song_downloads desc limit 0, 10";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getTopComps() {
	$sql = "select * from comp_main order by count desc limit 0, 10";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$comps = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($comps);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getTopDropboxes() {
	$sql = "select * from dropbox order by count desc limit 0, 10";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$dropboxes = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($dropboxes);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getUsers() {
	$sql = "select AdminID, email, username, firstname, lastname, portrait, sitename, site, db_alias, last_login, current_login from admin";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$users = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($users);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getAbout() {
	$sql = "select about_id, about_desc from aboutpage";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$about = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($about);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getAboutPage($id) {
	$sql = "select * from aboutpage where about_id=".$id." order by about_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$about = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($about);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateAbout($id) {
  $app = \Slim\Slim::getInstance();
  $request = $app->request();
  $body = $request->getBody();
  $about = json_decode($body);
	$sql = "update aboutpage set top_left_para_1=:top_left_para_1, top_left_para_2=:top_left_para_2, top_left_para_3=:top_left_para_3, top_right_para_1=:top_right_para_1, bottom_left_heading=:bottom_left_heading, bottom_left_para=:bottom_left_para, bottom_right_heading=:bottom_right_heading, bottom_right_para_1=:bottom_right_para_1, bottom_right_para_2=:bottom_right_para_2 where about_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("top_left_para_1", $about->top_left_para_1);
		$stmt->bindParam("top_left_para_2", $about->top_left_para_2);
		$stmt->bindParam("top_left_para_3", $about->top_left_para_3);
    $stmt->bindParam("top_right_para_1", $about->top_right_para_1);
    $stmt->bindParam("bottom_left_heading", $about->bottom_left_heading);
    $stmt->bindParam("bottom_left_para", $about->bottom_left_para);
    $stmt->bindParam("bottom_right_heading", $about->bottom_right_heading);
    $stmt->bindParam("bottom_right_para_1", $about->bottom_right_para_1);
    $stmt->bindParam("bottom_right_para_2", $about->bottom_right_para_2);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($about);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getContact() {
	$sql = "select contact_id, main_heading from contactpage";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$contact = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($contact);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getContactPage($id) {
	$sql = "select * from contactpage where contact_id=".$id." order by contact_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$contact = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($contact);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateContact($id) {
  $app = \Slim\Slim::getInstance();
  $request = $app->request();
  $body = $request->getBody();
  $contact = json_decode($body);
	$sql = "update contactpage set main_heading=:main_heading, main_subhead=:main_subhead, top_left_icon=:top_left_icon, top_left_heading=:top_left_heading, top_left_subhead=:top_left_subhead, top_left_para=:top_left_para, top_right_icon=:top_right_icon, top_right_heading=:top_right_heading, top_right_subhead=:top_right_subhead, top_right_para=:top_right_para, bottom_left_icon=:bottom_left_icon, bottom_left_heading=:bottom_left_heading, bottom_left_subhead=:bottom_left_subhead, bottom_left_para=:bottom_left_para, bottom_right_icon=:bottom_right_icon, bottom_right_heading=:bottom_right_heading, bottom_right_subhead=:bottom_right_subhead, bottom_right_para=:bottom_right_para where contact_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("main_heading", $contact->main_heading);
		$stmt->bindParam("main_subhead", $contact->main_subhead);
		$stmt->bindParam("top_left_icon", $contact->top_left_icon);
    $stmt->bindParam("top_left_heading", $contact->top_left_heading);
    $stmt->bindParam("top_left_subhead", $contact->top_left_subhead);
    $stmt->bindParam("top_left_para", $contact->top_left_para);
    $stmt->bindParam("top_right_icon", $contact->top_right_icon);
    $stmt->bindParam("top_right_heading", $contact->top_right_heading);
    $stmt->bindParam("top_right_subhead", $contact->top_right_subhead);
    $stmt->bindParam("top_right_para", $contact->top_right_para);
    $stmt->bindParam("bottom_left_icon", $contact->bottom_left_icon);
    $stmt->bindParam("bottom_left_heading", $contact->bottom_left_heading);
    $stmt->bindParam("bottom_left_subhead", $contact->bottom_left_subhead);
    $stmt->bindParam("bottom_left_para", $contact->bottom_left_para);
    $stmt->bindParam("bottom_right_icon", $contact->bottom_right_icon);
    $stmt->bindParam("bottom_right_heading", $contact->bottom_right_heading);
    $stmt->bindParam("bottom_right_subhead", $contact->bottom_right_subhead);
    $stmt->bindParam("bottom_right_para", $contact->bottom_right_para);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($contact);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSupe() {
	$sql = "select id, itemPassword from supepassword";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$supe = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($supe);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSupePassword($id) {
	$sql = "select * from supepassword where id=".$id." order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$supe = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($supe);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSupe($id) {
  $app = \Slim\Slim::getInstance();
  $request = $app->request();
  $body = $request->getBody();
  $supe = json_decode($body);
	$sql = "update supepassword set itemPassword=:itemPassword where id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("itemPassword", $supe->itemPassword);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($supe);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSettings() {
	$sql = "select id, SiteTitle from onsettings";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$settings = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($settings);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSetting($id) {
	$sql = "select * from onsettings where id=".$id." order by id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$setting = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($setting);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSetting($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $setting = json_decode($body);
	$sql = "update onsettings set SiteTitle=:SiteTitle, SiteKeywords=:SiteKeywords, SiteDesc=:SiteDesc, SiteURL=:SiteURL, ContactEmail=:ContactEmail, ContactPhone=:ContactPhone, sitequote=:sitequote, homequote=:homequote, aboutquote=:aboutquote, rosterquote=:rosterquote, placementsquote=:placementsquote, compsquote=:compsquote where id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("SiteTitle", $setting->SiteTitle);
		$stmt->bindParam("SiteKeywords", $setting->SiteKeywords);
		$stmt->bindParam("SiteDesc", $setting->SiteDesc);
    $stmt->bindParam("SiteURL", $setting->SiteURL);
    $stmt->bindParam("ContactEmail", $setting->ContactEmail);
    $stmt->bindParam("ContactPhone", $setting->ContactPhone);
    $stmt->bindParam("sitequote", $setting->sitequote);
    $stmt->bindParam("homequote", $setting->homequote);
    $stmt->bindParam("aboutquote", $setting->aboutquote);
    $stmt->bindParam("rosterquote", $setting->rosterquote);
    $stmt->bindParam("placementsquote", $setting->placementsquote);
    $stmt->bindParam("compsquote", $setting->compsquote);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($setting);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateLogoImage($id) {
	if (isset($_FILES['logo'])) {
		$LogoPicFile = $_FILES['logo']['name'];
		$path = "../../images/";

		$name = $_FILES['logo']['name'];
		copy($_FILES['logo']['tmp_name'], $path . $name);

		$app = \Slim\Slim::getInstance();
		$sql = "update onsettings SET logo=:logo where id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("logo", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

// ARTIST FUNCTIONS
function getArtists() {
	$sql = "select INartistName as INartistName, marker as marker, INroster_desc as INroster_desc, active as active, date_added as date_added, INartistID as id from indies order by INartistName";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getActiveArtistsCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from indies where active = 'y'");
		$sql->execute();
		$num_artists = $sql->fetchColumn();
		$db = null;
		echo $num_artists;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistsCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from indies");
		$sql->execute();
		$num_artists = $sql->fetchColumn();
		$db = null;
		echo $num_artists;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistsNoSongs() {
	$sql = "select INartistName as INartistName, marker as marker, INroster_desc as INroster_desc, active as active, INartistID as id, indies.date_added as date_added from indies left join songs on indies.INartistID = songs.artistID where ISNULL(songs.artistID) order by indies.INartistName";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistsNoSongsCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from indies left join songs on indies.INartistID = songs.artistID where ISNULL(songs.artistID)");
		$sql->execute();
		$num_artists = $sql->fetchColumn();
		$db = null;
		echo $num_artists;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtist($id) {
	$sql = "select * from indies where INartistID=".$id." order by INartistID";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getMaxHomeSortOrder() {
	try {
		$db = getConnection();
		$maxql = $db->prepare("select * from indies where home_status = 'y' ");
		$maxql->execute();
		$rows = $maxql->fetchAll();
		$num_rows = count($rows);
		$db = null;
		echo $num_rows;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistSongs($id) {
	$sql = "select * from songs where artistID=".$id." order by song_title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$songs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($songs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistsForSelector() {
	$sql = "select INartistName as INartistName, marker as marker, INartistID as artist_id from indies order by INartistName";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addArtist() {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$artist = json_decode($body);
	$sql = "insert into indies (INartistName, INroster_desc, marker, INlabel, INsync, album_pic, active, home_status, home_order, slider_status, slider_pic) VALUES (:INartistName, :INroster_desc, :marker, :INlabel, :INsync, :album_pic, :active, :home_status, :home_order, :slider_status, :slider_pic)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("INartistName", $artist->INartistName);
		$stmt->bindParam("INroster_desc", $artist->INroster_desc);
		$stmt->bindParam("marker", $artist->marker);
		$stmt->bindParam("INlabel", $artist->INlabel);
		$stmt->bindParam("INsync", $artist->INsync);
		$stmt->bindParam("album_pic", $artist->album_pic);
		$stmt->bindParam("active", $artist->active);
		$stmt->bindParam("home_status", $artist->home_status);
		$stmt->bindParam("home_order", $artist->home_order);
		$stmt->bindParam("slider_status", $artist->slider_status);
		$stmt->bindParam("slider_pic", $artist->slider_pic);
		$stmt->execute();
		$artist->id = $db->lastInsertId();
		$last_artist_id = $db->lastInsertId();
		$db = null;
		$_SESSION['lastArtistID']=$last_artist_id;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateArtist($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $artist = json_decode($body);
	$sql = "update indies set INartistName=:INartistName, marker=:marker, INroster_desc=:INroster_desc, INlabel=:INlabel, INsync=:INsync, home_status=:home_status, home_order=:home_order, active=:active where INartistID=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("INartistName", $artist->INartistName);
		$stmt->bindParam("marker", $artist->marker);
		$stmt->bindParam("INroster_desc", $artist->INroster_desc);
		$stmt->bindParam("INlabel", $artist->INlabel);
		$stmt->bindParam("INsync", $artist->INsync);
		$stmt->bindParam("home_status", $artist->home_status);
		$stmt->bindParam("home_order", $artist->home_order);
		$stmt->bindParam("active", $artist->active);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteArtist($id) {
	$q1 = "select album_pic as album_pic from indies where INartistID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($q1);
		$stmt->execute();
		$album_pic = $stmt->fetchObject();
		$db = null;
		deleteArtistAlbumPic($album_pic);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$q2 = "select slider_pic as slider_pic from indies where INartistID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($q2);
		$stmt->execute();
		$slider_pic = $stmt->fetchObject();
		$db = null;
		deleteArtistSliderPic($slider_pic);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$q3 = "select song_file as song_file from songs where artistID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($q3);
		$stmt->execute();
		$song_file = $stmt->fetchObject();
		$db = null;
		deleteMP3($song_file);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$q4 = "delete from songs where artistID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($q4);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$sql = "delete from indies where INartistID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function uploadAlbumPic() {
	if (isset($_FILES['album_pic'])) {
		$AlbumPicFile = $_FILES['album_pic']['name'];
		$id = $_SESSION['lastArtistID'];

		$path = "../../images/artists/";

		$t = time();
		$name = $t."_".$_FILES['album_pic']['name'];
		copy($_FILES['album_pic']['tmp_name'], $path . $name);

		// update album_pic field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update indies SET album_pic=:album_pic where INartistID=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("album_pic", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function uploadSliderPic() {
	if (isset($_FILES['slider_pic'])) {
		$AlbumPicFile = $_FILES['slider_pic']['name'];
		$id = $_SESSION['lastArtistID'];

		$path = "../../images/artists/";

		$t = time();
		$name = $t."_".$_FILES['slider_pic']['name'];
		copy($_FILES['slider_pic']['tmp_name'], $path . $name);

		// update album_pic field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update indies SET slider_pic=:slider_pic where INartistID=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("slider_pic", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function updateAlbumPic($id) {
	if (isset($_FILES['album_pic'])) {
		$AlbumPicFile = $_FILES['album_pic']['name'];
		$path = "../../images/artists/";

		$t = time();
		$name = $t."_".$_FILES['album_pic']['name'];
		copy($_FILES['album_pic']['tmp_name'], $path . $name);

		// update album_pic field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update indies SET album_pic=:album_pic where INartistID=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("album_pic", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function updateSliderPic($id) {
	if (isset($_FILES['slider_pic'])) {
		$SliderPicFile = $_FILES['slider_pic']['name'];
		$path = "../../images/artists/";

		$t = time();
		$name = $t."_".$_FILES['slider_pic']['name'];
		copy($_FILES['slider_pic']['tmp_name'], $path . $name);

		// update album_pic field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update indies SET slider_pic=:slider_pic where INartistID=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("slider_pic", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function getCompByArtist($id) {
	$sql = "select * from comp_main INNER JOIN comp_items on comp_main.comp_id = comp_items.compID INNER JOIN songs ON songs.song_id = comp_items.songID where songs.artistID = ".$id." GROUP BY songs.song_id order by comp_items.item_sort asc";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$result = $stmt->fetchAll(PDO::FETCH_GROUP);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteArtistAlbumPic($image) {
	if(!empty($image)) {
		foreach ($image as $value) {
			if(!empty($value)) {
				$path = "../../images/artists/";
				if( file_exists( $path . $value )) {
					if(unlink($path . $value)) {
						echo "file deleted.";
					}
					else {
						echo "there was a problem deleting file.";
					}
				}
			}
		}
	}
}

function deleteArtistSliderPic($image) {
	if(!empty($image)) {
		foreach ($image as $value) {
			if(!empty($value)) {
				$path = "../../images/artists/";
				if( file_exists( $path . $value )) {
					if(unlink($path . $value)) {
						echo "file deleted.";
					}
					else {
						echo "there was a problem deleting file.";
					}
				}
			}
		}
	}
}

function getArtistLinks($name) {
	$sql = "select ( select INartistID from indies where INartistName > :name order by INartistName asc limit 1 ) as nextValue, ( select INartistID from indies where INartistName < :name order by INartistName desc limit 1 ) as prevValue from indies";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute([':name' => $name]);
		$links = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($links);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// SONG FUNCTIONS"
function getSongs() {
	$sql = "select *, songs.date_added as date_added from songs left join indies on songs.artistID = indies.INartistID order by song_title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$songs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($songs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSongsNoFile() {
	$sql = "select *, songs.date_added as date_added from songs left join indies on songs.artistID = indies.INartistID where song_file='' order by song_title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$songs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($songs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSongsNoFileCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from songs where song_file=''");
		$sql->execute();
		$num_songs = $sql->fetchColumn();
		$db = null;
		echo $num_songs;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSongsNoComp() {
	$sql = "select a.*,b.*,c.*
		from	songs a
				left join comp_items b
					on a.song_id = b.songID
				left join indies c
					on a.artistID = c.INartistID
		where	ISNULL(b.songID) order by a.song_title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$songs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($songs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSongsNoCompCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from songs left join comp_items on songs.song_id = comp_items.songID where ISNULL(comp_items.songID)");
		$sql->execute();
		$num_songs = $sql->fetchColumn();
		$db = null;
		echo $num_songs;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSongsCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from songs");
		$sql->execute();
		$num_songs = $sql->fetchColumn();
		$db = null;
		echo $num_songs;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getActiveSongsCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from songs where roster_flag='y'");
		$sql->execute();
		$num_active_songs = $sql->fetchColumn();
		$db = null;
		echo $num_active_songs;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSong($id) {
	$sql = "select *, songs.date_added as date_added from songs left join indies on songs.artistID = indies.INartistID where song_id=".$id." order by song_title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$songs = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($songs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addSong() {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$song = json_decode($body);
	$sql = "insert into songs (song_title, song_file, song_comments, roster_flag, artistID) values (:song_title, :song_file, :song_comments, :roster_flag, :artistID)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("song_title", $song->song_title);
		$stmt->bindParam("song_file", $song->song_file);
		$stmt->bindParam("song_comments", $song->song_comments);
		$stmt->bindParam("roster_flag", $song->roster_flag);
		$stmt->bindParam("artistID", $song->artistID);
		$stmt->execute();
		$song->id = $db->lastInsertId();
		$last_song_id = $db->lastInsertId();
		$db = null;
		$_SESSION['lastSongID']=$last_song_id;
		echo json_encode($song);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSong($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $song = json_decode($body);
	$sql = "update songs set song_title=:song_title, song_comments=:song_comments, roster_flag=:roster_flag where song_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("song_title", $song->song_title);
		$stmt->bindParam("song_comments", $song->song_comments);
		$stmt->bindParam("roster_flag", $song->roster_flag);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($song);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSongCount($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $song = json_decode($body);
	try {
		$db = getConnection();
		$newcount = '0';
		$sql = "update songs set song_count=? where song_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($newcount,$id));
		$db = null;
		echo json_encode($song);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSongDownloads($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $song = json_decode($body);
	try {
		$db = getConnection();
		$newcount = '0';
		$sql = "update songs set song_downloads=? where song_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($newcount,$id));
		$db = null;
		echo json_encode($song);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function removeSongFile($id) {
	$q1 = "select song_file as song_file from songs where song_id=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($q1);
		$stmt->execute();
		$song_file = $stmt->fetchObject();
		$db = null;
		deleteMP3($song_file);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $song = json_decode($body);
	try {
		$db = getConnection();
		$newfile = '';
		$sql = "update songs set song_file=? where song_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($newfile,$id));
		$db = null;
		echo json_encode($song);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateMP3($id) {
	if (isset($_FILES['song_file'])) {
		$MP3File = $_FILES['song_file']['name'];
		$path = "../../assets/multimedia/";

		$t = time();
		$name = $t."_".$_FILES['song_file']['name'];
		$name = str_replace("-"," - ",$name);
		$name = preg_replace('/\\-(?![^-]*$)/',' ',$name);
		$name = str_replace(" +", " ", $name);
		$name = str_replace(" ","_",$name);
		copy($_FILES['song_file']['tmp_name'], $path . $name);

		// update song_file field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update songs set song_file=:song_file where song_id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("song_file", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function uploadMP3() {
	if (isset($_FILES['song_file'])) {
		$MP3File = $_FILES['song_file']['name'];
		$id = $_SESSION['lastSongID'];

		echo $id;

		$path = "../../assets/multimedia/";

		$t = time();
		$name = $t."_".$_FILES['song_file']['name'];
		$name = str_replace("-"," - ",$name);
		$name = preg_replace('/\\-(?![^-]*$)/',' ',$name);
		$name = str_replace(" +", " ", $name);
		$name = str_replace(" ","_",$name);
		copy($_FILES['song_file']['tmp_name'], $path . $name);

		// update album_pic field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update songs set song_file=:song_file where song_id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("song_file", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function deleteSong($id) {
	$q1 = "select song_file as song_file from songs where song_id=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($q1);
		$stmt->execute();
		$song_file = $stmt->fetchObject();
		$db = null;
		deleteMP3($song_file);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$sql = "delete from songs where song_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getCompBySong($id) {
	$sql = "select * from comp_main left join comp_items on comp_main.comp_id = comp_items.compID left join songs ON songs.song_id = comp_items.songID where song_id = ".$id." order by comp_items.item_sort asc";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$result = $stmt->fetchAll(PDO::FETCH_GROUP);
		$db = null;
		echo json_encode($result);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteMP3($file) {
	if(!empty($file)) {
		foreach ($file as $value) {
			if(!empty($value)) {
				$path = "../../assets/multimedia/";
				if( file_exists( $path . $value )) {
					if(unlink($path . $value)) {
						echo "file deleted.";
					}
					else {
						echo "there was a problem deleting file.";
					}
				}
			}
		}
	}
}

function getSongLinks($id, $name) {
	$sql = "select ( select song_id from songs where artistID = :id and song_title > :name order by song_title asc limit 1 ) as nextValue, ( select song_id from songs where artistID = :id and song_title < :name order by song_title desc limit 1 ) as prevValue from songs";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute([':id' => $id, ':name' => $name]);
		$links = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($links);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// NEW SIGNINGS FUNCTIONS"
function getNewSignings() {
	$sql = "select * from indies where home_status = 'y' order by home_order";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$fon = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($fon);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateFonSort($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $artist = json_decode($body);
	try {
		$db = getConnection();
		$sql = "update indies set home_order=? where INartistID=?";
		$q = $db->prepare($sql);
		$q->execute(array($artist,$id));
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistsForFon() {
	$sql = "select INartistName as INartistName, marker as marker, INartistID as artist_id from indies where home_status = 'n' and album_pic != '' order by INartistName";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateFon($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $artist = json_decode($body);
	try {
		$db = getConnection();
		$newstatus = 'y';
		$sql = "update indies set home_status=? where INartistID=?";
		$q = $db->prepare($sql);
		$q->execute(array($newstatus,$id));
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function removeFon($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $artist = json_decode($body);
	try {
		$db = getConnection();
		$newstatus = 'n';
		$sql = "update indies set home_status=? where INartistID=?";
		$q = $db->prepare($sql);
		$q->execute(array($newstatus,$id));
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// SCENE & HEARD FUNCTIONS
function getSahCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from sceneholder");
		$sql->execute();
		$num_sah = $sql->fetchColumn();
		$db = null;
		echo $num_sah;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSah() {
	$sql = "select * from sceneholder order by scene_order";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$sah = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($sah);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSahSort($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $sah = json_decode($body);
	try {
		$db = getConnection();
		$sql = "update sceneholder set scene_order=? where sceneID=?";
		$q = $db->prepare($sql);
		$q->execute(array($sah,$id));
		$db = null;
		echo json_encode($sah);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSahActive($id) {
	try {
		$db = getConnection();
		$setorder = 'n';
		$ql = "update sceneholder set sceneActive=?";
		$q = $db->prepare($ql);
		$q->execute(array($setorder));
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	try {
		$db = getConnection();
		$neworder = 'y';
		$sql = "update sceneholder set sceneActive=? where sceneID=?";
		$q = $db->prepare($sql);
		$q->execute(array($neworder,$id));
		$db = null;
		//echo json_encode($sah);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addSah() {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$sah = json_decode($body);
	$sql = "insert into sceneholder (sceneName, scene_order) VALUES (:sceneName, :scene_order)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("sceneName", $sah->sceneName);
		$stmt->bindParam("scene_order", $sah->scene_order);
		$stmt->execute();
		$last_sah_id = $db->lastInsertId();
		$db = null;
		echo json_encode($sah);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$q2 = "insert into sceneitems set sceneID = '$last_sah_id', itemMedia = 'TV', itemHeader = 'First Item', itemText = 'Edit this item first' ";
	try {
		$db = getConnection();
		$stmt = $db->prepare($q2);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteSah($id) {
	$q1 = "delete from sceneitems where sceneID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($q1);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$sql = "delete from sceneholder where sceneID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSah($id, $name) {
    $app = \Slim\Slim::getInstance();
	$sql = "update sceneholder set sceneName=:sceneName where sceneID=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute([':id' => $id, ':sceneName' => $name]);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSahItems($id) {
	$sql = "select sceneitems.*, sceneholder.* from sceneholder join sceneitems on sceneitems.sceneID = sceneholder.sceneID where sceneholder.sceneID=".$id." order by sceneitems.itemOrder";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$items = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($items);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSahItemSort($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $item = json_decode($body);
	try {
		$db = getConnection();
		$sql = "update sceneitems set itemOrder=? where itemID=?";
		$q = $db->prepare($sql);
		$q->execute(array($item, $id));
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteSahItem($id) {
	$sql = "delete from sceneitems where itemID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addSahItem($id) {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$item = json_decode($body);
	$sql = "insert into sceneitems (itemHeader, itemMedia, itemText, itemOrder, sceneID) VALUES (:itemHeader, :itemMedia, :itemText, :itemOrder, :sceneID)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("itemHeader", $item->itemHeader);
		$stmt->bindParam("itemMedia", $item->itemMedia);
		$stmt->bindParam("itemText", $item->itemText);
		$stmt->bindParam("itemOrder", $item->itemOrder);
		$stmt->bindParam(":sceneID", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}
function getSahItem($id) {
	$sql = "select sceneholder.*, sceneitems.* from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID where sceneitems.itemID=".$id." order by sceneitems.itemOrder";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$item = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateSahItem($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $item = json_decode($body);
	$sql = "update sceneitems set itemHeader=:itemHeader, itemMedia=:itemMedia, itemText=:itemText, itemOrder=:itemOrder where itemID=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("itemHeader", $item->itemHeader);
		$stmt->bindParam("itemMedia", $item->itemMedia);
		$stmt->bindParam("itemText", $item->itemText);
		$stmt->bindParam("itemOrder", $item->itemOrder);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($item);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSahLinks($order) {
	$query = "select ( select sceneID from sceneholder where scene_order < :order order by scene_order desc limit 1 ) as nextValue, ( select sceneID from sceneholder where scene_order > :order order by scene_order asc limit 1 ) as prevValue from sceneholder";
	try {
		$db = getConnection();
		$stmt = $db->prepare($query);
		$stmt->execute([':order' => $order]);
		$links = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($links);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSahItemCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from sceneitems");
		$sql->execute();
		$num_sah_items = $sql->fetchColumn();
		$db = null;
		echo $num_sah_items;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSahItemLinks($id, $sort) {
	$sql = "select ( select itemID from sceneitems where sceneID = :id and itemOrder > :sort order by itemOrder asc limit 1 ) as nextValue, ( select itemID from sceneitems where sceneID = :id and itemOrder < :sort order by itemOrder desc limit 1 ) as prevValue from sceneitems";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute([':id' => $id, ':sort' => $sort]);
		$links = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($links);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// FEATURED ARTISTS FUNCTIONS"
function getFeatured() {
	$sql = "select * from indies where slider_status = 'y'";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$featured = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($featured);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function removeFeatured($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $artist = json_decode($body);
	try {
		$db = getConnection();
		$newstatus = 'n';
		$sql = "update indies set slider_status=? where INartistID=?";
		$q = $db->prepare($sql);
		$q->execute(array($newstatus,$id));
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getArtistsForFeatured() {
	$sql = "select INartistName as INartistName, marker as marker, INartistID as artist_id from indies where slider_status = 'n' and slider_pic != '' order by INartistName";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$artists = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		echo json_encode($artists);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateFeatured($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $artist = json_decode($body);
	try {
		$db = getConnection();
		$newstatus = 'y';
		$sql = "update indies set slider_status=? where INartistID=?";
		$q = $db->prepare($sql);
		$q->execute(array($newstatus,$id));
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}


// COMPS FUNCTIONS"
function getCompsCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from comp_main");
		$sql->execute();
		$num_comps = $sql->fetchColumn();
		$db = null;
		echo $num_comps;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getCompsActiveCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from comp_main where active='y'");
		$sql->execute();
		$num_comps_active = $sql->fetchColumn();
		$db = null;
		echo $num_comps_active;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getComps() {
	$sql = "select * from comp_main order by sort desc";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$comps = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($comps);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getMostRecentComp() {
  $sql = "select comp_id, comp_name, date_added, playlist_count, count, last_download from comp_main where comp_id in (select comp_id from comp_main where date_added = (select MAX(date_added) from comp_main)) order by comp_id desc limit 1";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$comps = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($comps);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompsSort($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	try {
		$db = getConnection();
		$sql = "update comp_main set sort=? where comp_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($comp,$id));
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompCount($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	try {
		$db = getConnection();
		$newcount = '0';
		$sql = "update comp_main set count=? where comp_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($newcount,$id));
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteComp($id) {
	$q1 = "select comp_pic as comp_pic from comp_main where comp_id=".$id;
	try {
		$db = getConnection();
		$stmt = $db->prepare($q1);
		$stmt->execute();
		$comp_pic = $stmt->fetchObject();
		$db = null;
		deleteCompPic($comp_pic);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$q2 = "delete from comp_items where compID=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($q2);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}

	$sql = "delete from comp_main where comp_id=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteCompPic($image) {
	if(!empty($image)) {
		foreach ($image as $value) {
			if(!empty($value)) {
				$path = "../../images/comps/";
				if( file_exists( $path . $value )) {
					if(unlink($path . $value)) {
						echo "file deleted.";
					}
					else {
						echo "there was a problem deleting file.";
					}
				}
			}
		}
	}
}

function getComp($id) {
	$sql = "select * from comp_main where comp_id=".$id." order by comp_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$comp = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateComp($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	$sql = "update comp_main set comp_name=:comp_name, comp_desc=:comp_desc, comp_file=:comp_file, sort=:sort, active=:active where comp_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("comp_name", $comp->comp_name);
		$stmt->bindParam("comp_desc", $comp->comp_desc);
		$stmt->bindParam("comp_file", $comp->comp_file);
		$stmt->bindParam("sort", $comp->sort);
		$stmt->bindParam("active", $comp->active);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompPic($id) {
	if (isset($_FILES['comp_pic'])) {
		$CompPicFile = $_FILES['comp_pic']['name'];
		$path = "../../images/comps/";

		$t = time();
		$name = $t."_".$_FILES['comp_pic']['name'];
		copy($_FILES['comp_pic']['tmp_name'], $path . $name);

		// update comp_pic field in indies table
		$app = \Slim\Slim::getInstance();
		$sql = "update comp_main set comp_pic=:comp_pic where comp_id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("comp_pic", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function updateCompSetActive($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	try {
		$db = getConnection();
		$active = 'y';
		$sql = "update comp_main set active=? where comp_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($active,$id));
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompSetInActive($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	try {
		$db = getConnection();
		$active = 'n';
		$sql = "update comp_main set active=? where comp_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($active,$id));
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompSetInCarousel($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	try {
		$db = getConnection();
		$active = 'y';
		$sql = "update comp_main set comp_flag=? where comp_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($active,$id));
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompSetOutCarousel($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	try {
		$db = getConnection();
		$active = 'n';
		$sql = "update comp_main set comp_flag=? where comp_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($active,$id));
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getSongsForSelector() {
	$sql = "select songs.*, indies.* from songs left join indies on songs.artistID = indies.INartistID order by song_title";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$songs = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		echo json_encode($songs);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getCompPlaylist($id) {
	$sql = "select a.*,b.*,c.*
		from comp_items a
				join songs b
					on a.songID = b.song_id
				left join indies c
					on b.artistID = c.INartistID
		where	a.compID=".$id." and b.song_file!='' order by a.item_sort";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$db = null;
		echo json_encode($items);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}



function deleteCompPlaylistItem($id) {
	$sql = "delete from comp_items where comp_items_id=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getMaxCompPlaylistSortOrder($id) {
	try {
		$db = getConnection();
		$maxql = $db->prepare("select max(item_sort) as maxSort from comp_items where compID=$id");
		$maxql->execute();
		$test = $maxql->fetch(PDO::FETCH_ASSOC);
		$db = null;
		echo $test['maxSort'];
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateCompPlaylist() {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $playlist = json_decode($body);
    $sql = "insert into comp_items (CompID, SongID, item_sort) values (:CompID, :SongID, :item_sort)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("CompID", $playlist->CompID);
		$stmt->bindParam("SongID", $playlist->SongID);
		$stmt->bindParam("item_sort", $playlist->item_sort);
		$stmt->execute();
		$db = null;
		echo json_encode($playlist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addToCompPlaylistCount($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	$sql = "update comp_main
    set playlist_count = playlist_count + 1
      where comp_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function removeFromCompPlaylistCount($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $comp = json_decode($body);
	$sql = "update comp_main
    set playlist_count = (playlist_count - 1)
      where comp_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getMaxCompSortOrder() {
	try {
		$db = getConnection();
		$maxql = $db->prepare("select max(sort) as maxSort from comp_main");
		$maxql->execute();
		$test = $maxql->fetch(PDO::FETCH_ASSOC);
		$db = null;
		echo $test['maxSort'];
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addComp() {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$comp = json_decode($body);
	$sql = "insert into comp_main (comp_name, comp_file, comp_desc, sort, active, comp_flag) VALUES (:comp_name, :comp_file, :comp_desc, :sort, :active, :comp_flag)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("comp_name", $comp->comp_name);
		$stmt->bindParam("comp_file", $comp->comp_file);
		$stmt->bindParam("comp_desc", $comp->comp_desc);
		$stmt->bindParam("sort", $comp->sort);
		$stmt->bindParam("active", $comp->active);
		$stmt->bindParam("comp_flag", $comp->comp_flag);
		$stmt->execute();
		$comp->id = $db->lastInsertId();
		$last_comp_id = $db->lastInsertId();
		$db = null;
		$_SESSION['lastCompID']=$last_comp_id;
		echo json_encode($comp);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function uploadCompPic() {
	if (isset($_FILES['comp_pic'])) {
		$AlbumPicFile = $_FILES['comp_pic']['name'];
		$id = $_SESSION['lastCompID'];

		echo $id;
		echo $AlbumPicFile;

		$path = "../../images/comps/";

		$t = time();
		$name = $t."_".$_FILES['comp_pic']['name'];
		copy($_FILES['comp_pic']['tmp_name'], $path . $name);

		// update comp_pic field in comp_main table
		$app = \Slim\Slim::getInstance();
		$sql = "update comp_main set comp_pic=:comp_pic where comp_id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);
			$stmt->bindParam("comp_pic", $name);
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$db = null;
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}';
		}
	}
}

function addSongToComp($id) {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$song = json_decode($body);
	$sql = "insert into songs (song_title, song_file, song_comments, roster_flag, artistID) values (:song_title, :song_file, :song_comments, :roster_flag, :artistID)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("song_title", $song->song_title);
		$stmt->bindParam("song_file", $song->song_file);
		$stmt->bindParam("song_comments", $song->song_comments);
		$stmt->bindParam("roster_flag", $song->roster_flag);
		$stmt->bindParam("artistID", $song->artistID);
		$stmt->execute();
		$song->id = $db->lastInsertId();
		$last_song_id = $db->lastInsertId();
		$db = null;
		echo json_encode($song);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}


	$q2 = "insert into comp_items set SongID = '$last_song_id', compID = '$id', item_sort = :item_sort";
	try {
		$db = getConnection();
		$stmt = $db->prepare($q2);
		$stmt->bindParam("item_sort", $song->item_sort);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addArtistToComp($id) {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$artist = json_decode($body);
	$sql = "insert into indies (INartistName, INroster_desc, marker, INlabel, INsync, active) VALUES (:INartistName, :INroster_desc, :marker, :INlabel, :INsync, :active)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("INartistName", $artist->INartistName);
		$stmt->bindParam("INroster_desc", $artist->INroster_desc);
		$stmt->bindParam("marker", $artist->marker);
		$stmt->bindParam("INlabel", $artist->INlabel);
		$stmt->bindParam("INsync", $artist->INsync);
		$stmt->bindParam("active", $artist->active);
		$stmt->execute();
		$artist->id = $db->lastInsertId();
		$last_artist_id = $db->lastInsertId();
		$db = null;
		echo json_encode($artist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updatePlaylistSort($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $playlist = json_decode($body);
	try {
		$db = getConnection();
		$sql = "update comp_items set item_sort=? where comp_items_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($playlist,$id));
		$db = null;
		echo json_encode($playlist);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getCompLinks($sort) {
	$sql = "select ( select comp_id from comp_main where sort > :sort order BY sort asc limit 1 ) as prevValue, ( select comp_id from comp_main where sort < :sort order BY sort desc limit 1 ) as nextValue from comp_main";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute([':sort' => $sort]);
		$links = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($links);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// DROPBOXES FUNCTIONS"
function getDropboxesCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from dropbox");
		$sql->execute();
		$num_dropboxes = $sql->fetchColumn();
		$db = null;
		echo $num_dropboxes;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getDropboxesActiveCount() {
	try {
		$db = getConnection();
		$sql = $db->prepare("select count(*) from dropbox where active='y'");
		$sql->execute();
		$num_dropboxes = $sql->fetchColumn();
		$db = null;
		echo $num_dropboxes;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getDropboxes() {
	$sql = "select * from dropbox order by sort desc";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$dropboxes = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($dropboxes);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateDropboxesSort($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $dropbox = json_decode($body);
	try {
		$db = getConnection();
		$sql = "update dropbox set sort=? where dropbox_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($dropbox,$id));
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function deleteDropbox($id) {
	$sql = "delete from dropbox where dropbox_id=".$id;
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function addDropbox() {
	$app = \Slim\Slim::getInstance();
	$request = $app->request();
	$body = $request->getBody();
	$dropbox = json_decode($body);
	$sql = "insert into dropbox (dropbox_name, dropbox_file, sort) VALUES (:dropbox_name, :dropbox_file, :sort)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("dropbox_name", $dropbox->dropbox_name);
		$stmt->bindParam("dropbox_file", $dropbox->dropbox_file);
		$stmt->bindParam("sort", $dropbox->sort);
		$stmt->execute();
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getMaxDropboxSortOrder() {
	try {
		$db = getConnection();
		$maxql = $db->prepare("select max(sort) as maxSort from dropbox");
		$maxql->execute();
		$test = $maxql->fetch(PDO::FETCH_ASSOC);
		$db = null;
		echo $test['maxSort'];
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateDropbox($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $dropbox = json_decode($body);
	$sql = "update dropbox set dropbox_name=:dropbox_name, dropbox_file=:dropbox_file, sort=:sort where dropbox_id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->bindParam("dropbox_name", $dropbox->dropbox_name);
		$stmt->bindParam("dropbox_file", $dropbox->dropbox_file);
		$stmt->bindParam("sort", $dropbox->sort);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getDropbox($id) {
	$sql = "select * from dropbox where dropbox_id=".$id." order by dropbox_id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);
		$dropbox = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateDropboxSetActive($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $dropbox = json_decode($body);
	try {
		$db = getConnection();
		$active = 'y';
		$sql = "update dropbox set active=? where dropbox_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($active,$id));
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateDropboxSetInActive($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $dropbox = json_decode($body);
	try {
		$db = getConnection();
		$active = 'n';
		$sql = "update dropbox set active=? where dropbox_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($active,$id));
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function updateDropboxCount($id) {
    $app = \Slim\Slim::getInstance();
    $request = $app->request();
    $body = $request->getBody();
    $dropbox = json_decode($body);
	try {
		$db = getConnection();
		$newcount = '0';
		$sql = "update dropbox set count=? where dropbox_id=?";
		$q = $db->prepare($sql);
		$q->execute(array($newcount,$id));
		$db = null;
		echo json_encode($dropbox);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

function getDropboxLinks($sort) {
	$sql = "select ( select dropbox_id from dropbox where sort > :sort order by sort asc limit 1 ) as prevValue, ( select dropbox_id from dropbox where sort < :sort order by sort desc limit 1 ) as nextValue from dropbox";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$stmt->execute([':sort' => $sort]);
		$links = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($links);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}';
	}
}

// "DB CONNECT
function getConnection() {
	if($_SESSION['username']=='opticl') {
		$dbname="on_production";

	}
	elseif($_SESSION['username']=='tester') {
		$dbname="on_prod";
	}

	$dbhost="localhost";
	$dbuser="root";
	$dbpass="myHitler";

	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
	$dbh->setAttribute(
		PDO::ATTR_ERRMODE,
		PDO::ERRMODE_EXCEPTION
	);
	return $dbh;
}
?>

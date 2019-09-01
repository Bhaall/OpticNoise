<?php
	session_start();
	session_id('uid');
	session_id('AdminID');
	session_id('username');

	if(isset($_SESSION['uid'])) {
  		unset($_SESSION['uid']);
  	}

	unset($_SESSION['AdminID']);
	unset($_SESSION['username']);

	session_unset();
	session_destroy();
	session_commit();
	setcookie("PHPSESSID","",time()-3600,"/");
?>
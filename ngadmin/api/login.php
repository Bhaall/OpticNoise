<?php
	session_start();
	$user=json_decode(file_get_contents('php://input'));

	$MyUsername = $user->username;
	$MyPassword = $user->password;

	if($MyUsername=='opticl') {
		require_once("conn_admin.php");
	}
	elseif($MyUsername=='tester') {
		require_once("conn_admin_qa.php");
	}

	$q1 = "select AdminID, email, username, firstname, lastname, portrait, sitename, site, db_alias, current_login from admin where username = '$MyUsername' and password = '$MyPassword' ";
	$r1 = mysqli_query($connection, $q1);

	if(mysqli_error()) {
		exit();
	}
	else {
		if(mysqli_num_rows($r1) == 1) {
			$a1 = mysqli_fetch_array($r1);

			$MyLogin = $a1['current_login'];

			$_SESSION['AdminID']=$a1['AdminID'];
			$_SESSION['username']=$a1['username'];
			$_SESSION['uid']=uniqid('ang_');
			print $_SESSION['uid'];

			$sql = "update admin set
			last_login = '$MyLogin'
			where AdminID = '$_SESSION[AdminID]' ";
			mysqli_query($connection, $sql);

			date_default_timezone_set('America/Los_Angeles');
			$today = date("F j, Y, g:i a T");
			$q2 = "update admin set
			current_login = '$today'
			where AdminID = '$_SESSION[AdminID]' ";
			mysqli_query($connection, $q2);
		}
	}
?>

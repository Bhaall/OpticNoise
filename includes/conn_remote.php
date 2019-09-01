<?php

$db_host = "db2350.perfora.net";
$db_username = "dbo322156033";
$db_password = "hitler1";
$db_name = "db322156033";

// production
//$db_host = "db2350.perfora.net";
//$db_username = "dbo322156033";
//$db_password = "hitler1";
//$db_name = "db322156033";

$connection = mysqli_connect($db_host, $db_username, $db_password) or die(mysqli_error());
$db = mysqli_select_db($connection, $db_name);

session_start();

$t = time();

//build the script path
if(!empty($script_dir))
{
	$dir = "/".$script_dir;
}

?>
<?php
$db_host = "localhost";
$db_username = "root";
$db_password = "myHitler";
$db_name = "on_production";

$connection = mysqli_connect($db_host, $db_username, $db_password) or die(mysqli_error());
$db = mysqli_select_db($connection, $db_name);

if($db_name == "on_production"){
	$db_name_alias = "QA";
}
else {
	$db_name_alias = $db_name;
}

?>

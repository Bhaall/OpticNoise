<?php
$db_host = "db540011733.db.1and1.com";
$db_username = "dbo540011733";
$db_password = "hitler1";
$db_name = "db540011733";

$connection = mysqli_connect($db_host, $db_username, $db_password) or die(mysqli_error());
$db = mysqli_select_db($connection, $db_name);

if($db_name == "db322156033"){
	$db_name_alias = "PRODUCTION";
}
elseif($db_name == "db540011733"){
	$db_name_alias = "QA";
}
else {
	$db_name_alias = $db_name;
}
?>
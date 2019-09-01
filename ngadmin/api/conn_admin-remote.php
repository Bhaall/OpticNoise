<?php
$db_host = "db2350.perfora.net";
$db_username = "dbo322156033";
$db_password = "hitler1";
$db_name = "db322156033";

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
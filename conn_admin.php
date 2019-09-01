<?php
$db_host = "db414881195.db.1and1.com";
$db_username = "dbo414881195";
$db_password = "hitler11";
$db_name = "db414881195";

$script_dir = "";

$connection = mysqli_connect($db_host, $db_username, $db_password) or die(mysql_error());
$db = mysqli_select_db($connection, $db_name);

session_start();

$t = time();

if(!empty($script_dir))
{
	$dir = "/".$script_dir;
}
?>
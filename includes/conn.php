<?php
$db_host = "localhost";
$db_username = "root";
$db_password = "myHitler";
$db_name = "on_prod";

$connection = mysqli_connect($db_host, $db_username, $db_password) or die(mysqli_error());
$db = mysqli_select_db($connection, $db_name);

session_start();

$t = time();
?>
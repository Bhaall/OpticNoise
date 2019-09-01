<?php
require_once("conn.php");
//get site wide settings
$qset = "select * from onsettings";
$rset = mysqli_query($connection, $qset) or die(mysqli_error());
$aset = mysqli_fetch_array($rset);
?>

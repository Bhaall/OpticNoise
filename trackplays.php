<?php
$root_path = $_SERVER['DOCUMENT_ROOT'] . "/optic";
include("includes/config.php");

$cmd	= @$_REQUEST["cmd"];
$song	= @$_REQUEST["song"];

if ($cmd == "update") {
	$song = mysqli_real_escape_string($connection, $song);

	$q1 = "select * from songs where song_file = '$song' ";
	$r1 = mysqli_query($connection, $q1) or die(mysqli_error());
	$a1 = mysqli_fetch_array($r1);

	$pst = new DateTimeZone('America/Los_Angeles');
	$date = new DateTime("NOW", $pst);

	$q2 = "update songs set
	song_count=song_count+1,
	last_played='{$date->format('Y-m-d H:i:s')}'
	where song_id = '$a1[song_id]' ";
	mysqli_query($connection, $q2);
}
?>

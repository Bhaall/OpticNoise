<?php
//session_start();
$root_path = $_SERVER['DOCUMENT_ROOT'] . "/optic";
if (!isset($_COOKIE["onsession"]))
{
	header("location:index.php");
	exit();
}
else
{
	header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT"); // Date in the past
	header ("Last-Modified: ".gmdate("D, d M Y H:i:s")." GMT"); // always modified
	header ("Cache-Control: no-cache, must-revalidate"); // HTTP/1.1
	header ("Pragma: no-cache"); // HTTP/1.0
}
?>

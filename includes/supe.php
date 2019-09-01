<?php
$root_path = $_SERVER['DOCUMENT_ROOT'] . "/optic";
require_once("config.php");

$cmd    = @$_REQUEST["cmd"];

if ($cmd == "info")
  {
    $result = mysqli_query($connection, "select itemPassword from supepassword");
    $info = mysqli_fetch_array($result, MYSQLI_ASSOC);
    echo json_encode($info);
  }
?>

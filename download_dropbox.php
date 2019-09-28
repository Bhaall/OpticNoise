<?php

require_once("includes/conn.php");
// Usage: <a href="download.php?file=test.txt&category=test">Download</a>
// Path to downloadable files (will not be revealed to users so they will never know your file's real address)

$q1 = "select * from dropbox where dropbox_id = '$_GET[id]' ";
$r1 = mysqli_query($connection, $q1) or die(mysqli_error());
$a1 = mysqli_fetch_array($r1);

$file = $a1['dropbox_file'];
$pst = new DateTimeZone('America/Los_Angeles');
$date = new DateTime("NOW", $pst);

$hiddenPath = "compfiles/";

$query = "update dropbox set
		count=count+1,
		last_download='{$date->format('Y-m-d H:i:s')}'
		where dropbox_id = '$_GET[id]' ";

mysqli_query($connection, $query) or die (mysqli_error());

// VARIABLES
//if (!empty($_GET['file'])){
//   $file = str_replace('%20', ' ', $_GET['file']);
//   $category = (!empty($_GET['category'])) ? $_GET['category'] . '/' : '';
//}
$file_real    = $hiddenPath . $file;
$ip           = $_SERVER['REMOTE_ADDR'];

// Check to see if the download script was called
if (basename($_SERVER['PHP_SELF']) == 'download_dropbox.php'){
   if ($_SERVER['QUERY_STRING'] != null){
       // HACK ATTEMPT CHECK
       // Make sure the request isn't escaping to another directory
       if (substr($file, 0, 1) == '.' || strpos($file, '..') > 0 || substr($file, 0, 1) == '/' || strpos($file, '/') > 0){
           // Display hack attempt error
           echo("Hack attempt detected!");
           die();
       }
       // If requested file exists
       if (file_exists($file_real)){
           // Get extension of requested file
           $extension = strtolower(substr(strrchr($file, "."), 1));
           // Determine correct MIME type
           switch($extension){
               case "asf":    $type = "video/x-ms-asf";                break;
               case "avi":    $type = "video/x-msvideo";              break;
               case "exe":    $type = "application/octet-stream";      break;
               case "mov":    $type = "video/quicktime";              break;
               case "mp3":    $type = "audio/mpeg";                    break;
               case "mpg":    $type = "video/mpeg";                    break;
               case "mpeg":    $type = "video/mpeg";                    break;
               case "rar":    $type = "encoding/x-compress";          break;
               case "txt":    $type = "text/plain";                    break;
               case "wav":    $type = "audio/wav";                    break;
               case "wma":    $type = "audio/x-ms-wma";                break;
               case "wmv":    $type = "video/x-ms-wmv";                break;
               case "zip":    $type = "application/x-zip-compressed";  break;
               default:        $type = "application/force-download";    break;
           }
           // Fix IE bug [0]
           $header_file = (strstr($_SERVER['HTTP_USER_AGENT'], 'MSIE')) ? preg_replace('/\./', '%2e', $file, substr_count($file, '.') - 1) : $file;
           // Prepare headers
           header("Pragma: public");
           header("Expires: 0");
           header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
           header("Cache-Control: public", false);
           header("Content-Description: File Transfer");
           header("Content-Type: " . $type);
           header("Accept-Ranges: bytes");
           header("Content-Disposition: attachment; filename=\"" . $header_file . "\";");
           header("Content-Transfer-Encoding: binary");
           header("Content-Length: " . filesize($file_real));
           // Send file for download
           if ($stream = fopen($file_real, 'rb')){
               while(!feof($stream) && connection_status() == 0){
                   //reset time limit for big files
                   set_time_limit(0);
                   print(fread($stream,1024*8));
                   flush();
               }
               fclose($stream);

				//$query = "update dropbox set
	  				//count=count+1
	  				//where dropbox_id = '$_GET[id]' ";

				//mysql_query($query) or die (mysql_error());

           }
       }else{
           // Requested file does not exist (File not found)
           header("location:dwn_error.php");
           die();
       }
   }
}
?>

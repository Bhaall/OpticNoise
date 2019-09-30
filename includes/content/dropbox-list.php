<?php
$dropbox_count = "select count(*) as count from dropbox";
$result1 = mysqli_query($connection, $dropbox_count);
$row1 = mysqli_fetch_array($result1);
$dropbox_count = $row1['count'];
$count=1;

if ($dropbox_count < 1){
	print("<div class=\"article first ui-dropbox empty\"><h2 class=\"hdr-1\">There are currently no dropboxes available.</h2></div>\n");
}
else{

	$result = mysqli_query($connection, "select * from dropbox where active = 'y' order by sort desc");

	print "<ul>\n";
	while ( $row = mysqli_fetch_array($result) ) :

		//list($year, $month, $day) = explode("-", $row['date_added']);
		//$date_added = date("F d, Y", mktime(0,0,0,$month,$day,$year));
		$date_added = date('M j Y', strtotime($row['date_added']));

		if ($count==1){
			print "<li class=\"article first ui-dropbox\">\n";
			print "<a href=\"download_dropbox.php?id=$row[dropbox_id]\">\n";
			print "<h2>$row[dropbox_name]</h2>\n";
			print "<p>Date of publication: $date_added</p>\n";
			print "</a>\n";
			print "</li>\n";
			$count++;

		}elseif($count<=$dropbox_count){

			print "<li class=\"article ui-dropbox\">\n";
			print "<a href=\"download_dropbox.php?id=$row[dropbox_id]\">\n";
			print "<h2>$row[dropbox_name]</h2>\n";
			print "<p>Date of publication: $date_added</p>\n";
			print "</a>\n";
			print "</li>\n";

			$count++;
		}
	endwhile;
		print "</ul>\n";
}
mysqli_close($connection);
?>

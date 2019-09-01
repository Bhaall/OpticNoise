<?php
//start scene & heard section
$scene_count = "select count(*) as count from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID where sceneholder.sceneactive = 'y'";
$result1 = mysqli_query($connection, $scene_count);
$row1 = mysqli_fetch_array($result1);
$num_scene = $row1['count'];
$count=1;

if ($num_scene < 1){
	print("<div class=\"article ui-tv\"><h1>There are currently no items available.</h1></div>\n");
}
else{
	$result = mysqli_query($connection, "select sceneholder.*, sceneitems.* from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID where sceneholder.sceneactive = 'y' order by sceneitems.itemOrder");

	while ( $row = mysqli_fetch_array($result) ) :

		if(($row['itemMedia']) == "TV") {
			print "<li class=\"article ui-tv\"><a href=\"licenses\" title=\"$row[itemHeader]\">\n";
		}
		elseif(($row['itemMedia']) == "MOVIE") {
			print "<li class=\"article ui-film\"><a href=\"licenses\" title=\"$row[itemHeader]\">\n";
		}
		elseif(($row['itemMedia']) == "AUDIO") {
			print "<li class=\"article ui-audio\"><a href=\"licenses\" title=\"$row[itemHeader]\">\n";
		}
		elseif(($row['itemMedia']) == "PROMO") {
			print "<li class=\"article ui-promo\"><a href=\"licenses\" title=\"$row[itemHeader]\">\n";
		}
		elseif(($row['itemMedia']) == "GAME") {
			print "<li class=\"article ui-game\"><a href=\"licenses\" title=\"$row[itemHeader]\">\n";
		}
		print "<h2>$row[itemHeader]</h2>\n";
		print "<p>$row[itemText]</p>\n";
		print "</a></li>\n";
		$count++;

	endwhile;
}
//mysql_close();
?>

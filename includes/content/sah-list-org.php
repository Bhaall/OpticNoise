<?php
//start scene & heard section
$scene_count = "select count(*) as count from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID where sceneholder.sceneactive = 'y'";
$result1 = mysqli_query($connection, $scene_count);
$row1 = mysqli_fetch_array($result1);
$num_scene = $row1['count'];
$count=1;

if ($num_scene < 1){
	print("<div class=\"article first ui-tv\"><h1>There are currently no items available.</h1></div>\n");
}
else{

	$result = mysqli_query($connection, "select sceneholder.*, sceneitems.* from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID where sceneholder.sceneactive = 'y' order by sceneitems.sceneID");

	while ( $row = mysqli_fetch_array($result) ) :
		if ($count==1){
			if(($row['itemMedia']) == "TV") {
				print "<div class=\"article first ui-tv\">\n";
			}
			elseif(($row['itemMedia']) == "MOVIE") {
				print "<div class=\"article first ui-film\">\n";
			}
			elseif(($row['itemMedia']) == "AUDIO") {
				print "<div class=\"article first ui-audio\">\n";
			}
			elseif(($row['itemMedia']) == "PROMO") {
				print "<div class=\"article first ui-promo\">\n";
			}
			elseif(($row['itemMedia']) == "GAME") {
				print "<div class=\"article first ui-game\">\n";
			}
			print "<h1>$row[itemHeader]</h1>\n";
			print "<p>$row[itemText]</p>\n";
			print "</div>\n";
			$count++;
		}elseif($count<=$num_scene){
			if(($row['itemMedia']) == "TV") {
				print "<div class=\"article ui-tv\">\n";
			}
			elseif(($row['itemMedia']) == "MOVIE") {
				print "<div class=\"article ui-film\">\n";
			}
			elseif(($row['itemMedia']) == "AUDIO") {
				print "<div class=\"article ui-audio\">\n";
			}
			elseif(($row['itemMedia']) == "PROMO") {
				print "<div class=\"article ui-promo\">\n";
			}
			elseif(($row['itemMedia']) == "GAME") {
				print "<div class=\"article ui-game\">\n";
			}
			print "<h1>$row[itemHeader]</h1>\n";
			print "<p>$row[itemText]</p>\n";
			print "</div>\n";
			$count++;
		}
	endwhile;
}
//mysql_close();
?>
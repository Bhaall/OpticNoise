<?php
$q1 = "select * from indies where home_status = 'y' && active = 'y' order by home_order ASC LIMIT 0, 3";
$r1 = mysqli_query($connection, $q1) or die(mysqli_error());

$signings = '';

while($a1 = mysqli_fetch_array($r1)) {
	$marker = strtolower($a1['marker']);

	if (!empty($marker)) {
		$showName = strtolower($marker) . " " . strtolower($a1['INartistName']);
	}else{
		$showName = strtolower($a1['INartistName']);
	}

	$navID = $a1['INartistID'];

	$signings .= "<div class=\"listing\">\n";
	$signings .= "<a href='roster.php#$navID'>\n";
	$signings .= "<img src=\"images/artists/$a1[album_pic]\" class=\"img-responsive\" alt=\"$showName\" title=\"$showName\" />\n";
	$signings .= "</a>\n";
	$signings .= "<h2>$showName</h2>\n";
	$signings .= "<p>$a1[INroster_desc]</p>\n";
	$signings .= "</div>\n";
}
print "$signings\n";

?>

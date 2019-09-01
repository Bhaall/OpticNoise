<?php
$q1 = "select * from indies where slider_status = 'y' && active = 'y' order by home_order";
$r1 = mysqli_query($connection, $q1) or die(mysqli_error());

$featured = '';

while($a1 = mysqli_fetch_array($r1)) {

	$marker = strtolower($a1['marker']);

	if (!empty($marker)) {
		$showName = strtolower($marker) . " " . strtolower($a1['INartistName']);
	}else{
		$showName = strtolower($a1['INartistName']);
	}

	$showName = stripslashes($showName);

	$featured .= "<div class=\"ui-tabs-panel\">\n";
	$featured .= "<img src=\"images/artists/$a1[slider_pic]\" class=\"img-responsive\" alt=\"$showName\" title=\"$showName\" />\n";
	$featured .= "<div class=\"info robots-nocontent\">\n";
	$featured .= "<!--googleoff: index--><h2>$showName</h2><!--googleon: index-->\n";
	$featured .= "</div>\n";
	$featured .= "</div>\n";
}

print "$featured\n";

?>

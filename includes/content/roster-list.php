<?php
function getLetterNav(){
  GLOBAL $firstLetter;
  $letterMenu = "";
  $letterMenu .= "<li><a class='btn-flat' title='all' href='#all'>All</a></li>";
  for ($i="a"; $i != "aa"; $i++) {
    if (!isset($firstLetter[$i])) {
    } else {
      $i_caps = strtoupper($i);
      $letterMenu .= " <li><a class='btn-flat' rel=$i href=#$i title=$i>$i_caps</a></li> ";
    }
  }
  return($letterMenu);
}
$roster_count = "select count(*) as count from indies where indies.active = 'y'";
$result1 = mysqli_query($connection, $roster_count);
$row1 = mysqli_fetch_array($result1);
$q1 = "select indies.INartistID, indies.marker, indies.INartistName, indies.INroster_desc, indies.active, indies.INsync, s.song from indies left outer join ( select artistID, group_concat(song_title) as song from songs where songs.roster_flag = 'y' group by artistID) as s on s.artistID = indies.INartistID where indies.active = 'y' order by indies.INartistName";
$r1 = mysqli_query($connection, $q1) or die(mysqli_error());
$roster = '';
while($a1 = mysqli_fetch_array($r1)) {
	$marker = strtolower($a1['marker']);
	if (!empty($marker)) {
		$artName = strtolower($a1['INartistName']) . ", " . strtolower($marker);
	}else{
		$artName = strtolower($a1['INartistName']);
	}
	if (!empty($marker)) {
		$showName = strtolower($marker) . " " . strtolower($a1['INartistName']);
	}else{
		$showName = strtolower($a1['INartistName']);
	}
	$theLetter = substr($artName,0,1);
	$theName = substr($artName,0,3);
	$theID = $a1['INartistID'];
	if (!isset($firstLetter[$theLetter])) {
	  $firstLetter[$theLetter] = 1;
	}
	$showName = stripslashes($showName);
  $roster .= "<div class=\"col-sm-6 $theLetter $theID\">\n";
	$roster .= "<div class=\"box\">\n";
	$roster .= "<h3>$showName</h3>\n";
	$roster .= "<h4>$a1[INroster_desc]</h4>\n";
	$roster .= "<p>$a1[INsync]</p>\n";
	if (!empty($a1['song'])) {
		$q2 = "select * from songs where artistID = '$a1[INartistID]' && songs.roster_flag = 'y' order by songs.song_title LIMIT 0, 3";
		$r2 = mysqli_query($connection, $q2) or die(mysqli_error());
		$roster .= "<ul class=\"playlist\">\n";
		while($a2 = mysqli_fetch_array($r2)) {
			$roster .= "<li><a href='assets/multimedia/$a2[song_file]'>$a2[song_title]</a>\n";
			$roster .= "</li>\n";
		}
		$roster .= "</ul>\n";
	}
	$roster .= "</div>\n"; //end box div
  $roster .= "</div>\n"; //end col div
}
print $roster;
?>

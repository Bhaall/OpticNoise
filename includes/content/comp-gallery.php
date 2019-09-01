<?php
$hiddenPath = "assets/multimedia/";

$sql = mysqli_query($connection, "select * from comp_main where comp_id = '$_GET[id]'");

if (mysqli_num_rows($sql) > 0) {
	while ($row = mysqli_fetch_array($sql)) {
		$c_compname[] = $row['comp_name'];
		$c_compimage[] = $row['comp_pic'];
		$c_compdesc[] = $row['comp_desc'];
		$c_dateadded[] = $row['date_added'];
		$c_id[] = $row['comp_id'];
	}

	$x=0;

	foreach($c_id as $key=>$val) {
		if(!empty($c_compimage[$x])) {

			$track_count = "select count(*) as count from comp_main left join comp_items on comp_main.comp_id = comp_items.compID left join songs ON songs.song_id = comp_items.songID where comp_items.compID = '$c_id[$x]'";
			$result1 = mysqli_query($connection, $track_count);
			$row1 = mysqli_fetch_array($result1);
			$num_track = $row1['count'];

			list($year, $month, $day) = explode("-", $c_dateadded[$x]);
			$date_added = date('M j Y', strtotime($c_dateadded[$x]));

			$gallery = "<div class=\"mp_content\" id=\"c_album_$c_id[$x]\">\n";
			$gallery .= "<img src=\"images/comps/$c_compimage[$x]\" class=\"img-responsive\" alt=\"$c_compname[$x]\"  />\n";
			$gallery .= "<div class=\"mp_description\">\n";
			$gallery .= "<h2>$c_compname[$x]</h2>\n";
			$gallery .= "<p>$c_compdesc[$x]</p>\n";
			$gallery .= "<p>Date of publication: $date_added</p>\n";
			$gallery .= "<p>Number of tracks: $num_track</p>\n";
			$gallery .= "<p><a href=\"download_comp.php?id=$c_id[$x]\" class=\"btn btn-raised\" alt=\"download $c_compname[$x]\" title=\"download $c_compname[$x]\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i> $c_compname[$x]</a></p>\n";
			$gallery .= "</div>\n";
			$gallery .= "<div class=\"mp_songs\">\n";
			$gallery .= "<ul class=\"playlist\">\n";

			$q1 = "select * from comp_main left join comp_items on comp_main.comp_id = comp_items.compID left join songs ON songs.song_id = comp_items.songID where comp_items.compID = '$c_id[$x]' order by comp_items.item_sort asc ";
			$r1 = mysqli_query($connection, $q1) or die(mysqli_error());

			if(mysqli_num_rows($r1) > '0') {
				while($a1 = mysqli_fetch_array($r1)) {

					$q2 = "select indies.*, songs.* from songs left join indies on indies.INartistID = songs.artistID where song_id = '$a1[songID]' ";
					$r2 = mysqli_query($connection, $q2) or die(mysqli_error());

					if(mysqli_num_rows($r2) > '0') {

						while($a2 = mysqli_fetch_array($r2)) {

							if (!empty($a2['marker'])) {
								$artistname = ($a2['marker']) . " " . ($a2['INartistName']);
							}else{
								$artistname = ($a2['INartistName']);
							}

							$artistname = stripslashes($artistname);

							if(!empty($a2['song_file'])) {
								$file_real = $hiddenPath . $a2['song_file'];
							}else{
								$file_real = $hiddenPath . "loadfail.mp3";
							}

							if(!empty($a2['song_comments'])) {
								$song_comments = '('.$a2['song_comments'].')';
							}else{
								$song_comments = '';
							}

							$song_title = htmlspecialchars($a2['song_title'], ENT_QUOTES);

							$gallery .= "<li><a href=\"$file_real\">$artistname | $song_title $song_comments</a></li> <a href=\"download_song.php?id=$a1[songID]\" class=\"btn btn-raised\" alt=\"download $song_title\" title=\"download $song_title\"><i class=\"fa fa-download\" aria-hidden=\"true\"></i></a>\n";
						}
					}
				}
			}

			$gallery .= "</ul>\n";
			$gallery .= "<div class='mp_total'><h3>Number of tracks: $num_track</h3></div>";
			$gallery .= "</div>\n";
			$gallery .= "</div>\n";

			$x++;
		}
		print "$gallery\n";
	}
}
else {
	require_once("includes/content/comp_error.php");
}
?>

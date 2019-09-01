<?php
if(isset($page_name)){
	if ($page_name == "index"){
		$query = "select * from comp_main where comp_flag = 'y' && active = 'y' order by sort DESC";
	}
	else if($page_name == "comps"){
		$query = "select * from comp_main where active = 'y' order by sort DESC";
	}
}
$result = mysqli_query($connection, $query);
$numrows = mysqli_num_rows($result);
$comps = "<ul id=\"mp_albums\" class=\"mp_albums jcarousel-skin mpcarousel\">\n";

while ( $row = mysqli_fetch_array($result) ) {
		$photo_file = $row["comp_pic"];
		$photo_alt = $row['comp_name'];
		$comp_id = $row['comp_id'];
		$comps .="<li item_id=\"$comp_id\"><img src=\"images/comps/$photo_file\" alt=\"$photo_alt\" title=\"$photo_alt\" class=\"img-responsive\" /></li>";
}

$comps .= "</ul>\n";
print "$comps\n";
?>

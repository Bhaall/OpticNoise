<?php
$root_path = $_SERVER['DOCUMENT_ROOT'] . "/optic";
include("includes/config.php");

if(isset($page_name)){
	if ($page_name == "index"){
		include("content/main_content.php");
	}
	else if ($page_name == "roster"){
		include("content/roster_content.php");
	}
	else if ($page_name == "licenses"){
		include("content/licenses_content.php");
	}
	else if ($page_name == "comps"){
		include("content/comps_content.php");
	}
	else if ($page_name == "comp"){
		include("content/comp_content.php");
	}
	else if ($page_name == "about"){
		include("content/about_content.php");
	}
	else if ($page_name == "contact"){
		include("content/contact_content.php");
	}
	else if ($page_name == "error"){
		include("content/error_content.php");
	}
}
?>

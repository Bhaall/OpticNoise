<?php
	$targetpage = "licenses.php";
	$limit = 60;

	$query = "select count(*) as num from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID";
	$total_pages = mysqli_fetch_array(mysqli_query($connection, $query));
	$total_pages = $total_pages['num'];

	$stages = 3;
	//$page = mysqli_escape_string($_GET['page']);
	$page = (isset($_GET['page'])) ? (int)$_GET['page'] : 1;
	if($page) {
		$start = ($page - 1) * $limit;
	}else{
		$start = 0;
	}

	// total records
	$records_count = "select count(*) as count from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID";
	$records_count_result = mysqli_query($connection, $records_count);
	$records_row = mysqli_fetch_array($records_count_result);
	$num_records = $records_row['count'];

	// set counter
	$i = 0;

	$query1 = "select sceneholder.*, sceneitems.* from sceneitems left join sceneholder on sceneholder.sceneID = sceneitems.sceneID order by sceneholder.scene_order DESC, sceneitems.itemOrder ASC LIMIT $start, $limit";
	$result = mysqli_query($connection, $query1);

	$icount=1;
	$itotal = mysqli_num_rows($records_count_result);

	// Initial page num setup
	if ($page == 0){$page = 1;}
	$prev = $page - 1;
	$next = $page + 1;
	$lastpage = ceil($total_pages/$limit);
	$LastPagem1 = $lastpage - 1;


	$paginate = '';
	if($lastpage > 1) {

		$paginate .= "<ul class='paginate'>";
		// Previous
		if ($page > 1) {
			$paginate.= "<li><a class='prev' href='$targetpage?page=$prev'>&laquo;</a></li>";
		}else{
			$paginate.= "<li class='disabled'><span>&laquo;</span></li>";
		}

		if ($lastpage < 7 + ($stages * 2)) {
			for ($counter = 1; $counter <= $lastpage; $counter++) {
				if ($counter == $page) {
					$paginate.= "<li class='current'><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
				}else{
					$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
				}
			}
		}
		elseif($lastpage > 5 + ($stages * 2)) {
			// Beginning only hide later pages
			if($page < 1 + ($stages * 2)){
				for ($counter = 1; $counter < 4 + ($stages * 2); $counter++) {
					if ($counter == $page) {
						$paginate.= "<li class='current'><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
					}else{
						$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
					}
				}
				$paginate.= "...";
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$LastPagem1'>$LastPagem1</a></li>";
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$lastpage'>$lastpage</a></li>";
			}
			// Middle hide some front and some back
			elseif($lastpage - ($stages * 2) > $page && $page > ($stages * 2)) {
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=1'>1</a></li>";
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=2'>2</a></li>";
				$paginate.= "...";
				for ($counter = $page - $stages; $counter <= $page + $stages; $counter++) {
					if ($counter == $page) {
						$paginate.= "<li class='current'><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
					}else{
						$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";}
				}
				$paginate.= "...";
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$LastPagem1'>$LastPagem1</a></li>";
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$lastpage'>$lastpage</a></li>";
			}
			// End only hide early pages
			else {
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=1'>1</a></li>";
				$paginate.= "<li><a class='btn-flat' href='$targetpage?page=2'>2</a></li>";
				$paginate.= "...";
				for ($counter = $lastpage - (2 + ($stages * 2)); $counter <= $lastpage; $counter++) {
					if ($counter == $page) {
						$paginate.= "<li class='current'><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
					}else{
						$paginate.= "<li><a class='btn-flat' href='$targetpage?page=$counter'>$counter</a></li>";
					}
				}
			}
		}
		// Next
		if ($page < $counter - 1) {
			$paginate.= "<li><a class='next' href='$targetpage?page=$next'>&raquo;</a></li>";
		}else{
			$paginate.= "<li class='disabled'><span>&raquo;</span></li>";
			}

		$paginate.= "</ul>";
	}
	echo $paginate;
?>
<div class="article detail">
	<div id="content-licenses">

<?php
	$licenses = '';
	// $licenses .= "<div class='col-sm-4'>\n";
	while ($row = mysqli_fetch_assoc($result)) {

		if ($icount % 3 == 1) {
			$licenses .= "<div class=\"row\">\n";
    }

		// if ($icount % 3 == 0 && $icount != $itotal){
		// 	$licenses .= "<div class=\"row\">\n";
		// }

		if(($row['itemMedia']) == "TV") {
			$licenses .= "<div class='col-sm-4'><div class='product-info ui-tv'><h3 class='heading'>$row[itemHeader]</h3><div>$row[itemText]</div></div></div>\n";
		}
		elseif(($row['itemMedia']) == "MOVIE") {
			$licenses .= "<div class='col-sm-4'><div class='product-info ui-film'><h3 class='heading'>$row[itemHeader]</h3><div>$row[itemText]</div></div></div>\n";
		}
		elseif(($row['itemMedia']) == "AUDIO") {
			$licenses .= "<div class='col-sm-4'><div class='product-info ui-audio'><h3 class='heading'>$row[itemHeader]</h3><div>$row[itemText]</div></div></div>\n";
		}
		elseif(($row['itemMedia']) == "PROMO") {
			$licenses .= "<div class='col-sm-4'><div class='product-info ui-promo'><h3 class='heading'>$row[itemHeader]</h3><div>$row[itemText]</div></div></div>\n";
		}
		elseif(($row['itemMedia']) == "GAME") {
			$licenses .= "<div class='col-sm-4'><div class='product-info ui-game'><h3 class='heading'>$row[itemHeader]</h3><div>$row[itemText]</div></div></div>\n";
		}

		if ($icount % 3 == 0 && $icount != $itotal){
			$licenses .= "</div>\n";
		}

		$icount++;
	}
	// $licenses .= "</div>\n";
	print $licenses;
?>

	</div> <!-- end content-licenses -->
</div><!-- end article detail -->

<div class="bottom">
	<?php
		echo $paginate;
	?>
</div>

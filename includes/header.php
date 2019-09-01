<?php
$root_path = $_SERVER['DOCUMENT_ROOT'] . "/optic";
include("includes/config.php");

$title = $aset['SiteTitle'];
$title = strtolower($title);

$mypage_title = $page_name == 'index' ? 'home' : $page_name;

$desc = $aset['SiteDesc'];
$desc = strtolower($desc);
?>

<!doctype html>
<html lang="en">

<head>
	<style>html{visibility: hidden;opacity:0;}</style>
	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

	<title> <?=$title?> | <?=$mypage_title?> | <?=$desc?></title>
	<meta name="description" content="<?=$aset['SiteDesc']?>" />
	<link rel="canonical" href="<?=$aset['SiteURL']?>/<?=$page_name?>.php">
	<meta itemprop="name" content="<?=$aset['SiteTitle']?>">
	<meta itemprop="url" content="<?=$aset['SiteURL']?>/<?=$page_name?>">
	<meta itemprop="description" content="<?=$aset['SiteDesc']?>">
	<meta itemprop="thumbnailUrl" content="<?=$aset['SiteURL']?>/opticnoise_logo.png?format=1500w">
	<link rel="image_src" href="<?=$aset['SiteURL']?>/opticnoise_logo.png?format=1500w">

	<?php
		if($page_name == "comp" || $page_name == "comps") {
			include("includes/noindex.php");
		}
	?>

	<meta property="og:site_name" content="<?=$aset['SiteTitle']?>">
	<meta property="og:title" content="<?=$aset['SiteTitle']?>">
	<meta property="og:url" content="<?=$aset['SiteURL']?>/<?=$page_name?>">
	<meta property="og:type" content="website">
	<meta property="og:description" content="<?=$aset['SiteDesc']?>">
	<meta property="og:image" content="<?=$aset['SiteURL']?>/opticnoise_logo.png?format=1500w">
	<meta property="og:image:width" content="330">
	<meta property="og:image:height" content="66">

	<meta name="twitter:title" content="<?=$aset['SiteTitle']?>">
	<meta name="twitter:image" content="<?=$aset['SiteURL']?>/opticnoise_logo.png?format=1500w">
	<meta name="twitter:url" content="<?=$aset['SiteURL']?>/<?=$page_name?>">
	<meta name="twitter:card" content="summary">
	<meta name="twitter:description" content="<?=$aset['SiteDesc']?>">

	<script src="js/modernizr-2.6.min.js"></script>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
	<link rel="stylesheet" href="css/font-awesome.min.css"/>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400,600">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans+Condensed:700">
	<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Averia+Libre:700">
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

	<link rel="shortcut icon" href="favicon.ico">
	<link rel="stylesheet" href="css/styles.css">

	<script type="application/ld+json"> {
		"@context": "http://schema.org/",
		"@type": "website",
		"description": "<?=$aset['SiteDesc']?>",
		"url": "<?=$aset['SiteURL']?>/<?=$page_name?>",
		"name": "<?=$aset['SiteTitle']?>",
		"image": "<?=$aset['SiteURL']?>/images/<?=$aset['logo']?>"
	}
	</script>
	<script type="application/ld+json">{
		"@context":"http://schema.org",
		"@type":"Organization",
		"legalName":"<?=$aset['SiteTitle']?>",
		"email":"<?=$aset['ContactEmail']?>",
		"telephone":"<?=$aset['ContactPhone']?>",
		"sameAs":["https://twitter.com/OpTicNoiSe"],
		"image": "<?=$aset['SiteURL']?>/images/<?=$aset['logo']?>",
		"logo": "<?=$aset['SiteURL']?>/images/<?=$aset['logo']?>",
		"url": "<?=$aset['SiteURL']?>/<?=$page_name?>"
	}
	</script>
	<script type="application/ld+json">{
		"@context":"http://schema.org",
		"@type":"LocalBusiness",
		"email":"<?=$aset['ContactEmail']?>",
		"telephone":"<?=$aset['ContactPhone']?>",
		"image":"<?=$aset['SiteURL']?>/images/<?=$aset['logo']?>",
		"name":"<?=$aset['SiteTitle']?>",
		"address":"Los Angeles, California",
		"priceRange":"$$",
		"logo": "<?=$aset['SiteURL']?>/images/<?=$aset['logo']?>",
		"url": "<?=$aset['SiteURL']?>/<?=$page_name?>"
	}
	</script>
</head>

<body id="<?=$page_name?>" class="<?=$page_name?> cookie imagesloaded waypoints animation togglecontact">
	<div class="header-contact-info">
		<div class="container">
      <div class="row">
			  <span>For quotes or questions...</span>
				<ul>
					<li class="email col-xs-6 col-xs-offset-1 col-sm-5 col-sm-offset-1 col-md-5 col-md-offset-2 cr-animate-gen" data-gen="fadeInLeftSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
            <i class="material-icons" aria-hidden="true">email</i> <a href="mailto:<?=$aset['ContactEmail']?>?subject=Hey%20Optic Noise">Email Us<span><?=$aset['ContactEmail']?></span></a>
          </li>
					<li class="call col-xs-5 col-sm-5 col-md-4 cr-animate-gen" data-gen="fadeInRightSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<i class="material-icons" aria-hidden="true">phone</i> <a href="tel:<?=$aset['ContactPhone']?>">Give Us A Call<span><?=$aset['ContactPhone']?></span></a>
          </li>
				</ul>
      </div>
		</div>
	</div>
	<header id="header">
		<?php include("includes/content/navigation.php"); ?>

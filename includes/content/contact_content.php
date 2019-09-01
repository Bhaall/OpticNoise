<?php
//get the contact page
$qcon = "select * from contactpage";
$rcon = mysqli_query($connection, $qcon) or die(mysqli_error());
$acon = mysqli_fetch_array($rcon);
?>

		<section id="tout">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<div class="header-content">
							<h1><?=stripslashes($aset['contactquote'])?></h1>
						</div>
					</div>
				</div>
			</div>
		</section>
		</header>
		<section class="featured">
	    <div class="container">
	      <div class="row">
	        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-12">
	          <img alt="Optic Noise Logo" src="images/on_mark.png" class="on-logo" />
	        </div>
	        <div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
	          <div class="secondary">
	            <div class="center">
	              <p><?=stripslashes($aset['sitequote'])?></p>
	            </div>
	          </div>
	        </div>
	      </div>
	    </div>
	  </section>

		<section class="content initaccess first">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2 class="hdr-1"><?=$acon['main_heading']?></h2>
						<p><?=$acon['main_subhead']?></p>
          </div>
				</div>
				<div class="row">
          <div class="col-sm-6 cr-animate-gen" data-gen="fadeInLeftSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<div class="box first">
	            <h3>Email</h3>
							<p class="mi"><i class="material-icons" aria-hidden="true">email</i> <a href="mailto:<?=$aset['ContactEmail']?>?subject=Hey%20Optic Noise"> <?=$aset['ContactEmail']?></a></p>
						</div>
          </div>
          <div class="col-sm-6 cr-animate-gen" data-gen="fadeInRightSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<div class="box">
	            <h3>Phone</h3>
							<p class="mi"><i class="material-icons" aria-hidden="true">phone</i> <a href="tel:<?=$aset['ContactPhone']?>"><?=$aset['ContactPhone']?></a></p>
						</div>
          </div>
        </div>
      </div>
    </section>
		<section class="content info">
			<div class="container">
				<div class="row">
					<div class="col-sm-12 cr-animate-gen" data-gen="fadeInUpSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<div class="box info">
							<div class="row">
								<div class="col-sm-6">
									<div class="icon_holder">
										<p><i class="material-icons" aria-hidden="true"><?=$acon['top_left_icon']?></i></p>
									</div>
									<h2><?=$acon['top_left_heading']?></h2>
									<p class="subhead"><?=$acon['top_left_subhead']?></p>
									<p><?=$acon['top_left_para']?></p>
								</div>
								<div class="col-sm-6">
									<div class="icon_holder">
										<p><i class="material-icons" aria-hidden="true"><?=$acon['top_right_icon']?></i></p>
									</div>
									<h2><?=$acon['top_right_heading']?></h2>
									<p class="subhead"><?=$acon['top_right_subhead']?></p>
									<p><?=$acon['top_right_para']?></p>
								</div>
							</div>
							<div class="row">
								<div class="col-sm-6">
									<div class="icon_holder">
										<p><i class="material-icons" aria-hidden="true"><?=$acon['bottom_left_icon']?></i></p>
									</div>
									<h2><?=$acon['bottom_left_heading']?></h2>
									<p class="subhead"><?=$acon['bottom_left_subhead']?></p>
									<p><?=$acon['bottom_left_para']?></p>
								</div>
								<div class="col-sm-6">
									<div class="icon_holder">
										<p><i class="material-icons" aria-hidden="true"><?=$acon['bottom_right_icon']?></i></p>
									</div>
									<h2><?=$acon['bottom_right_heading']?></h2>
									<p class="subhead"><?=$acon['bottom_right_subhead']?></p>
									<p><?=$acon['bottom_right_para']?></p>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>

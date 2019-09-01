<?php
//get the about page
$qabt = "select * from aboutpage";
$rabt = mysqli_query($connection, $qabt) or die(mysqli_error());
$aabt = mysqli_fetch_array($rabt);
?>
		<section id="tout">
			<div class="container">
				<div class="row">
					<div class="col-xs-12">
						<div class="header-content">
							<h1><?=stripslashes($aset['homequote'])?></h1>
						</div>
					</div>
				</div>
			</div>
		</section>
		</header>
		<section class="featured">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <p><?=stripslashes($aabt['top_left_para_1'])?></p>
            <p><?=stripslashes($aabt['top_left_para_2'])?></p>
            <p><?=stripslashes($aabt['top_left_para_3'])?></p>
          </div>
          <div class="col-md-6">
            <blockquote><span class="line1"><?=stripslashes($aabt['top_right_para_1'])?></span></blockquote>
          </div>
        </div>
      </div>
    </section>

		<section class="content initaccess">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <h2>Here are some other things you should know about us:</h2>
          </div>
				</div>
				<div class="row">
          <div class="col-sm-6 cr-animate-gen" data-gen="fadeInLeftSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<div class="box first">
	            <h3 class="hdr-1"><?=stripslashes($aabt['bottom_left_heading'])?></h3>
	            <p><?=stripslashes($aabt['bottom_left_para'])?></p>
						</div>
          </div>
          <div class="col-sm-6 cr-animate-gen" data-gen="fadeInRightSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<div class="box">
	            <h3 class="hdr-1"><?=stripslashes($aabt['bottom_right_heading'])?></h3>
	            <p class="first"><?=stripslashes($aabt['bottom_right_para_1'])?></p>
	            <p><?=stripslashes($aabt['bottom_right_para_2'])?></p>
						</div>
          </div>
        </div>
      </div>
    </section>

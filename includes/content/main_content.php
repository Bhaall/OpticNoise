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
					<div class="col-sm-6">
						<!--googleoff: index-->
						<div id="featured-artist" class="slider">
							<?php
							require_once("includes/content/featured-slider.php");
							?>
						</div>
						<!--googleon: index-->
					</div>
					<div class="col-sm-6">
						<div class="secondary">
							<div class="center"><img src="images/on_mark.png" />
								<p><?=stripslashes($aset['sitequote'])?></p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section> <!-- end featured section -->

		<section class="content initaccess initdownload">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 cr-animate-gen" data-gen="fadeInLeftSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
            <h2 class="hdr-1">New Optic Noise Signings</h2>
            <div class="signings">
							<?php
							require_once("includes/content/signings-section.php");
							?>
						</div>
						<h2 class="hdr-1">Compilation Albums</h2>
            <p class="featured-nav-label">
              <a href="comps.php" class="access">See All compilations</a>
            </p>
						<!-- begin player -->
            <div class="gallery">
              <div id="sm2-container" class="soundmanager mediaplayer materialripple">
                <!-- SM2 flash goes here -->
              </div>
              <div class="mp_wrapper">
								<?php
								require_once("includes/content/comps-carousel.php");
								?>
								<div id="mp_content_wrapper" class="mp_content_wrapper">
									<?php
									require_once("includes/content/comps-gallery.php");
									?>
								</div><!-- mp_content_wrapper -->
							</div><!-- .mp_wrapper -->
						</div><!-- .gallery -->
					</div><!-- .col -->
					<div class="col-sm-4 col-md-5 cr-animate-gen" data-gen="fadeInRightSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
						<div class="sidebar">
							<h2 class="hdr-1">Scene &amp; Heard</h2>
							<p>Our latest placements and licenses</p>
							<ul id="sah">
								<?php
								require_once("includes/content/sah-list.php");
								?>
							</ul>
						</div>
          </div>
        </div>
      </div>
    </section> <!-- end section -->

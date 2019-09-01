      <section id="tout">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <div class="header-content">
                <h1><?=stripslashes($aset['compsquote'])?></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
    <section class="content initdownload">
      <div class="container">
        <div class="row">
          <div class="col-sm-8 col-md-7 cr-animate-gen" data-gen="fadeInLeftSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
            <h2 class="hdr-1">All Compilation Albums</h2>
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
              </div><!-- mp_wrapper -->
						</div><!-- .gallery -->
					</div><!-- .col-sm-8 -->
          <div class="col-sm-4 col-md-5 cr-animate-gen" data-gen="fadeInRightSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
            <div class="sidebar">
              <h2 class="hdr-1">Dropbox Files</h2>
              <?php
    					require_once("includes/content/dropbox-list.php");
    					?>
            </div><!-- end sidebar -->
          </div><!-- end col-sm-4 -->
        </div><!-- end row -->
      </div><!-- end container -->
    </section> <!-- end section -->

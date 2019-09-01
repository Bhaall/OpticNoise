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
        <div class="col-sm-12 cr-animate-gen" data-gen="fadeInUpSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
          <h1>Download Compilation</h1>
          <!-- begin player -->
          <div class="gallery">
            <div id="sm2-container" class="soundmanager mediaplayer materialripple">
              <!-- SM2 flash goes here -->
            </div>
            <div class="mp_wrapper">
              <div id="mp_content_wrapper" class="mp_content_wrapper">
                <?php
                require_once("includes/content/comp-gallery.php");
                ?>
              </div><!-- mp_content_wrapper -->
            </div><!-- mp_wrapper -->
          </div><!-- .gallery -->
        </div>
      </div>
    </div>
  </section> <!-- end section -->

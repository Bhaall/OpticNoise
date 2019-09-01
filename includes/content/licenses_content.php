    <section id="tout">
      <div class="container">
        <div class="row">
          <div class="col-xs-12">
            <div class="header-content">
              <h1><?=stripslashes($aset['placementsquote'])?></h1>
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
  <section class="content initaccess">
    <div class="container">
      <div class="row">
        <div class="col-md-12 cr-animate-gen" data-gen="fadeInUpSmall" data-gen-offset="bottom-in-view" data-gen-delay="0s">
          <h2 class="hdr-1 pull-left">Placements &amp; Licenses</h2>
          <?php
          require_once("includes/content/licenses-carousel.php");
          ?>
        </div>
      </div>
    </div>
  </section>

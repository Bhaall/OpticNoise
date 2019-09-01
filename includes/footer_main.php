	<footer id="footer" class="footer">
    <div class="container">
      <div class="row">
        <div class="col-xs-4">
          <span class="slogan">Music That Works</span>
        </div>
        <div class="col-xs-4">
          <p class="brandmark">
						<img alt="Optic Noise Logo" src="images/opticnoise.png" class="img-responsive" />
					</p>
        </div>
        <div class="col-xs-4">
          <div class="legal">
						<span class="copyright">&copy; <time id="year"></time> Optic Noise</span>
					</div>
        </div>
      </div>
    </div>
  </footer> <!-- .footer -->

	<?php
	if(isset($page_name)){
		if ($page_name == "index"){
			include("includes/content/access.php");
			include("includes/content/login.php");
		}
		if ($page_name == "roster"){
			include("includes/content/access.php");
			include("includes/content/letternav.php");
		}
		if ($page_name == "licenses"){
			include("includes/content/access.php");
		}
		if ($page_name == "about"){
			include("includes/content/access.php");
		}
		if ($page_name == "contact"){
			include("includes/content/access.php");
		}
		if ($page_name == "comps"){
			include("includes/content/login.php");
		}
		if ($page_name == "comp"){
			include("includes/content/login.php");
		}
		if ($page_name == "error"){
			include("includes/content/access.php");
		}
	}
	?>

	<!-- <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script> -->
	<!-- <script data-require="jquery-js@*" data-semver="1.11.1" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script>
	if (typeof jQuery == 'undefined') {
		document.write(unescape("%3Cscript src='js/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));
	}
	</script> -->
	<!-- <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script> -->

	<script src='js/jquery-2.2.4.min.js'></script>
	<script src='js/bootstrap.min.js'></script>
	<script src='js/onl.global.js'></script>

	<script src="http://www.google-analytics.com/urchin.js"></script>
	<script type="text/javascript">
		_uacct = "UA-619465-2";
		urchinTracker();
	</script>
</body>
</html>

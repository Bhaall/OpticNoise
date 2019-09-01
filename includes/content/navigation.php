<nav id="nav" class="navbar">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="/"><img alt="Optic Noise Logo" src="images/<?=$aset['logo']?>" /></a>
			<div class="contact">
				<a href="#">Contact</a>
			</div>
		</div>
		<div id="navbar" class="collapse navbar-collapse">
			<ul class="nav navbar-nav">
				<li<?php if ($page_name=="index") echo " class=\"active\""; ?>><a href="/" title="Home">Home</a></li>
				<li<?php if ($page_name=="roster") echo " class=\"active\""; ?>><a href="roster" title="Roster">Roster</a></li>
				<li<?php if ($page_name=="licenses") echo " class=\"active\""; ?>><a href="licenses" title="Licenses">Licenses</a></li>
				<li<?php if ($page_name=="about") echo " class=\"active\""; ?>><a href="about" title="About">About</a></li>
				<li<?php if ($page_name=="contact") echo " class=\"active\""; ?>><a href="contact" title="Contact Us">Contact Us</a></li>
				<li<?php if ($page_name=="comps") echo " class=\"active\""; ?>><a href="comps" title="Compilations" class="access">Comps</a></li>
				<li><a href="https://twitter.com/#!/OpTicNoiSe" title="Follow us on Twitter" target="_blank" rel="noopener"><img src="images/bird_gray_16.png" /> Follow Us!</a></li>
			</ul>
		</div>
	</div>
</nav>

<?php

function bytesToSize1024($bytes, $precision = 2) {
    $unit = array('B','KB','MB');
    return @round($bytes / pow(1024, ($i = floor(log($bytes, 1024)))), $precision).' '.$unit[$i];
}

$sFileName = $_FILES['portrait']['name'];
$sFileType = $_FILES['portrait']['type'];
$sFileSize = bytesToSize1024($_FILES['portrait']['size'], 1);

$t = time();

$PortraitFile = $_FILES['portrait']['name'];
$extension = strrchr($PortraitFile, '.');
//$NewPortraitName = $t."_".$_FILES['portrait']['name'];
copy($_FILES['portrait']['tmp_name'], "../img/people/$PortraitFile");

echo <<<EOF
<p>Your file: {$PortraitFile} has been successfully received.</p>
<p>Type: {$sFileType}</p>
<p>Size: {$sFileSize}</p>
EOF;

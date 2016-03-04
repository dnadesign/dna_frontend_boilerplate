<?php

require_once 'Colors.php';

function success($short, $desc) {
	$colors = new Colors();

	echo $colors->getColoredString($short, "black", "green");
	echo " ".$desc;
	echo "\n";
}

function failure($short, $desc) {
	$colors = new Colors();
	
	echo $colors->getColoredString($short, "white", "red");
	echo " ".$desc;
	echo "\n";
}

function warn($short, $desc) {
	$colors = new Colors();
	
	echo $colors->getColoredString($short, "black", "yellow");
	echo " ". $desc;
	echo "\n";
}

function message($msg) {
	echo $msg;
	echo "\n";
}

function recurse_copy($src,$dst) { 
    $dir = opendir($src); 

    @mkdir($dst, 0755, true);

    if($dir) {
    	while(false !== ($file = readdir($dir)) ) { 
        	if (( $file != '.' ) && ( $file != '..' ) && $file != '.DS_Store') { 
        	    if ( is_dir($src . '/' . $file) ) { 
        	        recurse_copy($src . '/' . $file,$dst . '/' . $file); 
        	    } 
        	    else {
        	        copy($src . '/' . $file,$dst . '/' . $file); 
        	    } 
        	} 
    	} 

    	closedir($dir); 
    }
}

function rrm_dir($dir) {
    if (is_dir($dir)) {
        $objects = scandir($dir);

        foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
                if (filetype($dir."/".$object) == "dir") {
                    rrm_dir($dir."/".$object); 
                } else {
                    unlink($dir."/".$object);
                }
            }
        }

        reset($objects);
        rmdir($dir);
    }
 }

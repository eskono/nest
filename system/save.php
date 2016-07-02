<?php

$file = "data.json";
$fileHandle = fopen($file, 'w') or die("Error opening file");
if(isset($_POST)){
fwrite($fileHandle, $_POST['text']);
//echo $_POST;
    
}
    
    
    
    
    
    



?>
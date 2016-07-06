<?php
include 'connect.php';

$conn=$bd;
$sid=$_POST['s'];
//$sid ='20102003001';

$qry1="SELECT * FROM child WHERE child_id='$sid'";
$result1=mysqli_query($bd,$qry1);

if($result1) {
		if(mysqli_num_rows($result1) > 0) {
			echo 'sucessfull';
		}
}else{
	echo 'unsucessfull';
}

?>
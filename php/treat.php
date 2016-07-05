<?php
	require_once('connect.php');
	
	//Sanitize the POST values
	$sid =50501224003;// $_POST['s'];
	//$sid = '20602021066';
	//$sid = '20102003001';
	//$sid = '20102003007';
	
	$healthT=mysqli_query($bd,"SELECT DISTINCT `treatment` FROM `health2` WHERE `child_id`=$sid order by `timestamp` desc");
	$eyeT=mysqli_query($bd,"SELECT DISTINCT `treatment` FROM `eye` WHERE `child_id`=$sid order by `timestamp` desc");
	$entT=mysqli_query($bd,"SELECT DISTINCT `treatment` FROM `ent` WHERE `child_id`=$sid order by `timestamp` desc");	
	$skinT=mysqli_query($bd,"SELECT DISTINCT `treatment` FROM `skin` WHERE `child_id`=$sid order by `timestamp` desc");
	
	$result1='';
	$result2='';
	$result3='';
	$result4='';
	
	while ($row = mysqli_fetch_assoc($healthT)) {
		$result1 = $row['treatment'];
	}
	
	while ($row = mysqli_fetch_assoc($eyeT)) {
		$result2 = $row['treatment'];
	}
	
	while ($row = mysqli_fetch_assoc($entT)) {
		$result3 = $row['treatment'];
	}
	
	while ($row = mysqli_fetch_assoc($skinT)) {
		$result4 = $row['treatment'];
	}
	
	$result1L = strlen($result1);
	$result2L = strlen($result2);
	$result3L = strlen($result3);
	$result4L = strlen($result4);
	
	$final = '';
	
	if( $result1L < 5){
		$final = $final.'0$';
	}else{
		$final = $final.$result1;
	}
	if( $result2L < 5){
		$final = $final.'0$';
	}else{
		$final = $final.$result2;
	}
	if( $result3L < 5){
		$final = $final.'0$';
	}else{
		$final = $final.$result3;
	}
	if( $result4L < 5){
		$final = $final.'0$';
	}else{
		$final = $final.$result4;
	}
	
	//echo $result1L.$result2L.$result3L.$result4L;
	//echo $result1.$result2.$result3.$result4;
	echo $final;
 ?>

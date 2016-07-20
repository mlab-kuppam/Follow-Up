<?php
	require_once('connect.php');
	
	//Sanitize the POST values
	$sid = $_POST['s'];
	//$sid = '20602021066';
	//$sid = '20102003001';
	
	$pdetails=mysqli_query($bd,"SELECT DISTINCT `name`,`father_name`, `mother_name`, `guardian_name`,`gender`, `dob` FROM `child` WHERE `child_id`='$sid'");
	$sdetails=mysqli_query($bd,"SELECT `name`,`mobile` FROM `school` WHERE `school_id`=(SELECT DISTINCT `school_id` FROM `child` WHERE `child_id`='$sid')");
	$sociodetails=mysqli_query($bd,"SELECT `mobile` FROM `socio_demographic` WHERE `child_id`='$sid'");
	$hdetails=mysqli_query($bd,"SELECT `height`,`weight`, DATE_FORMAT(date(`timestamp`),'%d-%m-%Y') FROM `health1` WHERE `child_id`='$sid'");
	
	while ($row = mysqli_fetch_assoc($sdetails)) {
		$result1 = $row['name'] . "$" . $row['mobile'] . "$";
	}
	
	//Output data of each row
	while ($row = mysqli_fetch_assoc($pdetails)) {
		$result2 = $row['name'] . "$" . $row['father_name'] . "$" . $row['mother_name'] . "$" . $row['guardian_name'].'$' . $row['gender'] . "$" . $row['dob'] . "$";
	}

	while ($row = mysqli_fetch_assoc($sociodetails)) {
		$result3 = $row['mobile'] . "$";
	}

	while ($row = mysqli_fetch_assoc($hdetails)) {
		$result4 = $row['height'] . "$" . $row['weight'] . "$" . $row['DATE_FORMAT(date(`timestamp`),\'%d-%m-%Y\')'] . "$";
	}

	echo $result1.$result2.$result3.$result4;
	
mysqli_close($conn);
exit();
 ?>

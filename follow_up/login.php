<?php
	//Include database connection details
	require_once('php/connect.php');
	session_start();
	
	//Sanitize the POST values
	$username = $_POST['username'];
	$password = $_POST['password'];
	$sid = $_POST['sid'];
	
	//Create query
	$qry="SELECT * FROM users WHERE uname='$username' AND upass='$password'";
	$qry1="SELECT * FROM child WHERE child_id='$sid'";
	
	$result=mysqli_query($bd,$qry);
	$result1=mysqli_query($bd,$qry1);
	
	//Check whether the query was successful or not
	if($result && $result1) {
		if(mysqli_num_rows($result) > 0 && mysqli_num_rows($result1) > 0) {
			//Login Successful
			$_SESSION['username'] = $username;
			$_SESSION['sid'] = $sid;
			header("location: dashboard.php");
			exit();
		}else {
			//Login failed
				header("location: index.php");
				exit();
		}
	}else {
		die("Query failed");
	}
?>

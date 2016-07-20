<?php
include 'connect.php';
session_start();

$uname = $_SESSION['username'];

$conn=$bd;
$sid=$_POST['s'];
//$sid ='20102003001';

$query="INSERT INTO `report_tracker`(`child_id`,`username`) VALUES ('".$sid."','".$uname."')";

$result=mysqli_query($conn,$query);
echo 'sucessfull';


mysqli_close($conn);
exit();
?>
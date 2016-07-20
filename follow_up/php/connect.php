<?php
	$mysql_hostname = "localhost";
	$mysql_user = "root";
	$mysql_password = "";
	$mysql_database = "trialdb";
	$prefix = "";
	$bd = mysqli_connect($mysql_hostname, $mysql_user, $mysql_password) or die("Could not connect database");
	mysqli_select_db($bd,$mysql_database) or die("Could not select database");
	
$impression=array(
    0=> "Nil",
    1=> "Avoid Nose Pricking",
    2=> "Salt Water Gargling",
    3=> "Keep Ears Dry",
    4=> "Avoid Icecreams/ Cool drinks",
    5=> "Cycloplegic Refraction",
    6=> "Vit - A Rich foods",
    7=> "Hot Fomentation",
    8=> "Regular Bathing",
    9=> "Clipping of Nails",
    10=> "Proper Brushing Technique",
    11=> "Vit - C Rich Foods",
    12=> "Vit - B Rich Foods",
    13=> "Iron Rich Food",
    14=> "Apply Coconut Oil After Bath",
    15=> "Avoid Scrubbing While Bath",
    16=> "Use Mild Soaps Like Dove",
    17=> "Use of Mosquito Nets",
    18=> "Wear Full Sleeves While Sleeping");


function getColumnName($cName,$oName)
{
    global $conn;
        
    $query="Select `m_name` from report where c_name='$cName' and o_name='$oName'";
    $res=mysqli_query($conn,$query);
    $column=mysqli_fetch_assoc($res);
    return ($column);
}

function checkColumnName($cName)
{
    $a=strcmp($cName,"child_id") && strcmp($cName,"referal")  && strpos($cName, 'com') == false && strcmp($cName,"timestamp") && strcmp($cName,"treatment") && strcmp($cName,"impression");
    return $a;
}
?>
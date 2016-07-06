<?php
    include 'connect.php';
    $t = $_POST["t"];

    $conn = $bd;

    $getHint=mysqli_query($conn,"SELECT `m_name` FROM `report` WHERE o_name='$t'");
    
    $colNames=array();
    while($rows=mysqli_fetch_assoc($getHint))
    {
        array_push($colNames,$rows['m_name']);
    }
    $colNames=array_unique($colNames);
    //print_r($colNames);
    echo json_encode($colNames);
    exit();
?>
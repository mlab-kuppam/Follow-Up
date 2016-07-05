<?php
    include 'connect.php';
    $q = $_POST["q"];
    
    $conn = $bd;

    $getHint=mysqli_query($conn,"SELECT `m_name` FROM `report`");
    
    $colNames=array();
    while($rows=mysqli_fetch_array($getHint))
    {
        array_push($colNames,$rows['m_name']);
    }
    $colNames=array_unique($colNames);
    //print_r($colNames);
    $hint = array();

    // lookup all hints from array if $q is different from "" 
    if ($q !== "") {
        $q = strtolower($q);
        $len=strlen($q);
        foreach($colNames as $k => $name) {
            if (stristr($q, substr($name, 0, $len))) {
                array_push($hint,$name);
            }
        }
    }
    echo $hint === "" ? "no suggestion" : json_encode($hint);
    exit();
?>
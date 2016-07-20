<?php
    include 'connect.php';
    $t = $_POST["t"];
    $q = $_POST["q"];

    $conn = $bd;
    
    $hints = array();

    $getHint=mysqli_query($conn,"SELECT `m_name` FROM `report` WHERE o_name='$t'");
    
    $colNames=array();
    while($rows=mysqli_fetch_assoc($getHint))
    {
        array_push($colNames,$rows['m_name']);
    }

    if ($q !== "") {
        $q = strtolower($q);
        $len=strlen($q);
        foreach($colNames as $name) {
            if (stristr($q, substr(strtolower($name), 0, $len))) {
                array_push($hints,$name);
            }
        }
    }
    

    $hints=array_unique($hints);
    //print_r($colNames);
    echo json_encode($hints);
    
mysqli_close($conn);
exit();
?>
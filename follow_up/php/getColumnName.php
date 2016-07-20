<?php
    include 'connect.php';

    $s=$_POST["s"];
    
    $m_name = explode(':',$s);
    $conn = $bd;

    $getHint=mysqli_query($conn,"SELECT `c_name` FROM `report` WHERE `m_name`='$m_name[0]'");
    
    while($rows=mysqli_fetch_assoc($getHint))
    {
        $result=$rows['c_name'];
    }
    echo $result;
    
mysqli_close($conn);
exit();
?>
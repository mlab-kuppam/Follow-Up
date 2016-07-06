<?php
include 'connect.php';
$conn = $bd;
$sid=$_POST['s'];

$query="Select * from skin where child_id=$sid  order by `timestamp` desc";

$res=mysqli_query($conn,$query);

$data=mysqli_fetch_assoc($res);

$output=array();
$check=0;
$output['ref']=$data['referal'];
if($data['referal'] != null)
{
    $colNames=array();
    foreach($data as $k => $value)
    {
        $key=getColumnName($k,"Skin");
        if($value==1 && checkColumnName($k))
        {
            $check+=$value;
            $colName=$key['m_name'];
            
            array_push($colNames,$colName);
        }
    }
    $output['colNames']=$colNames;
    $output['check']=$check;
}

$output=json_encode($output);
print_r($output);


?>
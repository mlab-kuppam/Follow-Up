<?php
include 'connect.php';
$conn = $bd;
$sid=$_POST['s'];
//$sid = '20102003013';

$query="Select * from eye where child_id=$sid order by `timestamp` desc";
$columnCheck=array('cv_r','cv_l','fe_r','fe_l');

$res=mysqli_query($conn,$query);

$data=mysqli_fetch_assoc($res);

$output=array();
$output['ref']=$data['referal'];
$check=0;

if($data['referal'] != null)
{
    $colNames=array();
    foreach($data as $k => $value)
    {       
        $key=getColumnName($k,"Eye");
        if($value==1 && checkColumnName($k))
        {
            $check+=$value;
            
            $colName=$key['m_name'];
            if(!strcmp($k,"cv_r") || !strcmp($k,"cv_l") || !strcmp($k,"fe_r") || !strcmp($k,"fe_l") )
            {
                $check-=$value;
                continue;
            }
            
            array_push($colNames,$colName);
        }
        else if($value==0 && !strcmp($k,"cv_r") || !strcmp($k,"cv_l") || !strcmp($k,"fe_r") || !strcmp($k,"fe_l"))
        {
            $check+=$value;
            $colName=$key['m_name']." -Abnormal ".$data[$k."_com"];
            array_push($colNames,$colName);
            
        }
    }
    $output['colNames']=$colNames;
    $output['check']=$check;
}

$output=json_encode($output);
print_r($output);
?>
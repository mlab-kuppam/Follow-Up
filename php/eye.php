<?php
include 'connect.php';
$conn = $bd;
$sid=$_POST['s'];
//$sid = '21301049108';

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
        if($value==1 && checkColumnName($k))
        {
            $check+=$value;
            
            $key=getColumnName($k);
            $colName=$key['m_name'];
            if(!strcmp($k,"cv_r") || !strcmp($k,"cv_l") || !strcmp($k,"fe_r") || !strcmp($k,"fe_l") )
            {
               $check-=$value;
               break;
            }
            
            array_push($colNames,$colName);
        }
        else if($value==0 && !strcmp($k,"cv_r") || !strcmp($k,"cv_l") || !strcmp($k,"fe_r") || !strcmp($k,"fe_l"))
        {
            $key=getColumnName($k);
            $colName=$key['m_name']." -Abnormal ".$data[$k."_com"];
            array_push($colNames,$colName);
            
        }
    }
    $output['colNames']=$colNames;
    $output['check']=$check;
    
    //Advise checking
    $advice=array();
    $adv=array_unique(explode(",",$data['impression']),SORT_REGULAR);
    $ctr=0;
    if( count($adv)>1 && in_array(0,$adv))
    {
        $ctr=1;
    }
    
    foreach($adv as $k)
    {   
        if($k!=19 && $k!=0)
            array_push($advice,$impression[$k]);
        else if($ctr==0)
        {
            array_push($advice,$impression[0]);
        }
        else if(strpos($k, '19') !== false)
        {
            $other=explode(":",$k);
            array_push($advice,$other[1]);
        }
    }
    $output['advice']=$advice;
}

$output=json_encode($output);
print_r($output);
?>
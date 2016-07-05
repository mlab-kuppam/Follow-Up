<?php
include 'connect.php';
$conn = $bd;
$sid=$_POST['s'];

$query="Select * from ent where child_id=$sid order by `timestamp` desc";
$columnCheck=array('iw_r','iw_l','ad','cleft_operated');

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
            if(in_array($k,$columnCheck))
            {
                switch ($k)
                {
                    case "iw_r": 
                    case "iw_l":
                        {   if($data[$k."_com"])
                                    $colName=$colName." - Impacted";
                            else
                                    $colName=$colName." - Unimpacted";
                                break;
                        }
                    case "ad":
                        {   if($data[$k."_com"])
                                    $colName=$colName." - Allergic";
                            else
                                    $colName=$colName." - Infective";
                            break;
                        }
                    case "cleft_operated": 
                        {   if($data[$k."_com"])
                                    $colName=$colName." - Operated";
                            else
                                    $colName=$colName." - Not Operated";
                            break;
                        }            
                }
            }
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
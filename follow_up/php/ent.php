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
            $key=getColumnName($k,"ENT");
            $colName=$key['m_name'];
            if(in_array($k,$columnCheck))
            {
                switch ($k)
                {
                    case "iw_r": 
                    case "iw_l":
                        {   if($data[$k."_com"])
                                    $colName=$colName." : Impacted";
                            else
                                    $colName=$colName." : Unimpacted";
                                break;
                        }
                    case "ad":
                        {   if($data[$k."_com"])
                                    $colName=$colName." : Allergic";
                            else
                                    $colName=$colName." : Infective";
                            break;
                        }
                    case "cleft_operated": 
                        {   if($data[$k."_com"])
                                    $colName=$colName." : Operated";
                            else
                                    $colName=$colName." : Not Operated";
                            break;
                        }            
                }
            }
            array_push($colNames,$colName);
        }
        }
    $output['colNames']=$colNames;
    $output['check']=$check;
}

$output=json_encode($output);
print_r($output);


mysqli_close($conn);
exit();
?>
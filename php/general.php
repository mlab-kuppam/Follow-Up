<?php
include 'connect.php';
$conn = $bd;
$sid=$_POST['s'];

$query="Select * from health1 where child_id=$sid order by `timestamp` desc";
$query1="Select * from health2 where child_id=$sid order by `timestamp` desc";
$res=mysqli_query($conn,$query);
$health1=mysqli_fetch_assoc($res);
$res=mysqli_query($conn,$query1);
$health2=mysqli_fetch_assoc($res);
$data=array_merge($health1,$health2);

$avoid=array(4,5,6,7,8,9,54,55,56,57,61,62,63,67,73,74,75,81,82,85,86);
$output=array();
/*

*/
$output['ref']=$data['referal'];
$check=0;
if($data['referal'] != null)
{
    $colNames=array();
    //array_push($colNames,getColumnName("frequencyFood"));

    $c=array_keys($data);
    
    for($i=0;$i<count($c);$i++)
    {
        if($i==22 && $data[$c[$i]]!=1)
        {
            $check+=$data[$c[$i]];
            $key=getColumnName($c[$i]);
            $colName=$key['m_name'];
            switch($data[$c[$i]])
            {
                    case 2: $add=" - Mild";
                            break;
                    case 3: $add=" - Moderate";
                            break;
                    case 4: $add=" - Severe";
                            break;
            }
                $colName=$colName.$add;           
        }   
        else if($data[$c[$i]]==1 && checkColumnName($c[$i]) && strpos($c[$i], 'com') !== false && strpos($c[$i], 'oe') !== false && !in_array($i,$avoid) )
        {       
                $check+=$data[$c[$i]];
                $key=getColumnName($c[$i]);
                $colName=$key['m_name'];   
                if($i== 42)
                    {
                        switch($data["oe_bronchial_medication"]){
                            case 0:$add=" - No Medication";
                                break;
                            case 1:$add=" - Oral Medication";
                                break;
                            case 2:$add=" - Inhaler Medication";
                                break;
                        }
                    }
                else if($i==53)
                    {
                    if($data[$c[$i]]."_pw")
                        $colName=$colName." - Passing Worms";
                    if($data[$c[$i]]."_pa")
                        $colName=$colName." - Pruritis Ani";
                    if($data[$c[$i]]."_pab")
                        $colName=$colName." - Pain Abdomen";
                    if($data[$c[$i]]."_sl")
                        $colName=$colName." - Skin Rashes";
                }
                else if($i==60)
                    {
                        if($data[$c[$i]]."_bl")
                            $colName=$colName." - Bow Legs";
                        if($data[$c[$i]]."_kk")
                            $colName=$colName." - Knocked Knees";
                        if($data[$c[$i]]."_irm")
                            $colName=$colName." - Injurgy Related Mal-union";
                    }
                else if($i==66)
                    {
                        switch($data[$c[$i]."_tt"]){
                            case 0:$add=" - No Treatment Taken";
                                break;
                            case 1:$add=" - Treatment Taken";
                                break;
                        }
                    }
                else if($i==72)
                    {
                    if($data[$c[$i]]."_bm")
                        $colName=$colName." - H/O Burning Micturation";
                    if($data[$c[$i]]."_if")
                        $colName=$colName." - Increased Frequency";
                    if($data[$c[$i]]."_dr")
                        $colName=$colName." - Dribbling";
                }
                else if($i==80)
                    {
                    if($data[$c[$i]]."_bg")
                        $colName=$colName." - Bleeding Gums";
                    if($data[$c[$i]]."_ph")
                        $colName=$colName." - Petechial Haemorrhages";
                    }
                else if($i==84)
                    {
                    if($data[$c[$i]]."_ac")
                        $colName=$colName." - Angular Chelitis";
                    if($data[$c[$i]]."_gt")
                        $colName=$colName." - Geographical Tongue";
                    }
                }
        else
            continue;
        array_push($colNames,$colName);
        
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
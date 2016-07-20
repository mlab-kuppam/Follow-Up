<?php
include 'connect.php';
session_start();
$conn = $bd;

$first = true;
$second = true;

$dataReceived = $_POST['s'];

$data = json_decode($dataReceived,true);

$sid = $data["child_id"];
$sid = $data["child_id"];
$schoolId = substr($sid,0,8);
$phone = $data["phone"];
$sphone = $data["school"];

$uname = $_SESSION['username'];

$query = "UPDATE `socio_demographic` SET `mobile`='$phone' WHERE `child_id`= '$sid'";
$result = mysqli_query($conn,$query);

$query = "UPDATE `school` SET `mobile`='$sphone' WHERE `school_id`= '$schoolId'";
$result = mysqli_query($conn,$query);

$data = json_decode($data["data"],true);

foreach($data as $tableName => $entries)
{
    if(strcmp($tableName,"treatment") != 0 )
    {
        $f_date = $entries["followUpDate"];
        $dData = $entries["data"];

        $query = "INSERT into `follow_up`(`child_id`, `o_name`, `next_follow_up`,`username`) VALUES ('".$sid."','".$tableName."','".$f_date."','".$uname."') ON DUPLICATE KEY UPDATE `next_follow_up`='".$f_date."',`username`='".$uname."'";    
        if($result = mysqli_query($conn,$query))
        {    
            foreach($dData as $entry)
            {
                /*
                "disease" : disease,
                "complaint" : complaint,
                "observation" : observation,
                "comment" : comment
                */
                $query = "INSERT into `follow_up_data`(`child_id`, `disease_name`, `complaint`, `observation`, `comment`, `o_name`) VALUES ('".$sid."','".$entry['disease']."','".$entry['complaint']."','".$entry['observation']."','".$entry['comment']."','".$tableName."') ON DUPLICATE KEY UPDATE `disease_name`='".$entry['disease']."',`complaint`='".$entry['complaint']."', `observation`='".$entry['observation']."', `comment`='".$entry['comment']."'";

                if($result = mysqli_query($conn,$query))
                {}
                else
                {
                    $second = false;
                    echo "0";
                    break 4;
                }
            }
        }  
        /*else
            echo mysqli_error($conn);*/
    }
    else
    {
        $i=1;
        foreach($entries as $entry)
        {
            /*
            "treat_name" : treat_name,
            "frequency" :  frequency,
            "duration" : duration
            */
            $query = "INSERT into `follow_up_treat`(`child_id`, `treat_id`, `date`, `name`, `frequency`, `duration`) VALUES ('".$sid."','".$i."','".date("Y-m-d")."','".$entry['treat_name']."','".$entry['frequency']."','".$entry['duration']."') ON DUPLICATE KEY UPDATE `treat_id`='".$i."',`name`='".$entry['treat_name']."', `frequency`='".$entry['frequency']."', `duration`='".$entry['duration']."'";    
            
            if($result = mysqli_query($conn,$query))
            {}
            else
            {    
                $first = false;
                echo "0";
                break 4;
            }
            $i++;
        }
    }
        
}
if($second && $first)
    echo "1";


mysqli_close($conn);
exit();
?>
<?php
//File to connect to the database and run queries. Takes in the query and returns the results as a json object

$mysqli = new mysqli('localhost','root','','crms');

//$query = isset($_REQUEST['query']) ? $_REQUEST['query'] : 'SELECT * FROM Customer';
$query = $_REQUEST['query'];

//used to determine what type of query was done
$pattern = '/^select/i';

//get the request information
if(!$result = $mysqli->query($query))
{
    //echo "noooo \n";
    echo json_encode(array('status'=> false));
}//end if  
else
{
    if(preg_match($pattern,$query)) //this was an select query so return the results
    {
        echo json_encode(mysqli_fetch_all($result, MYSQLI_ASSOC));
    }//end if

    else //this query won't have any records to return so just the success status
    {
        echo json_encode(array('status'=> true));
    }//end else
    //echo "yeeesssss \n";
    //echo mysqli_error($mysqli);
    //echo var_dump(mysqli_fetch_all($result, MYSQLI_ASSOC));
    // echo mysqli_fetch_array($result);
    // echo $result['make'];
}//end else

?>
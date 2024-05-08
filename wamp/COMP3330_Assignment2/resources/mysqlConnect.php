<?php
/*Creator:            Jamaine Drakes
 *Date Created:       04/November/2022
 *Purpose:            This code will allow users to connect the the mysql database. Constants will be defined using the
 *                    DEFINE keyword and these constants will store informaiton will will be used to access the database using
 *                    the mysqli_connect command from php. The parameters for this command goes; 
 *                    mysqli_connect(hostname, user, password, database, port, socket). The constants we define in the script 
 *                    will be used to enter the correct information.
 *Date last Modified: 02/November/2022 
 */

// Set the database access information as constants.
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_USER', 'root');
DEFINE ('DB_PASSWORD', ''); 
DEFINE ('DB_NAME', '400005037');

// Make the connnection.
//paremeters:  mysqli_connect(hostname, user, password)
$dbcon = mysqli_connect(DB_HOST,DB_USER,DB_PASSWORD);

//if no connection was made i.e mysqli_connect() function returned false stop the script and say there was an error
if (!$dbcon)  
{  
	die('Could not connect: ' . mysql_error());  
}//end if

// Select database specified by the constant DB_NAME (i.e 400005037)
mysqli_select_db($dbcon, DB_NAME);

?>

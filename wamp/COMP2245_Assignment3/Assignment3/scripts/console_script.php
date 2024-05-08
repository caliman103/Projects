<?php
session_start();

//Function to make sure the user is logged in and if they are print their information to the screen
function checkUser()
{
    //User is not loggin in so send them back to the index page to log in
    if(!isset($_SESSION['currentDriver']))
    {
        header('Location:../html/index.php');
        exit;
    }//end if
}//end checkuser

checkUser();

?>
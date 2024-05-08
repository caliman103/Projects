<?php
    if(!isset($_REQUEST['admin'])) {
        //Remove driver
        session_start();
        unset($_SESSION['currentDriver']);
        header('Location:../html/index.php');
        exit;
    }//end if

    require 'AuthenticateClass.php';
    $authenticate = new Authenticate();
    $authenticate->logOutUser();
    exit;
?> 
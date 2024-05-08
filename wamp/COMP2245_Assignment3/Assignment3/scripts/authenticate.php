<?php
    require 'AuthenticateClass.php';
    
    
    $authenticate = new Authenticate();
    
    $info = $_GET;

    $result = $authenticate->getErrors($info);

    if($result == 'match found') {
        header('Location:../admin/html/admin_console.php');
    }
    else {
        header('Location:../admin/html/index.php?error='.$result);
    }
?>
<?php
    require 'AdminValidateClass.php';

    //Create new instance
    $adminValidate = new AdminValidate();

    //get the information from the form
    $info = $_POST;

    //Give the information to the class
    $adminValidate->setUserInfo($info);

    //Check for any format errors
    $errors['message'] = $adminValidate->getErrors();

    if(empty($errors['message']) ) {
        $info_query_string = http_build_query($info);
        header('Location:authenticate.php?'.$info_query_string);
    }
    else {
        $error_query_string = http_build_query($errors);
        header('Location:../admin/html/index.php?' . $error_query_string);
    }
    
?>
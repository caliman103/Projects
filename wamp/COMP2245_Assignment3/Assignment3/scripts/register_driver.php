<?php

//====================================================================================================================//
//                                             CHECK ID FUNCTION                                                      //
//====================================================================================================================//
function checkID(string $ID) : bool
{
    $IDreg = "/^((195[2-9])|(19[6-9][\d])|(200[0-6]))-(((0[469]|11)-(0[1-9]|[1-2][\d]|30))|((0[13578]|12)-(0[1-9]|[1-2][\d]|3[0-1]))|((02)-(0[1-9]|1[\d]|2[0-8])))-((000[1-9])||([1-9][1-9][1-9]\d))$/";
    if(!preg_match($IDreg,$ID) )
    {
        return false;
    }//end if
    return true;
}//end checkID


//====================================================================================================================//
//                                           CHECK NAME FUNCTION                                                      //
//====================================================================================================================//
function checkName(string $name, string $type) : bool
{
    if($type == "first")
    {
        $fNameReg = "/^([a-z])+$/i";
        if(!preg_match($fNameReg,$name) )
        {
            return false;
        }
        return true;
    }//end if

    if($type == "last")
    {
        $lNameReg = "/^[a-z](([a-z])-?)*[a-z]$/i";
        if(!preg_match($lNameReg,$name))
        {
            return false;
        }//end if
        return true;
    }//end if
}//end check name


//====================================================================================================================//
//                                          CHECK EMAIL FUNCTION                                                      //
//====================================================================================================================//
function checkEmail(string $email) : bool
{
    if(filter_var($email, FILTER_VALIDATE_EMAIL) === false)
    {
        return false;
    }//end if
    return true;
}//end checkEmail


//====================================================================================================================//
//                                          CHECK ADDRESS FUNCTION                                                    //
//====================================================================================================================//
function checkAddress(string $addr) : bool
{
    if(empty($addr) )
    {
        return true;
    }//end if

    $addrReg = "/^[a-z\d](([a-z\d])\s?)*[a-z\d]$/i";
    if(!preg_match($addrReg,$addr) )
    {
        return false;
    }//end if
    return true;
}//end checkAdress


//====================================================================================================================//
//                                          CHECK TELNUM FUNCTION                                                     //
//====================================================================================================================//
function checkTelNum(string $prefix, string $line_number) : bool
{
    if(empty($prefix) && empty($line_number) )
    {
        return true;
    }//end if

    if( (empty($prefix) && !(empty($line_number)) ) || (!(empty($prefix)) && empty($line_number)) )
    {
        return false;
    }//end if

    $prefixReg = "/^[2-9][\d]{2}$/";
    $line_numberReg = "/^[\d]{4}$/";
    if(!(preg_match($prefixReg,$prefix)) || !(preg_match($line_numberReg,$line_number)) )
    {
        return false;
    }
    return true;
}//end checkTelNul


//====================================================================================================================//
//                                            JSCHECK FUNCTION                                                        //
//====================================================================================================================//
function jsCheck()
{
    $data = $_REQUEST;

    //javasctipt is on
    if(!isset($data['javascript_off']))
    {
        //perform a check that the scripting ran
        if(!(isset($data['js_validated']) ) || (filter_var($data['js_validated'], FILTER_VALIDATE_BOOLEAN) === false ))
        {
            //js enanled but not performed
            $results['message'] = phpValidation();
            $results['information'] = getInformation();
            if(empty($results['message']) )
            {
                header('Location:../html/index.php');
                exit;
            }//end if 
            else
            {
                $results_query_string = http_build_query($results);
                header('Location:../html/registration.php?' . $results_query_string);
                exit;
            }
            
        }//end if
        
        //js enabled and validated
        else
        {
            header('Location:../html/index.php');;
            exit;
            
        }//end else
    }//end if

    //js is off
    else
    {
        $results['message'] = phpValidation();
        $results['information'] = getInformation();
        if(empty($results['message']) )
        {
            header('Location:../html/inddex.php');
            exit;
        }//end if 
        else
        {
            $results_query_string = http_build_query($results);
            header('Location:../html/registration.php?' . $results_query_string);
            exit;
        } 
    }//end else

}//end jsCheck 


//====================================================================================================================//
//                                        php VALIDATION FUNCTION                                                     //
//====================================================================================================================//
function phpValidation() : array
{
    //array to capture error messages
    $errors = [];
    
    //========================================Check if there are any errors with the driver ID===================//
    if(!checkID($_POST['ID']))
    {
        $errors['ID'] = errorMessage(); 
    }//end if

    //========================================Check if there are any errors with the driver first name===================//
    if(!checkName($_POST['first'],'first'))
    {
        $errors['fName'] = errorMessage();
    }//end if

    //========================================Check if there are any errors with the drive last name===================//
    if(!checkName($_POST['last'],'last'))
    {
        $errors['lName'] = errorMessage();
    }//end if

    //========================================Check if there are any errors with the drive email========================//
    if(!checkEmail($_POST['email']) )
    {
        $errors['email'] = errorMessage();
    }//end if

    //========================================Check if there are any errors with the drive telNum========================//
    if(!checkTelNum($_POST['firstNos'],$_POST['secondNos']) )
    {
        $errors['secondNos'] = errorMessage();
    }//end if


    //========================================Check if there are any errors with the driver address 1===================//
    if(!checkAddress($_POST['address1']))
    {
        $errors['address1'] = errorMessage();
    }//end if

    //========================================Check if there are any errors with the driver address 2===================//
    if(!checkAddress($_POST['address2']))
    {
        $errors['address2'] = errorMessage();
    }//end if
    else
    {
        if(!empty($_POST['address2']))
        {
            if(empty($_POST['address1']))
            {
                $errors['address2'] = errorMessage();
            }//end if
        }//end if
    }//end else

    return $errors;
}//end phpValidation




function getInformation() : array
{
    $userInfo = [];

    //Gather the information about the user
    $userInfo['ID'] = $_POST['ID'];
    //$userInfo['license'] = generateLicense();
    $userInfo['fName'] = $_POST['first'];
    $userInfo['lName'] = $_POST['last'];
    $userInfo['email'] = $_POST['email'];
    $userInfo['firstNos'] = $_POST['firstNos'];
    $userInfo['secondNos'] = $_POST['secondNos'];
    $userInfo['address1'] = $_POST['address1'];
    $userInfo['address2'] = $_POST['address2'];
    
    return $userInfo;
}//end getInformation

function errorMessage(): string
{
    return 'Data missing or incorrect format';
}//end errorMessage

/*
function generateLicense() : string
{
    $end = $_POST['ID'];
    for($i = 0;$i<7; $i++)
    {
        $license = $license . rand(0,9);
    }

    $license = $license . $end;
    return $license;
}//end generate License
*/


jsCheck();

?>
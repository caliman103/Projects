<?php
require 'fileManager.php';

session_start();

//====================================================================================================================//
//                                        Check LicenseNo FUNCTION                                                    //
//====================================================================================================================//
//checkLicsenseNo
function checkLicense(string $lno) : bool
{
    $licenseReg = "/^([\d]{15})$/";

    if(!preg_match($licenseReg,$lno))
    {
        return false;
    }
    return true;
}//end checkLicenseno


//====================================================================================================================//
//                                         CHECKPASSWORD FUNCTION                                                     //
//====================================================================================================================//
function checkPassword(string $passwd) : bool
{
    if((strlen($passwd) > 18) || (strlen($passwd) < 10))
    {
        return false;
    }//end if
    $passwordReg = "/^([a-z])(([a-z])+(\d)+)+([a-z\d])*$/i";
    if(preg_match($passwordReg,$passwd))
    {
        //make passowrd sring an array
        $password = str_split($passwd);
        //check for capital letters
        for($i = 0; $i < strlen($passwd); $i++)
        {
            $code = ord($password[$i]);
            if( ($code > 64) && ($code < 91))
            {
                return true;
            }
        }//end for
    }//end if
    return false;
}//end checkPassword


//====================================================================================================================//
//                                          User Sign In FUNCTION                                                     //
//====================================================================================================================//
//checkValidity
function userSignIn()
{
    
    $data = $_REQUEST;

    //javasctipt is on
    if(!isset($data['javascript_off']))
    {
        //Js not enabled
        if(!(isset($data['js_validated']) ) || (filter_var($data['js_validated'], FILTER_VALIDATE_BOOLEAN) === false ))
        {
            $results['message'] = checkFormat();
            $results['information'] = getInformation();
            if(empty($results['message']))
            {
                //Data is the correct format, now see if it matches with any information in the csv file
                if(!(checkData()) )
                {
                    $error['Invalid Credentials'] = 'Invalid Credentials';
                    $results['message'] = $error;
                    $results_query_string = http_build_query($results);
                    header('Location:../html/index.php?' . $results_query_string);
                    exit;
                }//end if
                else
                {
                    header('Location:../html/public_console.php');
                    exit;
                }//end else
            }//end if

            //contains errors so go back to index
            else
            {
                $results_query_string = http_build_query($results);
                header('Location:../html/index.php?' . $results_query_string);
                exit;
            }//end else
            
        }//end if

        else  //js is enabled
        {
            if(!(checkData()) )
            {
                $error['Invalid Credentials'] = 'Invalid Credentials';
                $results['message'] = $error;
                $results_query_string = http_build_query($results);
                header('Location:../html/index.php?' . $results_query_string);
                exit;
            }
            else
            {
                
                header('Location:../html/public_console.php');
                exit;
            }
        }//end else
    }//end if

    //js is off
    else
    {
        $results['message'] = checkFormat();
        $results['information'] = getInformation();
        if(empty($results['message']))
        {
            //Data is the correct format, now see if it matches with any information in the csv file
            if(!(checkData()) )
            {
                $error['Invalid Credentials'] = 'Invalid Credentials';
                $results['message'] = $error;
                $results_query_string = http_build_query($results);
                header('Location:../html/index.php?' . $results_query_string);
                exit;
            }//end if
            else
            {
                header('Location:../html/public_console.php');
                exit;
            }//end else
        }//end if

        //contains errors so go back to index
        else
        {
            $results_query_string = http_build_query($results);
            header('Location:../html/index.php?' . $results_query_string);
            exit;
        }//end else
    }//end else

    
}//end usersignin


//====================================================================================================================//
//                                            Check Format FUNCTION                                                     //
//====================================================================================================================//
function checkFormat() : array
{
    $error = [];

    //User did not enter all necessary information
    if((empty($_POST['licenseNo'])) || (empty($_POST['password'])))
    {
        $error['Missing Data'] = 'Data Missing from one ot more fields.';
    }//end if


    //User entered incorect format for at least one field
    if( !(checkLicense($_POST['licenseNo']) )   || !(checkPassword($_POST['password']) ))
    {
        $error['Invalid Data'] = 'Invalid format for the data entered.';
    }//end if

    return $error;
}//end check data

function getInformation() : array
{
    $entered= [];

    //Get all the informaiton  the user entered
    $entered['license'] = $_POST['licenseNo'];
    $entered['password'] = $_POST['password'];

    return $entered;
}

function checkData() : bool
{
    $allArivers = makeJsonData();
    $user = getInformation();

    foreach($allArivers as $driver)
    {
        if( ($driver['licenseNo'] == $user['license']) && ($driver['password'] == $user['password']) )
        {
            $currentDriver['first_name'] = $driver['fName']; 
            $currentDriver['last_name'] = $driver['lName']; 
            $currentDriver['license'] = $driver['licenseNo'];
            
            $_SESSION['currentDriver'] = $currentDriver;
            return true;
        }//end if
    }//end foreach

    return false;
}//end check data


userSignIn();
?> 
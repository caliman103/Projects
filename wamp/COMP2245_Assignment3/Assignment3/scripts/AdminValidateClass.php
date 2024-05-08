<?php

class AdminValidate
{
    //private variables
    private $userInfo = [];
    private $formatErrors = [];

    public function getUserInfo() : array {
        return $this->userInfo;
    }

    public function setUserInfo($info) {
        $this->userInfo = $info;
    }//end setUserInfo

    //Function to return any errors generated
    public function getErrors() : array {
        //no validation performed with js
        if(filter_var($this->getUserInfo()['js_validated'], FILTER_VALIDATE_BOOLEAN) === false) {
            $this->formatErrors = $this->checkFormat();
        }
        return $this->formatErrors;
    }//end getErrors

    //Use the other functions to see if there are any errors with the format
    private function checkFormat() : array {
        $errors = [];
        if( !($this->checkEmployeeID($this->getUserInfo()['EmpID']) )  ) {
            $errors['IDError'] = 'Invalid employee ID format.';
        }//end if
        
        if ( !($this->checkPassword($this->getUserInfo()['password']) ) )   {
            $errors['passwordError'] = 'Invalid password format.';
        }//end if
        return $errors;
    }//end check format

    //This function check the format of the employee ID
    public function checkEmployeeID(string $empID) : bool {
        $depts = array('ADMN','CLRK', 'USER', 'DRVR');
        $empIdReg = "/^(1100[\d]{4}\w{4})/";

        //Check the empID against the regular expression
        if(!preg_match($empIdReg,$empID)) {
            return false;
        }//end if

        //Check to see if the last 4 letters are in the depts array
        foreach($depts as $end) {
            if(strpos($empID,$end)) {
                return true;
            }//end if
        }//end for each
        return false;
    }//end checkEmployee

    //This function check the format of the employee password
    private function checkPassword(string $passwd) : bool {
        if((strlen($passwd) > 18) || (strlen($passwd) < 10)) {
            return false;
        }//end if
        $passwordReg = "/^([a-z])(([a-z\d])+(\d)+)+([a-z\d])*$/i";
        if(preg_match($passwordReg,$passwd)) {
            //make passowrd sring an array
            $password = str_split($passwd);
            //check for capital letters
            for($i = 0; $i < strlen($passwd); $i++) {
                $code = ord($password[$i]);
                if( ($code > 64) && ($code < 91)) {
                    return true;
                }//end if
            }//end for
        }//end if
        return false;
    }//end checkPassword
}//end AdminValidate class

?>
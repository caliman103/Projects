<?php
class Authenticate
{
    //variable to hold user info once logged in
    private $userInfo = '';

    function __construct() {
        if(session_status() === PHP_SESSION_NONE ){
            session_start();
        }//end if
    }//end checkSessionStatus

    public function getErrors(array $info) : string {
        $this->logInUser($info);
        //logIn was successful 
        if(isset($_SESSION['session_user'])){
            $error = 'match found';
         }//end if
         else {
            $error = 'No such User found';
         }//end else 
        return $error;
    }//end getErrors

    public function logInUser(array $data) {
        $mysqli = new mysqli('localhost','root','','vlrms');

        $query = "SELECT employee_id AS 'ID', first_name AS 'fName', last_name AS 'lName', CURRENT_TIMESTAMP() As 'currentTime' FROM employees WHERE employee_id = '".$data['EmpID']."' AND password = '".$data['password']."';";

        if(!$results = $mysqli->query($query)) {
            return;
        } //end if
        else {
            if($results->num_rows <> 1) {
                return;
            }
        }//end else
        $information = mysqli_fetch_array($results);

        $updateQuery = "UPDATE employees SET last_logged_in = '".$information['currentTime']."' WHERE employee_id= '".$data['EmpID']."'";

        $mysqli->query($updateQuery);

        $currentEmployee['EmpID'] = $information['ID']; 
        $currentEmployee['first_name'] = $information['fName']; 
        $currentEmployee['last_name'] = $information['lName']; 
        $currentEmployee['time'] = $information['currentTime'];
        
        $_SESSION['session_user'] = $currentEmployee;
        $mysqli->close();
        return;
    }//end logInUser


    public function isUserLoggedIn() : bool {
        if(!(isset($_SESSION['session_user']['EmpID'])) ){
           return false; 
        }//end if
        $ID = $_SESSION['session_user']['EmpID'];
        require 'AdminValidateClass.php';
        $adminValidate = new AdminValidate;
        if(!($adminValidate->checkEmployeeID($ID))) {
            return false;
        }//end if
        return true;
    }//end isUserLoggedIn


    public function getUserInfo(string $field) : string {
        return $field;
    }//end getUserInfo

    public function setUserInfo(array $information) : string  {
        $this->userInfo = $information['EmpID']; 
        $this->userInfo .= ',';
        $this->userInfo .= $information['first_name'];
        $this->userInfo .= ','; 
        $this->userInfo .= $information['last_name']; 
        $this->userInfo .= ',';
        $this->userInfo .= $information['time'];

        return $this->userInfo;
    }//end setUserInfo

    public function logOutUser() { 
        if(isset($_SESSION['session_user'])) {
            unset($_SESSION['session_user']);
            header('Location:../admin/html/index.php');
        }//end if 
    }//end logOutUser
}//end authenticate Class
?>
<?php
    namespace Framework\Auth;

    interface AuthInterface {
        /**
         * This function will be used to allow a user to log in. It takes in the user information as an
         * object and checks to see if they exist. 
         */
        static public function login(object $userInfo) : bool ;

        /**
         * This function will allow a user to log out.
         */
        static public function logout();
    }
?>


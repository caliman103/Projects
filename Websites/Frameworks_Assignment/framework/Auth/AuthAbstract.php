<?php
    namespace Framework\Auth;

    use Framework\Auth\AuthInterface;

    abstract class AuthAbstract implements AuthInterface {
        abstract static public function logout() : void;
        abstract static public function login(object $userInfo) : bool;
    }

?>
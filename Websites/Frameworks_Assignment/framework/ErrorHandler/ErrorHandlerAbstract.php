<?php

namespace Framework\ErrorHandler;

abstract class ErrorHandlerAbstract implements ErrorHandlerInterface {
    protected $errors = [];
    protected $errorLevel;
    
    public function __construct($errorLevel) {
        $this->errorLevel = $errorLevel;
        $this->removeAll();
        set_error_handler([$this, 'handleError'], $this->errorLevel);
    }
    
    abstract public function handleError($errno, $errstr, $errfile, $errline); 

    public function add(string $name, string $message ) {
        $this->errors[$name] = $message;
    }

    public function remove(string $name) {
        unset($this->errors[$name]);
    }

    public function removeAll() {
        $this->errors = [];
    }

    public function __destruct() {
        restore_error_handler();
    }
    public function get() {
        return (object)$this->errors;
    }
        
}

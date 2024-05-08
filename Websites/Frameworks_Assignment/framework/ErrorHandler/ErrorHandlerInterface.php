<?php

namespace Framework\ErrorHandler;

interface ErrorHandlerInterface {
    public function add(string $name, string $message);
    public function remove(string $name);
    

    public function get();
}
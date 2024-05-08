<?php

namespace Framework\Response;

use Framework\Response\ResponseInterface;
use Framework\Validation\Validate;

abstract class ResponseAbstract implements ResponseInterface{
    protected $validator;

    abstract public function index($request);

    public function __construct() {
        $this->validator = new Validate();
    }
}

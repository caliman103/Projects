<?php

namespace Framework\Request;

use Framework\Request\RequestInterface;

abstract class RequestAbstract implements RequestInterface{
    public $uri;
    public $HTTPMethod;
    public $data;
    public $rules;

    public function __construct() {
        $this->uri = preg_split('#'.ROOT_DIR."#",$_SERVER['REQUEST_URI'])[1];
        $this->HTTPMethod = $_SERVER['REQUEST_METHOD'];
        $this->HTTPMethod === 'POST' ?
        $this->data = (object)$_POST :
        $this->data = (object)$_GET;
        $this->rules = $this->rules();
    }//end constructor

    /**
     * Set the validation rules for the request. The rules will be an array of associated arrays. With
     * the field name as the key and the validation rules as the values. This array will then be returned.
     */
    abstract public function rules() : array ;
}
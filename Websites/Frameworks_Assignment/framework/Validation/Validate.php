<?php

namespace Framework\Validation;

use Framework\Validation\ValidateInterface;

class Validate implements ValidateInterface {

    private $hasError;

    public function __construct() {
        $this->hasError = false;
    }
    /**
     * This function  will take in the rules array and compare that to the data that was sent. To
     * accomplish this there will be many helper funciton within this class. The user will be required
     * to name the keys in the rules array the same as the fields names in the $data object. The user must
     * also be sure to separate the individual rules by a ':' to for the validation to function  correctly.
     * For example if the user want to set the minimum number of characters for a field as 5, they would
     * have the rule as min:5. The rules for each field will be in an array and these will be looped through,
     * having the appropriate helper function called to validate the corresponding field. If there are errors
     * with the field then the correct error message will be places in the errors array.
     */
    public function validate(array $rules, object $data) : bool {
        if(empty($rules)) return true;
        foreach($rules as $field => $fieldRules) {
            foreach($fieldRules as $rule) {
                $method = preg_split("/:/",$rule)[0];
                !(empty(preg_split("/:/",$rule)[1])) ?
                $this->$method($field, $data->$field, preg_split("/:/",$rule)[1]) :
                $this->$method($field, $data->$field);
            }
        }
        if($this->hasError) {
            return false;
        }
        return true;
    }

    public function min(string $field, string $data, int $num) : void {
        //$errors[$field] = '';
        if(strlen($data) === 0 || strlen($data) > $num) return;
        /* printer('min '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' too short');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).' too short';
        return;
    }

    public function max($field, $data, $num) : void {
        //$errors[$field] = '';
        if(strlen($data) < $num) return;
        /* printer('max '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' too long');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).' too long';
        return;
    }

    public function required($field, $data) : void {
        //$errors[$field] = '';
        if(!empty($data)) return;
        /* printer('required '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' cannot be empty');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).' cannot be empty';
        return;
    }

    public function email($field, $data) : void {
        //$errors[$field] = '';
        if (filter_var($data, FILTER_VALIDATE_EMAIL)) return;
        trigger_error($field.':'.'Invalid email format');
        $this->hasError = true;
        //$this->errors[$field] = 'Invalid email format';
        /* printer('email '.$field. ' failed'); */
        return;
    }

    public function numeric($field, $data) : void {
        //$errors[$field] = '';
        if(ctype_digit($data)) return;
        /* printer('numeric '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' must be a number');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).' must be a number';
        return;
    }

    public function alpha($field, $data) : void {
        //$errors[$field] = '';
        if(ctype_alpha($data)) return;
        /* printer('alpha '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' must only contain alphabetic characters');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).' must only contain alphabetic characters';
        return;
    }

    public function alphaNum($field, $data) : void {
        //$errors[$field] = '';
        if(preg_match("/\d/",$data) && preg_match("/[A-Z]|[a-z]/",$data)) return;
        /* printer('alphanum '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' must contain alphabetic characters and numbers');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).' must contain alphabetic characters and numbers';
        return;
    }

    public function regex($field, $data, $pattern) : void {
        //$errors[$field] = '';
        if(preg_match("/$pattern/",$data)) return;
        /* printer('regex '.$field. ' failed'); */
        trigger_error($field.':'.ucfirst($field).' has invalid format');
        $this->hasError = true;
        //$this->errors[$field] = ucfirst($field).': invalid format';
        return;
    }
}
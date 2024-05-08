<?php
    namespace Framework\Validation;

    interface ValidateInterface {
        /** 
         * This function will be used to validate data that was enetred on a from. The first parameter
         * will be an array of rules which will be defined by the type of request. The second parameter
         * will be an object which holds that data to be validated. 
         */  
        public function validate(array $rules, object $data);
    }
?>
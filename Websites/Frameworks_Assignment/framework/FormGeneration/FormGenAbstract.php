<?php

namespace Framework\FormGeneration;

use Framework\FormGeneration\FormGenInterface;

abstract class FormGenAbstract implements FormGenInterface {
    
    abstract public function start(string $action, string $method);
    abstract public function end();

    //Inputs
    public function input(string $name, string $type, $classes = []) {
        echo '<input class="form-control '. implode(" ",$classes).'" type="'.$type.'" name="'.$name.'" id="'.$name.'">';
    }  
    public function textInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="text" name="'.$name.'" id="'.$name.'">';  
    }
    public function numberInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="number" name="'.$name.'" id="'.$name.'">';
    }
    public function rangeInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="range" name="'.$name.'" id="'.$name.'">';
    }
    public function dateInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="date" name="'.$name.'" id="'.$name.'">';
    }
    public function buttonInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="button" name="'.$name.'" id="'.$name.'">';
    }
    public function checkboxInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="checkbox" name="'.$name.'" id="'.$name.'">';
    }
    public function colorInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="color" name="'.$name.'" id="'.$name.'">';
    }
    public function emailInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="email" name="'.$name.'" id="'.$name.'">';
    }
    public function passwordInput(string $name, array $classes = []){
        echo '<input class="form-control '. implode(" ",$classes).'" type="password" name="'.$name.'" id="'.$name.'">';
    }
    public function resetInput(string $name, array $classes = []) {
        echo '<input class="form-control '. implode(" ",$classes).'" type="reset" name="'.$name.'" id="'.$name.'">';
    }
    public function hiddenInput(string $name, array $classes = [],) {
        echo '<input class="form-control ' . implode(" ",$classes).'" type="hidden" name="'.$name.'" id="'.$name.'">';
    }

    //Select
    public function select(string $name, array $options, array $classes = []) {
        echo '<select class="form-select '.implode(" ",$classes).'"aria-label="Default select example" name="'.$name.'" id="'.$name.'">';
        foreach($options as $text => $value) {
            echo '<option value="'.$value.'">'.$text.'</option>';
        }
        echo '</select>';
    }

    //Buttons
    public function button(string $text, string $type, array $classes = []) {
        echo '<button type="'.$type.'" classes="btn '.implode(" ", $classes).'">'.$text.'</button>';
    }

    public function submitButton(string $text, array $classes = []) {
        echo '<button type="submit" classes="btn '.implode(" ", $classes).'">'.$text.'</button>';
    }

    //Label
    public function label(string $for, string $text) {
        echo '<label for"'.$for.'">'.$text.'</label>';
    }
}

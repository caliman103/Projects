<?php
    namespace Framework\FormGeneration;

    interface FormGenInterface {
        public function start(string $action, string $method);
        public function input(string $name, string $type, array $classes = []);
        public function select(string $name, array $options, array $classes = []);
        public function button(string $text, string $type, array $classes = []);
        public function end();

    }

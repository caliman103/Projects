<?php
    namespace Framework\Session;

    interface SessionInterface {
        public function add(string $key, mixed $value) : void;
        public function remove(string $key) : void;
        public function get(string $key) : mixed;
        public function destroy() :void;
    }
?>
<?php
    namespace Framework\View;

    interface ViewInterface {
        static public function view(string $templateName, array $data = []);
    }

?>
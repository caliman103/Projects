<?php
    namespace Framework\Session;

    use Framework\Session\SessionInterface;

    abstract class SessionAbstract implements SessionInterface {
            protected $data;

            public function __construct() {
                session_start();
                $this->data = $_SESSION;
            }

            public function add(string $key, mixed $value): void {
                $this->data[$key] = $value;
                $_SESSION[$key] = $value;
            }

            public function remove(string $key) : void {
                if(array_key_exists($key, $this->data)) {
                    unset($this->data[$key]);
                    unset($_SESSION[$key]);
                }
            }

            public function get(string $key) : mixed {
                if(array_key_exists($key, $this->data)) {
                    return $this->data[$key];
                }
                return null;
            }

            public function destroy(): void {
                    session_destroy();
                    $this->data = [];
            }


    }
?>
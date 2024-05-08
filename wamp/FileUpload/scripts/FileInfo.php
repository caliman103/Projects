<?php

class FileInfo {
    private $files = [];

    public function __construct()
    {
        foreach($_FILES as $file) {
            $this->files[] = (object)$file;
        }
    }

    public function getAllFiles() : array {
        return $this->files;
    }

    public function getFile(string $name) : object|null {
        foreach($this->files as $file) {
            if(isset($file->$name)) return $file;
        } 
        return null;
    }
}
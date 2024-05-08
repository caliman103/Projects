<?php

class HandleUpload {

    private $pdo;

    public function __construct(FileInfo $fileInfo)
    {
        $this->makeConnection();
        $this->checkFileTypes($fileInfo->getAllFiles());
    }

    public function makeConnection() {
        $this->pdo = new PDO("mysql:host=localhost;dbname=testing_grounds","root", '');
    }

    public function checkFileTypes($files) {
        foreach($files as $file) {
            $method = "upload".preg_split("#/#",$file->type)[1];
            if(method_exists($this,$method)) $this->$method($file);
        }
    }

    public function uploadCSV($file) {
        $tmpName = $file->tmp_name;
        $stmt = $this->pdo->prepare(
            "
            LOAD DATA INFILE :tmpName
            INTO TABLE users
            FIELDS TERMINATED BY ','
            ENCLOSED BY '\"' 
            LINES TERMINATED BY '\n'
            IGNORE 1 ROWS
            "
        );
        $stmt->bindParam(':tmpName', $tmpName, PDO::PARAM_STR);
        $stmt->execute();
        $stmt->closeCursor();
    }
}
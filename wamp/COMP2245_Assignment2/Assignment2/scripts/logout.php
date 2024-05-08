<?php
    session_start();

    unset($_SESSION['currentDriver']);

    header('Location:../html/index.php');
?>
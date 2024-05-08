<?php
    require '../scripts/console_script.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Public Console</title>

     <!--Links to files e.g js and css files -->  
     <link rel="stylesheet" href="../css/public_console.css">
</head>
<body>
    <div class="row">
        <div class="col-1">
            <img src="../images/carLogo.png" alt="VLRMS Logo" id="logo" >   
        </div>
         
        <div class="col-10" >
            <h4>Barbados Revenue Authority</h4>
            <h4>Vehicle Licensing and Registration System</h4>
            <label id="name" for="name">Name: <?php echo $_SESSION['currentDriver']['first_name'] . ' '. $_SESSION['currentDriver']['last_name']?> </label>
            <label id="licenseNo" for="licenseNo">License Number: <?php echo $_SESSION['currentDriver']['license'] ?></label>
        </div>
        
        <div class="menu col-1">
            <label for="" class="dropdown-menu">&#9776;</label>   
            <a href="../scripts/logout.php">Log Out</a>
        </div>
        
    </div>

    <div class="flex-container">
        <div class="flex-items"><a href="#">Renew License</a> </div>
        <div class="flex-items"><a href="#">Renew Vehicle Registration</a></div>
    </div>
    <div class="flex-container">
        <div class="flex-items"><a href="#">Request Sticker</a> </div>
        <div class="flex-items"><a href="#">Register Vehicle </a></div>
    </div>

    
        

</body>
<!--
<script src="../js/public_console.js" type="text/javascript"></script>
-->
</html>
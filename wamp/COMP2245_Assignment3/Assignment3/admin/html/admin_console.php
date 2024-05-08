<?php
    require '../../scripts/AuthenticateClass.php';

    $authenticate = new Authenticate();

    if(!($authenticate->isUserLoggedIn()) ) {
        header('Location:index.php');
        exit;
    }//end if

    $userInformation = $authenticate->getUserInfo($authenticate->setUserInfo($_SESSION['session_user']));
    list($ID,$fName,$lName,$time) = explode(',',$userInformation);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Colsole</title>

     <!--Links to files e.g js and css files --> 
     <link rel="stylesheet" href="../../css/admin_console.css">
</head>
<body>
    <div class="row">
        <div class="col-1">
            <img src="../../images/carLogo.png" alt="VLRMS Logo" id="logo" >   
        </div>
        
        <div class="col-10" >
            <h4>Barbados Revenue Authority</h4>
            <h4>Vehicle Licensing and Registration System</h4>
            <label id="name" for="name">Employee: <?php echo $fName . ' ' . $lName; ?> </label>
            <label id="ID" for="ID">Employee ID: <?php echo substr($ID,4,-4); ?></label>
        </div>

        <div class="col-1 dropdown">
            <label for="hambuger-menu">&#9776;</label>   
            <div id="dropdown-content" class="dropdown-content">
                <a id="logOut" href="../../scripts/logOut.php?admin">Log Out</a>
            </div>
        </div>
    </div> 


    <div class="flex-container">
        <div class="flex-items"><a href="#">New Drivers</a> </div>
        <div class="flex-items"><a href="#">Registered Drivers</a></div>
    </div>

    <div class="flex-container">
        <div class="flex-items"><a href="#">New Vehicles</a> </div>
        <div class="flex-items"><a href="registered_vehicles.php">Registered Vehicles</a></div>
    </div>


    

</body>

</html>
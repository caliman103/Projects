<?php
    require '../scripts/fileManager.php'
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Driver Sign in</title>

    <!--Links to files e.g js and css files --> 
    <link rel="stylesheet" href="../css/index.css">

</head> 

<body>
    <header class="row">
        <div class="col-1">
            <img src="../images/carLogo.png" alt="VLRMS Logo" id="logo" >   
        </div>
        
        <div class="col-11" >
            <h4>Barbados Revenue Authority</h4>
            <h4>Vehicle Licensing and Registration System</h4>
        </div>
    </header>

    <div class="row">
        <div class="col-12">
            <h4>Driver Sign In</h4>
        </div>
    </div>

    <form class="form" id="form" action="../scripts/sign_in_user.php" method="POST">
        <?php        
            //show errors if there are any
            if(!empty($_GET['message']))
            {
                if(array_key_exists('Missing Data', $_GET['message'])) 
                {
                    echo '<font color = "red"> <b>'. $_GET['message']['Missing Data'] . '<b><font color = "black">';
                }
                else if(array_key_exists('Invalid Data', $_GET['message'])) 
                {
                    echo '<font color = "red"> <b>'. $_GET['message']['Invalid Data'] . '<b><font color = "black">';
                }
                else if(array_key_exists('Invalid Credentials', $_GET['message']))
                {
                    echo '<font color = "red"> <b>'. $_GET['message']['Invalid Credentials'] . '<b><font color = "black">';
                }
            }//end if
            else
            {
                echo '';
            }
        ?>
        <div id="error"></div>
         <!--                                    LICENSE FIELD                     -->
         <div class="row">
            <div class="col-12">
                <label for="licenseNo"><b>Licence No.</b></label>
                <input type="text" id="licenseNo" name="licenseNo" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['license'];} ?>" > 
            </div>
        </div>
        <!--                                    Password                     -->
         <div class="row">
            <div class="col-12">
                <label for="password"><b>Password</b></label>
                <input type="password" id="password" name="password"> 
            </div>
        </div>
        <input id="jsCheck" type="hidden" name="js_validated" value="false">
        <noscript><input type="hidden" name="javascript_off" value="1"></noscript>
        <div class="row"> 
            <button type="submit" class="button">Sign In</button>
        </div>
    </form> 


        <div class="row">
            <div class="col-12 ">
                <a class="links" href="#">Forgot Password</a> 
                <a class="links" href="registration.php">Sign Up</a>   
            </div>
                 
        </div>
        
</body>
    <!--
    <script src="../js/index.js" type="text/javascript"></script>
        -->
</html>
    


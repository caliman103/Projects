<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Sign in</title>

    <!--Links to files e.g js and css files --> 
    <link rel="stylesheet" href="../../css/index.css">

    
    <script defer src="../../js/index.js" type="text/javascript"></script>
    
</head>
<body>
    <div class="row">
        <div class="col-1">
            <img src="../../images/carLogo.png" alt="VLRMS Logo" id="logo" >   
        </div>
        
        <div class="col-11" >
            <h4>Barbados Revenue Authority</h4>
            <h4>Vehicle Licensing and Registration System</h4>
        </div>
    </div>
    <div class="row">
        <div class="col-12">
            <h4>Administration Login</h4>
        </div>
    </div>

    <form class="form" id="form" action="../../scripts/adminValidate.php" method="POST">
        <?php
        //==================================Check for errors==================================//
            if(isset($_REQUEST['error'])){
                echo '<font color = "red"> <b>'. $_REQUEST['error'] . '<b><font color = "black">';
                
            }//end if
            else {
                echo '';
            }
            if(!empty($_GET['message'])) {
                
                if(array_key_exists('IDError', $_GET['message'])) {
                    echo '<font color = "red"> <b>'. $_GET['message']['IDError'] . '<b><font color = "black">';
                } //end if 
                if(array_key_exists('passwordError', $_GET['message'])) {
                    echo '<br><font color = "red"> <b>'. $_GET['message']['passwordError'] . '<b><font color = "black">';
                } //end else if
            }//end if
            else {
                echo '';
            }//end else
        ?>
        <p id="error"></p>
         <!--                                    EmployeeID FIELD                     -->
         <div class="row">
            <div class="col-12">
                <label for="EmpID">Employee ID</label>
                <input type="text" id="EmpID" name="EmpID" value="<?php if(isset($_POST['EmpID'])) echo $_POST['EmpID']; ?>" > 
            </div>
        </div>
        <!--                                    Password                     -->
         <div class="row">
            <div class="col-12">
                <label for="password">Password</label>
                <input type="password" id="password" name="password"> 
            </div>
        </div>
        <div class="row"> 
            <button type="submit" class="button" >Log In </button>
            <input id="jsCheck" type="hidden" name="js_validated" value="false">
            <noscript><input type="hidden" name="javascript_off" value="1"></noscript>
        </div>
        
    </form>

    <div class="row">
        <div class="col-12 ">
            <a class="links" href="#">Recover Password</a>     
        </div>        
    </div>
    
</body>
</html>
    


<?php
    require '../scripts/fileManager.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration</title>

    <!--Links to files e.g js and css files --> 
    <link rel="stylesheet" href="../css/registration.css">

</head>
<body>
    <div class="row header">
        <div class="col-1">
            <img src="../images/carLogo.png" alt="VLRMS Logo" id="logo" >   
        </div>
        
        <div class="col-11" >
            <h4>Barbados Revenue Authority</h4>
            <h4>Vehicle Licensing and Registration System</h4>
        </div>

    </div>

    <div class="row">
        <div class="col-12">
            <h4 id="tester">Account Registration</h4>
            <h5>All fields required</h5>
        </div>
    </div>

    <!--                                    FORM                     -->
    <form id="form" action="../scripts/register_driver.php" method="POST" >
         <!--                                    ID FIELD                     -->
        <div class="row">
            <div class="col-12">
                <label for="ID"> <b> National ID </b></label>
                <input type="text" id="ID" name="ID" placeholder="yyyy-mm-dd-xxxx" style="<?php if(!empty($_GET['message'])){if(array_key_exists('ID', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';}else { echo ' border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['ID'];} ?>">
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('ID', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['ID'];
                            echo '<font color = "black">';
                            
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?> 
                <label id="ID-error" class="errorMsg"></label>
            </div>
        
        <div></div>
        <!--                                    LICENSE FIELD                     -->
        <div class="row">
            <div class="col-12">
                <label for="licenseNo"><b> Licence No. </b> </label>
                <input type="text" id="licenseNo" name="licenseNo"  disabled> 
            </div>
        </div>
        <!--                                    First Name FIELD                     -->
        <div class="row">
            <div class="col-12">
                <label for="fName"><b> First name </b></label>
                <input type="text" id="fName" name="first" style="<?php if(!empty($_GET['message'])){if(array_key_exists('fName', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else { echo 'border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['fName'];} ?>">
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('fName', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['fName'];
                            echo '<font color = "black">';
                            
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?>  
                <label id="first-name-error" class="errorMsg"></label>
            </div>
        </div>
         <!--                                    Last Name FIELD                     -->
        <div class= "row">
            <div class="col-12">
                <label for="lName"><b> Last name </b></label>
                <input type="text" id="lName" name="last" style="<?php if(!empty($_GET['message'])){if(array_key_exists('lName', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else { echo ' border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['lName'];} ?>">
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('lName', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['lName'];
                            echo '<font color = "black">';
                            
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?>  
                <label id="last-name-error" class="errorMsg"></label>
            </div>           
        </div>

         <!--                                    Email FIELD                     -->
         <div class= "row">
            <div class="col-12">
                <label for="lName"><b> Email </b></label>
                <input type="email" id="email" name="email" style="<?php if(!empty($_GET['message'])){if(array_key_exists('email', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else { echo ' border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['email'];} ?>">
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('email', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['email'];
                            echo '<font color = "black">';
                            
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?>  
                <label id="email-error" class="errorMsg"></label>
            </div>           
        </div>

        <!--                                    Telephone FIELDS                     -->
        <div class= "row">
                <label class="col-4" for="telephone">Telephone</label>
                <input class="col-1" type="text" id="firstNos" name="firstNos" style="<?php if(!empty($_GET['message'])){if(array_key_exists('secondNos', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else if(!(empty($_GET['information']['firstNos']))) { echo 'border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['firstNos'];} ?>">
                <label class="col-1" for="dash">-</label>
                <input class="col-1" type="text" id="secondNos" name="secondNos" style="<?php if(!empty($_GET['message'])){if(array_key_exists('secondNos', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else if(!(empty($_GET['information']['secondNos']))) { echo ' border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['secondNos'];} ?>" >
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('secondNos', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['secondNos'];
                            echo '<font color = "black">';
                            
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?>           
                <label class="col-3 errorMsg" id="telephone-error"></label>
        </div>

        <br>
         <!--                                    Address 1 FIELD                     -->
         <div class="row">
            <div class="col-12">
                <label for="Address1">Address 1</label>
                <input type="text" id="address1" name="address1" style="<?php if(!empty($_GET['message'])){if(array_key_exists('address1', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else if(!(empty($_GET['information']['address1']))) { echo ' border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['address1'];} ?>">
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('address1', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['address1'];
                            echo '<font color = "black">';
                            
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?>  
                <label id="address1-error" class="errorMsg"></label>
            </div>           
        </div>
         <!--                                    Address 2 FIELD                     -->
         <div class="row">
            <div class="col-12">
                <label for="Address2">Address 2</label>
                <input type="text" id="address2" name="address2" style="<?php if(!empty($_GET['message'])){if(array_key_exists('address2', $_GET['message'])){echo 'border: 2px solid red;border-radius: 4px;';} else if(!(empty($_GET['information']['address2']))) { echo ' border: 2px solid rgb(0, 255, 30);border-radius: 4px;';} } ?>" value="<?php if(!empty($_GET['information'])){echo $_GET['information']['address2'];} ?>">
                <?php
                    if(!empty($_GET['message'])) 
                    {
                        if(array_key_exists('address2', $_GET['message'])) 
                        {
                            echo '<font color = "red"> '. $_GET['message']['address2'];
                            echo '<font color = "black">';   
                        }//end if
                        else
                        {
                            echo '';
                        }
                    }//end if
                ?>  
                <label id="address2-error" class="errorMsg"></label>
            </div>           
        </div>
    
        <div class="row">
            <div class="col-12">
                <label for="Parishes">Parishes</label>
                <select name="parishes" id="parishes">
                    <option value="">Chose One</option>
                    <?php
                       echo loadParishes();
                    ?>
                </select>
            </div>           
        </div>

    <input id="jsCheck" type="hidden" name="js_validated" value="false">
    <noscript><input type="hidden" name="javascript_off" value="1"></noscript>
        <div class="row">
            <br> 
            <button type="submit" class="button" >Regitser</button>
            <button type="reset" class="button" >Cancel</button>
        </div>
    </form>
</body>
<!--
<script src="../js/registration.js" type="text/javascript"></script>
-->
</html>
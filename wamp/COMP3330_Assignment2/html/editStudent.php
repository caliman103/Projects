<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Student Information</title>

    <link href="../resources/styling.php" rel="stylesheet" media="screen">
</head>
<body>

    <h1 class="text">Edit Student Information</h1>

    <?php

        require_once ('../resources/mysqlConnect.php');

        //User wants to edit a the information of the student with the ID that was passed
        if(isset($_REQUEST['studid']))
        {
            $ID = $_REQUEST['studid'];    
            require 'editForm.php';
        }//end if

        //If the update was a success let the user know
        else if(isset($_REQUEST['updateSuccess']))
        {
            $returned = $_REQUEST['updateSuccess'];
    ?>
            <h3 class="text success">Thank you, <i><?php echo $returned[0]; ?>'s</i> information has been successfully updated.</h3>
            <h4 class="text">You can use this link to view their updated information.</h4>
            <button style="margin-top:10px; margin-bottom:20px;"class="button" type="button"><a style="color:black;" href="studentInformation.php?studid=<?php echo $returned[1]; ?>">View More</a></button>
    <?php
        }//end else if

        //if the updated failed let the user know
        else if(isset($_REQUEST['updateFailed']))
        {
            $returned = $_REQUEST['updateFailed'];
    ?>
            <h3 class="text correction">Unfortunalety, <?php echo $returned[0]; ?> was not updated</h3>
            <button style="margin-top:10px; margin-bottom:20px;"class="button" type="button"><a style="color:black;" href="editStudent.php?studid=<?php echo $returned[1]; ?>">Try Again</a></button>

    <?php
        }//end if

        //User came to this page directly and not from the flow of the appliation
        else
        {
            echo '<h3 class="text correction">Error: Please select a student to edit before coming to this page.<br>Thank You!</h3>';
        }//
        mysqli_close($dbcon); 
    ?>

    <button class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>
</body>
</html>
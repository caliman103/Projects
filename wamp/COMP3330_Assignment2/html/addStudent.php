<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add Student</title>

    <link href="../resources/styling.php" rel="stylesheet" media="screen">
</head>
<body id="add-body"class="has-form">

    <h1 class="text">Add Student</h1>

<?php
    require_once ('../resources/mysqlConnect.php'); 

    //Student was added so give the user positive feedback
    if(isset($_REQUEST['addSuccess']))
    {
        $returned = $_REQUEST['addSuccess'];
    ?>
        <h3 class="success text">Thank You for adding a student</h3>
        <h5 class="text correction">You can use this button to view all the informaiton of the student you just added</h5>
        <button style="margin-top:10px; margin-bottom:20px;"class="button" type="button"><a style="color:black;" href="studentInformation.php?studid=<?php echo $returned; ?>">View More</a></button>
        <h5 class="text correction">Or add another student if you please</h5>
        <button style="margin-top:10px; margin-bottom:40px;"class="button" type="button"><a style="color:black;" href="addStudent.php">Add Another Student</a></button>
    <?php
             
        }//endif

    //student wasn't added so let the user know
    else if(isset($_REQUEST['addFailed']))
    {
    ?>
        <h3 class="text correction">Student not registered</h3>
        <button style="margin-top:10px; margin-bottom:20px;"class="button" type="button"><a style="color:black;" href="addStudent.php">Try Again</a></button>
    <?php 
    
    }//end else if

    //User hasn't tried to add a student as yet so give them the form 
    else
    {
        require 'addForm.php';
    }//end if
        
        //Close the data base connection once finished (similar to closing a file pointer)
        mysqli_close($dbcon); 
    ?>

    <button style="margin-bottom:20px; margin-top:20px;" class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>

</body>
</html>
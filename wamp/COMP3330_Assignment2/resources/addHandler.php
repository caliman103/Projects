<?php 

    if(isset($_POST['submitted']))
    {
        require_once ('mysqlConnect.php');

        //Add a hyphen '-' to the phone nuumber if the user did not enter a hyphen.
        $phoneNo = $_POST['parent-phone-number'];
        if((strpos($phoneNo,'-') == false) )
        {
            $phoneNo = substr_replace($phoneNo, '-', 3, 0);
        }//end if

        //Check to see if anything was entered for middle name (this one is optional).
        if(!empty($_POST['middle-name']))
        {
            $middleName = $_POST['middle-name'];
        }//end if
        else
        {
            $middleName = '';
        }//end else

        //Get all the information the user entered in the form
        $firstName =  $_POST['first-name'];
        $lastName = $_POST['last-name'];
        $address = $_POST['address'];
        $birthdate = $_POST['year'] . '-'. $_POST['month'] .'-'. $_POST['day']; //concat the values in the input fields
        $classLevel =  $_POST['class-level'];
        $classSuffix = $_POST['class-suffix'];
        $parentPhoneNumber = '1 246-' . $phoneNo;
        $parentEmail = $_POST['parent-email-address'];
        $enrolled = $_POST['enrolled'];
        $loanfee = $_POST['loan-fee-paid'];
        $repairCost = $_POST['repair-cost'];

        
        //Use a query to get an ID that is one greater than the largest ID
        $maxIDQuery = "SELECT (MAX(studid)+1) AS 'newID' FROM STUDENT";
        $maxIDResults =  mysqli_query($dbcon,$maxIDQuery);
        $returned =  mysqli_fetch_array($maxIDResults);

        //Give the new student that ID
        $newID = $returned['newID'];

        mysqli_free_result($maxIDResults); 

        //Add a record using the new id generated along with the values entered by the user 
        $addQuery = "INSERT INTO student VALUES ('$newID', '$firstName', '$middleName', '$lastName', '$address', '$birthdate', '$classLevel', '$classSuffix', '$parentPhoneNumber', '$parentEmail', '$enrolled', '$loanfee', '$repairCost')";
        
        echo $addQuery;
        exit;
        $addResults = mysqli_query($dbcon,$addQuery);

        //Student was added so give the user positive feedback
        if($addResults)
        {
            header('Location:../html/addStudent.php?addSuccess='.$newID);
        }//endif

        //studnet wasn't added
        else
        {
            header('Location:../html/addStudent.php?addFailed');
        }//end else
    }//end if

    //user tries to access this page directly
    else
    {
        header('Location:../html/addStudent.php');
    }
?>
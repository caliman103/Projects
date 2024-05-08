<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Information</title>

    <link href="../resources/styling.php" rel="stylesheet" media="screen">
</head>
<body>
    
    <h1 class="text">Student Information</h1>
    
    <?php
        if(isset($_REQUEST['studid']))
        {
            require_once ('../resources/mysqlConnect.php'); 

            $studentID = $_REQUEST['studid'];

            /** 
             * Using this query to get all of the ID's currently in the database. Afterwards you
             * can see if the ID that was passed is one that is within the database.
             * */ 
            $checkQuery = "SELECT studid as 'list' FROM student";
            $checkResults = mysqli_query($dbcon,$checkQuery);
            
            $IDList = array();
            
            while($returned = mysqli_fetch_array($checkResults) )
            {
                array_push($IDList,$returned['list']);
            }//end while
        
            mysqli_free_result ($checkResults); 
            /**
             * A binary search to check for the ID in the database this is beacuse as long as 
             * a students are added from the gui then the ID's should all be sequential making
             * the Binary search the most effective option for search for the existence of an ID.
             * This will become especially useful the more students are added to the database.
             * I'm not sure if you'll read this ma'am but if you do I know the binary search is
             * completely unecessary and even if it wasn't I could've used a query to accomplish this,
             * but I just wanted to make use of a binary search at least one time since learning it 
             * back in secondary school.
             */
            function binarySearch($list,$key) : string 
            {
                $start = 0;
                $end =  count($list) - 1;

                while($start <= $end)
                {
                    $mid = round(($start + $end)/2);
                    
                    //Key found
                    if($list[$mid] == $key)
                    {
                        return true;
                    }//end if

                    //Search to the right
                    else if($list[$mid] < $key)
                    {
                        $start = $mid + 1;
                    }//end else if

                    //Go to the left
                    else if($list[$mid] > $key)
                    {
                        $end = $mid - 1;
                    }//end else
                }//end while
                
                //Key was not found since the while loop finished
                return false;
            }//end binarySearch

            if(binarySearch($IDList,$studentID))
            {
                
                //Query to return information of the student that was requested 
                $query = "SELECT studid, CONCAT(FirstName, ' ',MiddleName, ' ', LastName) AS 'Student Name', BirthDate, Address, CONCAT(Classlevel, ' - ', ClassSuffix) AS Class, CONCAT(ParentPhoneNumber,', ', ParentEmail) AS 'Parent Information', Enrolled, LoanFeePaid, RepairCost  FROM student WHERE studid =" . $studentID;
        
                //run the query to get the results
                $results = mysqli_query($dbcon, $query);

                //Get the resutls in an associative array
                $information = mysqli_fetch_array($results); 
            ?>
        
                <h3 class="text">Showing all information of <i><?php echo $information['Student Name']?>.</i></h3>
                <h4 class="text">You can click <span class="edit-link">"Edit" </span> in the <u>More Options</u> section to edit this student's information.</h4>
                <?php
                    echo '<table><tr><th>Student ID</th> <th>Student Name</th> <th>BirthDate</th> <th>Address</th> <th>Class</th> <th>Parent Information</th> <th>Enrolled</th> <th>LoanFeePaid</th><th>Repair Cost</th><th>More Options</th></tr>';

                    echo '<tr><td>'.$information['studid'].'</td><td>'.$information['Student Name'].'</td><td>'.$information['BirthDate'].'</td><td>'.$information['Address'].'</td><td>'.$information['Class'].'</td><td>'.$information['Parent Information'].'</td><td>'.$information['Enrolled'].'</td><td>'.$information['LoanFeePaid'].'</td><td>$'.$information['RepairCost'].'</td><td><a class="edit-link" href ="editStudent.php?studid=' . $information['studid']. '">Edit </a></td></tr></table>';

                    mysqli_free_result ($results); 
                    
                }//end if
                else
                {
                    echo '<h3 class="text correction">Error: Only student\'s with valid ID\'s can have their information displayed<br>Thank You!</h3>';
                    echo '<button class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>';
                    exit;
                }//endelse
            }//end if
            else
            {
                echo '<h3 class="text correction">Error: Please select a student first to see their information<br>Thank You!</h3>';
                echo '<h4 class="text correction">You can use this link to search for students to view their information</h4>';
                echo '<button style="margin-bottom:20px;" class="button" type="button"><a id="return-link" href="searchStudent.php">Search for student</a></button>';
                echo '<button class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>';
                exit;
            }//endelse

    

            //Use a query to get the largest and smallest ID 
            $IDQuery = "SELECT MAX(studid) AS 'maxID', MIN(studid) AS 'minID' FROM STUDENT";
            $IDResults =  mysqli_query($dbcon,$IDQuery);
            $returned =  mysqli_fetch_array($IDResults);
            
            //Get the max and min ID from the database
            $maxID = $returned['maxID'];
            $minID = $returned['minID'];

            mysqli_free_result($IDResults); 
            mysqli_close($dbcon);
    ?>         

            
    <div class="my-buttons" style="margin-bottom:30px;">
        <button class="button" type="button"><a id="return-link" href="<?php if($studentID == $minID){echo '#';}else{echo 'studentInformation.php?studid='.($studentID-1); } ?>" ><span style="font-size:15px"> &#x21e6; </span>Previous Student</a></button>
        <button class="button" type="button"><a id="return-link" href="<?php if($studentID == $maxID){echo '#';}else{echo 'studentInformation.php?studid='.($studentID+1); } ?>">Next Student<span style="font-size:15px"> &#x21e8; </span></a></button>
    </div>
    
    <button class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>
</body>
</html>
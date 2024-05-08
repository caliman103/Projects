<!DOCTYPE html> 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Search Student</title>
    
    <link href="../resources/styling.php" rel="stylesheet" media="screen">

</head>
<body>
    <?php
        require_once ('../resources/mysqlConnect.php'); 
    ?>
        <h1 class="text">Search for Student</h1>
        <h3 class="text">Set criteria to search for using the items provided below:</h3>
        <h4 class="text">Please Note: The year field can be left blank to specify any year</h4>

        <form class="search-form" method="POST">

        <!--====================================================CLASS LEVEL========================================-->
            <div>
                <label for="class-level"><b>Class Level:</b></label>
                <select class="text search-select" name="class-level" id="class-level" >
                    <option value="" >All classes</option>
                <?php
                    //Use a qurey to get all class levels from the class relation
                    //Then add those class levels as options
                    $classLevelQuery = "SELECT ClassLevel FROM class";
                    $classLevelresults = mysqli_query ($dbcon, $classLevelQuery); 
                    while($classLevel = mysqli_fetch_array($classLevelresults) )
                    {
                ?>
                        <option value="<?php echo $classLevel['ClassLevel'] ?>" <?php if(isset($_POST['class-level'])){if($_POST['class-level'] == $classLevel['ClassLevel']){echo 'selected';} }?> > <?php echo $classLevel['ClassLevel'] ?> </option>
                <?php
                    }//end while

                ?>
                </select>
                <?php
                    mysqli_free_result ($classLevelresults);
                ?>
                
                <!--====================================================ENROLLED==========================================-->
                <label class="dropdown-label" for="enrolled"><b>Enrolled:</b></label>
                <select class="text search-select" name="enrolled" id="enrolled">
                    <option value="" selected>Any</option>
                    <option value="Y" <?php if(isset($_POST['enrolled']) && $_POST['enrolled'] === 'Y'){echo 'selected';} ?> >Y</option>
                    <option value="N" <?php if(isset($_POST['enrolled']) && $_POST['enrolled'] === 'N'){echo 'selected';} ?> >N</option>
                </select>


                <!--====================================================YEAR===============================================-->
                <label class="dropdown-label" for="Year"><b>Year of Birth:</b></label>
                <input class="text search-input" type="text" size="4" maxlength="4" pattern="^\d{4}$" value="<?php if(isset($_POST['year'])){echo $_POST['year'];} ?>" placeholder="YYYY" name="year" id="year" >


                <!--====================================================MIN ID=============================================-->
                <label class="dropdown-label" for="ID-range"><b>ID range:</b></label>
                <select class="text search-select-range" name="lower-bound" id="lower-bound">
                    <?php
                        //Use a query to get the smallest ID 
                        $minIDQuery = "SELECT MIN(studid) AS 'minID' FROM STUDENT";
                        $minIDResults = mysqli_query($dbcon,$minIDQuery);
                        $returnedMin = mysqli_fetch_array($minIDResults);
                        //Get the min ID
                        $minID = $returnedMin['minID'];
                        mysqli_free_result($minIDResults);
                    ?>
                    <option value="<?php echo $minID ?>">Min (<?php echo $minID?>)</option>
                    <?php
                        $IDQuery = "SELECT studid FROM student";
                        $IDresults = mysqli_query ($dbcon, $IDQuery); 
                        while($IDList = mysqli_fetch_array($IDresults))
                        {
                    ?>
                            <option value="<?php echo $IDList['studid'] ?>" <?php if(isset($_POST['lower-bound']) && $_POST['lower-bound'] == $IDList['studid']){echo 'selected';} ?> ><?php echo $IDList['studid']?></option>
                    <?php
                        }//end while
                    ?>
                </select>

                <!--===================================================DASH LABEL===========================================-->
                <label style="font-size:25px;" for="-"><b>-</b></label>


                <!--====================================================MAx ID=============================================-->
                <select class="text search-select-range" name="upper-bound" id="upper-bound">
                    <?php
                        //Use a qyery to get the largest ID 
                        $maxIDQuery = "SELECT MAX(studid) AS 'maxID' FROM STUDENT";
                        $maxIDResults =  mysqli_query($dbcon,$maxIDQuery);
                        $returnedMax =  mysqli_fetch_array($maxIDResults);
                        //Get the max ID
                        $maxID = $returnedMax['maxID'];

                        mysqli_free_result($maxIDResults); 
                    ?>
                        <option value="<?php echo $maxID?>">Max (<?php echo $maxID ?>)</option>
                    <?php
                        $IDQuery = "SELECT studid FROM student";
                        $IDresults = mysqli_query ($dbcon, $IDQuery); 
                        while($IDList = mysqli_fetch_array($IDresults))
                        {
                        ?>
                            <option value="<?php echo $IDList['studid'] ?>" <?php if(isset($_POST['upper-bound']) && $_POST['upper-bound'] == $IDList['studid']){echo 'selected';} ?> ><?php echo $IDList['studid']?></option>
                        <?php   
                        }//end while

                        mysqli_free_result ($IDresults);
                    ?>
                </select> 
            </div>

            <div style="margin-top:50px;" class="my-buttons">
                <button type="submit" class="button search-button" >Search</button>
                
                <input type="hidden" name="submitted" value="TRUE">
            </div>
        </form>

    <?php
        // Check if the form has been submitted.
        if (isset($_POST['submitted']))
        {
            $error = '';
           
            //Check for errors with the ID range
            if($_POST['upper-bound'] < $_POST['lower-bound'])
            {
               $error = '<h4 class="text">Error: The ID value on the left cannot be larger than the ID value on the right in ID Range.<br>Please try again.</h4>';
               echo $error;
               echo '<button style="margin-bottom:20px; margin-top:10px;" class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>';
               exit;
            }//end if

            //user entered valid information
            if(empty($errors))
            {
                //Get the value of the ranges since these will always affect the query regardless of if the user edited them
                $MinID = $_POST['lower-bound'];
                $MaxID = $_POST['upper-bound'];

                //Start the search query
                $searchQuery = "SELECT studid, CONCAT(FirstName, ' ',MiddleName, ' ', LastName) AS 'Student Name', BirthDate, Address, CONCAT(Classlevel, ' - ', ClassSuffix) AS Class, CONCAT(ParentPhoneNumber,', ', ParentEmail) AS 'Parent Information', Enrolled, LoanFeePaid, RepairCost  FROM student  WHERE studid BETWEEN " . $MinID. " AND " . $MaxID;

                /**
                 * Check what information the user entered to see what to add onto the query to match their
                 * criteria.
                 */
                if (!empty($_POST['class-level'])) 
                {
                    $searched_class_level = $_POST['class-level'];
                    $searchQuery = $searchQuery ." AND ClassLevel = '".$searched_class_level."'";
                }//end if 

                if (!empty($_POST['enrolled'])) 
                {
                    $searched_enrolled = $_POST['enrolled'];
                    $searchQuery = $searchQuery ." AND Enrolled = '".$searched_enrolled."'";
                }//end if 

                if (!empty($_POST['year'])) 
                {
                    $searhced_year = $_POST['year'];
                    $searchQuery = $searchQuery ." AND Birthdate LIKE '".$searhced_year ."%'";
                }//end if 

                $searchQuery = $searchQuery .';';

                $searchResults = mysqli_query($dbcon,$searchQuery);
                $numRows = mysqli_num_rows($searchResults);

                //Show the user the sudents that match the criteria
                if($numRows > 0)
                {
                    /**
                     * Get the number of students currently in the database, to see if the search 
                     * results get all of the students
                     */
                    $numStudentsQuery = "SELECT COUNT(studid) AS 'amount' FROM student;";
                    $numStudentsResults = mysqli_query($dbcon,$numStudentsQuery);
                    $amount = mysqli_fetch_array($numStudentsResults);

                    $numStudents = $amount['amount'];
                    mysqli_free_result($numStudentsResults); // Free up the resources.

                    if($numStudents == $numRows)
                    {
                ?> 
                        <h3 class="text success">Showing all Students</h3>

                <?php
                    }//end if
                    else
                    {
                ?>
                        <h3 class="text success"><?php echo $numRows . ' '; ?> students matched your criteria</h3>
                
                <?php
                    }//end else
                ?>
                    
                <?php
                    echo '<table><tr><th>Student ID</th> <th>Student Name</th> <th>BirthDate</th> <th>Address</th> <th>Class</th> <th>Parent Information</th> <th>Enrolled</th> <th>LoanFeePaid</th><th>Repair Cost</th><th>More Options</th></tr>';

                    while($information = mysqli_fetch_array($searchResults))
                    {
                        echo '<tr><td>'.$information['studid'].'</td><td>'.$information['Student Name'].'</td><td>'.$information['BirthDate'].'</td><td>'.$information['Address'].'</td><td>'.$information['Class'].'</td><td>'.$information['Parent Information'].'</td><td>'.$information['Enrolled'].'</td><td>'.$information['LoanFeePaid'].'</td><td>'.$information['RepairCost'].'</td><td><a class="edit-link" href ="editStudent.php?studid=' . $information['studid']. '">Edit </a></td></tr>';
                    }//end while

                    echo '</table>';
                }//end if

                //No students matched the criteria of the user so give them an appropriate message
                else
                {
            ?>
                    <h3 class="text">No students match your criteria</h3>

            <?php
                }//end else

                mysqli_free_result($searchResults); 
            }//end if


        } //end if

         mysqli_close($dbcon);
    ?>

    <button style="margin-bottom:20px; margin-top:10px;" class="button" type="button"><a id="return-link" href="index.php">Return Home</a></button>
</body>
</html>
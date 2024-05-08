<!DOCTYPE html>
<html lang="en"> 
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home Page</title>

    <link href="../resources/styling.php" rel="stylesheet" media="screen">
    
</head>
<body>
    <h1 class="text">HOME PAGE</h1>
    <h2 class="text">View Students</h2>
    <h4 class="text">Use these buttons below for additional functionality:</h4>
    <div class="my-buttons">
        <button id="add-button" class="button" type="button"><a class="my-button-links" href="addStudent.php">Add New Student</a></button>
        <button id="search-button" class="button" type="button"><a class="my-button-links" href="searchStudent.php">Search for student</a></button>
    </div>
    
    <h4 class="text">In the <u>More Options</u> section you can:<br>Click on <span class="view-link">"View More"</span> to see all the information about a specific student<br>Click on <span class="edit-link">"Edit"</span> to update a student's information</h4>

    <?php
        /** 
         *Use the php script mysqlConnect.php to establish a connection to the database, from here you will be able to access 
         *the database specified in that sctipt 
         */
        require_once ('../resources/mysqlConnect.php');

        /**
         *Query to get the student ID, first and last name (concatanated) as well as class level and class number (concatanated)
         *of all students in the studens table in the database.
         *  
         */ 
        $query = "SELECT studid, CONCAT(FirstName, ' ', LastName) AS 'Student Name', CONCAT(ClassLevel, ' - ', ClassSuffix) AS 'Class'  FROM student";

        //run the query to get the results
        $results = mysqli_query($dbcon, $query);
      
        //Create a table to diaplay the results of the query
        echo '<table id="index-table"><tr><th>Student ID</th><th>Student Name</th><th>Class</th><th>More Options</th></tr>';

        //get the results in a format the can be printed
        while($information = mysqli_fetch_array($results) )
        {
            echo '<tr><td>'. $information['studid'] . '</td><td>' . $information['Student Name'] . '</td><td>' . $information['Class'] . '</td><td><a class="view-link" href="studentInformation.php?studid=' . $information['studid'] . '">View More</a> <br><br> <a class="edit-link" href ="editStudent.php?studid=' . $information['studid']. '">Edit </a>  </td></tr>';
            /**
             * Using a query string for the links to view more and edit. The value that is being passed is the ID of the student
             * associated with that record. 
             */
        }//end while

        echo '</table>';

        //Free all memory assiciated with this result
        mysqli_free_result ($results); 

        // Close the connection to the mysql server that was connected to eailer in the script.
        mysqli_close($dbcon); 
    ?>       
</body>
</html>
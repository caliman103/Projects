<?php 
    if(isset($_POST['submitted']))
    {
        require_once ('mysqlConnect.php'); // Connect to the db.

        if(isset($_POST['studID']))
        {
            //Create the start of the query to update
            $updateQuery = "";

            //This function will update the query with the necessary information
            function add2Query($currentQuery, $fieldName,$value,$type) : string
            {
                if($type == 'word' && empty($currentQuery))
                {
                    return "UPDATE student SET ". $fieldName. " = '".$value ."'"; 
                }//end if 
                else
                {
                    return $currentQuery . ", " . $fieldName . " = '". $value. "'";
                }//end else
                
                if($type != 'word' && empty($currentQuery))
                {
                       return "UPDATE student SET ". $fieldName. " = ".$value; 
                }//end if
                else
                {
                    return $currentQuery . ", " . $fieldName . " = ". $value;
                }//end else
            }//end add2Query

            //Check which attributes need to be updated
            if(!empty($_POST['class-level']))
            {
                $updateQuery = add2Query($updateQuery,'ClassLevel',$_POST['class-level'],'word');
            }//end if

            if(!empty($_POST['class-suffix']))
            {
                $updateQuery = add2Query($updateQuery,'ClassSuffix', $_POST['class-suffix'],'word');
            }//end if

            if(!empty($_POST['enrolled']))
            {
                $updateQuery = add2Query($updateQuery,'enrolled', $_POST['enrolled'],'word');
                
            }//end if

            if(!empty($_POST['loan-fee-paid']))
            {
                $updateQuery = add2Query($updateQuery,'LoanFeePaid', $_POST['loan-fee-paid'],'word');
                
            }//end if

            if(!empty($_POST['address']))
            {
                $updateQuery = add2Query($updateQuery,'Address', $_POST['address'],'word');
            }//end if

            if(!empty($_POST['parent-phone-number']))
            {
                //Format phone number if needed
                $phoneNo = $_POST['parent-phone-number'];
                if((strpos($phoneNo,'-') == false) )
                {
                    $phoneNo = substr_replace($phoneNo, '-', 3, 0);
                }//end if
                
                $updateQuery = add2Query($updateQuery,'ParentPhoneNumber', '1 246-'.$phoneNo,'word');
            }//end if

            if(!empty($_POST['parent-email-address']))
            {
                $updateQuery = add2Query($updateQuery,'ParentEmail', $_POST['parent-email-address'],'word');
            }//end if

            if(!empty($_POST['repair-cost']))
            {
                $updateQuery = add2Query($updateQuery,'RepairCost', $_POST['repair-cost'],'num');
            }//end if


            //End the update query to ensure only the student whose ID was passed get their information updated
            $updateQuery = $updateQuery . " WHERE studid = ". $_POST['studID'].";";


            $updateResults =  mysqli_query($dbcon,$updateQuery);

            //Use this query to get the information of the student that was updated 
            $query = "SELECT studid, CONCAT(FirstName, ' ', LastName) AS 'name' FROM student WHERE studid = ". $_POST['studID'];

            //run the query to get the results
            $results = mysqli_query($dbcon, $query);

            $returned = mysqli_fetch_array($results);
            

            mysqli_close($dbcon);

            //Successfully updated
            if($updateResults)
            { 
                header('Location:../html/editStudent.php?updateSuccess[0]='.$returned['name'].'&updateSuccess[1]='.$returned['studid']);
            }//end if

            //Student was not updated
            else
            {
                header('Location:../html/editStudent.php?updateFailed[0]='.$returned['name'].'&updateFailed[1]='.$returned['studid']);
            }//end else
            
            
        }//end if
        else
        {
            //if the user tries to access this page directly
            header('Location:../html/editStudent.php');
        }

    }//end if
    else
    {
        //if the user tries to access this page directly
        header('Location:../html/editStudent.php');
    }
    
?>
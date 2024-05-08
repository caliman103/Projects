<?php 
    //User tried at access dirctly
    if(!isset($_REQUEST['studid']))
    {
        header('Location:editstudent.php');
    }//end if
    //Get all the default informaiton of this student so it can be displayed in the form
    $get_info = "SELECT studid, CONCAT(firstname, ' ', middlename, ' ', lastname) AS Name, birthdate, ClassLevel, ClassSuffix, Enrolled, LoanFeePaid, Address, (SELECT RIGHT(ParentPhoneNumber,8) ) AS ParentNumber, ParentEmail, RepairCost FROM student WHERE studid =" . $_REQUEST['studid'];

    $default_info_results = mysqli_query($dbcon, $get_info);

    //Get the resutls in an associative array
    $default_info  = mysqli_fetch_array($default_info_results); 
    

    echo '<div " class="text"><h3 class="success">Student ID: '.$default_info['studid'].'</p><p>Full Name: '.$default_info['Name'].'</p><p>BirthDate: '. $default_info['birthdate'].'</h3></div>';
?>
    
    <h3 class="text">You can change the attributes below for the selected student.</h3>
    <h4 class="text">Please Note: The student's current information is in the fields, if no changes are made, then the information will remain.</h4>


    <form class="search-form" action="../resources/editHandler.php" method="POST">
        <div>
            <input type="hidden" name="studID" value="<?php echo $_REQUEST['studid']; ?>">
            <label for="class-level"><b>Class Level:</b></label>
                <select class="edit-select text" name="class-level" id="class-level">
                    <option value="" >Current Class (<?php echo $default_info['ClassLevel']?>) </option>
                <?php
                    //Use a qurey to get all class levels from the class relation
                    //Then add those class levels as options
                    $classLevelQuery = "SELECT ClassLevel FROM class";
                    $classLevelresults = mysqli_query ($dbcon, $classLevelQuery); 
                    while($classLevel = mysqli_fetch_array($classLevelresults) )
                    {
                ?>
                        <option value="<?php echo $classLevel['ClassLevel'] ?>" > <?php echo $classLevel['ClassLevel']; ?> </option>

                <?php }//end while ?>
                </select>
                
 
            <label class="dropdown-label" for="class-suffix"><b>Class Suffix:</b></label>
            <select class="edit-select text" name="class-suffix" id="class-suffix">
                <option value="" selected>Current Class Number (<?php echo $default_info['ClassSuffix'] ?>)</option>
                <?php
                    for($i = 1; $i <= 4; $i++)
                    {
                ?>
                        <option value="<?php  echo $i ?>" > <?php echo $i ?> </option>
                <?php
                    }//end for
                ?>
            </select>

            <label class="dropdown-label" for="enrolled"><b>Enrolled:</b></label>
            <select class="edit-select text" name="enrolled" id="enrolled">
                <option value="" selected>Current Enrolled Status (<?php echo $default_info['Enrolled'] ?>)</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
            </select>

            <label class="dropdown-label" for="loan-fee-paid"><b>Loan Fees Paid:</b></label>
            <select class="edit-select text" name="loan-fee-paid" id="loan-fee-paid">
                <option value="" selected>Current Loan Fee Status (<?php echo $default_info['LoanFeePaid']?>)</option>
                <option value="Y">Y</option>
                <option value="N">N</option>
            </select>
        </div>
        
        <div>
            <div class="edit-fields">
                <label  for="address"><b>Address:</b></label>
                <input class="edit-input-field" type="text" placeholder="No Changes" pattern="^[A-Za-z\d](([A-Za-z\d])[\.]?[\s]?)*[A-Za-z\d]$" title="Only Alphanumeric Characters, Spaces & Dots ALlowed." name="address" id="address" value="<?php echo $default_info['Address'] ?>" >
            </div>

            <div class="edit-fields">
                <label for="parent-phone-number"><b>Parent Phone Number:</b></label>
                <input class="edit-input-field" type="text" name="default-numbers" value="1 246-" disabled size="2">
                <input class="edit-input-field" type="text" placeholder="No Changes" pattern="^((\d{7})|(\d{3}-\d{4}))$" size="10" maxlength="8" title="Only One Hyphen(Optional) & Seven Digits Allowed." name="parent-phone-number" id="parent-phone-number" value="<?php echo $default_info['ParentNumber']; ?>">
            </div>
                        
            <div class="edit-fields">
                <label for="parent-email-address"><b>Parent Email Address:</b></label>
                <input class="edit-input-field" type="email" size="30" name="parent-email-address" id="parent-email-address" value="<?php echo $default_info['ParentEmail'] ?>">
            </div>

            <div class="edit-fields">
                <label for="repair-cost"><b>Repair Cost:</b></label>
                <input class="edit-input-field" type="text" placeholder="No Changes" title="Only Numbers Allowed (Decimals Included)." name="repair-cost" id="repair-cost" pattern="^(\d+(\.\d{1,2})?)$" size="10" value="<?php echo $default_info['RepairCost'] ?>" >
            </div>
        </div>

        <div class="edit-fields my-buttons">
            <button type="submit" class="button edit-button" >Edit</button>
            <button type="reset" class="button edit-reset-button" >Reset</button>
            <input type="hidden" name="submitted" value="TRUE">
        </div>
    </form> 

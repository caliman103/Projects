     
    
    <h3 class="text">Please fill out the fields below.</h3>
    <h4 class="text">Please Note: You can place your cursor over the question marks, <img style="height:15px;" src="../images/question-mark3.png" alt="question mark"> to see what characters are allowed for each input field</h4>


    <form class="form" action="../resources/addHandler.php" method="POST">

    
        <!--========================================================FIRST NAME FIELD========================================-->
        <div class="row" style="margin-top:7px;">
            <label class="col-3" for="first-name"><b>First Name:</b></label>
            <input class="add-input-field col-3" type="text" size="15" name="first-name" id="first-name" pattern="^([A-Za-z])+$" value="<?php if (isset($_POST['first-name'])) echo $_POST['first-name']; ?>" required>
            <div class="col-1 dropdown">
                <span><img class="dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Alphabet Characters Allowed</p>
                </div>
            </div>
        </div>

        
        <!--========================================================Middle NAME FIELD=======================================-->
        
        <div class="row">
            <label class="add-label col-3" for="middle-name"><b>Middle Name:</b></label>
            <input class="add-input-field col-3" type="text" size="15" name="middle-name" id="middle-name" pattern="^([A-Za-z])+$" value="<?php if (isset($_POST['middle-name'])) { echo $_POST['middle-name'];}else echo ''; ?>" >
            <div class="col-1 dropdown">
                <span><img class="dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Alphabet Characters Allowed</p>
                    <p>Leave Blank if Not Applicable</p>
                </div>
            </div>
        </div>

        <!--========================================================Last NAME FIELD========================================-->
        
        <div class="row">
            <label class="add-label col-3" for="last-name"><b>Last Name:</b></label>
            <input class="add-input-field col-3" type="text" size="15" name="last-name" id="last-name" pattern="^([A-Za-z])+$" value="<?php if (isset($_POST['last-name'])) echo $_POST['last-name']; ?>" required>
            <div class="col-1 dropdown">
                <span><img class="dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Alphabet Characters Allowed</p>
                </div>
            </div>
        </div>

        <!--========================================================BIRTH DATE FIELD========================================-->
       
        <div class="row">
            <label class="col-3" for="birth-date"><b>Birth Date:</b></label>
            <div style="float:left;" class="col-3">
                <input class="text add-input-field" type="text" size="4" maxlength="4" pattern="^\d{4}$" placeholder="YYYY" name="year" id="year" value="<?php if (isset($_POST['year'])) echo $_POST['year']; ?>" required>
                <label for="">-</label>
                <input class="text add-input-field" type="text" size="3" maxlength="2" pattern="^((0[1-9])|(1[0-2]))$" placeholder="MM" name="month" id="month" value="<?php if (isset($_POST['month'])) echo $_POST['month']; ?>" required>
                <label for="">-</label>
                <input class="text add-input-field" type="text" size="3" maxlength="2" pattern="^((0[1-9])|([1-2][\d])|(3[0-1]))$" placeholder="DD" name="day" id="day" value="<?php if (isset($_POST['year'])) echo $_POST['day']; ?>" required>
            </div>
           
            <div class="col-1 dropdown">
                <span><img class="needs-adjusting dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Numbers Allowed</p>
                    <p>Month cannot be more than 12</p>
                    <p>Day cannot be more than 31</p>
                </div>
            </div>
        </div>

        <!--========================================================ADDRESS FIELD===========================================-->
       
        <div class="row">
            <label class="col-3" for="address"><b>Address:</b></label>
            <input class="col-3 add-input-field" type="text" size="30" pattern="^[A-Za-z\d](([A-Za-z\d])[\.]?[\s]?)*[A-Za-z\d]$" name="address" id="address" value="<?php if (isset($_POST['address'])) echo $_POST['address']; ?>" required>
            <div class="col-1 dropdown">
                <span><img class="dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Alphanumeric Characters, Spaces, and Dots Allowed</p>
                </div>
            </div>
        </div>

        <!--========================================================PARENT PHONE NUMBER======================================-->
       
        <div class="row" >
            <label class="col-3" for="parent-phone-number"><b>Parent Phone Number:</b></label>
            <div class="col-3">
                <input class="add-input-field" type="text" name="default-numbers" value="1 246-" disabled size="2">
                <input class="add-input-field" type="text" pattern="^((\d{7})|(\d{3}-\d{4}))$" size="10" maxlength="8" name="parent-phone-number" id="parent-phone-number" value="<?php if (isset($_POST['parent-phone-number'])) echo $_POST['parent-phone-number']; ?>" required>
            </div>
            <div class="col-1 dropdown">
                <span><img class="needs-adjusting dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Numbers and one Hyphen Allowed</p>
                    <p>P.S. Hyphen For Separation is Optional</p>
                </div>
            </div>
        </div>

        <!--========================================================PARENT EMAIL ADDRESS======================================-->
        
        <div class="row" >
            <label class="col-3" for="parent-email-address"><b>Parent Email Address:</b></label>
            <input class="add-input-field col-3" type="email" size="30" name="parent-email-address" id="parent-email-address" value="<?php if (isset($_POST['parent-email-address'])) echo $_POST['parent-email-address']; ?>" required>
            <div class="col-1 dropdown">
                <span><img class="dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Valid Email Needed</p>
                </div>
            </div>
        </div>

        <!--========================================================CLASS LEVEL SELECT========================================-->
        
        <div class="row">
            <label class="col-3" for="class-level"><b>Class Level:</b></label>
            <div class="col-2">
                <select class="add-select" name="class-level" id="class-level" required>
                    <option value="" selected>------Choose Level------</option>
                <?php
                    //Use a query to get all class levels from the class relation
                    //Then add those class levels as options
                    $classLevelQuery = "SELECT ClassLevel FROM class";
                    $classLevelresults = mysqli_query ($dbcon, $classLevelQuery); // Run the query.
                    while($classLevel = mysqli_fetch_array($classLevelresults) )
                    {
                        echo '<option value="'.$classLevel['ClassLevel'].'">'.$classLevel['ClassLevel'].'</option>';
                    }//end while
                ?>
                </select>
            </div>
       
        </div>

        <!--========================================================CLASS SUFFIX SELECT========================================-->
        
        <div class="row">
            <label class="col-3" for="class-suffix"><b>Class Number:</b></label>
            <div class="col-2" >
                <select class="add-select" name="class-suffix" id="class-suffix" required>
                    <option value="" selected>------Choose Class Number------</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            
        </div>

        <!--========================================================ENROLLED SELECT===========================================-->
        
        <div class="row">
            <label class="col-3" for="enrolled"><b>Enrolled:</b></label>
            <div class="col-2"> 
                <select class="add-select" name="enrolled" id="enrolled" required>
                    <option value="" selected>------Choose One------</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            
        </div>

         <!--========================================================LOAN FEE SELECT===========================================-->
    
        <div class="row">
            <label class="col-3" for="loan-fee-paid"><b>Loan Fees Paid:</b></label>
            <div class="col-2"> 
                <select class="add-select" name="loan-fee-paid" id="loan-fee-paid" required>
                    <option value="" selected>------Choose One------</option>
                    <option value="Y">Y</option>
                    <option value="N">N</option>
                </select>
            </div>
            
        </div>

        <!--========================================================REPAIR COST FIELD===========================================-->
        <br>
        <div class="row">
            <label class="col-3" for="repair-cost"><b>Repair Cost:</b></label>
            <input class="add-input-field col-3" type="text" name="repair-cost" id="repair-cost" value="0.00" pattern="^(\d+(\.\d{1,2})?)$" size="10" value="<?php if (isset($_POST['repair-cost'])) echo $_POST['repair-cost']; ?>" required>
            <div class="col-1 dropdown">
                <span><img class="dropdown question-mark" src="../images/question-mark3.png" alt="Question Mark"></span>
                <div class="dropdown-content">
                    <p>Only Numbers Allowed (decimals included).</p>
                </div>
            </div>
        </div>
        
        <br>
        <div class="my-buttons">
            <button type="submit" class="button submit-button" >Add Student</button>
            <button type="reset" class="button reset-button" >Reset</button>
            <input type="hidden" name="submitted" value="true">
        </div>

    <div style="margin-bottom:10px;"></div>
    </form>
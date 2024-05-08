<?php
    require '../../scripts/AuthenticateClass.php';
    require '../../scripts/RegisteredVehiclesClass.php';

    $authenticate = new Authenticate();

    if(!($authenticate->isUserLoggedIn()) ) {
        header('Location:index.php');
        exit;
    }//end if

    $userInformation = $authenticate->getUserInfo($authenticate->setUserInfo($_SESSION['session_user']));
    list($ID,$fName,$lName,$time) = explode(',',$userInformation);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registered Vehicles</title>

     <!--Links to files e.g js and css files --> 
     <link rel="stylesheet" href="../../css/registered_vehicles.css">
</head>
<body>
    <div class="row">
        <div class="col-1">
            <img src="../../images/carLogo.png" alt="VLRMS Logo" id="logo" >   
        </div>
        
        <div class="col-10" >
            <h4>Barbados Revenue Authority</h4>
            <h4>Vehicle Licensing and Registration System</h4>
            <label id="name" for="name">Employee: <?php echo $fName . ' ' . $lName; ?> </label>
            <label id="ID" for="ID">Employee ID: <?php echo substr($ID,4,-4); ?></label>
        </div>

        <div class="col-1 dropdown">
            <label for="hambuger-menu">&#9776;</label>   
            <div id="dropdown-content" class="dropdown-content">
                <a id="logOut" href="../../scripts/logOut.php?admin">Log Out</a>
            </div>
        </div>
    </div>

    <div class="row"> 
    <h4>Vehicle Record Details</h4>
    </div> 

    <p><?php if(isset($_REQUEST['search-error'])){echo '<font color = "red"><b>Please enter vehicle info. </b> <font color = "black">';} ?></p>
    <p><?php if(isset($_REQUEST['field-error'])){echo '<font color = "red"><b>Please select category to search by. </b> <font color = "black">';} ?></p>

    <br>
    <form action="registered_vehicles.php" method="POST">
        <div class="row">
            <!--                                DROPDOWN                        -->
            <select class="registered-select" name="field" id="field">
                <option value="" selected>Search by</option>
                <option value="registration_no" <?php if(isset($_POST['field']) && $_POST['field'] === 'registration_no') echo 'selected'; ?>>Registration No.</option>
                <option value="manufacturer"<?php if(isset($_POST['field']) && $_POST['field'] === 'manufacturer') echo 'selected'; ?> >Manu</option>
                <option value="make" <?php if(isset($_POST['field']) && $_POST['field'] === 'make') echo 'selected'; ?>>Make</option>
                <option value="model" <?php if(isset($_POST['field']) && $_POST['field'] === 'model') echo 'selected'; ?>>Model</option>
                <option value="year" <?php if(isset($_POST['field']) && $_POST['field'] === 'year') echo 'selected'; ?>>Year</option>
            </select>

            <!--                            INPUT FIELD                         -->
            <input class="vehicle-input" type="text" placeholder="Vehicle Info Search" name="search-info" id="search-info" value="<?php if(isset($_POST['search-info'])) echo $_POST['search-info']; ?>">

            <!--                            SUBMIT BUTTON                       -->
            <button type="submit"class="vehicle-search-button">Search</button>
            <input type="hidden" name="submitted" value="true">
        </div>
    </form> 
    <p><?php if(isset($_REQUEST['query-error'])){echo '<font color = "red"><b>No such vehicle found. </b> <font color = "black">';} ?></p>
    <?php 
        if(!isset($_POST['submitted'])) {
            //Show vehicle details
            require '../../scripts/registered_vehicle_details.php';
        }//end if
        
        else if(isset($_POST['submitted'])) {
            $field_name = $_POST['field'];
            if(empty($field_name)) {
                header('Location:./registered_vehicles.php?field-error');
                exit;
            }
            $criteria = $_POST['search-info'];

            if(empty($criteria)){
                header('Location:./registered_vehicles.php?search-error');
                exit;
            }//end if

            //Connect to the database
            $mysqli = new mysqli('localhost','root','','vlrms');

            $searchQuery = "SELECT registration_no As 'regNo', manufacturer AS 'manu', make , model, year, vehicles.national_id AS 'ID', CONCAT(first_name, ' ', last_name) AS 'Name'  FROM drivers, vehicles WHERE ". $field_name ." = '". $criteria . "'AND vehicles.national_id = drivers.national_id;"; 
            

            if(!$results = $mysqli->query($searchQuery)) {
                header('Location:./registered_vehicles.php?query-error');
                exit;
            } //end if
            else {
                if($results->num_rows == 0) {
                    header('Location:./registered_vehicles.php?query-error');
                    exit;
                }
            }//end else
        ?>
            <p style="color:green;"><?php echo '<b>'.$results->num_rows.' vehicles found.</b>' ?></p>
            <table class="registered-table">
                <tr>
                    <th>Acton</th>
                    <th>Registration No.</th>
                    <th>Manu.</th>
                    <th>Make</th>
                    <th>Model</th>
                    <th>Year</th>
                    <th>Natil ID</th>
                    <th>Driver</th>
                </tr>
                <?php
                    while($rec = mysqli_fetch_array($results) ) { ?>
                <tr>
                    <td class="registered-table-links"><a href="#">Edit</a> <a href="#">Delete</a></td>
                    <td><?php echo $rec['regNo']; ?></td>
                    <td><?php echo $rec['manu']; ?></td>
                    <td><?php echo $rec['make']; ?></td>
                    <td><?php echo $rec['model']; ?></td>
                    <td><?php echo $rec['year']; ?></td>
                    <td><?php echo $rec['ID']; ?></td>
                    <td><?php echo $rec['Name']; ?></td>
                </tr> 
                <?php }//end while ?>
            </table>
            <?php $mysqli->close(); ?>
            <div class="row">
                <button class="registered-showAll-button"><a style="text-decoration:none;color:black;" href="./registered_vehicles.php">Show All Vehicles</a></button>
            </div>
      <?php }//end else ?>
</body>
</html>




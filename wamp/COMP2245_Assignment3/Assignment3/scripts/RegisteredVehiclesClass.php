<?php
class RegisteredVehicles
{
    private $_mysqli;
    private $_registeredDrivers;

    public function dbConnect($host, $user, $pass){
        $this->_mysqli = new mysqli($host,$user,$pass); 
    }//end dbConnect

    public function getRegisteredDrivers() : array {
        $this->_mysqli->select_db("vlrms");
        $driversQuery = "SELECT registration_no As 'regNo', manufacturer AS 'manu', make , model, year, vehicles.national_id AS 'ID', CONCAT(first_name, ' ', last_name) AS 'Name'  FROM drivers, vehicles WHERE drivers.national_id = vehicles.national_id";

        $driverResults = $this->_mysqli->query($driversQuery);
        $this->_registeredDrivers = array();
            
        while($returned = mysqli_fetch_array($driverResults)) {
            array_push($this->_registeredDrivers,$returned);
        }//end while
        return $this->_registeredDrivers;
    } //end getRegisteredDrivers
}//end registered vehicles
?>
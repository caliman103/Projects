
<div> 
    <?php 
        //create new registered vehicles object
        $registeredVehicles = new RegisteredVehicles();

        //connect to the db
        $registeredVehicles->dbConnect('localhost','root','',);

        //Get all the drivers
        $driverList = $registeredVehicles->getRegisteredDrivers();
    ?>
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
            foreach($driverList as $driver) { ?>
            <tr>
                <td class="registered-table-links" ><a href="#">Edit</a> <a href="#">Delete</a></td>
                <td><?php echo $driver['regNo']; ?></td>
                <td><?php echo $driver['manu']; ?></td>
                <td><?php echo $driver['make']; ?></td>
                <td><?php echo $driver['model']; ?></td>
                <td><?php echo $driver['year']; ?></td>
                <td><?php echo $driver['ID']; ?></td>
                <td><?php echo $driver['Name']; ?></td>
            </tr>
        <?php }//end for each ?>
    </table>
</div>

/*Jamaine Drakes
 *Lab 2: Vehicle - Workshop.java
 */

 public class Workshop
 {

    //data members
    private Vehicle[] vehiclesBays;


    //constructor
    public Workshop()
    {
        vehiclesBays = new Vehicle[5];
    }//end constructor


    //add vehicle method
    public void addVehivle(Vehicle v, int position)
    {
        vehiclesBays[position] = v;
    }//end addVehivle method


    public Vehicle getVehicle(int position)
    {
        return  vehiclesBays[position];
    }//end getVehicle

    public String getVehicleAString(int position)
    {   
        Vehicle tempVehicle = new Vehicle();
        tempVehicle = vehiclesBays[position];

        String model = tempVehicle.getModel();
        String engineSize = String.valueOf(tempVehicle.getEngineSize() );

        String information = "Model: " + model + "\nEngine Size: " + engineSize;  
        return information;
    }//end getVehicleAsString


    public int amount()
    {
        return vehiclesBays.length;
    }
 }//end workshow class
public class Workshop
{
    private Vehicle vehicleBays[];

    //=======ACCESSORS=======//

    public Vehicle getVehicle(int position)
    {
        return vehicleBays[position];
    }


    //=======MUTATORS=======//

    public void addVehicle(Vehicle v, int position)
    {
        vehicleBays[position] = v;
    }


    //=======CONSTRUCTOR=======//

    Workshop()
    {
        vehicleBays = new Vehicle[5];
    }
}
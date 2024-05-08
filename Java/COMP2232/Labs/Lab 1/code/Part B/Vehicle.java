public class Vehicle 
{
    private String model;
    private double engineSize;
    private int currSpeed;

    //=======ACCESSORS=======//

    public String getModel()
    {
        return model;
    }// getModel

    public double getEngineSize()
    {
        return engineSize;
    }// getEngineSize


    //=======MUTATORS=======//

    public void setModel(String s)
    {
        model = s;
    }// setModel

    public void setEngineSize(double d)
    {
        engineSize = d;
    }// setEngineSize

    
    public void accelerate(int speed)
    {
        int speedInc = 5; // the size of speed increments

        System.out.println("\nSpeed is now " + currSpeed + "km/hr");

        if(currSpeed < speed)
        {
            //for loop to imcrement currSpeed to speed
            for(int i = currSpeed + speedInc; currSpeed < speed; i += speedInc)
            {
                if(i < speed)
                {
                    currSpeed = i;
                    System.out.println("Speed is now " + currSpeed + "km/hr");
                }
                else
                {
                    currSpeed = speed;
                    System.out.println("\nTarget speed of " + currSpeed + "km/hr has been reached\n");
                }
            }
        }
        else if(currSpeed == speed)
        {
            System.out.println("\nYou are travelling at " + speed + " km/hr");
        }
        else
        {
            System.out.println("\nYou are already moving faster than " + speed + " km/hr");
        }
    }// accelerate

    public void brake()
    {
        int speedInc = 5; // the size of speed increments

        if(currSpeed > 0)
        {
            //for loop to decrement currSpeed to 0
            for(int i = currSpeed - speedInc; currSpeed > 0; i -= speedInc)
            {
                if(i > 0)
                {
                    currSpeed = i;
                    System.out.println("Speed is now " + currSpeed + "km/hr");
                }
                else
                {
                    currSpeed = 0;
                    System.out.println("\nYou have safely come to a stop.");
                }
            }
        }
    }// brake


    //=======CONSTRUCTOR=======//

    Vehicle()
    {
        model = "basic";
        engineSize = 0.0;
        currSpeed = 0;
    }// Vehicle Constructor


} // Vehicle class

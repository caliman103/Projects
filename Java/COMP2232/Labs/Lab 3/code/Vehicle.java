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

    public void accelerate(int speed, int rate)
    {
        int speedInc = rate; // the size of speed increments

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

    public void brake(int newSpeed)
    {
        int speedInc = 5; // the size of speed increments
        int targetSpeed = newSpeed;

        if(targetSpeed < 0)
        {
            targetSpeed = 0;
        }

        if(currSpeed > targetSpeed)
        {
            //for loop to decrement currSpeed to 0
            for(int i = currSpeed - speedInc; currSpeed > targetSpeed; i -= speedInc)
            {
                if(i > targetSpeed)
                {
                    currSpeed = i;
                    System.out.println("Speed is now " + currSpeed + "km/hr");
                }
                else
                {
                    currSpeed = targetSpeed;
                    System.out.println("\nYou have slowed to your new speed of " + targetSpeed);
                }
            }
        }
        else if(currSpeed == newSpeed)
        {
            System.out.println("\nYou are travelling at " + newSpeed + " km/hr");
        }
        else
        {
            System.out.println("\nYou are already moving slower than " + newSpeed + " km/hr");
        }
    
    }// brake


    //=======CONSTRUCTORS=======//

    Vehicle()
    {
        model = "basic";
        engineSize = 0.0;
        currSpeed = 0;
    }// Vehicle Constructor


} // Vehicle class

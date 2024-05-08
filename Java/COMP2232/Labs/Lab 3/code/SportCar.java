public class SportCar extends Vehicle
{
    private int currSpeed;


    //=======ACCESSORS=======//


    //=======MUTATORS=======//

    public void race()
    {
        System.out.println("Let's race! VROOM-VROOM!");
    }// race

    public void accelerate(int speed)
    {
        int speedInc = 10; // the size of speed increments

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


    //=======CONSTRUCTORS=======//

    public SportCar()
    {
        super();
    }// SportCar

}// SportCar
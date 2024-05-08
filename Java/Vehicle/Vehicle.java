/*Jamaine Drakes
 *Lab 1: Vehicle 
 */

public class Vehicle{

    //data members
    protected String model;
    protected double engineSize;
    protected int currSpeed;
    
    //constructor
    public Vehicle()
    {
        model = "basic";
        engineSize = 0.0;
        currSpeed = 0;
    }//end constructor



    //mutator for model
    public void setModel(String newModel)
    {
        model = newModel;
    }//end setModel function


    //Accessor for model
    public String getModel()
    {
        return model;
    }//end getModel method


    //mutator for engineSize
    public void setEngineSize(double newSize)
    {
        if(newSize > 0)
        {
            engineSize = newSize;
        }//endif

        else{
            System.out.println("Incorrect value for engine size.");
        }//endelse
    }//end setEngineSize function

    //Accessor for engineSize
    public double getEngineSize()
    {   
        return engineSize;

    }//end getEngineSize function


    //accelerate method
    public void accelerate(int maxSpeed)
    {
        System.out.println("Accelerating to " + maxSpeed + "mph");
        for(currSpeed = 0; currSpeed <= maxSpeed; currSpeed = currSpeed + 5)
        {
            System.out.println(currSpeed);
            
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }//end for
        if(currSpeed != maxSpeed)
        {
            currSpeed = maxSpeed;
            System.out.println(currSpeed);
        }//endif
    }//end accelerate method


    //accelerate method
    public void accelerate(int maxSpeed, int rate)
    {
        System.out.println("Accelerating to " + maxSpeed + "mph, in increments of " + rate);
        for(currSpeed = 0; currSpeed <= maxSpeed; currSpeed = currSpeed + rate)
        {
            System.out.println(currSpeed);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }//end for
        if(currSpeed != maxSpeed)
        {
            currSpeed = maxSpeed;
            System.out.println(currSpeed);
        }//endif  
    }//end accelerate method


    //brake method
    public void brake()
    {
        int max = currSpeed;
        System.out.println("Stopping your car");
        for(currSpeed = max; currSpeed >= 0; currSpeed = currSpeed - 5 )
        {
            System.out.println(currSpeed);
            try {
                Thread.sleep(300);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }//end for

        if(currSpeed != 0)
        {
            currSpeed = 0;
            System.out.println(currSpeed);
        }//endif
        System.out.println("You have safely come to a stop!");
    }//end brake method


    //brake method
    public void brake(int newSpeed)
    {
        if(newSpeed > currSpeed)
        {
            System.out.println("Cannot slow to " + newSpeed + "mph. New Speed must be less than " + currSpeed + "mph.");
            return;
        }//endif
        else
        {
            int max = currSpeed;
            System.out.println("Braking to " + newSpeed + "mph");
            for(currSpeed = max; currSpeed >= newSpeed; currSpeed = currSpeed - 5 )
            {
                System.out.println(currSpeed);
                try {
                    Thread.sleep(300);
                } catch (InterruptedException e) {
                    //TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }//end for  
        }//end else 

        if(currSpeed != newSpeed)
        {
            currSpeed = newSpeed;
            System.out.println(currSpeed);
        }//endif
        System.out.println("You have slowed to your new speed of " + currSpeed);
    }//end brake method


}//end Vehicle class
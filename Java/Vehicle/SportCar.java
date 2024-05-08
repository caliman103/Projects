/*Jamaine
 *Lab3: SportCar.java
 */


public class SportCar extends Vehicle
{
    public void race()
    {
        System.out.println("Let's race! VROOM-VROOM!");
    }//end race method


    //overiding accelerate
    public void accelerate(int maxSpeed)
    {
        System.out.println("Accelerating to " + maxSpeed + "mph");
        for(currSpeed = 0; currSpeed <= maxSpeed; currSpeed = currSpeed + 10)
        {
            System.out.println(currSpeed);
            
            try {
                Thread.sleep(200);
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
}//end SportCar

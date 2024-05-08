/*Jamaine Drakes
 *Lab 1: Vehicle 
 */
 
import java.util.Scanner;

public class CarTest
{
    public static void main(String[] args) 
    {
        Scanner myScanner = new Scanner(System.in);    

        System.out.println("Enter the model and engine size of the vehicle respectively: ");
        String model = myScanner.nextLine(); 
        double engineSize = myScanner.nextDouble();


        Vehicle myCar = new Vehicle();

        myCar.setModel(model);
        myCar.setEngineSize(engineSize);

        System.out.println("Please enter a speed for your car");
        int speed = myScanner.nextInt();

        myCar.accelerate(speed);

        System.out.println("Do you wish to stop? If yes please type \'y\' if no type \'n\'");
        char answer = myScanner.next().charAt(0);

        while(answer == 'n')
        {
            System.out.println("Your car is travelling at " + speed);
            System.out.println("Do you with to stop? (y/n)");
            answer = myScanner.next().charAt(0);
        }//end while

        if(answer == 'y')
        {
            myCar.brake();
        }//endif
        


        myCar.accelerate(speed, 7);
        myCar.brake(23);

        myScanner.close();

    }//end main
}//end CarTest class

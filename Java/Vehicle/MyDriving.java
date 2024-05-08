/*Jamaine
 *Lab3: SportCar.java
 */
import java.util.Scanner;

public class MyDriving 
{
    public static void main(String[] args) 
    {
        //Object of type FamilyCar
        FamilyCar familyCar;

        //Object of type SportCar
        SportCar sportCar = new SportCar();

        Scanner myScanner = new Scanner(System.in);

        System.out.println("Would you like to drive the family car or sport car (F/S)");
        char type = myScanner.next().charAt(0);

        if(type == 'F' || type == 'f')
        {
            System.out.println("You have chosen the family car!");
            familyCar = new FamilyCar();
            System.out.println("You have " + familyCar.getMAX_SEATS() + " seats in your car");
            familyCar.carPool();
            System.out.println();

            System.out.println("What speed do you want to drive your family car at?");
            int speed = myScanner.nextInt();

            familyCar.accelerate(speed);

            System.out.println("You have reached your destination, now you will come to a full stop.");
            try {
                Thread.sleep(1000);
            } catch (Exception e) {
                //TODO: handle exception
            }
            familyCar.brake();


        }//endif

        if(type == 'S' || type == 'S')
        {
            System.out.println("You have chosen the sport car!");
            sportCar = new SportCar();
            sportCar.race();

            System.out.println("What speed do you want to drive your sport car at?");
            int speed = myScanner.nextInt();

            sportCar.accelerate(speed);

            System.out.println("You have reached your destination, now you will come to a full stop.");
            try {
                Thread.sleep(1000);
            } catch (Exception e) {
                //TODO: handle exception
            }
            sportCar.brake();

        }//endif


        

        myScanner.close();
    }//end main
}//end MyDriving

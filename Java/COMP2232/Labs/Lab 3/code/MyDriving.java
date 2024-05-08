import java.util.Scanner;

public class MyDriving 
{
    public static void main(String args[])
    {
        FamilyCar myFamilyCar = new FamilyCar();
        SportCar mySportCar = new SportCar();

        System.out.print("What Car would you like to drive?\n\n1.\tFamily Car\n2.\tSports Car\n\nInput: ");

        Scanner myScanner = new Scanner(System.in);

        int choice = myScanner.nextInt();

        System.out.println("\n\nHow fast do you want to go? ");

        int speed = myScanner.nextInt();

        switch(choice)
        {
            case 1: 
                myFamilyCar.carPool();
                myFamilyCar.accelerate(speed);
            break;

            case 2:
                mySportCar.race();
                mySportCar.accelerate(speed);
            break;

            default:
                System.out.println("???????????????????????");
            break;
        }

    }
}

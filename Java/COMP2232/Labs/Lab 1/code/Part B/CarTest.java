import java.util.Scanner;

public class CarTest
{
    public static void main ( String args [] )
    {
        Scanner myScanner = new Scanner(System.in);

        boolean checkValid = false; // bool for use in error handling loops

        // Ask user for model and engine size
        System.out.println("Please enter the requested information.\n");

        System.out.print("Car Model: ");
        String newModel = myScanner.nextLine(); // car model

        System.out.print("Engine Size: ");
        Double newEngSize = myScanner.nextDouble(); // engine size

        // Create Vehicle object MyCar
        Vehicle MyCar = new Vehicle();

        // Store user's car info in MyCar
        MyCar.setModel(newModel);
        MyCar.setEngineSize(newEngSize);

        // ask user for car speed
        System.out.print("\nEnter a speed: ");
        int newSpeed = myScanner.nextInt();

        // accelerate car to speed
        MyCar.accelerate(newSpeed);

        int loopStop = 0; // int to regulate the dowhile loop

        // start LOOP
        do
        {
            // ask user if they want to stop
            System.out.print("\nWould you like to Stop (0/1)? ");
            loopStop = myScanner.nextInt();

            // user says no
            if(loopStop == 0)
            {
                // display speed, allow LOOP restart
                System.out.println("\nOk, continuing at " + newSpeed + " km/hr.");
            }
            // user says yes
            else
            {
                // allow LOOP end
                System.out.println("\nOk, braking...");
            }
        } while (loopStop == 0);
        // end LOOP

        // stop car
        MyCar.brake();

        // display car info
        System.out.println("\nCar Model: " + MyCar.getModel() + "\nEngine Size: " + MyCar.getEngineSize());

        // thank user
        System.out.println("\nThank you for taking this car for a test drive!");
    }
}

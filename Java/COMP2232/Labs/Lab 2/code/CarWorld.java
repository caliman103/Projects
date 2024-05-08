import java.util.Scanner;
import java.util.WeakHashMap;

public class CarWorld
{
    public static void main( String args [] )
    {
        Scanner myScanner = new Scanner(System.in);

        //create Worshop object myShop
        Workshop myShop = new Workshop();

        //ask user for the model and engine size of 5 vehicles

        String newModel; //the vehicle model the user will enter
        float newEngSize; //the engine size the user will enter
        Vehicle newVehicle = new Vehicle(); //object to hold info 

        for(int i = 0; i <= 4; i++)
        {
            System.out.println("\n" + (5-i) + " entries remaining.");

            System.out.print("\nPlease enter the vehicle model: ");
            newModel = myScanner.nextLine();

            System.out.print("Please enter the vehicle's engine size: ");
            newEngSize = myScanner.nextFloat();
            

            //create the corresponding vehicle objects and add them to myShop
            newVehicle.setModel(newModel);
            newVehicle.setEngineSize(newEngSize);

            myShop.addVehicle(newVehicle,i);

            newModel = myScanner.nextLine();

            newVehicle = new Vehicle();
        }

        //ask the user for a number between 0 and 4, show them the vehicle in that slot
        int vehicleNum;

        System.out.print("Enter a number between 0 and 4: ");
        vehicleNum = myScanner.nextInt();

        System.out.println
        (
            "Vehicle at Position " + vehicleNum +
            "\nModel: " + myShop.getVehicle(vehicleNum).getModel() +
            "\nEngine Size: " + myShop.getVehicle(vehicleNum).getEngineSize()
        );

        //ask the user what speed they want to accelerate to
        System.out.println("\nWhat speed do you want to accelerate to?");
        int newSpeed = myScanner.nextInt();

        //ask if they want to choose the rate
        System.out.println("Do you want to choose the rate of acceration? (1/0)");
        int choice = myScanner.nextInt();

        if(choice == 1) //if yes, ask them for the rate and call the appropriate method
        {
            System.out.print("Enter the rate of acceleration: ");
            int accelerateRate = myScanner.nextInt();
            myShop.getVehicle(vehicleNum).accelerate(newSpeed, accelerateRate);
        }
        else//if no, call the appropriate method
        {
            myShop.getVehicle(vehicleNum).accelerate(newSpeed);
        }
        
        //ask the user if they want to come to a full stop, or just slow down
        System.out.println("\nDo you want to come to a full stop? (1/0)");
        choice = myScanner.nextInt();

            if(choice == 1)//if full stop, call the appropriate method
            {
                myShop.getVehicle(vehicleNum).brake();
            }
            else//if slow down, ask them for the target speed and call the apprpriate method
            {
                System.out.println("What speed do you want to slow to?");
                int brakeSpeed = myScanner.nextInt();
                
                myShop.getVehicle(vehicleNum).brake(brakeSpeed);
            }
    }
}

/*Jamaine Drakes
 *Lab 2: CarWorld.java
  */

import java.util.Scanner;

public class CarWorld
{
public static void main(String[] args) 
{
    Scanner myScanner = new Scanner(System.in);      
    
    Workshop myShop = new Workshop();
   // Vehicle tempVehicle1 = new Vehicle();
    //Vehicle tempVehicle2 = new Vehicle();

    
    System.out.println("Please enter 5 vehicle models and engine sizes ");
    for(int i = 0; i < 5; i++)
    {
        Vehicle tempVehicle = new Vehicle();
        System.out.print("Vehicle " + (i + 1) + ".\n" );

        System.out.print("Model: ");
        tempVehicle.setModel(myScanner.next() );

        System.out.print("Engine Size: ");
        tempVehicle.setEngineSize(myScanner.nextDouble() );

        myShop.addVehivle(tempVehicle, i);
        
        System.out.println();
    }//end for
  
    
    /*
    System.out.println(myShop.amount() );
    System.out.println();

    System.out.print("Model: ");
    tempVehicle1.setModel(myScanner.next() );

    System.out.print("Engine Size: ");
    tempVehicle1.setEngineSize(myScanner.nextDouble() );

    myShop.addVehivle(tempVehicle1, 0);



    System.out.print("Model: ");
    tempVehicle2.setModel(myScanner.next() );

    System.out.print("Engine Size: ");
    tempVehicle2.setEngineSize(myScanner.nextDouble() );

    myShop.addVehivle(tempVehicle2, 1);

    

    System.out.println("\t\t\t\t\t\tListing Cars");
    for(int i = 0; i < 5; i++)
    {
        System.out.println(myShop.getVehicleAString(i) );
        System.out.println();
    }//end for

    */
    
    System.out.println("Please enter a number between '0' and '4' (inclusive)");
    int position = myScanner.nextInt();
    System.out.println();

    System.out.println("Vehicle at possition " + position + ":");
    System.out.println(myShop.getVehicleAString(position) );
    
    Vehicle tempVehicle = new Vehicle();
    tempVehicle = myShop.getVehicle(position);

    System.out.println();
    System.out.println("What speed to do want to accelerate to?");
    int maxSpeed = myScanner.nextInt();

    System.out.println("Do you want to specify rate? (y/n)");
    char answer = myScanner.next().charAt(0);
    System.out.println();
    
    if(answer == 'y')
    {
        System.out.println("Please specify rate");
        int rate = myScanner.nextInt();

        tempVehicle.accelerate(maxSpeed, rate);
    }//end if

    if(answer == 'n')
    {
        System.out.println("No problem, your car will accelerate in increments of 5");

        tempVehicle.accelerate(maxSpeed);
    }//endif


    System.out.println("Do you want to come to a full stop? (y/n)");
    char ans = myScanner.next().charAt(0);
    System.out.println();
    
    if(ans == 'y')
    {
        System.out.println("Ok your vehicle will come to a full stop");
        tempVehicle.brake();
    }//end if

    if(ans == 'n')
    {
        System.out.println("No problem, please specify the new speed you want to travel at");
        int newSpeed = myScanner.nextInt();

        tempVehicle.brake(newSpeed);
    }//endif



    System.out.println();
    System.out.println("\t\t\t\tTHE END");
    myScanner.close();

    
}// end Main
}//end CarWorld class
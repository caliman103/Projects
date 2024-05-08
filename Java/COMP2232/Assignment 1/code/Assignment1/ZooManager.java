/*Jamine Drakes
 *ZooManager.java
 */

import java.util.Scanner; 
import java.util.Random;
public class ZooManager 
{
    public static void main(String[] args) 
    {

         
        //=============================================================================================================================//
        //                                                       Introduction
        //=============================================================================================================================//
        System.out.println("===============================================================================================================================");
        System.out.println("                                                 WELCOME TO THE ZOO PROGRAM                                                    ");
        System.out.println("===============================================================================================================================");
        System.out.println("In this program you will be the zoo keeper of your zoo.");

        //=============================================================================================================================//
        //                                       Creating zookeeper and myscanner and generator object                                 //
        //=============================================================================================================================//
      
        //Used to read user input
        Scanner myScanner = new Scanner(System.in);

        //Used to reset hunger and health status after completion of task 3 or 4
        Random generator = new Random();

        
        ZooKeeper zooKeeper = new ZooKeeper(); //carries methods in the zoo
        System.out.println("Please enter your first name.");
        System.out.print("First Name: ");
        zooKeeper.setName(myScanner.next() );
        
       
        System.out.println();
    
        System.out.println("===============================================================================================================================");
        System.out.println("                                                   INSTRUCTIONS FOR PROGRAM                                                    ");
        System.out.println("===============================================================================================================================");
        System.out.print(zooKeeper.getName() + " as the zoo keeper you have a list of tasks you can carry out. In order to do a task ");
        System.out.println("you must enter the\nappropriate number associated with the task. The list of tasks and associated numbers are provided below:");
        System.out.println();
        System.out.println("===============================================================================================================================");
        System.out.println("                                                      TASK SELECTION MENU                                                      ");
        System.out.println("===============================================================================================================================");
        System.out.println();
        System.out.println("                                        ==========================================");
        System.out.println("                                        +                 TASKS                  +");
        System.out.println("                                        ==========================================");
        System.out.println("                                        +      1. Add animals to the zoo         +");
        System.out.println("                                        ==========================================");
        System.out.println("                                        +  2. View animals currenly in your zoo  +");
        System.out.println("                                        ==========================================");
        System.out.println("                                        + 3. View animals removed from your zoo  +");
        System.out.println("                                        ==========================================");
        System.out.println("                                        +         4. Feed your animals           +" );
        System.out.println("                                        ==========================================");
        System.out.println("                                        +         5. Heal your animals           +");
        System.out.println("                                        ==========================================");
        System.out.println("                                        +         -1. Exit the program           +");
        System.out.println("                                        ==========================================");
        
        System.out.println();

        System.out.println("Please enter the task number you would like to carry out (1-5), if you wish to terminate the program enter -1.");
        System.out.print("I would like to do task: ");
        int task = myScanner.nextInt();

        

        
        //=============================================================================================================================//
        //                                        Creating zoo and removed object for tasks                                            //
        //=============================================================================================================================//
        Zoo zoo = new Zoo();//holds animals currently in the zoo
        Zoo removed = new Zoo();//holds any animals that died in the zoo

        while(task != -1)//User does not want to end program
        {
            switch (task) //decides whihc task the user wants to do
            {
                //====================================================================================================================//
                //                                                   Adding animals to the zoo                                        // 
                //====================================================================================================================//
                case 1:
                    
                    System.out.println();
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                      TASK 1: ADDING ANIMALS                                                   ");
                    System.out.println("===============================================================================================================================");
                    System.out.println("Please enter the number of animals you want to add to your zoo.");
                    System.out.print("Number of animals: ");
                    int amountofAnimals = myScanner.nextInt();
                    while(amountofAnimals <= 0)
                    {
                        System.out.println();
                        System.out.println("Please choose a number greater then 0");
                        System.out.print("Number of animals: ");
                        amountofAnimals = myScanner.nextInt();
                    }
                    System.out.println();
                    System.out.println("Please enter the species, name and age of your " + amountofAnimals + " animal(s)." );  
                    System.out.println("Sample information is provided below:");
                    System.out.println("               ===============================");
                    System.out.println("                        Species: Lion                  ");
                    System.out.println("                        Name: Simba                    ");
                    System.out.println("                        Age: 2                         ");
                    System.out.println("               ===============================");
                    
                    System.out.println("Please remember to capitalise the first letter of the species, as shown above.");
                    System.out.println();

                    for(int i = 0; i < amountofAnimals; i++)
                    {
                        System.out.print("Animal " + (zoo.amount() + 1) + ".\n" );
                        //Determine species of animal
                        System.out.print("Species: ");
                        String species = myScanner.next();

                        switch(species)
                        {
                            //User want to add a tiger to the zoo
                            case "Tiger":
                                Tiger tiger = new Tiger();
                                
                                System.out.print("Name: ");
                                tiger.setName(myScanner.next() );

                                System.out.print("Age: ");
                                tiger.setAge(myScanner.nextInt());
                                
                                zoo.addAnimal(tiger);
                                break;

                            //User wants to add a lion to the zoo
                            case "Lion":
                                Lion lion = new Lion();

                                System.out.print("Name: ");
                                lion.setName(myScanner.next() );

                                System.out.print("Age: ");
                                lion.setAge(myScanner.nextInt());
                                
                                zoo.addAnimal(lion);
                                break;
                            
                            //User wants to add a peacock to the zoo
                            case "Peacock":
                                Peacock peacock = new Peacock();

                                System.out.print("Name: ");
                                peacock.setName(myScanner.next() );

                                System.out.print("Age: ");
                                peacock.setAge(myScanner.nextInt());
                                
                                zoo.addAnimal(peacock);
                                break;

                            //User wants to add a horse to the zoo
                            case "Horse":
                                Horse horse = new Horse();

                                System.out.print("Name: ");
                                horse.setName(myScanner.next() );

                                System.out.print("Age: ");
                                horse.setAge(myScanner.nextInt());
                                
                                zoo.addAnimal(horse);
                                break;
                            //User wants to add a elephant to the zoo
                            case "Elephant":
                                Elephant elephant = new Elephant();

                                System.out.print("Name: ");
                                elephant.setName(myScanner.next() );

                                System.out.print("Age: ");
                                elephant.setAge(myScanner.nextInt());
                                
                                zoo.addAnimal(elephant);
                                break;

                            //User wants to add an animal of a different species than the ones identified above
							
                            default:
                                Animal animal = new Animal();

                                animal.setSpecies(species);

                                System.out.print("Name: ");
                                animal.setName(myScanner.next() );

                                System.out.print("Age: ");
                                animal.setAge(myScanner.nextInt());
                                
                                zoo.addAnimal(animal);
                                break;
							
                        }//end switch for species
                        
                        System.out.println();
                    }//end for

                    System.out.println(zoo.getAnimal(0).getSpecies() );

                    System.out.println();
                    System.out.println("Congrats " + zooKeeper.getName() + ", you now have " + zoo.amount() + " animals in your zoo!");
                    System.out.println();
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                      TASK SELECTION MENU                                                      ");
                    System.out.println("===============================================================================================================================");
                    System.out.println("Please enter the task number you would like to carry out. (1-5), if you wish to terminate the program enter -1.");
                    System.out.println();
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +                 TASKS                  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +      1. Add animals to the zoo         +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +  2. View animals currenly in your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        + 3. View animals removed from your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         4. Feed your animals           +" );
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         5. Heal your animals           +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         -1. Exit the program           +");
                    System.out.println("                                        ==========================================");
                    System.out.println();

                    System.out.print("I would like to do task: ");
                    task = myScanner.nextInt();
                    System.out.println();
                    break;

                //====================================================================================================================//
                //                                                   Viewing animals in the zoo: Current                              // 
                //====================================================================================================================//
                case 2:    
                    
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                               TASK 2: VIEWING YOUR ANIMALS                                                    ");
                    System.out.println("===============================================================================================================================");
                    System.out.println();

                    System.out.println("Below is a list of all the animals currently in your zoo.");
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                    CURRENTLY IN ZOO:                                                           ");
                    System.out.println("===============================================================================================================================");
                    System.out.println(zoo.getAllAnimalsString() );
                
                    System.out.println(zooKeeper.getName() + ", you have successfully completed task 2, your animals were happy to see you!");
                    System.out.println();
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                      TASK SELECTION MENU                                                      ");
                    System.out.println("===============================================================================================================================");
                    System.out.println("Please enter the task number you would like to carry out. (1-5), if you wish to terminate the program enter -1.");
                    System.out.println();
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +                 TASKS                  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +      1. Add animals to the zoo         +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +  2. View animals currenly in your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        + 3. View animals removed from your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         4. Feed your animals           +" );
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         5. Heal your animals           +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         -1. Exit the program           +");
                    System.out.println("                                        ==========================================");
                    System.out.println();

                    System.out.print("I would like to do task: ");
                    task = myScanner.nextInt();
                    System.out.println();
                    break;


                //====================================================================================================================//
                //                                                   Viewing animals in the zoo: Removed                              // 
                //====================================================================================================================//
                case 3:
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                               TASK 3: REMOVED ANIMALS                                                    ");
                    System.out.println("===============================================================================================================================");
                    System.out.println();

                    System.out.println("This list shows below all animals that have unfortunately passed away in your zoo.");
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                     REMOVED FROM ZOO:                                                         ");
                    System.out.println("===============================================================================================================================");
                    System.out.println(removed.getAllAnimalsString() );
                
                    System.out.println(zooKeeper.getName() + ", you have completed task 3");
                    System.out.println();
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                      TASK SELECTION MENU                                                      ");
                    System.out.println("===============================================================================================================================");
                    System.out.println("Please enter the task number you would like to carry out. (1-5), if you wish to terminate the program enter -1.");
                    System.out.println();
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +                 TASKS                  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +      1. Add animals to the zoo         +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +  2. View animals currenly in your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        + 3. View animals removed from your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         4. Feed your animals           +" );
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         5. Heal your animals           +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         -1. Exit the program           +");
                    System.out.println("                                        ==========================================");
                    System.out.println();

                    System.out.print("I would like to do task: ");
                    task = myScanner.nextInt();
                    System.out.println();
                    break;

                //====================================================================================================================//
                //                                                   Feeding animals in the zoo                                       // 
                //====================================================================================================================//
                case 4:
                    System.out.println();
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                               TASK 4: FEEDING YOUR ANIMALS                                                    ");
                    System.out.println("===============================================================================================================================");

                    System.out.print("IMPORTANT: In order to make your animals happy and feed them well." );
                    System.out.println(" You need to enter the correct amount of food to give them a\nhunger status of 5.");
                    System.out.println("Otherwise yours animal may die from overfeeding or starvation.");
                    System.out.println();

                    
                    //feed all animals that have a hunger status lower than 5
                    for(int i = 0; i < zoo.amount(); i++)
                    {   
                        if(zoo.getAnimal(i).getHungerStatus() == 5)
                        {
                            System.out.println(zoo.getAnimal(i).getName() + " the "+ zoo.getAnimal(i).getSpecies() + " is already full and doesn't need to be fed." );
                        
                        }//endif
                        else
                        {
                            System.out.println();
                            System.out.println("Time to feed " + zoo.getAnimal(i).getName() + " the " + zoo.getAnimal(i).getSpecies() + ".");
                            System.out.println(zoo.getAnimal(i).getName() + " has a hunger status of " + zoo.getAnimal(i).getHungerStatus() + "." );
                            
                            System.out.println("Please enter the amount to feed " + zoo.getAnimal(i).getName() + " to make them a happy " + zoo.getAnimal(i).getSpecies()  + ".");
                            int food = myScanner.nextInt();

                            zooKeeper.feedAnimal(zoo.getAnimal(i), food);
                            System.out.println(zoo.getAnimal(i).getName() + " is eating...");
                                
                                try {
                                    Thread.sleep(1000);
                                } catch (InterruptedException e) {
                                    // TODO Auto-generated catch block
                                    e.printStackTrace();
                                }
                            System.out.println();
                        }//end else
                    }//end for

                    System.out.println("Animals that have died:");
                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");

                    //Determine which animals have died
                    //Underfed
                    for(int i = 0; i < zoo.amount(); i++)
                    { 
                        if(zoo.getAnimal(i).getHungerStatus() > 5)
                        {
                            System.out.println();
                            System.out.println("Unforunately " + zoo.getAnimal(i).getName() + " died from being overfed and was removed from your zoo.");
                            removed.addAnimal(zoo.getAnimal(i));
                            zoo.removeAnimal(i);
                        }//endif
                    }
                    //Overfed
                    for(int i = 0; i < zoo.amount(); i++)
                    {    
                        if(zoo.getAnimal(i).getHungerStatus() < 5)
                        {
                            System.out.println();
                            System.out.println("Unforunately " + zoo.getAnimal(i).getName() + " died from being underfed and was removed from your zoo.");
                            removed.addAnimal(zoo.getAnimal(i));
                            zoo.removeAnimal(i);
                        }//endif
                    }//end for

                    System.out.println();
                    System.out.println(removed.amount() + " of your animals have died and are now in the removed section.");
                    System.out.println();

                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");
                    System.out.println();

                    System.out.println("Animals currently in zoo:");
                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");

                    //show animals that are alive
                    for(int i = 0; i < zoo.amount(); i++)
                    {
                        System.out.println(zoo.getAnimal(i).getName() + " says " + zoo.getAnimal(i).Speak() + "!!, to show that they are happy to be fully fed. ");
                        System.out.println();
                    }//end for

                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");

                    System.out.println();
                    System.out.println(zooKeeper.getName() + ", you have  completed task 4, and fed your animals!");
                    System.out.println("If you wish to randomly reset the hunger status of your animals type \"Yes\" (without quotations).");
                    System.out.println("If you do not type any letter.");
                    System.out.print("Reset: ");
                    String resetHunger = myScanner.next();
                    if(resetHunger.equals("Yes") )
                    {
                        //reset hunger status of all animals currently in the zoo
                        for(int i = 0; i < zoo.amount(); i++)
                        {
                            zoo.getAnimal(i).setHungerStatus(generator.nextInt(5) + 1);
                        }//end for   
                        System.out.println("The hunger status of your " + zoo.amount() + " has been reset");
                    }//end if

                    System.out.println();
                    
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                      TASK SELECTION MENU                                                      ");
                    System.out.println("===============================================================================================================================");
                    System.out.println("Please enter the task number you would like to carry out. (1-5), if you wish to terminate the program enter -1.");
                    System.out.println();
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +                 TASKS                  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +      1. Add animals to the zoo         +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +  2. View animals currenly in your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        + 3. View animals removed from your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         4. Feed your animals           +" );
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         5. Heal your animals           +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         -1. Exit the program           +");
                    System.out.println("                                        ==========================================");
                    System.out.println();

                    System.out.print("I would like to do task: ");
                    task = myScanner.nextInt();
                    System.out.println();
                    break;


                //====================================================================================================================//
                //                                                   Healing animals in the zoo                                       // 
                //====================================================================================================================//
                case 5:
                    System.out.println();
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                               TASK 5: HEALING YOUR ANIMALS                                                    ");
                    System.out.println("===============================================================================================================================");
                    System.out.println();
                    System.out.print("IMPORTANT: Your task is to make your animals happy and healthy." );
                    System.out.println("You need to enter the correct amount of medicine to give them a health status of 8, 9 or 10.");
                    System.out.println("If the health status of your animals is not within this range they will die from either lack of medicine or overdosing.");
                    System.out.println();

                    //heal all animals that have a hunger status lower than 8
                    for(int i = 0; i < zoo.amount(); i++)
                    {   
                        if(zoo.getAnimal(i).getHealthStatus() >= 8)
                        {   
                            System.out.println();
                            System.out.println(zoo.getAnimal(i).getName() + " the "+ zoo.getAnimal(i).getSpecies() + " is already healthy." );
                        
                        }//endif
                        else
                        {
                            System.out.println();
                            System.out.println("Time to heal " + zoo.getAnimal(i).getName() + " the " + zoo.getAnimal(i).getSpecies() + ".");
                            System.out.println(zoo.getAnimal(i).getName() + " has a health status of " + zoo.getAnimal(i).getHealthStatus() + "." );
                            
                            System.out.println("Please enter the amount of medicine to give " + zoo.getAnimal(i).getName() + " to make them a healthy " + zoo.getAnimal(i).getSpecies()  + ".");
                            int medicine = myScanner.nextInt();

                            zooKeeper.healAnimal(zoo.getAnimal(i), medicine);
                            System.out.println(zoo.getAnimal(i).getName() + " is taking medicine...");
                                
                                try {
                                    Thread.sleep(1000);
                                } catch (InterruptedException e) {
                                    // TODO Auto-generated catch block
                                    e.printStackTrace();
                                }
                            System.out.println();
                        }//end else
                    }//end for

                    System.out.println("Animals that have died:");
                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");

                    //determine which animals have died
                    //OverDose
                    for(int i = 0; i < zoo.amount(); i++)
                    { 
                        if(zoo.getAnimal(i).getHealthStatus() > 10)
                        {
                            System.out.println();
                            System.out.println("Unforunately " + zoo.getAnimal(i).getName() + " died form an overdose and was removed from your zoo.");
                            removed.addAnimal(zoo.getAnimal(i));
                            zoo.removeAnimal(i);
                        }//endif
                    }
                    //Underdose
                    for(int i = 0; i < zoo.amount(); i++)
                    {
                        if(zoo.getAnimal(i).getHealthStatus() < 8)
                        {
                            System.out.println();
                            System.out.println("Unforunately " + zoo.getAnimal(i).getName() + " died from a lack of medicine and was removed from your zoo.");
                            removed.addAnimal(zoo.getAnimal(i));
                            zoo.removeAnimal(i);
                        }//endif
                    }//end for
                    System.out.println();
                    System.out.println(removed.amount() + " of your animals have died and are now in the removed section.");
                    System.out.println();

                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");
                    System.out.println();

                    System.out.println("Animals currently in zoo:");
                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");

                    //show animals that are alive
                    for(int i = 0; i < zoo.amount(); i++)
                    {
                        System.out.println(zoo.getAnimal(i).getName() + " says " + zoo.getAnimal(i).Speak() + "!!, to show that they are happy to be fully healed. ");
                        System.out.println();
                    }//end for

                    System.out.println("------------------------------------------------------------------------------------------------------------------------------");

                
                    System.out.println();
                    System.out.println(zooKeeper.getName() + ", you have  completed task 5, and healed your animals!");
                    System.out.println("If you wish to randomly reset the health status of your animals type \"Yes\" (without quotations).");
                    System.out.println("If you do not simply type any letter.");
                    System.out.print("Reset: ");
                    String resetHealth = myScanner.next();
                    if(resetHealth.equals("Yes") )
                    {
                        //reset hunger status of all animals currently in the zoo
                        for(int i = 0; i < zoo.amount(); i++)
                        {
                            zoo.getAnimal(i).setHealthStatus(generator.nextInt(10) + 1);
                        }//end for   
                        System.out.println("The health status of your " + zoo.amount() + " has been reset");
                    }//end if

                    System.out.println();
                    
                    System.out.println("===============================================================================================================================");
                    System.out.println("                                                      TASK SELECTION MENU                                                      ");
                    System.out.println("===============================================================================================================================");
                    System.out.println("Please enter the task number you would like to carry out. (1-5), if you wish to terminate the program enter -1.");
                    System.out.println();
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +                 TASKS                  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +      1. Add animals to the zoo         +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +  2. View animals currenly in your zoo  +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +  3. View animals removed from your zoo +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         4. Feed your animals           +" );
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         5. Heal your animals           +");
                    System.out.println("                                        ==========================================");
                    System.out.println("                                        +         -1. Exit the program           +");
                    System.out.println("                                        ==========================================");
                    System.out.println();

                    System.out.print("I would like to do task: ");
                    task = myScanner.nextInt();
                    System.out.println();
                    break;

        
                default:
                    System.out.println("The value you have entered is out of range, please enter either 1, 2, 3, 4, 5, or -1");
                    System.out.print("I would like to do task: ");
                    task = myScanner.nextInt();
                    System.out.println();
            }//end switch for task

        }//end while


        //User wants to exit program
        if(task == -1)
        {
            System.out.println("===============================================================================================================================");
            System.out.println("                                                             GOODBYE                                                           ");
            System.out.println("===============================================================================================================================");
            System.out.println(zooKeeper.getName() + ", thank you very much for using the zoo program. Plese come again soon and have a nice day!");
            System.out.println();
            System.out.println();
            myScanner.close();
            System.exit(1);
        }//endif
        
        
        
    }//end main
}//end Zoomanager

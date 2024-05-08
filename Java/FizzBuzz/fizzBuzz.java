/*
ClassName: fizzBuzz.java
Author: Jamaine Drakes
Purpose: 
Start Date: Jul 13, 2022
Last Edit: Jul 13, 2022
*/

//========================================================================================//
//                                     LIBRARIES                                          //
//========================================================================================//
import java.util.Scanner;

public class fizzBuzz
{
    //========================================================================================//
    //                                    DATA MEMBERS                                        //
    //========================================================================================//
    

    //========================================================================================//
    //                                    CONSTRUCTOR                                         //
    //========================================================================================//


    //========================================================================================//
    //                                     ACCESSORS                                          //
    //========================================================================================//


    //========================================================================================//
    //                                      MUTATORS                                          //
    //========================================================================================//


    //========================================================================================//
    //                                    OTHER METHODS                                       //
    //========================================================================================//
    
    public static void main(String[] args) 
    {
        int num1 = 0;
        int num2 = 0;
        Scanner myScanner = new Scanner(System.in);
        
        System.out.println("Please enter 2 numbers greater than 0");
        
        num1 = myScanner.nextInt();
        num2 = myScanner.nextInt();

        //switch the values of the 2 numbers entered by the user if the first value
        //is bigger then the second value. This ensures that the first value is smaller
        //and makes determining the range of numbers easier
       
        if(num1 > num2)
        {
            int temp = num1;
            num1 = num2;
            num2 = temp;
        }//endif

        System.out.println("\n");
        for (int i = num1; i <= num2; i++)
        {
            int value = i % 3;

            switch (value)
            {
                case 0:
                    if(i % 5 == 0)
                    {
                        System.out.println("FizzBuzz");
                    }
                    else
                    {
                        System.out.println("Fizz");
                    }
                    break;
                
                default:
                    if(i % 5 == 0)
                    {
                        System.out.println("Buzz");
                    }
                    else
                    {
                        System.out.println(i);
                    }
                    break;
            }//end switch
            System.out.println("\n");
        }//end for  

        myScanner.close();
    }//end main

}// end fizzBuzz
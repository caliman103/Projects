/*Jamaine Drakes
 *Lab 4: Word Fun
 */ 

import java.util.Scanner;
 
public class WordFun
{
    public static void main(String[] args)
    {
        RandomAbsurdities randomSentences = new RandomAbsurdities();

        int loop = 1;
        String answer = "";
        Scanner myScanner = new Scanner(System.in);

        System.out.println();
        while(loop != -1)
        {
            System.out.println("Do you want to provide a name to be used in your sentence (yes/no)");
            answer = myScanner.next();

                if(answer.equals("Yes") || answer.equals("yes"))
                {
                    System.out.println();
                    System.out.println("Please enter the name you want added to your sentence");
                    String name = myScanner.next();

                    
                    System.out.print("Your random sentence is:\t" + randomSentences.generateAbsurdity(name) );
                    System.out.println();
                }//end if
                else
                {
                    System.out.println();
                    System.out.print("Your random sentence is:\t" + randomSentences.generateAbsurdity() );
                    System.out.println();
                }//endelse
                    
            System.out.println("Enter -1 if you with to exit the program, enter any other number if you wish to continue");
            loop = myScanner.nextInt();
            System.out.println();
        }//end while

        System.out.println("Goodbye!!");

        myScanner.close();
    }//end main
}//end WordFun

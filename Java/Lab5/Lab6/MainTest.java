import java.io.File;
import java.io.FileWriter;
import java.util.Scanner;

 
public class MainTest
{
    public static void main(String[] args) throws Exception
    {
        
        Tester randomSentences = new Tester();

        //File for writing to
        File outFile = new File("absurdities.txt");


        //Create the FileWriter Object
        FileWriter absurditiesFileWriter = new FileWriter(outFile);


        
        int loop = 1; //Determines if to terminate prgram ( will terminate if loop becomes -1)
        String answer = ""; //Holds the answer for whether the user wants to enter a name of not
        String sentence = "";  //Holds the randomly generated sentence
       
        Scanner myScanner = new Scanner(System.in); //used to read input from user 

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

                    //generates random  sentence and stores it in the variable
                    sentence =  randomSentences.generateAbsurdity(name) + "\n";

                    System.out.print("Your random sentence is:\t" + sentence );
                    
                    absurditiesFileWriter.write(sentence);
                    System.out.println();
                }//end if
                else
                {
                    //generates random  sentence and stores it in the variable
                    sentence = randomSentences.generateAbsurdity() + "\n";

                    System.out.println();
                    System.out.print("Your random sentence is:\t" + sentence);
                    absurditiesFileWriter.write(sentence);
                    System.out.println();
                }//endelse
                    
            System.out.println("Enter -1 if you with to exit the program, enter any other number if you wish to continue");
            loop = myScanner.nextInt();
            System.out.println();
        }//end while

        System.out.println("Goodbye!!");

        absurditiesFileWriter.close();
        myScanner.close();
    }//end main
}//end WordFun



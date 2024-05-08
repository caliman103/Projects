

import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;

//import java.io.IOException;
import java.util.Random;

//import java.io.IOException;

public class Tester 
{


    //data members
    //Arraylists
    private ArrayList<String> ListA = new ArrayList<String>();
    private ArrayList<String> ListB = new ArrayList<String>();
    private ArrayList<String> ListC = new ArrayList<String>();
 

     //File to be read from
     private File ListAFile = new File("ListA.txt");
     private File ListBFile = new File("ListB.txt");
     private File ListCFile = new File("ListC.txt");

    
    
    //constructor 
    public Tester() throws Exception
    {   
        //File Readers
        Scanner listAFileReader = new Scanner(ListAFile);
        Scanner listBFileReader = new Scanner(ListBFile);
        Scanner listCFileReader = new Scanner(ListCFile);

        //Initialist ListA with phrases from the file ListA.txt
        while(listAFileReader.hasNext())
        {
            ListA.add(listAFileReader.nextLine());
        }//endwhile

        //Initialist ListB with phrases from the file ListB.txt
        while(listBFileReader.hasNext())
        {
            ListB.add(listBFileReader.nextLine());
        }//endwhile


        //Initialist ListC with phrases from the file ListC.txt
        while(listCFileReader.hasNext())
        {
            ListC.add(listCFileReader.nextLine());
        }//endwhile
        
        listAFileReader.close();
        listBFileReader.close();
        listCFileReader.close();
        /*
        //Initialising List A
        ListA.add("The woman");
        ListA.add("The cat");
        ListA.add("The grass");
        ListA.add("The well");
        ListA.add("The ballet teacher");
        ListA.add("The tree");
        ListA.add("The plate");
        ListA.add("The moon");
        */

        /*
        //Initialising List B
        ListB.add("fell into");
        ListB.add("ran over");
        ListB.add("ate");
        ListB.add("sat on");
        ListB.add("danced on");
        ListB.add("jumped on");
        ListB.add("climbed");
        ListB.add("winked at");
        */

        /*
        //Initialising List C
        ListC.add("the cheese");
        ListC.add("the car");
        ListC.add("the mat");
        ListC.add("the lumberjack");
        ListC.add("the water");
        ListC.add("Paris");
        ListC.add("the dewdrop");
        ListC.add("the cafeteria");
        */
    }//end constructor


    //Accessor for ListA
    public String getFromListA()
    {
        Random generator = new Random();
        String phrase = "";
        
        //Assigning a random phrase to phrase
        phrase = ListA.get(generator.nextInt(ListA.size() ) );

        return phrase;

    }//end getFromListA


    //Mutator For ListA
    public void addToListA(String newPhrase)
    {
        ListA.add(newPhrase);
    }//end addToListA


    //Accessor for ListB
    public String getFromListB()
    {
        Random generator = new Random();
        String phrase = "";
        
        //Assigning a random phrase to phrase
        phrase = ListB.get(generator.nextInt(ListB.size() ) );

        return phrase;

    }//end getFromListB


    //Mutator For ListB
    public void addToListB(String newPhrase)
    {
        ListB.add(newPhrase);
    }//end addToListB


    //Accessor for ListC
    public String getFromListC()
    {
        Random generator = new Random();
        String phrase = "";
        
        //Assigning a random phrase to phrase
        phrase = ListC.get(generator.nextInt(ListC.size() ) );

        return phrase;

    }//end getFromListC


    //Mutator For ListC
    public void addToListc(String newPhrase)
    {
        ListC.add(newPhrase);
    }//end addToListC


    //Generate random sentence from Lists
    public String generateAbsurdity()
    {
        String sentence = "";

        sentence = getFromListA() + " " + getFromListB()  + " " + getFromListC();

        return sentence;
    }//end generateAbsurdity

    public String generateAbsurdity(String name)
    {
        String sentence = "";

        sentence = getFromListA() + " " + getFromListB() + " " + name;

        return sentence;
    }//end generateAbsurdity
    
}//end Tester

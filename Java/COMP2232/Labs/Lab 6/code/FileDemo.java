import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
public class FileDemo
{
    public static void main(String args[]) throws Exception
    {
        ArrayList<String> myList = new ArrayList<String>();
        File inFileName = new File("myList.txt"); //file to read from
        Scanner inFile = new Scanner(inFileName); //specifying file stream

        while (inFile.hasNext()) //read data from file & place into the list
        {
            myList.add(inFile.nextLine());
        } //while

        inFile.close();
        
        File outFile = new File("Results.txt"); //file for writing to

        
        //create the FileWriter Object
        FileWriter fileWriter = new FileWriter(outFile);

        int x = 0;
        while (x < myList.size()) //write list to the file
        {
            fileWriter.write(myList.get(x) + " ... \n");
            x++;
        } //while

        fileWriter.flush();
        fileWriter.close(); //close stream
        }
} //FileDemo
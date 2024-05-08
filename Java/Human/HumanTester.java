/**
 *
 * @author Tessa King-Inniss
 */
 
import java.util.Scanner;

public class HumanTester {

    public static void main(String[] args) 
    {
        Scanner readKB = new Scanner(System.in);
        
		System.out.println("Creating two Humans");
		  
        Human humanOne = new Human();
		Human humanTwo = new Human();
		
		System.out.println("Humans Created with default values:");
		
		System.out.println("Human One");
		humanOne.displayInfo();
		
		System.out.println("\nHuman Two");
		humanTwo.displayInfo();
		
		System.out.println("\nSetting Human One");
        humanOne.name = "Fred";
		humanOne.age = 35;
		//humanOne.setName("Fred");
		//humanOne.setAge(35);
		
		System.out.println("\nSetting Human Two");
        humanTwo.setName("Barney");
		humanTwo.setAge(31);

		System.out.println("--- \nHumans Updated with This Info:");
		
		System.out.println("Human One");
		humanOne.displayInfo();
		
		System.out.println("\nHuman Two");
		humanTwo.displayInfo();
		
		/*
		System.out.println("\n\nReferencing");
		humanOne = humanTwo;
		humanOne.displayInfo();
		
		humanOne.setName("Wilma");
		humanOne.displayInfo();
		humanTwo.displayInfo();
		
		humanTwo.setName("Betty");
		humanOne.displayInfo();
		humanTwo.displayInfo();
		*/
		
		
    }
}//HumanTester

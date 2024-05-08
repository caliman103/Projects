/**
 *
 * @author Tessa King-Inniss, COMP2160
 */

public class SuperHero extends Hero 
{
    //data members
    private String superPower;
    private boolean inCostume;
        
    //methods

    public SuperHero()   //constructor
    {
        name = "";
        age = 0;
		inCostume = false;
    }

/*
    public SuperHero(int newAge, String newName, String hName, String power)   //constructor
    {
       super.setHero(newAge, newName, hName);
       inCostume = false;
    }
    */
    public void setHero(String hName, String power)
    {        
        heroName = hName;
        superPower = power;
    }
    
    public void changeClothes()
    {
        System.out.println("One moment while I change clothes. NO PEEKING!");
        inCostume = !inCostume;
    }

    public void useSuperPower()
    {
        
    }
    
    public void displayMessage()
    {       
      if (inCostume)
        {
            System.out.println("SuperHero is in costume and being SUPER!");
            System.out.println("This is my Super-duper hero message!");
        }
        else
        {
            super.displayMessage();
        }
    }
    
}//SuperHero

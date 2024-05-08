/**
 *
 * @author Tessa King-Inniss
 */

import java.util.ArrayList;

public class SuperDetective extends SuperHero implements DetectiveSkills, BasicCombatSkills{
    
    public void findClues()
    {
        System.out.println("Looking for clues.");
    }//findClues
           
    public void makeDeduction()
    {
        System.out.println("Solving the mystery.");
    }//makeDeduction
    
    public void revealCriminal(ArrayList crims)
    {
        System.out.println("The crime was committed by: ");
        
        for(int x = 0; x < crims.size();x++)
        {
            System.out.println(crims.get(x));
        }
            
    }//revealCriminals

    public void roundHouse(String name)
    {
        System.out.println("Round-house to "+name);
    }//roundHouse
    
    public void jab(String name)
    {
        System.out.println("Jab to "+name);
    }
   
    
}//SuperDetective
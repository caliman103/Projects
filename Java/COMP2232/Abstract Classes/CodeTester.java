/**
 *
 * @author Tessa King-Inniss
 */
 
import java.util.ArrayList;

public class CodeTester {

    public static void main(String[] args) {
       
        ArrayList<String> culprits = new ArrayList<String>();
        culprits.add("Two-toes Ted");
        culprits.add("Manny the Mangler");
        
        SuperFighter battleHero = new SuperFighter();
        SuperDetective detectiveHero = new SuperDetective();
        
        System.out.println();//output a blank line
        
        battleHero.roundHouse("Super Bad Guy");
        detectiveHero.roundHouse("Really Naughty Guy");
        
        battleHero.flyingTornado(7, "So Slimey");
        
        detectiveHero.revealCriminal(culprits);
		
		//SuperHero fred = new SuperHero(); //new SuperFighter();
		//fred.roundHouse("Barney");
    }
}//CodeTester

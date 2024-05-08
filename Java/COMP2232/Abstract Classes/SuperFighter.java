/**
 *
 * @author Tessa King-Inniss
 */
 
public class SuperFighter extends SuperHero implements BasicCombatSkills, SuperCombatSkills{
        
    public void roundHouse(String name)
    {
        System.out.println("Whatta kick to "+name);
    }//roundHouse
    
    public void jab(String name)
    {
        System.out.println("Seriously Jabbing "+name);
    }//jab

    public void powerPunch(String name)
    {
        System.out.println("Power punching "+name);
    }//powerPunch
     
    /*
    public void flyingTornado(int impactLevel, String name)
    {
        System.out.println("Tornado impact "+impactLevel+" to "+name);
    }//flyingTornado
    */
}//SuperFighter
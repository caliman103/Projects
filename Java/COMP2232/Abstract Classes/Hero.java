/**
 *
 * @author Tessa King-Inniss
 */

public abstract class Hero
{
    //data members
    protected String name;
    protected int age;
    protected String heroName;
        
    //methods
    public Hero()   //constructor
    {
        name = "";
        age = 0;
    }
    
    public void setHero(int newAge, String newName, String hName)
    {
        age = newAge;
        name = newName;
        heroName = hName;
    }
    
    public String getHeroName()
    {
        return heroName;
    }
        
    public void displayMessage()
    {
        System.out.println("Who's your Hero? "+heroName);
        
    }
	
	public abstract void changeClothes();

//public abstract void beCool();
        
}//Hero

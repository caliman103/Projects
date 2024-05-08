/**
 *
 * @author Tessa King-Inniss
 */

public class Human
{
    //data members
    String name;
    int age;
        
    //methods
    public Human()   //constructor
    {
       name = "";
       age = 0;
    }
    
    //mutator
	public void setName(String newName)
    {
        name = newName;
    }
    
    //accessor
	public String getName()
    {
        return name;
    }
    
    public void setAge(int newAge)
    {
        age = newAge;
    }
    
    public int getAge()
    {
        return age;
    }
	
	public void displayInfo()
	{
		System.out.println("Name: "+name);
		System.out.println("Age: "+age);
	}
        
}//Human
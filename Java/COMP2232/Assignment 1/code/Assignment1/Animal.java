/*Jamine Drakes
 *Animal.java
 */

import java.util.Random;

public class Animal 
{
    //data members
    private Random generator = new Random();
    protected String species;
    protected String name;
    protected int age;
    protected int hungerStatus;
    protected int healthStatus;


    //constructor
    public Animal()
    {
        species = "";
        name = "";
        age = 0;

        hungerStatus = (generator.nextInt(5) +1);

        healthStatus = (generator.nextInt(10) + 1);

    }//end Animal constructor


    //accessor for species
    public String getSpecies()
    {
        return species;
    }//end getSpecies


    //mutator for species
    public void setSpecies(String newSpecies)
    {
        //Keeps all fields inline when viewing the animls with the zoo.getAllAnimalsString() method
        if(newSpecies.length() <= 3)
        {
            
            newSpecies = newSpecies + " "; 
        }//endif 

        species = newSpecies;
    }//end setSpecies


    //accessor for name
    public String getName()
    {
        return name;
    }//end getName


    //mutator for name
    public void setName(String newName)
    {
        name = newName;
    }//end setName


    //accessor for name
    public int getAge()
    {
        return age;
    }//end getAge


    //mutator for age
    public void setAge(int newAge)
    {
        age = newAge;
    }//end setAge


    //accessor for hungerStatus
    public int getHungerStatus()
    {
        return hungerStatus;
    }//end getHungerStatus

    public void setHungerStatus(int newHungerStatus)
    {
        hungerStatus = newHungerStatus;
    }//end setHungerStatus


    //accessor for healthStatus
    public int getHealthStatus()
    {
        return healthStatus;
    }//end getHealthStatus

    public void setHealthStatus(int newHealthStatus)
    {
        healthStatus = newHealthStatus;
    }//end setHealthStatus

    
    //eat food method
    public void eatFood(int amountOfFood)
    {
        hungerStatus = hungerStatus + amountOfFood;
    }//end eat

    
    //take medecine method
    public void takeMedicine(int amountOfMedicine)
    {
        healthStatus = healthStatus + amountOfMedicine;
    }//end takeMedicine


    //speak method
    public String Speak()
    {
        return "\"Make Noise\"";
    } //end speak
    
}//end Animal class 

/*Jamine Drakes
 *ZooKeeper.java
 */


public class ZooKeeper
{
    
    //data members
    private String nameOfKeeper;

    public ZooKeeper()
    {
		nameOfKeeper = "";
    }//end constructor

    //Accessor for name of Keeper
    public String getName()
    { 
        return nameOfKeeper;
    }//end getName

    //Mutator for name Of Keeper
    public void setName(String newName)
    {
        nameOfKeeper = newName;
    }//end setName


    //Feed animal
    public void feedAnimal(Animal animal, int amount)
    {
        animal.eatFood(amount);
        
    }//end feedAnmial


    //heal animal
    public void healAnimal(Animal animal, int amount )
    {
        animal.takeMedicine(amount);

    }//end healAnimal

}//end Zookeeper class

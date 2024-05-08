/*Jamine Drakes
 *Zoo.java
 */

import java.util.ArrayList;

public class Zoo
 {
     //data members
     private ArrayList<Animal> Cages;

   //constructor
   public Zoo()
   {
          Cages = new ArrayList<Animal>();
   }//end Zoo constructor


   //accessor for number of animals in zoo
   public int amount()
   {
        return Cages.size();
   }//end amount

   //mutator
   public void addAnimal(Animal newAnimal)
   {
          Cages.add(newAnimal);
   }//end addAnimal

   //mutator
   public void removeAnimal(int position)
   {
        Cages.remove(position);
   }//end remove animal 

   //accessor
   public Animal getAnimal(int position)
   {
        return Cages.get(position);
   }//end getAnimal


   //Accessor to show all animals
   public String getAllAnimalsString()
   {
          if(Cages.size() == 0)
          {
               return "There are no animals in this list at the moment.\n";
          }//endif

          else
          {
               //temporarily holds the information of a single animal
               String information = "";

               //stores information of all the animals
               String allInformation = "";
               for(int i = 0; i < Cages.size(); i++)
               {
                    String name = Cages.get(i).getName();
                    String species = Cages.get(i).getSpecies();
                    String age = String.valueOf(Cages.get(i).getAge() );
                    String hunger = String.valueOf(Cages.get(i).getHungerStatus() );
                    String health = String.valueOf(Cages.get(i).getHealthStatus() );

                    information = (i + 1) + ". Species: " + species + "\t" + "Name: " + name +"\t" + "Age: " + age + "\t" + 
                    "Hunger Status: " + hunger + "\t" + "Health Status:" + health + "\n\n";

                    allInformation = allInformation.concat(information);
               }//end for

               return allInformation;
          }//endelse
   }//end getAllAnimals


   
   

}//end Zoo Class

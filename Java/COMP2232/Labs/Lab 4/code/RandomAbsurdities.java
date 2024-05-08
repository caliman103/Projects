import java.util.ArrayList;
import java.util.Random;
import java.util.Random;

public class RandomAbsurdities 
{
    //=======DATA MEMBERS=======//

    private ArrayList<String> ListA;
    private ArrayList<String> ListB;
    private ArrayList<String> ListC;


    //=======ACCESSORS=======//


    //=======MUTATORS=======//

    public String generateAbsurdity()
    {
        Random generator = new Random();

        String sentence = ListA.get(generator.nextInt(ListA.size()-1)) + ListB.get(generator.nextInt(ListB.size()-1)) + ListC.get(generator.nextInt(ListC.size()-1));

        return sentence;
    }// generateAbsurdity


    //=======CONSTRUCTORS=======//

    public RandomAbsurdities()
    {
        ListA = new ArrayList<String>();
        ListA.add("The woman ");
        ListA.add("The cat ");
        ListA.add("The grass ");
        ListA.add("The well ");
        ListA.add("The ballet teacher ");
        ListA.add("The tree ");
        ListA.add("The plate ");
        ListA.add("The moon ");

        ListB = new ArrayList<String>();
        ListB.add("fell into ");
        ListB.add("ran over ");
        ListB.add("ate ");
        ListB.add("sat on ");
        ListB.add("danced on ");
        ListB.add("jumped on ");
        ListB.add("climbed ");
        ListB.add("winked at ");

        ListC = new ArrayList<String>();
        ListC.add("the cheese");
        ListC.add("the car");
        ListC.add("the mat");
        ListC.add("the lumberjack");
        ListC.add("the water");
        ListC.add("Paris");
        ListC.add("the dewdrop");
        ListC.add("the cafeteria");

    }// RandomAbsurdities


}// RandomAbsurdities

/*
ClassName: Meal
Author: Jamaine Drakes, Evan Leacock
Purpose: 
Start Date: Mar 11, 2022
Last Edit: Mar 11, 2022
*/

//========================================================================================//
//                                     LIBRARIES                                          //
//========================================================================================//

public class Meal
{
    //========================================================================================//
    //                                    DATA MEMBERS                                        //
    //========================================================================================//
    private String cageID;
    private String foodType;
    private int foodAmt;


    //========================================================================================//
    //                                    CONSTRUCTOR                                         //
    //========================================================================================//
    public Meal()
    {
        cageID = "";
        foodType = "";
        foodAmt = 0;
    }// Meal


    //========================================================================================//
    //                                     ACCESSORS                                          //
    //========================================================================================//
    public String getCageID()
    {
        return cageID;
    }// getCageID

    public String getFoodType()
    {
        return foodType;
    }// getFoodType

    public int getFoodAmt()
    {
        return foodAmt;
    }// getFoodAmt


    //========================================================================================//
    //                                      MUTATORS                                          //
    //========================================================================================//
    public void setCageID(String id)
    {
        cageID = id;
    }// setCageID

    public void setFoodType(String type)
    {
        foodType = type;
    }// setFoodType

    public void setFoodAmt(int amt)
    {
        foodAmt = amt;
    }// setFoodAmt


    //========================================================================================//
    //                                    OTHER METHODS                                       //
    //========================================================================================//


}// Meal
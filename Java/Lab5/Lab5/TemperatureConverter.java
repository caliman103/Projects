/*Jamaine Drakes
 *Lab 1: Temperature Converter program
 */


 public class TemperatureConverter{

    //construtor
   public TemperatureConverter()
   {
    
   } //end constructor

   //convert from Celsius
   public int toFahrenheit(int temperature) {
    
    int Fahrenheit = ((9/5)*temperature) + 32;

    return Fahrenheit;
    }//end toFahrenheit class 

   public int toCelsius(int temperature){
      int Celsius = (temperature -32/(9/5));

      return Celsius;
    }//end toCelsius class

 }//end TemperatureConverter class


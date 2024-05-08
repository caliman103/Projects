import java.util.Scanner;

public class ConversionTester 
{
    TemperatureConverter Convert = new TemperatureConverter();

    public static void main(String[] args)
    {
        Scanner myScanner = new Scanner(System.in);

        System.out.print( "Enter a Temperature: " );
        double temperature = myScanner.nextDouble();

        System.out.print( "Convert to Celsius or Fahrenheit? (C/F): " );
        String tempChoice = myScanner.next();

        TemperatureConverter myTempConv = new TemperatureConverter();

        double convertedTemp = 0.0;

        String prevTemp = "";
        String newTemp = "";

        if(tempChoice.equals("C"))
        {
            convertedTemp = myTempConv.toCelsius(temperature);
            prevTemp = "Fahrenheit";
            newTemp = "Celsius";
        }
        else if(tempChoice.equals("F"))
        {
            convertedTemp = myTempConv.toFahrenheit(temperature);
            newTemp = "Fahrenheit";
            prevTemp = "Celsius";
        }

        System.out.println( "\n" + temperature + " degrees " + prevTemp + " is equal to " + convertedTemp + " degrees " + newTemp + "\n");
    } // main
    
    ConversionTester()
    {

    }
} // ConversionTester

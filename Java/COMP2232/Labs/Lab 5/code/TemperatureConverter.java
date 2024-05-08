public class TemperatureConverter 
{
    double toFahrenheit(double Celsius)
    {
        double Fahrenheit = ((9/5) * Celsius) + 32;

        return Fahrenheit;
    } // toFahrenheit

    double toCelsius(double Fahrenheit)
    {
        double Celsius = ((Fahrenheit - 32) * (5.0 / 9.0));

        return Celsius;
    } // toCelsius

    TemperatureConverter()
    {
    }

} //TemperatureConverter

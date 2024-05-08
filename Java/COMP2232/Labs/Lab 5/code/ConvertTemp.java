/*
Filename: ConvertTemp.java
Creator: Evan Leacock

Purpose: 

Creation Date: Mar 10, 2022
Last Edit: Mar 10, 2022
*/

//===========LIBRARIES==========//
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


public class ConvertTemp extends JFrame implements ActionListener
{
    //=========DATA MEMBERS=========//
    TemperatureConverter myTempConv;

    JLabel enterTempLabel;
    JLabel conversionResult;

    JTextField enterTempField;

    JButton convToFarButton;
    JButton convToCelButton;

    public static void main(String[] args)
    {
        new ConvertTemp();
    }// main


    //=========CONSTRUCTOR==========//
    public ConvertTemp()
    {
        setLayout(new FlowLayout());
        setSize(800, 100);
        setTitle("Temperature Converter");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        centerFrame(this);
        
        
        // DECLARATIONS
        myTempConv = new TemperatureConverter();

        enterTempLabel = new JLabel("Enter temperature");
        conversionResult = new JLabel("Result: ---");

        enterTempField = new JTextField(5);

        convToCelButton = new JButton("Convert to Celcius");
        convToFarButton = new JButton("Convert to Farenheit");
        
        // ADD COMPONENTS TO FRAME
        add(enterTempLabel);
        add(enterTempField);
        add(convToFarButton);
        add(convToCelButton);
        add(conversionResult);

        
        // ADD ACTION LISTENERS
        convToFarButton.addActionListener(this);
        convToCelButton.addActionListener(this);
        
        setVisible(true);
    }// ConvertTemp

    public void actionPerformed(ActionEvent e)
    {
        // Event Handlers
        if(e.getSource() == convToFarButton)
        {
            try 
            {
                double num;
                num = Double.parseDouble(enterTempField.getText());

                double convertedNum;
                convertedNum = myTempConv.toFahrenheit(num);

                String temp;
                temp = Double.toString(convertedNum);

                conversionResult.setText("Result: " + temp + "\u00B0 C");
            }
            catch (NumberFormatException f) 
            {
                conversionResult.setText("Result: Oops! Value entered must be a number!");
            }
            
        }

        if(e.getSource() == convToCelButton)
        {
            try 
            {
                double num;
                num = Double.parseDouble(enterTempField.getText());

                double convertedNum;
                convertedNum = myTempConv.toCelsius(num);

                String temp;
                temp = Double.toString(convertedNum);

                conversionResult.setText("Result: " + temp + "\u00B0 F");
            }
            catch (NumberFormatException f) 
            {
                conversionResult.setText("Result: Oops! Value entered must be a number!");
            }
        }

    }// actionPerformed


    //=========MISC. METHODS========//
    

    private static void centerFrame(JFrame fr)
    {
        // Get the size of the screen
        Dimension dim = Toolkit.getDefaultToolkit().getScreenSize();

        // Determine the new location of the window
        int w = fr.getSize().width;
        int h = fr.getSize().height;
        int x = (dim.width - w) / 2;
        int y = (dim.height - h) / 2;
        // Move the window
        fr.setLocation(x, y);

    }// centerFrame

}// ConvertTemp
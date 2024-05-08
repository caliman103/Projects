/*Jamaine Drakes
 *Lab 5 - GUI
 */
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
 


public class ConvertTemp extends JFrame implements ActionListener
{
    //items to be added to the frame
    //text for items
    String instruction = "Enter Temperature:";
    String result = "Result:";
    String celtext = "Convert to Fahrenheit";
    String fahrtext = "Convert to Celsius";


    //JFrame Items
    JLabel intro = new JLabel(instruction);
    JTextField tempInput = new JTextField(10);
    JButton celConvertButton = new JButton(celtext); 
    JButton farhConvertButton = new JButton(fahrtext); 
    JLabel Result = new JLabel(result);
    
    //object used to convert teperatured
    TemperatureConverter convertTool = new TemperatureConverter();
    public static void main(String[] args)
    {
        ConvertTemp fr = new ConvertTemp();
        centerFrame(fr);
        
    }//end main


    //constructor
    public ConvertTemp()
    {

        this.setLayout(new FlowLayout() );
        this.setSize(900,90);
        this.setTitle("Temperature Converter");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        //Add Items to Frame    
        //Add instruction label to Frame
        this.add(intro);

        //Add inputfiel
        this.add(tempInput);

        //Adding buttuns
        this.add(celConvertButton);
        celConvertButton.addActionListener(this); //Makes the button an event listener

        this.add(farhConvertButton);
        farhConvertButton.addActionListener(this); //Makes the button an event listener

        //Add final label
        this.add(Result);



        this.setVisible(true);
    }//end constructor




    public void actionPerformed(ActionEvent e)
    {
        if(e.getSource() == celConvertButton)
        {
            try
            {
                //converts the temperature entered into the text field into an integer
                String text = tempInput.getText();
                int amount = Integer.parseInt(text);

                
                //convert temperature
                int converted = convertTool.toFahrenheit(amount);

                String finalResult = result + " " + Integer.toString ((int)converted) + "\u00B0 F" ;

                Result.setForeground(new Color(190, 8, 205));
                Result.setFont(new Font("Monospaced",Font.PLAIN,14) );
                Result.setText(finalResult);

               
            }
            catch(NumberFormatException exception)
            {
                Result.setForeground(Color.RED);
               // Result.setFont(new Font("Courier",Font.PLAIN,14) );
                Result.setText("Opps!, Value entered must be a number ");
            }
            
        }//end if


        else
        {
            try
            {
                //converts the temperature entered into the text field into an integer
                String text = tempInput.getText();
                int amount = Integer.parseInt(text);
                
                //convert temperature
                int converted = convertTool.toCelsius(amount);

                String finalResult = result + " " + Integer.toString ((int)converted) + "\u00B0 C" ;

                Result.setForeground(new Color(240, 100, 15));
                Result.setFont(new Font("MV Boli",Font.PLAIN,14) );
                Result.setText(finalResult);

               
            }
            catch(NumberFormatException exception)
            {
                Result.setForeground(Color.RED);
            //    Result.setFont(new Font("Courier",Font.PLAIN,14) );
                Result.setText("Opps!, Value entered must be a number ");
            }

        }//end else  
        
        
        
    }//end actionPerformed class



    //This function will center the frame on the screen
    private static void centerFrame(JFrame fr)
    {

        //Get the size of the screen
        Dimension dimension = Toolkit.getDefaultToolkit().getScreenSize();

        //Determine the new location of the window
        int w = fr.getSize().width;
        int h = fr.getSize().height;
        int x = (dimension.width - w) / 2;
        int y = (dimension.height - h) / 2;

        //Move the window
        fr.setLocation(x,y);
    }//end cenerFrame method

}//end ConvertTemp
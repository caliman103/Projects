

/*
Filename: testSnipp.java
Creator: Evan Leacock

Purpose: 

Creation Date: Mar 10, 2022
Last Edit: Mar 10, 2022
*/

//===========LIBRARIES==========//
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


public class testSnipp extends JFrame implements ActionListener
{
    //=========DATA MEMBERS=========//
    

    public static void main(String[] args)
    {
        new testSnipp();
    }// main


    //=========CONSTRUCTOR==========//
    public testSnipp()
    {
        setLayout(new FlowLayout());
        setSize(500, 400);
        setTitle("Title Here");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        centerFrame(this);
        setVisible(true);
        
        
        // DECLARATIONS
        
        
        // ADD COMPONENTS TO FRAME
        
        
        // ADD ACTION LISTENERS
        
        
    }// testSnipp

    public void actionPerformed(ActionEvent e)
    {
        // Event Handlers
        

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

}// testSnipp
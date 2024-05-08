/*
ClassName: Myframe.java
Author: Jamaine Drakes
Purpose: 
Start Date: Jul 19, 2022
Last Edit: Jul 19, 2022
*/

//========================================================================================//
//                                     LIBRARIES                                          //
//========================================================================================//
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


public class MyFrame extends JFrame //implements ActionListener
{
    //========================================================================================//
    //                                    DATA MEMBERS                                        //
    //========================================================================================//
    MyPanel panel;

    //========================================================================================//
    //                                    CONSTRUCTOR                                         //
    //========================================================================================//
    public MyFrame()
    {
        panel = new MyPanel();

        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        
        
        
        //========================================================================================//
        //                                  ADDING COMPONENTS                                     //
        //========================================================================================//
        this.add(panel);


        //========================================================================================//
        //                                ADDING ACTION LISTENERS                                 //
        //========================================================================================//


        
        this.pack();
        this.setLocationRelativeTo(null);
        this.setVisible(true);

    }// end Myframe

    //========================================================================================//
    //                                ACTION PERFORMED METHOD                                 //
    //========================================================================================//
    public void actionPerformed(ActionEvent e)
    {
        // Event Handlers
        
    }// actionPerformed


    //========================================================================================//
    //                                    OTHER METHODS                                       //
    //========================================================================================//



    // This method will center the frame on the screen
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

    }// end centerFrame

}// end Myframe
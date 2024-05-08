/*
ClassName: MyPanel.java
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


public class MyPanel  extends JPanel implements ActionListener
{
    //========================================================================================//
    //                                    DATA MEMBERS                                        //
    //========================================================================================//
    final int PANEL_WIDTH = 500;
    final int PANEL_HEIGHT = 500;
    Image enemy;
    Image backgroundImage;
    Timer timer;
    int xVelocity = 1;
    int yVelocity = 1;
    int x = 0;
    int y = 0;
    

    //========================================================================================//
    //                                    CONSTRUCTOR                                         //
    //========================================================================================//
    public MyPanel()
    {
        
        this.setPreferredSize(new Dimension(PANEL_WIDTH,PANEL_HEIGHT));
        this.setBackground(Color.black);
        enemy = new ImageIcon("enemy.png").getImage();

        /* 
         //Change size of logo to display on frame
         Image alteredLogo = logo.getImage(); //get the imageicon as an image  to scale it
         Image newLogo =  alteredLogo.getScaledInstance(180, 180, Image.SCALE_SMOOTH); //transform it
         logo = new ImageIcon(newLogo); //convert back to imageIcon
        */

        timer = new Timer(1000,null);
        
        //========================================================================================//
        //                                  ADDING COMPONENTS                                     //
        //========================================================================================//



        //========================================================================================//
        //                                ADDING ACTION LISTENERS                                 //
        //========================================================================================//



    }// end MyPanel

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
    public void paint(Graphics g)
    {
        Graphics2D g2d = (Graphics2D) g;

        g2d.drawImage(enemy, 250, 260, null);
    }//end paint

}// end MyPanel
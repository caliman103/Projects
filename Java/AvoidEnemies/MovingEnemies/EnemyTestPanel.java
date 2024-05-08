/* Jamaine Drakes
 * Testing Moving of enimies on JFrame
 * Start Date 09/March/2022
 * 
 */ 


import javax.swing.*;
import java.awt.event.*;
import java.awt.*;


public class EnemyTestPanel extends JPanel// implements ActionListener
{
    
    //data members
    //constants for width and height
    final int PANEL_WIDTH = 500;
    final int PANEL_HEIGHT = 500;

    //Image of enemy
    Image enemy;

    //Timer used when redrawing screen
    Timer reDrawTimer;

    //Amount enemy will move
    int xVelocity = 1;
    int yVelocity = 1;

    //Starting x and y coordinates of enemy
    int enemyXStartPosition = 0;
    int enemyYStartPosition = 0;

    EnemyTestPanel()
    {
        this.setPreferredSize(new Dimension(PANEL_WIDTH,PANEL_HEIGHT) );
        this.setBackground(Color.BLACK);


        //finish 


    }
    
}//end EnemyTestPanel

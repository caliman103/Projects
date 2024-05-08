

/* Jamaine Drakes
 * Testing Moving of enimies on JFrame
 * Start Date 09/March/2022
 * 
 */ 

import javax.swing.JFrame;

public class EnemyTestFrame extends JFrame
{
    //Panel used to show game
    EnemyTestPanel gamePanel;

    //constructor
    EnemyTestFrame()
    {
        gamePanel = new EnemyTestPanel();

        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        this.add(gamePanel);

        this.pack();
        this.setLocationRelativeTo(null);
        this.setVisible(true);
    }


}//end EnemyTestFrame

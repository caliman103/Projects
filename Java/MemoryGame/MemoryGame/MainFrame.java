/*Jamaine Drakes
 *Memory Game - MainFrame 
 *Start Date:  06/March/2022
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;


public class MainFrame extends JFrame implements ActionListener
{

    //=========================================================================//
    //                             DATA MEMBERS                                //  
    //=========================================================================//
    
    //Panels
    private JPanel top = new JPanel();
    private JPanel center = new JPanel();

    //Labels
    private JLabel titleInstructionsLabel = new JLabel("<HTML><U>INSTRUCTIONS</U></HTML>");
    private JLabel instructionsLine1 = new JLabel(" In this game some numbers will flash on the screen in a particular order. To  "); 
    private JLabel instructionsLine2 = new JLabel(" win the game you must provide the numbers in correct order in which they "); 
    private JLabel instructionsLine3 = new JLabel(" appeared. There are various levels to the game. The higher the level the");
    private JLabel instructionsLine4 = new JLabel(" higher the difficulty.");

    private JLabel chooseLeveLabel = new JLabel("Choose Level:");

    
    //Buttons
    private JButton level1Button = new JButton("Level 1");
    private JButton level2Button = new JButton("Level 2");
    private JButton level3Button = new JButton("Level 3");
    private JButton level4Button = new JButton("Level 4");
    private JButton level5Button = new JButton("Level 5");
    private JButton quitButton = new JButton("Quit");


    


    //=========================================================================//
    //                                   MAIN                                  //  
    //=========================================================================//
    public static void main(String[] args) 
    {
        new MainFrame();
        
        
    }//end main

    //=========================================================================//
    //                             CONSTRUCTOR                                 //  
    //=========================================================================//
    //constructor
    MainFrame()
    {
        //Setting up Frame
        this.setLayout(new BorderLayout() );
        this.setSize(500,410);
        this.setTitle("Memory Game");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setResizable(false);
        centerFrame(this);

        
        //Top Panel
        //Serring Up Top Panel
        top.setLayout(new GridLayout(5,1,0,2) );
        top.setBackground(new Color(0,0,204));
        

        //Styling all labels that will be on the North Panel
        titleInstructionsLabel.setFont(new Font(null,Font.BOLD,15) );
        instructionsLine1.setFont(new Font(null,Font.BOLD,13) );
        instructionsLine2.setFont(new Font(null,Font.BOLD,13) );
        instructionsLine3.setFont(new Font(null,Font.BOLD,13) );
        instructionsLine4.setFont(new Font(null,Font.BOLD,13) );
        

        titleInstructionsLabel.setForeground(new Color(0,204,0));
        instructionsLine1.setForeground(new Color(0,204,0));
        instructionsLine2.setForeground(new Color(0,204,0));
        instructionsLine3.setForeground(new Color(0,204,0));
        instructionsLine4.setForeground(new Color(0,204,0));

        titleInstructionsLabel.setHorizontalAlignment(JLabel.CENTER);
        instructionsLine1.setHorizontalAlignment(JLabel.CENTER);
        instructionsLine2.setHorizontalAlignment(JLabel.CENTER);
        instructionsLine3.setHorizontalAlignment(JLabel.CENTER);
        instructionsLine4.setHorizontalAlignment(JLabel.CENTER);
        
        //Adding Components to the North Panel
        top.add(titleInstructionsLabel);
        top.add(instructionsLine1);
        top.add(instructionsLine2);
        top.add(instructionsLine3);
        top.add(instructionsLine4);
       

       
        //Center Panel
        //Setting Up Center Panel
        center.setLayout(null);
        center.setBackground(Color.BLACK);

        //Styling Components in Center Panel
        chooseLeveLabel.setForeground(Color.MAGENTA);
        level1Button.setForeground(Color.BLACK);
        level2Button.setForeground(Color.BLACK);
        level3Button.setForeground(Color.BLACK);
        level4Button.setForeground(Color.BLACK);
        level5Button.setForeground(Color.BLACK);

        level1Button.setBackground(Color.GREEN);
        level2Button.setBackground(Color.ORANGE);
        level3Button.setBackground(Color.ORANGE);
        level4Button.setBackground(Color.RED);
        level5Button.setBackground(Color.RED);
        quitButton.setBackground(Color.WHITE);


        //Positioning Components
        chooseLeveLabel.setBounds(195, -7, 170, 40);
        level1Button.setBounds(150, 30, 170, 25);
        level2Button.setBounds(150, 70, 170, 25);
        level3Button.setBounds(150, 110, 170, 25);
        level4Button.setBounds(150, 150, 170, 25);
        level5Button.setBounds(150, 190, 170, 25);
        quitButton.setBounds(150, 230, 170, 25);

        

        //Removing SetFocusable from all Components
        chooseLeveLabel.setFocusable(false);
        level1Button.setFocusable(false);
        level2Button.setFocusable(false);
        level3Button.setFocusable(false);
        level4Button.setFocusable(false);
        level5Button.setFocusable(false);
        quitButton.setFocusable(false);


        //Adding Components to Center Panel
        center.add(chooseLeveLabel);
        center.add(level1Button);
        center.add(level2Button);
        center.add(level3Button);
        center.add(level4Button);
        center.add(level5Button);
        center.add(quitButton);

       
        //Adding Panels to MainFrame
        this.add("North",top);
        this.add("Center",center);

        //Adding Action Listeners to all buttons
        level1Button.addActionListener(this);
        level2Button.addActionListener(this);
        level3Button.addActionListener(this);
        level4Button.addActionListener(this);
        level5Button.addActionListener(this);
        quitButton.addActionListener(this);

        //Displays the Frame
        this.setVisible(true);

    }//end constructor



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

     //Action Listener
     @Override
     public void actionPerformed(ActionEvent e)
     {

        //User wishes to start level 1
        if(e.getSource() == level1Button)
        {
            this.dispose();
            new Level1Frame();
            
        }//end level1button action

        //User wishes to start level 2
        if(e.getSource() == level2Button)
        {
            this.dispose();
            new Level2Frame();
        }//end level2button action

        //User wishes to start level 3
        if(e.getSource() == level3Button)
        {
            this.dispose();
            new Level3Frame();
        }//end level3button action

        //User wishes to start level 4
        if(e.getSource() == level4Button)
        {
            this.dispose();
            new Level4Frame();
        }//end level4button action

        //User wishes to start level 5
        if(e.getSource() == level5Button)
        {
            this.dispose();
            new Level5Frame();
        }//end level5button action


        //User wishes to exit program
        if(e.getSource() == quitButton)
        {
            int response = JOptionPane.showConfirmDialog(null, "Quit Memory Game?", "Quit", JOptionPane.YES_NO_OPTION);
            if(response == 0)
            {
                this.dispose();
                System.exit(0);
            }
            
        }
     }//end actionPerformed

}//end Main class
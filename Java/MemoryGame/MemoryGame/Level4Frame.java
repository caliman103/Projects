import javax.swing.JFrame;

/*Jamaine Drakes
 *Memory Game - Level 1 Frame
 *Start Date:  06/March/2022
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.util.Timer;
import java.util.TimerTask;
import java.util.Random;
import java.util.ArrayList;



public class Level4Frame extends JFrame implements ActionListener
{
    //Data Members
    //String
    private String numUserGessedString = "";

    //int
    private int randomNumber;
   

    //Random generator object
    private Random generator = new Random();

    //ArrayList to hold numbers
    private ArrayList<Integer> generatedNumbersList = new ArrayList<Integer>();
    private ArrayList<Integer> userGuessList = new ArrayList<Integer>();

    

    //Timer Objects
    private Timer timer = new Timer();

    private TimerTask changeText = new TimerTask() {
        public void run(){
            popUpNumbersLabel.setText("Start");
        }
    };

    private TimerTask changeNumber = new TimerTask() {
        int counter = 0;
        
        public void run()
        {
           if(counter < 7)
           {
                popUpNumbersLabel.setText( (Integer.toString ((int)  generatedNumbersList.get(counter) ) ) ); 
                counter++;

           }//end if
           else
           {
                popUpNumbersLabel.setVisible(false);
                timer.cancel();


                center.setLayout(null);
                continueButton.setBounds(143, 117, 200, 30);

                continueButton.setFocusable(false);
                center.add(continueButton);
           }//end else 
           
           
        }//end run
    };

    //Panels
    private JPanel top = new JPanel();
    private JPanel center = new JPanel();
    private JPanel bot = new JPanel();
    private JPanel subJPanelCenter = new JPanel();
    private JPanel subJPanelSouth = new JPanel();

    //Labels
    private JLabel title = new JLabel("LEVEL 4");
    private JLabel popUpNumbersLabel = new JLabel();
    private JLabel userOrderLabel = new JLabel("Order of Numbers");
    private JLabel numberGuessLabel = new JLabel("Show Your Order!");
    private JLabel resultsLabel = new JLabel("CONGRATULATIONS"); 
    private JLabel actualOrderLabel = new JLabel();


    //Buttons
    private JButton returnMainMenuButton = new JButton("Return to Main Menu");
    private JButton startButton = new JButton("Start Level 4");
    private JButton continueButton = new JButton("Press to place your order");
    private JButton confirmNumberButton = new JButton("Confirm Order");
    private JButton backSpaceButton = new JButton("Backspace");
    private JButton eraseAllButton = new JButton("Erase All");
    private JButton exitButton = new JButton("Exit");

    private JButton button0 = new JButton("0");
    private JButton button1 = new JButton("1");
    private JButton button2 = new JButton("2");
    private JButton button3 = new JButton("3");
    private JButton button4 = new JButton("4");
    private JButton button5 = new JButton("5");
    private JButton button6 = new JButton("6");
    private JButton button7 = new JButton("7");
    private JButton button8 = new JButton("8");
    private JButton button9 = new JButton("9");

    //constructor
    Level4Frame()
    {
        
        //Setting up Frame
        this.setLayout(new BorderLayout() );
        this.setSize(500,400);
        this.setTitle("Level 1");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.setResizable(false);
        centerFrame(this);

        //Top Panel
        //Setting up Top Panel
        top.setLayout(new FlowLayout() );
        top.setBackground(Color.DARK_GRAY);

        //Styling Components of Top Panel
        title.setForeground(Color.CYAN);
        title.setFont(new Font("Courier",Font.BOLD,50) );


        top.add(title);

        //Center Panel
        center.setLayout(null);
        center.setBackground(Color.DARK_GRAY);

        //Positioning Components on Center Panel
        startButton.setBounds(40, 80, 180, 30);
        returnMainMenuButton.setBounds(250, 80, 180, 30);

        //Styling Components of Center Panel
        startButton.setFocusable(false);
        returnMainMenuButton.setFocusable(false);


        //Adding Components to Center Panel
        center.add(startButton);
        center.add(returnMainMenuButton);

        //center.add(userOrderLabel);
        //center.add(numberGuessLabel);

        

        //Bottom Panel
        bot.setLayout(new FlowLayout(FlowLayout.CENTER,5,15));
        bot.setVisible(false);

        ///Adding Panels to Frame
        this.add("North",top);
        this.add("Center",center);
        this.add("South",bot);



        //Add Listeners to buttons
        startButton.addActionListener(this);
        returnMainMenuButton.addActionListener(this);
        continueButton.addActionListener(this);

        button0.addActionListener(this);
        button1.addActionListener(this);
        button2.addActionListener(this);
        button3.addActionListener(this);
        button4.addActionListener(this);
        button5.addActionListener(this);
        button6.addActionListener(this);
        button7.addActionListener(this);
        button8.addActionListener(this);
        button9.addActionListener(this);

        confirmNumberButton.addActionListener(this);
        backSpaceButton.addActionListener(this);
        eraseAllButton.addActionListener(this);

        exitButton.addActionListener(this);
        


        //Generate Random Numbers and add to the list
        for(int i = 0; i < 7; i++)
        {
            randomNumber = generator.nextInt(10);
            //ensure there won't be two of the same number back to back
            while(generatedNumbersList.size() > 0 && randomNumber == generatedNumbersList.get(i-1) )
            {
                randomNumber = generator.nextInt(10);
            }//end while 
            
            generatedNumbersList.add(randomNumber);
        }//end for

        

        //Display Frame
        this.setVisible(true);
    }//end constructor

    //Method to compare generated number list and user number list
    public void comparison(ArrayList<Integer> generated, ArrayList<Integer> userList)
    {
        for(int i = 0; i < generated.size(); i++)
        {
            if(generated.get(i) != userList.get(i))
            {
                resultsLabel.setText("INCORRECT ORDER");
                break;
            }
        }//end for
    }//end comparison method


    //Method to display generated list
    public void diplayGeneratedList(ArrayList<Integer> generated)
    {
        String fullList = "";

        for(int i = 0; i < generated.size(); i++)
        {
            fullList = fullList.concat(" " + String.valueOf(generated.get(i) ) );
        }//end for

        actualOrderLabel.setText("Actual Order:" + fullList);
    }

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


    @Override
    public void actionPerformed(ActionEvent e)
    {

        //User wishes to return to the home screen
       if(e.getSource() == returnMainMenuButton)
       {
            this.dispose();
            new MainFrame();
       }//end exit button action
        

       //User wants to start level
       if(e.getSource() == startButton)
       {
          startButton.setVisible(false);
          returnMainMenuButton.setVisible(false);

          top.setBackground(Color.RED);
          title.setForeground(Color.BLACK);

          center.setLayout(new BorderLayout() );
          
          popUpNumbersLabel.setText("READY");
          popUpNumbersLabel.setForeground(Color.WHITE);
          popUpNumbersLabel.setFont(new Font("Courier",Font.BOLD,75) );
          popUpNumbersLabel.setVerticalAlignment(JLabel.CENTER);
          popUpNumbersLabel.setHorizontalAlignment(JLabel.CENTER);
        
          center.setBackground(Color.BLACK);
          center.add(popUpNumbersLabel);

          //Carries out TimerTask for changetext
          timer.schedule(changeText, 1000);
          
          //Carries out TimerTask for change number
          timer.scheduleAtFixedRate(changeNumber, 1700, 700);

       }//end startlevel bututton action


       //User has to guess the order
       if(e.getSource() == continueButton)
       {
           continueButton.setVisible(false);

           center.setLayout(new BorderLayout() );


           //Styling Components added to the center Panel
           userOrderLabel.setFont(new Font(null,Font.BOLD,23));
           userOrderLabel.setForeground(Color.WHITE);
           userOrderLabel.setHorizontalAlignment(JLabel.CENTER);

           numberGuessLabel.setFont(new Font(null,Font.BOLD,23));
           numberGuessLabel.setForeground(Color.WHITE);
           numberGuessLabel.setHorizontalAlignment(JLabel.CENTER);
           numberGuessLabel.setVerticalAlignment(JLabel.CENTER);

           subJPanelCenter.setBackground(Color.BLACK);

           subJPanelCenter.add(numberGuessLabel);
           subJPanelCenter.add(resultsLabel);

           resultsLabel.setVisible(false);
           

           //Styling sub Panel in the Center Panel
           subJPanelSouth.setBackground(Color.BLACK);

           //Set their visibility to true so the users can see their guesses
           userOrderLabel.setVisible(true);
           numberGuessLabel.setVisible(true);

           //Hide these components until user chooses a number
           confirmNumberButton.setVisible(false);
           backSpaceButton.setVisible(false);
           eraseAllButton.setVisible(false);
           resultsLabel.setVisible(false);


           //Styling components of center of center
           confirmNumberButton.setFocusable(false);
           backSpaceButton.setFocusable(false);
           eraseAllButton.setFocusable(false);
           exitButton.setFocusable(false);


           //adding components of sub panel of center
           subJPanelSouth.add(confirmNumberButton);
           subJPanelSouth.add(backSpaceButton);
           subJPanelSouth.add(eraseAllButton);
           subJPanelSouth.add(resultsLabel);
         

            //add these components to screen to show user their guesses
            center.add("North",userOrderLabel);
            center.add("Center",subJPanelCenter);
            center.add("South",subJPanelSouth);

           

           bot.setPreferredSize(new Dimension(500,100));
           bot.setBackground(Color.BLACK);
           bot.setVisible(true);

           //Styling and adding Button0
            button0.setBackground(Color.WHITE);
            button0.setForeground(Color.BLACK);
            button0.setFocusable(false);
            bot.add(button0);

            //Styling and adding Button1
            button1.setBackground(Color.WHITE);
            button1.setForeground(Color.BLACK);
            button1.setFocusable(false);
            bot.add(button1);

            //Styling and adding Button2
            button2.setBackground(Color.WHITE);
            button2.setForeground(Color.BLACK);
            button2.setFocusable(false);
            bot.add(button2);

            //Styling and adding Button3
            button3.setBackground(Color.WHITE);
            button3.setForeground(Color.BLACK);
            button3.setFocusable(false);
            bot.add(button3);

            //Styling and adding Button4
            button4.setBackground(Color.WHITE);
            button4.setForeground(Color.BLACK);
            button4.setFocusable(false);
            bot.add(button4);

            //Styling and adding Button5
            button5.setBackground(Color.WHITE);
            button5.setForeground(Color.BLACK);
            button5.setFocusable(false);
            bot.add(button5);

            //Styling and adding Button6
            button6.setBackground(Color.WHITE);
            button6.setForeground(Color.BLACK);
            button6.setFocusable(false);
            bot.add(button6);

            //Styling and adding Button7
            button7.setBackground(Color.WHITE);
            button7.setForeground(Color.BLACK);
            button7.setFocusable(false);
            bot.add(button7);

            //Styling and adding Button8
            button8.setBackground(Color.WHITE);
            button8.setForeground(Color.BLACK);
            button8.setFocusable(false);
            bot.add(button8);

            //Styling and adding Button9
            button9.setBackground(Color.WHITE);
            button9.setForeground(Color.BLACK);
            button9.setFocusable(false);
            bot.add(button9);

            actualOrderLabel.setVisible(false);
            exitButton.setVisible(false);

            bot.add(actualOrderLabel);
            bot.add(exitButton);

            exitButton.setVisible(true);
           


       }//end continuebutton action


       //User choose 0
       if(e.getSource() == button0)
       {
            userGuessList.add(0);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);
            

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button0.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button0.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button0.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button0 action


       //User choose 1
       if(e.getSource() == button1)
       {
            userGuessList.add(1);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button1.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button1.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button1.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button1 action


       //User choose 2
       if(e.getSource() == button2)
       {
            userGuessList.add(2);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button2.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button2.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button2.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button2 action


       //User choose 3
       if(e.getSource() == button3)
       {
            userGuessList.add(3);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button3.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button3.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button3.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button3 action


       //User choose 4
       if(e.getSource() == button4)
       {
            userGuessList.add(4);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button4.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button4.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button4.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button4 action

       //User choose 5
       if(e.getSource() == button5)
       {
            userGuessList.add(5);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button5.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button5.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button5.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button5 action


       //User choose 6
       if(e.getSource() == button6)
       {
            userGuessList.add(6);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button6.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button6.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button6.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button6 action


       //User choose 7
       if(e.getSource() == button7)
       {
            userGuessList.add(7);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button7.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button7.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button7.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button7 action


       //User choose 8
       if(e.getSource() == button8)
       {
            userGuessList.add(8);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button8.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button8.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button8.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button8 action


       //User choose 9
       if(e.getSource() == button9)
       {
            userGuessList.add(9);

            backSpaceButton.setVisible(true);
            eraseAllButton.setVisible(true);

            if(userGuessList.size() == generatedNumbersList.size() )
            {   
                numUserGessedString = numUserGessedString.concat(" " + button9.getText() );
                numberGuessLabel.setText(numUserGessedString);

                //Disable all number Buttons
                button0.setEnabled(false);
                button1.setEnabled(false);
                button2.setEnabled(false);
                button3.setEnabled(false);
                button4.setEnabled(false);
                button5.setEnabled(false);
                button6.setEnabled(false);
                button7.setEnabled(false);
                button8.setEnabled(false);
                button9.setEnabled(false);

                //allow user to begin comparison
                confirmNumberButton.setVisible(true);
            }//endif

            else
            {
                //Show Guess on the screen
                if(numUserGessedString.equals("") ) // this was the first guess
                {
                    numUserGessedString = button9.getText(); 
                }//end if
                else
                {
                    numUserGessedString = numUserGessedString.concat(" " + button9.getText() );
                }//end else
                
                numberGuessLabel.setText(numUserGessedString);       
            }//end else
            
       }//end button9 action


       //User want to remove a number
       if(e.getSource() == backSpaceButton)
       {
           //Hide confirm button whenever backspace is pressed
            confirmNumberButton.setVisible(false);

            //Make sure all number Buttons are enebled
            button0.setEnabled(true);
            button1.setEnabled(true);
            button2.setEnabled(true);
            button3.setEnabled(true);
            button4.setEnabled(true);
            button5.setEnabled(true);
            button6.setEnabled(true);
            button7.setEnabled(true);
            button8.setEnabled(true);
            button9.setEnabled(true);
            if(!numUserGessedString.equals(""))
            { 
                StringBuffer removed = new StringBuffer(numUserGessedString);
                if(removed.length() == 1)
                {
                    removed.deleteCharAt(removed.length()-1);
                }//end if
                else
                {
                    removed.deleteCharAt(removed.length()-1);
                    removed.deleteCharAt(removed.length()-1);
                }//end else

                //change the numbers the users gave
                numUserGessedString =  removed.toString();
                numberGuessLabel.setText(numUserGessedString);

                //remove the number from the userguess list
                userGuessList.remove(userGuessList.size() - 1);
            }//endif
            

       }//end backspace action


       //User wants to erase all guessed
       if(e.getSource() == eraseAllButton)
       {

            //Hide confirm button whenever backspace is pressed
            confirmNumberButton.setVisible(false);
            backSpaceButton.setVisible(false);
            eraseAllButton.setVisible(false);

            //Make sure all number Buttons are enebled
            button0.setEnabled(true);
            button1.setEnabled(true);
            button2.setEnabled(true);
            button3.setEnabled(true);
            button4.setEnabled(true);
            button5.setEnabled(true);
            button6.setEnabled(true);
            button7.setEnabled(true);
            button8.setEnabled(true);
            button9.setEnabled(true);

           //remove all numbers form userguesslist
           while(userGuessList.size() > 0)
           {
               userGuessList.remove(userGuessList.size()-1);
           }//end while

           numUserGessedString ="";

           numberGuessLabel.setText("Show Your Order!");

       }//end erase all action

       //User confirms the number they picked
       if(e.getSource() == confirmNumberButton)
       {
           //Clear screen
            confirmNumberButton.setVisible(false);
            backSpaceButton.setVisible(false);
            eraseAllButton.setVisible(false);

            button0.setVisible(false);
            button1.setVisible(false);
            button2.setVisible(false);
            button3.setVisible(false);
            button4.setVisible(false);
            button5.setVisible(false);
            button6.setVisible(false);
            button7.setVisible(false);
            button8.setVisible(false);
            button9.setVisible(false);
            
            
            numberGuessLabel.setVerticalAlignment(JLabel.TOP);

            comparison(generatedNumbersList, userGuessList);

            userOrderLabel.setText("Your Order:");

            //Styling resultsLabel Label
            resultsLabel.setVerticalAlignment(JLabel.CENTER);
            resultsLabel.setHorizontalAlignment(JLabel.CENTER);
            resultsLabel.setFont(new Font(null,Font.BOLD,45));
            resultsLabel.setForeground(Color.WHITE);
            resultsLabel.setVerticalAlignment(JLabel.CENTER);


            resultsLabel.setVisible(true);

            bot.setLayout(null);

            //Styling resultsLabel Label
            actualOrderLabel.setVerticalAlignment(JLabel.CENTER);
            actualOrderLabel.setFont(new Font(null,Font.BOLD,15));
            actualOrderLabel.setForeground(Color.WHITE);
            actualOrderLabel.setVerticalAlignment(JLabel.CENTER);

            actualOrderLabel.setBounds(130, 18, 290, 20);
            
            exitButton.setBounds(190, 50, 80, 20);

            diplayGeneratedList(generatedNumbersList);
            


            actualOrderLabel.setVisible(true);
            exitButton.setVisible(true);

       }//end confirmbutton action


       //user has finished level 1
       if(e.getSource() == exitButton)
       {
            int response = JOptionPane.showConfirmDialog(null, "Quit Level?", "Quit", JOptionPane.YES_NO_OPTION);
            if(response == 0)
            {
                this.dispose();
                new Level4Frame();
            }  
       }//end exit button action

    }//end actionPerformed
    

    
}

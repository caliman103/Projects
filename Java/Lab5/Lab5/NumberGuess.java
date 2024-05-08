/*Jamaine Drakes
 *Lab 5 - GUI
 */
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import javax.swing.text.AttributeSet.ColorAttribute;

import java.util.Random;
 

public class NumberGuess extends JFrame implements ActionListener
{
    //data members
    //To gemerate random numbers
    Random generator = new Random();

    //Labels
    JLabel instructions = new JLabel("Guess the number behind the question mark:");
    JLabel numToGuess = new JLabel(Integer.toString ((int) generator.nextInt(10) ) );
    JLabel results = new JLabel();

    //Panels
    JPanel top = new JPanel();
    JPanel center = new JPanel();
    JPanel bot = new JPanel();

    //Images
    ImageIcon questionMark = new ImageIcon("questionMark.png");

    //Buttoms
    JButton button0 = new JButton("0");
    JButton button1 = new JButton("1");
    JButton button2 = new JButton("2");
    JButton button3 = new JButton("3");
    JButton button4 = new JButton("4");
    JButton button5 = new JButton("5");
    JButton button6 = new JButton("6");
    JButton button7 = new JButton("7");
    JButton button8 = new JButton("8");
    JButton button9 = new JButton("9");
    JButton startOver = new JButton("Try Again?");

    static public void main(String[] args)
    {
        NumberGuess frame = new NumberGuess();
        centerFrame(frame);
    }//end main

    //constructor
    NumberGuess()
    {
        //Setting up Frame
        this.setLayout(new BorderLayout() );
        this.setSize(500,220);
        this.setTitle("Number Guess");
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        this.getContentPane().setBackground(Color.green);
        this.setResizable(false);
        

        //Top area

        //Instructions component
        top.setLayout(new FlowLayout() );
      //  top.setBackground(Color.GRAY);


        //Text
        instructions.setForeground(Color.BLACK);


        Image alteredImage = questionMark.getImage(); //get the imageicon as an image  to scale it
        Image newQuestionMark =  alteredImage.getScaledInstance(10, 10, Image.SCALE_SMOOTH); //transform it
        questionMark = new ImageIcon(newQuestionMark); //convertit back to imageIcon
        instructions.setIcon(questionMark);
        instructions.setHorizontalTextPosition(JLabel.LEFT);

        //number parts
        numToGuess.setVisible(false);

        //adding components to the top of the frame
        top.setSize(500, 80);
        top.add(instructions);
        top.add(numToGuess);



        //Adding components tp the center of Frame
        center.setLayout(new FlowLayout(FlowLayout.CENTER,8,10) );
      //  center.setBackground(Color.CYAN);

        //Styling and adding Button0
        button0.setBackground(Color.BLACK);
        button0.setForeground(Color.WHITE);
        button0.setFocusable(false);
        center.add(button0);

        //Styling and adding Button1
        button1.setBackground(Color.BLACK);
        button1.setForeground(Color.WHITE);
        button1.setFocusable(false);
        center.add(button1);

        //Styling and adding Button2
        button2.setBackground(Color.BLACK);
        button2.setForeground(Color.WHITE);
        button2.setFocusable(false);
        center.add(button2);

        //Styling and adding Button3
        button3.setBackground(Color.BLACK);
        button3.setForeground(Color.WHITE);
        button3.setFocusable(false);
        center.add(button3);

        //Styling and adding Button4
        button4.setBackground(Color.BLACK);
        button4.setForeground(Color.WHITE);
        button4.setFocusable(false);
        center.add(button4);

        //Styling and adding Button5
        button5.setBackground(Color.BLACK);
        button5.setForeground(Color.WHITE);
        button5.setFocusable(false);
        center.add(button5);

        //Styling and adding Button6
        button6.setBackground(Color.BLACK);
        button6.setForeground(Color.WHITE);
        button6.setFocusable(false);
        center.add(button6);

         //Styling and adding Button7
        button7.setBackground(Color.BLACK);
        button7.setForeground(Color.WHITE);
        button7.setFocusable(false);
        center.add(button7);

        //Styling and adding Button8
        button8.setBackground(Color.BLACK);
        button8.setForeground(Color.WHITE);
        button8.setFocusable(false);
        center.add(button8);

        //Styling and adding Button9
        button9.setBackground(Color.BLACK);
        button9.setForeground(Color.WHITE);
        button9.setFocusable(false);
        center.add(button9);



        //Customising bottom button
        startOver.setBackground(Color.BLACK);
        startOver.setForeground(Color.green);

        //Adding listeners for each of the buttons
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

        startOver.addActionListener(this);

        this.add("North",top);
        this.add("Center",center);
        this.add("South",bot);

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
    public void actionPerformed(ActionEvent e) {

        //Button With 0
       if(e.getSource() == button0)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum== 0)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

           //Buttton to Restart
           startOver.setVisible(true);
           bot.add(startOver);

        }//end if

        //Button With 1
        if(e.getSource() == button1)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum== 1)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 2
        if(e.getSource() == button2)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 2)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 3
        if(e.getSource() == button3)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 3)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 4
        if(e.getSource() == button4)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 4)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 5
        if(e.getSource() == button5)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

             //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 5)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 6
        if(e.getSource() == button6)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 6)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 7
        if(e.getSource() == button7)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 7)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 8
        if(e.getSource() == button8)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 8)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);

        }//end if

        //Button With 9
        if(e.getSource() == button9)
       {
            instructions.setIcon(null);
            numToGuess.setVisible(true);

            //Disable All Buttons
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

            int revealedNum = Integer.parseInt(numToGuess.getText()); 

            if(revealedNum == 9)
            {
                results.setText("CONGRATULATIONS");
                results.setForeground(new Color(0,0,153 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
               
            }//endif

            else
            {
                results.setText("INCORRECT");
                results.setForeground(new Color(153,0,0 ) );
                results.setFont(new Font("Courier",Font.BOLD,45) );
                results.setVisible(true);

                center.add(results);
            }//end else

            //Buttton to Restart
            startOver.setVisible(true);
            bot.add(startOver);


        }//end if


        //Start over Button
        if(e.getSource() == startOver)
        {
            numToGuess.setText(  Integer.toString ((int) generator.nextInt(10) ) );

            instructions.setIcon(questionMark);
            instructions.setHorizontalTextPosition(JLabel.LEFT);
            numToGuess.setVisible(false);
            results.setVisible(false);

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

            startOver.setVisible(false);
        }//endif



    }//end actionperformed
    
    


}//end FrameTests

//tester file for the paddle class
// GLEW
#include <GL/glew.h>

class Paddle {
    private:
        GLfloat paddleX;
        GLfloat paddleY;
        GLfloat paddleZ;
        GLfloat paddleXinc;
        GLfloat paddleYinc;
        GLfloat paddleZinc;
        GLfloat paddleXScale;
        GLfloat paddleYScale;
        GLchar* paddleSize;
 
    public:
        //Constructor
        Paddle(GLfloat Xpos) {
            paddleX = Xpos;
            paddleY = 0.0;
            paddleZ = 0.0;
            paddleXinc = 0.0;
            paddleYinc = 0.13;
            paddleZinc = 0.0;
            paddleXScale = 5.0;
            paddleYScale = 7.0;
            paddleSize = (GLchar*)"normal";
        }

        //Accessors
        GLfloat getPaddleX() { return paddleX; }
        GLfloat getPaddleY() { return paddleY; }
        GLfloat getPaddleZ() { return paddleZ; }
        GLfloat getPaddleXinc() { return paddleXinc; }
        GLfloat getPaddleYinc() { return paddleYinc; }
        GLfloat getPaddleZinc() { return paddleZinc; }
        GLfloat getPaddleXScale() { return paddleXScale; }
        GLfloat getPaddleYScale() { return paddleYScale; }
        GLchar* getPaddleSize() { return paddleSize; }


        //Mutators
        GLvoid setXpos(GLfloat newX) {paddleX = newX; }
        GLvoid setYpos(GLfloat newY) {paddleY = newY; }
        GLvoid setZpos(GLfloat newZ) {paddleZ = newZ; }
        GLvoid setXinc(GLfloat newXinc) { paddleXinc = newXinc; }
        GLvoid setYinc(GLfloat newYinc) { paddleYinc = newYinc; }
        GLvoid setZinc(GLfloat newZinc) { paddleZinc = newZinc; }
        GLvoid setXScale(GLfloat newXScale) { paddleXScale = newXScale; }
        GLvoid setYScale(GLfloat newYScale) { paddleYScale = newYScale; }
        GLvoid setPaddleSize(GLchar* newPaddleSize) { paddleSize = newPaddleSize; }


        //Other Functions
        GLvoid movePaddle(GLint direction, GLfloat deltaTime);
      //GLvoid changeSize(GLint sacle);
        GLvoid collisionCheck();
        //GLvoid resetSize() { paddleYScale = 7.0; }  // Function is called after the increase or decrease size powerup has worn of
        
};

//Move the paddle up or down depending on the value passed to it
GLvoid Paddle::movePaddle(GLint direction, GLfloat deltaTime) {
     paddleY += paddleYinc * deltaTime * direction;
}//end movePaddle


//Function to change size of paddles. Could possibly use this function for collision detection as well
//Maybe pass the currentBall as a parameter and do the calculations based on that
GLvoid Paddle::collisionCheck(/* Ball currentBall, GLint currentIndex *, GLint paddleXPos (1 or -1 will be passed check pongtest for 
                                                                                       paddle2 collision, we can multiply the Xpos by 1
                                                                                       for paddle 1 and -1 for paddle2)*/) {
    if (paddleSize == (GLchar*)"normal") {
        paddleYScale = 7.0;

        //Add paddle dection code when the paddle is normal size
    }
        
    else if (paddleSize == (GLchar*)"big") {
        paddleYScale = 12.0;

        //Add paddle dection code when the paddle is bigsize
    }
        
    else if (paddleSize == (GLchar*)"small") {
        paddleYScale = 4.0;

        ////Add paddle dection code when the paddle is small size
    }
        
    
}//end changeSize



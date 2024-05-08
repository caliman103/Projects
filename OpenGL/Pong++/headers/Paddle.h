#ifndef PADDLE_H
#define PADDLE_H

#include <GL/glew.h>
#include "../shader.h"
#include "../model.h"

#include "GameObject.h"

// Header file to manage paddle object

class Paddle : public GameObject
{
    using GameObject::GameObject;
public:
    GLfloat length = 1.55f;
    glm::vec3 velocity;

#pragma region "Constructors"
    Paddle(GLchar* objFile, GLchar* vertexShader, GLchar* fragmentShader)
        :GameObject(objFile, vertexShader, fragmentShader)
    {
    } //end Paddle constructor  

    Paddle(Model myModel, Shader myShader)
        :GameObject(myModel, myShader)
    {
    }

    Paddle(Model myModel, Shader myShader, glm::vec3 initPosition)
        :GameObject(myModel, myShader, initPosition)
    {
    }

#pragma endregion //constructors

    GLvoid changeSize(GLint size); //Change size of paddle based on value passed
    GLboolean collisionCheck(Ball* ball); //checks to see if ball has collided with paddle

    GLvoid move(GLfloat deltaTime);
}; //and Paddle Class

GLvoid Paddle::changeSize(GLint size)
{

}//end changeize()

GLboolean Paddle::collisionCheck(Ball* ball)
{
    // check if the ball's x position is too close to the paddle
    if (this->position.x >= 0 && ball->velocity.x > 0)
    {
        // check if the ball's x position is within the x range the paddle takes up
        if (((ball->position.x + ball->radius) > (this->position.x - 0.15f)) && ((ball->position.x + ball->radius) < (this->position.x + 0.15f)))
        {
            // check if the ball's z position is within the z range the paddle takes up
            if (((ball->position.z) > ((this->position.z) - (this->length / 2))) && ((ball->position.z) < (this->position.z) + (this->length / 2)))
            {
                // in this case the ball has collided

                // get the ball's non-diretional speed for later calculations
                GLfloat ballSpeed = glm::length(ball->velocity);

                // get the percentage location on the paddle the ball hit
                GLfloat ballHitLocation = ((ball->position.z - (this->position.z - (this->length / 2))) / this->length) - 0.5;

                // calculate the ball's new angle based on where it hit (range of +- 45 deg)
                GLfloat ballAngle = glm::radians(45.0) * (ballHitLocation * 2.0);

                //cout << (ballAngle) << "\t" << ballHitLocation << endl;

                // apply this angle offset to the ball (after clamping it)

                ball->velocity.x = ballSpeed * glm::cos(ballAngle);
                ball->velocity.z = ballSpeed * glm::sin(ballAngle);


                // add a speed boost to the ball (up to a point (5 units per sec))
                ball->velocity *= -1.2;

                if (glm::length(ball->velocity) > 5.0)
                {
                    ball->velocity *= (1.0 / (glm::length(ball->velocity) / 5.0));
                }

                cout << glm::length(ball->velocity) << endl;

                ball->velocity.z *= -1.0;
                return true;
            }
        }

        // older, less readable version of this logic, kept just in case
        /*if (((ball->position.x + ball->radius) > (this->position.x - 0.15f)) && (ball->velocity.x > 0) && (ball->position.z > ((this->position.z) - (this->length / 2))) && ((ball->position.z) < (this->position.z) + (this->length / 2)))
        {
            ball->velocity.x *= -1;
            return true;
        }*/
    }
    else if (this->position.x < 0 && ball->velocity.x < 0)
    {
        // check if the ball's x position is within the x range the paddle takes up
        if (((ball->position.x - ball->radius) > (this->position.x - 0.15f)) && ((ball->position.x - ball->radius) < (this->position.x + 0.15f)))
        {
            // check if the ball's z position is within the z range the paddle takes up
            if (((ball->position.z) > ((this->position.z) - (this->length / 2))) && ((ball->position.z) < (this->position.z) + (this->length / 2)))
            {
                // in this case the ball has collided

                // get the ball's non-diretional speed for later calculations
                GLfloat ballSpeed = glm::length(ball->velocity);

                // get the percentage location on the paddle the ball hit
                GLfloat ballHitLocation = ((ball->position.z - (this->position.z - (this->length / 2))) / this->length) - 0.5;

                // calculate the ball's new angle based on where it hit (range of +- 45 deg)
                GLfloat ballAngle = glm::radians(180.0) - (glm::radians(45.0) * (ballHitLocation * 2.0));

                //cout << (ballAngle) << "\t" << ballHitLocation << endl;

                // apply this angle offset to the ball (after clamping it)

                ball->velocity.x = ballSpeed * glm::cos(ballAngle);
                ball->velocity.z = ballSpeed * glm::sin(ballAngle);


                // add a speed boost to the ball (up to a point (5 units per sec))
                ball->velocity *= -1.2;

                if (glm::length(ball->velocity) > 5.0)
                {
                    ball->velocity *= (1.0 / (glm::length(ball->velocity) / 5.0));
                }

                cout << glm::length(ball->velocity) << endl;

                ball->velocity.z *= -1.0;
                return true;
            }
        }

        /*if (((ball->position.x - ball->radius) < (this->position.x + 0.15f)) && (ball->velocity.x < 0) && (ball->position.z > ((this->position.z) - (this->length / 2))) && ((ball->position.z) < (this->position.z) + (this->length / 2)))
        {
            ball->velocity.x *= -1;
            return true;
        }*/
    }

    return false;
}

GLvoid Paddle::move(GLfloat deltaTime)
{
    this->position += (velocity * deltaTime);
}//end move()

#endif //!PADDLE_H
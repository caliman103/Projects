#ifndef POWERUP_H
#define POWERUP_H

#include <GL/glew.h>
#include "../shader.h"
#include "../model.h"

#include "GameObject.h"
#include "Paddle.h"
#include "Ball.h"

enum class PowerupType
{
    PaddleLengthIncrease = 1,
    BallSpeedIncrease
};

class Powerup : public GameObject
{
    using GameObject::GameObject;
public:
    GLfloat radius = 0.25;
    GLboolean active = false;
    PowerupType type = PowerupType::PaddleLengthIncrease;
    GLboolean paddle1Affected = false, paddle2Affected = false;

    GLfloat effectLength = 10.0, effectTimer;

#pragma region "Constructors"
    Powerup(GLchar* objFile, GLchar* vertexShader, GLchar* fragmentShader)
        :GameObject(objFile, vertexShader, fragmentShader)
    {
    }

    Powerup(Model myModel, Shader myShader)
        :GameObject(myModel, myShader)
    {
    }

    Powerup(Model myModel, Shader myShader, glm::vec3 initPosition)
        :GameObject(myModel, myShader, initPosition)
    {
    }

#pragma endregion //constructors

    GLboolean collisionCheck(Ball* ball); //checks to see if ball has collided with paddle
    GLvoid activate();
    GLvoid deactivate();
    GLvoid handleTimers();
    GLvoid applyEffect();
    GLvoid removeEffect();

    GLvoid move(GLfloat deltaTime);
}; //and Paddle Class

#pragma region "Function Definitions"

GLboolean Powerup::collisionCheck(Ball* ball)
{
    if (active)
    {
        // check if the ball is in range of the powerup
            //calc distance
        GLfloat distance = sqrt(pow(ball->position.x - this->position.x, 2) + pow(ball->position.z - this->position.z, 2));

        if (distance < (ball->radius + this->radius))
        {
            return true;
        }
    }

    return false;
}

// when the powerup is activated, it chooses its effect

// when the powerup is collided with, it willd deactivate, apply its chosen effect and begin an internal timer

// when the timer runs down the effect is deactivated

//GLvoid Powerup::activate()
//{
//    this->active = true;
//    this->type = PowerupType(static_cast<PowerupType>((rand() % 2) + 1));
//}
//
//GLvoid Powerup::deactivate()
//{
//
//}
//
//GLvoid Powerup::handleTimers()
//{
//
//}
//
//GLvoid Powerup::applyEffect()
//{
//    switch (this->type)
//    {
//    case PowerupType::PaddleLengthIncrease:
//        // check the ball's x velocity to determine which paddle last hit it
//        if (ball->velocity.x > 0)
//        {
//            paddle1->length *= 1.2;
//            paddle1->scale.z *= 1.2;
//        }
//        else
//        {
//            paddle2->length *= 1.2;
//            paddle2->scale.z *= 1.2;
//        }
//        break;
//    }
//}
//
//GLvoid Powerup::removeEffect()
//{
//    switch (this->type)
//    {
//    case PowerupType::PaddleLengthIncrease:
//        if (paddle1Affected)
//        {
//            paddle1->length *= (1 / 1.2);
//            paddle1->scale.z *= (1 / 1.2);
//        }
//        else
//        {
//            paddle2->length *= (1 / 1.2);
//            paddle2->scale.z *= (1 / 1.2);
//        }
//        break;
//    }
//}


#pragma endregion
#endif

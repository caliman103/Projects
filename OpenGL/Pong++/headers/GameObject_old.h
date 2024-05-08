#ifndef GAMEOBJECT_H
#define GAMEOBJECT_H

#include <GL/glew.h>
#include "../shader.h"
#include "../model.h"

class GameObject
{
    public:
        glm::vec3 position;     //Vector to hold translation position of object
        glm::vec3 velocity;     //Vector to hold speed and direction at which objects move
        glm::vec3 rotationAxis; //Vector to hold target axis of retation 
        GLfloat rotationAngle;  //
        glm::vec3 scale;        //Vector to hold scale of each object in world
         
        //Constructor
        GameObject()
        {
            position = glm::vec3(0.0f);
            velocity = glm::vec3(0.0f);
            rotationAxis = glm::vec3(0.0f, 1.0f, 0.0f);
            GLfloat rotationAngle = 0.0f;
            scale = glm::vec3(1.0f);
        }//end constructor GameObject()

        GameObject(glm::vec3 pos)
        {
            position = pos;
            velocity = glm::vec3(0.0f);
            rotationAxis = glm::vec3(0.0f, 1.0f, 0.0f);
            GLfloat rotationAngle = 0.0f;
            scale = glm::vec3(1.0f);
        }//end constructor GameObject(pos)
        

        GLvoid move(GLfloat deltaTime); //Works for all objects that inherits from BoardItem
}; // end BoardItem

GLvoid GameObject::move(GLfloat deltaTime)
{
	this->position += (this->velocity * deltaTime);
}// end move

#endif
#ifndef BALL_H
#define BALL_H

#include <GL/glew.h>
#include "../shader.h"
#include "../model.h"

#include "GameObject.h"

class Ball : public GameObject
{
	using GameObject::GameObject;
public:
	glm::vec3 velocity;
	GLfloat radius;

#pragma region "Conscturctors"

	Ball(GLchar* objFile, GLchar* vertexShader, GLchar* fragmentShader, GLfloat myRadius)
		:GameObject(objFile, vertexShader, fragmentShader)
	{
		velocity = glm::vec3(0);
		radius = myRadius;
	}

	//Was just wondering if something like this would work
	Ball(Model myModel, Shader myShader, GLfloat myRadius)
		:GameObject(myModel, myShader)
	{
		velocity = glm::vec3(0);
		radius = myRadius;
	}

	Ball(Model myModel, Shader myShader, glm::vec3 initPosition)
		:GameObject(myModel, myShader, initPosition)
	{
		velocity = glm::vec3(0);
		radius = 0.00000000001f;
	}

#pragma endregion

	GLvoid collisionCheckZ(GLfloat wall); //check to see if the ball has hit edge of board (z-axis)
	GLint collisionCheckX(GLfloat wall);          // check to see if the ball has passed edge of board (x-axis)

	GLvoid move(GLfloat deltaTime);

}; //end Ball class


#pragma region "Function Definitions"

GLvoid Ball::collisionCheckZ(GLfloat wall)
{
	if ((this->velocity.z > 0 && this->position.z > wall) || (this->velocity.z < 0 && this->position.z < -wall))
	{
		this->velocity.z *= -1;
	}
}//end collisionCheckZ


//REMEMBER TO COMMENT THIS FOR OTHERS
GLint Ball::collisionCheckX(GLfloat wall)
{
	if ((this->velocity.x > 0 && this->position.x > wall) || (this->velocity.x < 0 && this->position.x < -wall))
	{
		return this->position.x;
	}
	else
	{
		return 0;
	}
}//end collisionCheckX

GLvoid Ball::move(GLfloat deltaTime)
{
	this->position += (velocity * deltaTime);
}//end move()

#pragma endregion


#endif // !BALL_H

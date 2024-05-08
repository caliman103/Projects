#ifndef GAMEOBJECT_H
#define GAMEOBJECT_H

#include <GL/glew.h>
#include "../shader.h"
#include "../model.h"

class GameObject
{
public:
    // positional information
    glm::vec3 position;     //Vector to hold translation position of object
    glm::vec4 rotation;
    glm::vec3 scale;        //Vector to hold scale of each object in world
    glm::mat4 model;

    Model object;
    Shader shader;


#pragma region "Constructors"

    GameObject(Model myModel, Shader myShader)
        :object(myModel), shader(myShader), model(1), position(0), scale(1)
    {
        rotation = glm::vec4(0.0, 1.0, 0.0, 0.0);
        GLfloat rotationAngle = 0.0f;
    }//end GameObject

    GameObject(GLchar* objFile, GLchar* vertexShader, GLchar* fragmentShader)
        :object(objFile), shader(Shader(vertexShader, fragmentShader)), model(1), position(0), scale(1)
    {
        rotation = glm::vec4(0.0, 1.0, 0.0, 0.0);
        GLfloat rotationAngle = 0.0f;
    }//end GameObject

    GameObject(Model myModel, Shader myShader, glm::vec3 initPosition)
        :object(myModel), shader(myShader), model(1), position(initPosition), scale(1)
    {
        rotation = glm::vec4(0.0, 1.0, 0.0, 0.0);
        GLfloat rotationAngle = 0.0f;
    }//end GameObject

#pragma endregion

    GLvoid useShader();

    // set the model and view matrices
    GLvoid setProjection(glm::mat4 projection);
    GLvoid setView(glm::mat4 view);

    // methods for applying new transformations to the model matrix
    GLvoid applyTransform();
    GLvoid applyTransform(glm::vec3 translate, glm::vec3 rotate, GLfloat angle, glm::vec3 scale);

    // method for drawing the object on screen
    GLvoid draw();
}; // end BoardItem


#pragma region "Function Definitions"

GLvoid GameObject::useShader()
{
    this->shader.Use();
}

GLvoid GameObject::setProjection(glm::mat4 projection)
{
    this->shader.Use();
    glUniformMatrix4fv(glGetUniformLocation(this->shader.Program, "projection"),
        1, GL_FALSE, glm::value_ptr(projection));
}

GLvoid GameObject::setView(glm::mat4 view)
{
    this->shader.Use();
    glUniformMatrix4fv(glGetUniformLocation(this->shader.Program, "view"), 1,
        GL_FALSE, glm::value_ptr(view));
}

GLvoid GameObject::applyTransform()
{
    this->shader.Use();
    // reset the model matrix
    this->model = glm::mat4(1);

    // apply the transformations stored in the object attributes
    this->model = glm::translate(this->model, this->position);
    this->model = glm::scale(this->model, this->scale);
    this->model = glm::rotate(this->model, this->rotation.w, glm::vec3(this->rotation.x, this->rotation.y, this->rotation.z));
}

GLvoid GameObject::applyTransform(glm::vec3 translation, glm::vec3 rotationAxis, GLfloat angle, glm::vec3 scale)
{
    this->shader.Use();
    // reset the model matrix
    this->model = glm::mat4(1);

    // change the appropriate attributes to the parameters provided
    this->position = translation;
    this->rotation = glm::vec4(rotationAxis, angle);
    this->scale = scale;


    // apply the transformations stored in the object attributes
    this->model = glm::translate(this->model, this->position);
    this->model = glm::scale(this->model, this->scale);
    this->model = glm::rotate(this->model, this->rotation.w, glm::vec3(this->rotation.x, this->rotation.y, this->rotation.z));
}

GLvoid GameObject::draw()
{
    // pass the model matrix to the shader
    glUniformMatrix4fv(glGetUniformLocation(this->shader.Program, "model"), 1,
        GL_FALSE, glm::value_ptr(this->model));

    // draw the object
    this->object.Draw(this->shader);
}

#pragma endregion

#endif
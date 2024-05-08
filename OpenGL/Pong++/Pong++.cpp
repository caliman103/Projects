//
// Pong++
//
// Created by Kajanda Belgrave, Deborah Best, Jamaine Drakes, Evan Leacock, Dana Ramsey, Matthew Warner
// 
// 
// ========================================================================
//  PROGRAM:
//				PONG++
//    Keys:
//        W KEY             - MOVE LEFT PADDLE UP
//        S KEY             - MOVE LEEFT PADLE DOWN
//        UP ARROW KEY      - MOVE RIGHT PADDLE UP
//        DOWN ARROW KEY    - MOVE RIGHT PADDLE DOWN
//        ESC               - END PROGRAM
//      
//
// ========================================================================
/*=========================================================================

Install the following in Package Manager :

Install-Package glew_dynamic
Install-Package glfw
Install-Package GLMathematics
Install-Package freeimage -version 3.16.0
Install-Package nupengl.core
Install-Package Soil
Install-Package Assimp -version 3.0.0

//=========================================================================*/
// Description of program:
//		Hits the ball back and forth (powerups included)<- make this sound better later
// ========================================================================
// Standard Includes
#include <string>
#include <algorithm>
using namespace std;

// GLEW
//#define GLEW_STATIC
#include <GL/glew.h>

// GLFW
#include <GLFW/glfw3.h>

#include <glm/ext.hpp>

// GL includes
#include "shader.h"
#include "camera.h"
#include "model.h"

// GLM Mathemtics
#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

//time
#include <time.h>

//for sleep function
#include <chrono>
#include <thread>

//vector
#include <vector>

//for fabs()
#include <math.h>

//For time_point
#include<chrono>

//For cout
#include<iostream>

#include "headers/GameObject.h"
#include "headers/Ball.h"
#include "headers/Paddle.h"
#include "headers/Powerup.h"

using namespace std;         //cout, cin
using namespace std::chrono; // nanoseconds, system_clock, seconds


// Active window
GLFWwindow* window;

// Properties
GLuint sWidth = 1200, sHeight = 675;
float aspectRatio = (float)sWidth / (float)sHeight;

// Time variables
steady_clock::time_point clock_start; // start time
steady_clock::time_point old, now;
GLfloat deltaTime;


// Function prototypes
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mode);
void scroll_callback(GLFWwindow* window, double xoffset, double yoffset);
void mouse_callback(GLFWwindow* window, double xpos, double ypos);

GLvoid orbitCamera(GLfloat radius, GLfloat yPos, GLfloat deltaTime);
GLboolean moveCamera(glm::vec3 destination, GLfloat duration, GLfloat deltaTime);

GLfloat negateOrNot(GLfloat value);

GLuint loadTexture(GLchar const* path);
GLuint loadCubemap(std::vector<std::string> faces);

/*
*
 //========= Prototype function for call back ===============================
//void keyboardCallback(GLFWwindow* window, int key, int scancode, int action, int modes);
//void mouseClickedCallback(GLFWwindow* window, int button, int  action, int mode);
//void moveMouseCallback(GLFWwindow* window, double xpos, double ypos);
//void clickDragCallback(GLFWwindow* window, int button, int  action, int mode);

//==========================================================================

// Camera Information
GLfloat cameraDist = 25.0f;
glm::vec3 initCamLocation(0.0f, 0.0f, cameraDist), camLocation(initCamLocation.x, initCamLocation.y, initCamLocation.z);
Camera camera(camLocation);

// Time-Keeping
steady_clock::time_point clock_start; // start time
steady_clock::time_point old, now;
GLfloat deltaTime;

*/
glm::vec3 camPlayView(0.0, 6.0, 0.000001);
glm::vec3 camViewTarget = glm::vec3(0);
// Camera
Camera camera(camPlayView);

// Camera viewing distance
GLfloat cameraDist = 10.0f;
glm::vec3 camLocation;
GLfloat cameraOrbitAngle = glm::radians(90.0), cameraOrbitAngleInc = glm::radians(36.0);

GLboolean paddle1MovingUp = false;
GLboolean paddle1MovingDown = false;

GLboolean paddle2MovingUp = false;
GLboolean paddle2MovingDown = false;


bool keys[1024];
GLfloat lastX = 400, lastY = 300;
bool moveMouse = true;
bool play = false, cameraMoving = false;

// Camera movement increment
GLfloat delta = 0.15f;


GLfloat angle = 0.0f;
GLfloat boardAngle = 0.0f;

glm::vec3 ballInitPosition = glm::vec3(0.0, 0.3, 0.0);


void init_Resources()
{
    // Init GLFW
    glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 2);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
    glfwWindowHint(GLFW_RESIZABLE, GL_FALSE);
    glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

    // Define the window
    window = glfwCreateWindow(sWidth, sHeight, "COMP3420 - Pong++", 0, 0);
    glfwMakeContextCurrent(window);



    // Set the required callback functions
    glfwSetKeyCallback(window, key_callback);
    glfwSetCursorPosCallback(window, mouse_callback);
    glfwSetScrollCallback(window, scroll_callback);


    // Options - Hide the mouse pointer
    //glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);



    // Initialize GLEW to setup the OpenGL Function pointers
    glewExperimental = GL_TRUE;
    glewInit();

    // Define the viewport dimensions
    glViewport(0, 0, sWidth, sHeight);

    // Setup OpenGL options
    glEnable(GL_DEPTH_TEST);

} //end init_Resources




// The MAIN function, from here we start our application
int main()
{
    clock_start = steady_clock::now(); // get the beginning time of the program
    old = clock_start;
    srand(time(0)); //seeding thingy
    init_Resources();

    // ==============================================
    // ====== Set up the stuff for our models =======
    // ==============================================

    vector<GameObject*> gameObjects;
    vector<Model> gameModels;

    // float golfballInformation[3] = {0.04, 2.0, 2.0 };
    // float tennisballInformation[3] = {0.05, 2.0, 2.0 };
    // float cricketballInformation[3] = {0.06, 2.0, 2.0 };
    // float basketballInformation[3] = {0.07, 2.0, 2.0 };

    // ballInformation.push_back(golfballInformation);
    // ballInformation.push_back(tennisballInformation);
    // ballInformation.push_back(cricketballInformation);
    // ballInformation.push_back(basketballInformation);

    // =======================================================================
    // Step 1. Setup and compile our shaders as an object of the Shader class
    // =======================================================================
    Shader skyboxShader("Skybox/skyboxVertex.glsl", "Skybox/skyboxFragment.glsl");
    Shader boardShader("Board/boardVertex.glsl", "Board/boardFragment.glsl");

    // =======================================================================
    // Step 2. Load the geometrical model objects
    // =======================================================================
    Model pregameBoardModel((GLchar*)"Board/pregame_Board.obj");
    Model ingameBoardModel((GLchar*)"Board/ingame_Board.obj");
    Model windballModel = (GLchar*)"Balls/windball.obj";
    Model waterballModel = (GLchar*)"Balls/waterball.obj";
    Model earthballModel = (GLchar*)"Balls/earthball.obj";
    Model fireballModel = (GLchar*)"Balls/fireball.obj";

    gameModels.push_back(windballModel);
    gameModels.push_back(waterballModel);
    gameModels.push_back(earthballModel);
    gameModels.push_back(fireballModel);

    GameObject board((GLchar*)"Board/pregame_Board.obj", (GLchar*)"Board/boardVertex.glsl", (GLchar*)"Board/boardFragment.glsl");
    board.object = pregameBoardModel;

    Ball ball((GLchar*)"Balls/waterball.obj", (GLchar*)"Balls/ballVertex.glsl", (GLchar*)"Balls/ballFragment.glsl", 0.08f);

    Paddle paddle1((GLchar*)"Paddle/paddle1.obj", (GLchar*)"Paddle/paddleVertex.glsl", (GLchar*)"Paddle/paddleFragment.glsl");
    Paddle paddle2((GLchar*)"Paddle/paddle2.obj", (GLchar*)"Paddle/paddleVertex.glsl", (GLchar*)"Paddle/paddleFragment.glsl");

    Powerup powerup((GLchar*)"PowerUp/growPowerUp.obj", (GLchar*)"PowerUp/powerUpVertex.glsl", (GLchar*)"PowerUp/powerUpFragment.glsl");

    gameObjects.push_back(&board);
    gameObjects.push_back(&ball);
    gameObjects.push_back(&paddle1);
    gameObjects.push_back(&paddle2);
    gameObjects.push_back(&powerup);


    GLfloat skyboxVertices[] =
    {
        // Positions          
        -1.0f,  1.0f, -1.0f,        // Back face - 2 triangles
        -1.0f, -1.0f, -1.0f,
         1.0f, -1.0f, -1.0f,
         1.0f, -1.0f, -1.0f,
         1.0f,  1.0f, -1.0f,
        -1.0f,  1.0f, -1.0f,

        -1.0f, -1.0f,  1.0f,        //Left side
        -1.0f, -1.0f, -1.0f,
        -1.0f,  1.0f, -1.0f,
        -1.0f,  1.0f, -1.0f,
        -1.0f,  1.0f,  1.0f,
        -1.0f, -1.0f,  1.0f,

         1.0f, -1.0f, -1.0f,        // Right face
         1.0f, -1.0f,  1.0f,
         1.0f,  1.0f,  1.0f,
         1.0f,  1.0f,  1.0f,
         1.0f,  1.0f, -1.0f,
         1.0f, -1.0f, -1.0f,

        -1.0f, -1.0f,  1.0f,        // Front face
        -1.0f,  1.0f,  1.0f,
         1.0f,  1.0f,  1.0f,
         1.0f,  1.0f,  1.0f,
         1.0f, -1.0f,  1.0f,
        -1.0f, -1.0f,  1.0f,

        -1.0f,  1.0f, -1.0f,        // Top face
         1.0f,  1.0f, -1.0f,
         1.0f,  1.0f,  1.0f,
         1.0f,  1.0f,  1.0f,
        -1.0f,  1.0f,  1.0f,
        -1.0f,  1.0f, -1.0f,

        -1.0f, -1.0f, -1.0f,        // Bottom face
        -1.0f, -1.0f,  1.0f,
         1.0f, -1.0f, -1.0f,
         1.0f, -1.0f, -1.0f,
        -1.0f, -1.0f,  1.0f,
         1.0f, -1.0f,  1.0f
    };

    // Setup skybox VAO
    GLuint skyboxVAO, skyboxVBO;

    glGenVertexArrays(1, &skyboxVAO);
    glGenBuffers(1, &skyboxVBO);
    glBindVertexArray(skyboxVAO);
    glBindBuffer(GL_ARRAY_BUFFER, skyboxVBO);
    glBufferData(GL_ARRAY_BUFFER, sizeof(skyboxVertices), &skyboxVertices,
        GL_STATIC_DRAW);

    glEnableVertexAttribArray(0);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE,
        3 * sizeof(GLfloat), (GLvoid*)0);

    glBindVertexArray(0);


    // Cubemap (Skybox)
    std::vector<std::string> faces;
    faces.push_back("Skybox/right.png");
    faces.push_back("Skybox/left.png");
    faces.push_back("Skybox/top.png");
    faces.push_back("Skybox/bottom.png");
    faces.push_back("Skybox/back.png");
    faces.push_back("Skybox/front.png");


    GLuint skyboxTexture = loadCubemap(faces);

    // Create a sphere model

    // =======================================================================
    // Step 3. Set the projection matrix
    // =======================================================================
    glm::mat4 projection = glm::perspective(45.0f,
        (GLfloat)sWidth / (GLfloat)sHeight,
        1.0f, 10000.0f);

    for (GameObject* gameObj : gameObjects)
    {
        gameObj->setProjection(projection);
    }



    // Translate the board
    board.position = glm::vec3(0);

    // Initial ball information
    glm::vec3 ballInitVelocity(2.0, 0.0, 1.0);
    ball.position = ballInitPosition;
    ball.velocity = ballInitVelocity;
    //ball.velocity = glm::vec3(negateOrNot(0.4),0.0, negateOrNot(1.0));
    ball.scale = glm::vec3(0.07);
    GLint collisionResults; //gets the results of the collsionCheckX() of the ball

    // powerup information
    powerup.position = glm::vec3(0.0, -1.0, 0.0);
    powerup.scale = glm::vec3(0.25);

    GLfloat powerupDelay = 5.0, powerupTimer = 1.0; // num of secs before spawn
    GLfloat effectDelay = 4.5, effectTimer = effectDelay;
    GLboolean powerupEffectActive = false, paddle1Affected = false, paddle2Affected = false, ballAffected = false;

    // Paddle information
        // paddle1
    paddle1.position = glm::vec3(4.0, 0.2, 0.0);
    paddle1.rotation = glm::vec4(0.0, 1.0, 0.0, glm::radians(90.0));
    paddle1.scale = glm::vec3(0.15, 0.15, 0.2);

    // paddle2
    paddle2.position = glm::vec3(-4.0, 0.2, 0.0);
    paddle2.rotation = glm::vec4(0.0, 1.0, 0.0, glm::radians(90.0));
    paddle2.scale = glm::vec3(0.15, 0.15, 0.2);

    glm::vec3 paddleSpeed = glm::vec3(0.0, 0.0, 5.0);
    GLfloat paddleWall = 2.9;


    // apply the initial transformations to each game object
    for (GameObject* gameObj : gameObjects)
    {
        gameObj->applyTransform();
    }

    //cameraMoving = true;

    //=============================================================================================//
    //========================================= GAME LOOP =========================================//
    //=============================================================================================//

    while (!glfwWindowShouldClose(window))
    {
        now = steady_clock::now();
        deltaTime = GLfloat((now - old).count() / (1000000000.0)); // get the time since the last time deltaTime was checked
        // NOTE: .count() here returns the time in nanoseconds, so the result is divided by 1 billion (10^9) to get the time in seconds
        old = now;

        //cout << glm::to_string(powerup.position) << endl;



        // make the camera look to its target
        camera.Front = glm::normalize(camViewTarget - camera.Position);


        // Check and call events
        glfwPollEvents();

        // Clear buffers
        glClearColor(0.1f, 0.1f, 0.1f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);


        //================================================================
        // Set up the scene as normal
        //================================================================

        //glm::mat4 model;
        glm::mat4 model = glm::mat4(1.0f);


        // =======================================================================
        // Step 4. create the View matrix
        // =======================================================================

        // position camera
        //camera.Position = glm::vec3(0.0, 5.5, 0.000001); // Change camera position
        //camera.Front = -glm::normalize(camera.Position); // this makes the camera always look to the origin (0, 0, 0)

        // view for the skybox
        glm::mat4 view = camera.GetViewMatrix();
        glm::mat4 projection = glm::perspective(camera.Zoom, aspectRatio,
            0.1f, 100.0f);


        //================================================================
        // Draw the sphere INSIDE the skybox
        //
        // We'll be passing the 'model', view' and 'projection' matrices
        // to the sphere's vertex shader.
        //
        // NOTE:
        // We are including the 'scaling', 'rotation' and 'translation'
        // matrices in the 'model' matrix before sending it to the vertex
        // shader.
        //================================================================
        for (GameObject* gameObj : gameObjects)
        {
            gameObj->setView(view);
        }

        // =============================================================================================================================
        // Step 5. Create the model matrices
        // =============================================================================================================================



        //ball.position = glm::vec3(0.0, 0.3, 0.0);
        //ball.velocity = glm::vec3(0.0, 0.0, 1.0); 
        if (!play)
        {
            orbitCamera(cameraDist, 6.0, deltaTime);
            camViewTarget = glm::vec3(0);
            camera.Position = camLocation;
            board.object = pregameBoardModel;
        }

        //if (play && cameraMoving)
        //{
        //    cameraMoving = moveCamera(camPlayView, 3.0, deltaTime);
        //}

        if (play && !cameraMoving)
        {
            board.object = ingameBoardModel;
            // if the powerup is not active, tick down the timer
            if (!powerup.active)
            {
                powerupTimer -= deltaTime;
                powerup.position = glm::vec3(5000.0, 5000.0, 5000.0);
            }

            // if the powerup's effect is active, tick down its timer
            if (powerupEffectActive)
            {
                effectTimer -= deltaTime;

                // when the timer reaches 0, reverse its effects
                if (effectTimer <= 0)
                {
                    powerupEffectActive = false;
                    switch (powerup.type)
                    {
                    case PowerupType::PaddleLengthIncrease:
                        if (paddle1Affected)
                        {
                            paddle1.length *= (1.0 / 1.2);
                            paddle1.scale.z *= (1.0 / 1.2);
                            paddle1Affected = false;
                        }
                        if (paddle2Affected)
                        {
                            paddle2.length *= (1.0 / 1.2);
                            paddle2.scale.z *= (1.0 / 1.2);
                            paddle2Affected = false;
                        }
                        break;
                    case PowerupType::BallSpeedIncrease:
                        ball.velocity *= (1.0 / 1.2);
                        break;
                    }
                }
            }

            // when the timer reaches 0, activate the powerup and place it
            if (powerupTimer <= 0)
            {

                // when it becomes active, stop the timer and watch for collisions
                powerup.active = true;
                powerup.position = glm::vec3(0.0, 0.3, negateOrNot(1.5));
                powerupTimer = powerupDelay;
            }

            // check for collisions when powerup is active
            if (powerup.active)
            {
                collisionResults = powerup.collisionCheck(&ball);
            }

            // when a collision happens, deactivate the powerup, apply its effect (with a timer), and restart the timer
            if (collisionResults)
            {
                powerup.active = false;
                powerupEffectActive = true;
                effectTimer = effectDelay;
                powerup.type = PowerupType(static_cast<PowerupType>(1/*(rand() % 2) + 1)*/));

                // apply the effect of the powerup
                switch (powerup.type)
                {
                case PowerupType::PaddleLengthIncrease:
                    if (ball.velocity.x < 0)
                    {
                        if (!paddle1Affected)
                        {
                            paddle1.length *= 1.2;
                            paddle1.scale.z *= 1.2;
                            paddle1Affected = true;
                        }
                    }
                    else
                    {
                        if (!paddle2Affected)
                        {
                            paddle2.length *= 1.2;
                            paddle2.scale.z *= 1.2;
                            paddle2Affected = true;
                        }
                    }
                    break;

                case PowerupType::BallSpeedIncrease:
                    ball.velocity *= 1.2;
                    break;
                }
            }



            camera.Position = camPlayView;
            camViewTarget = glm::vec3(0);

            // ball transform
            ball.collisionCheckZ(2.8f);

            collisionResults = ball.collisionCheckX(5.8f);

            if (collisionResults != 0)
            {
                powerupEffectActive = false;
                switch (powerup.type)
                {
                case PowerupType::PaddleLengthIncrease:
                    if (paddle1Affected)
                    {
                        paddle1.length *= (1.0 / 1.2);
                        paddle1.scale.z *= (1.0 / 1.2);
                        paddle1Affected = false;
                    }
                    if (paddle2Affected)
                    {
                        paddle2.length *= (1.0 / 1.2);
                        paddle2.scale.z *= (1.0 / 1.2);
                        paddle2Affected = false;
                    }
                    break;
                case PowerupType::BallSpeedIncrease:
                    ball.velocity *= (1.0 / 1.2);
                    break;
                }
            }

            if (collisionResults > 0)
            {
                ball.velocity = -ballInitVelocity;
                ball.position = ballInitPosition;
                ball.object = gameModels.at(rand() % 4);
            }
            else if (collisionResults < 0)
            {
                ball.velocity = ballInitVelocity;
                ball.position = ballInitPosition;
                ball.object = gameModels.at(rand() % 4);
            }
            ball.move(deltaTime);

            // paddle 1
            //cout << glm::to_string(paddle1.position) << endl;

            if (paddle1MovingUp && (paddle1.position.z - (paddle1.length / 2)) > -paddleWall)
            {
                paddle1.velocity = -paddleSpeed;
            }
            else if (paddle1MovingDown && (paddle1.position.z + (paddle1.length / 2)) < paddleWall)
            {
                paddle1.velocity = paddleSpeed;
            }
            else
            {
                paddle1.velocity = glm::vec3(0.0);
            }

            paddle1.move(deltaTime);
            paddle1.collisionCheck(&ball);

            // paddle 2

            if (paddle2MovingUp && (paddle2.position.z - (paddle2.length / 2)) > -paddleWall)
            {
                paddle2.velocity = -paddleSpeed;
            }
            else if (paddle2MovingDown && (paddle2.position.z + (paddle2.length / 2)) < paddleWall)
            {
                paddle2.velocity = paddleSpeed;
            }
            else
            {
                paddle2.velocity = glm::vec3(0.0);
            }

            // w = -2 + 2, pz = 2, pl = 0.5, :. pz = pz+

            paddle2.move(deltaTime);
            paddle2.collisionCheck(&ball);


        }//end if

            // apply the transformations to each game object
        for (GameObject* gameObj : gameObjects)
        {
            gameObj->applyTransform();
        }

        /*
            if(abs(ball.position.z) + abs(ball.velocity.z) >= 3.1f && abs(ball.position.z) - abs(ball.velocity.z) <= 3.1f)
            {
                ball.velocity.z *= -1
            }
        */
        // =======================================================================
        // Step 6. Pass the Model matrices to the shader as "model"
        // Step 7. Draw the objects
        // =======================================================================

        /*for each(GameObject* gameObject in gameObjects)
        {

        }*/

        for (GameObject* gameObj : gameObjects)
        {
            gameObj->draw();
        }

        /*board.draw();
        ball.draw();*/

        //=================================================================




        //=================================================================
        // Set up the skybox...
        //=================================================================

        // Change depth function so depth test passes when values are
        // equal to depth buffer's content
        glDepthFunc(GL_LEQUAL);
        skyboxShader.Use();


        // Reset the view matrix to accomodate camera movements
        view = glm::mat4(glm::mat3(camera.GetViewMatrix()));

        // Pass View and Projection matrices to the shaders
        glUniformMatrix4fv(glGetUniformLocation(skyboxShader.Program, "view"),
            1, GL_FALSE, glm::value_ptr(view));
        glUniformMatrix4fv(glGetUniformLocation(skyboxShader.Program, "projection"),
            1, GL_FALSE, glm::value_ptr(projection));


        //=================================================================
        // Now... draw the skybox cube map
        //=================================================================
        glBindVertexArray(skyboxVAO);
        glBindTexture(GL_TEXTURE_CUBE_MAP, skyboxTexture);

        //Draw it...
        glDrawArrays(GL_TRIANGLES, 0, 36);

        glBindVertexArray(0);

        // Reset depth function back to default when finished
        glDepthFunc(GL_LESS);

        //==================================================================


        // Swap the buffers
        glfwSwapBuffers(window);

    } //end while (game loop)

    glfwTerminate();
    return 0;
} //end main



// Loads a cubemap texture from 6 individual texture faces
GLuint loadCubemap(std::vector<std::string> faces)
{
    GLuint textureID;
    glGenTextures(1, &textureID);
    glActiveTexture(GL_TEXTURE0);

    int width, height;
    unsigned char* image;

    glBindTexture(GL_TEXTURE_CUBE_MAP, textureID);
    for (GLuint i = 0; i < faces.size(); i++)
    {
        image = SOIL_load_image(faces[i].c_str(), &width, &height, 0, SOIL_LOAD_RGB);
        glTexImage2D(GL_TEXTURE_CUBE_MAP_POSITIVE_X + i, 0, GL_RGB, width, height, 0,
            GL_RGB, GL_UNSIGNED_BYTE, image);
    }
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_CUBE_MAP, GL_TEXTURE_WRAP_R, GL_CLAMP_TO_EDGE);
    glBindTexture(GL_TEXTURE_CUBE_MAP, 0);

    return textureID;
}//end load cubemap



#pragma region "User interactions input"


// Is called whenever a key is pressed/released via GLFW
void key_callback(GLFWwindow* window, int key, int scancode, int action, int mode)
{
    if (key == GLFW_KEY_ESCAPE && action == GLFW_PRESS)
        glfwSetWindowShouldClose(window, GL_TRUE);

    if (key == GLFW_KEY_H && action == GLFW_PRESS)
        camera = (glm::vec3(0.0, 5.5, 0.000001));

    if (key == GLFW_KEY_SPACE && action == GLFW_PRESS) {
        if (!play)
            play = true;
        else
            play = false;

    }

    /*
        if (keys[GLFW_KEY_UP])
        {
            movingUp = true;
        }
        else
        {
            movingUp = false;
        }
    */
    //Paddle 1
    if (key == GLFW_KEY_UP && action == GLFW_PRESS)
        paddle1MovingUp = true;

    if (key == GLFW_KEY_UP && action == GLFW_RELEASE)
        paddle1MovingUp = false;

    if (key == GLFW_KEY_DOWN && action == GLFW_PRESS)
        paddle1MovingDown = true;

    if (key == GLFW_KEY_DOWN && action == GLFW_RELEASE)
        paddle1MovingDown = false;

    //Paddle 2
    if (key == GLFW_KEY_W && action == GLFW_PRESS)
        paddle2MovingUp = true;

    if (key == GLFW_KEY_W && action == GLFW_RELEASE)
        paddle2MovingUp = false;

    if (key == GLFW_KEY_S && action == GLFW_PRESS)
        paddle2MovingDown = true;

    if (key == GLFW_KEY_S && action == GLFW_RELEASE)
        paddle2MovingDown = false;

    // Camera controls - Another short-cut way of testing the keys
    if (keys[GLFW_KEY_I])
        camera.ProcessKeyboard(FORWARD, delta);

    if (keys[GLFW_KEY_K])
        camera.ProcessKeyboard(BACKWARD, delta);

    if (keys[GLFW_KEY_J])
        camera.ProcessKeyboard(LEFT, delta);

    if (keys[GLFW_KEY_L])
        camera.ProcessKeyboard(RIGHT, delta);





    if (action == GLFW_PRESS)
        keys[key] = true;
    else if (action == GLFW_RELEASE)
        keys[key] = false;
}



void mouse_callback(GLFWwindow* window, double xpos, double ypos)
{
    if (moveMouse)
    {
        lastX = xpos;
        lastY = ypos;
        moveMouse = false;
    }

    GLfloat xoffset = xpos - lastX;
    GLfloat yoffset = lastY - ypos;

    lastX = xpos;
    lastY = ypos;

    //camera.ProcessMouseMovement(xoffset, yoffset);
}



void scroll_callback(GLFWwindow* window, double xoffset, double yoffset)
{

}

#pragma endregion


#pragma region "Helper Functions"

// this function makes the camera orbit around the viewTarget at a distance dictated by the cameraDist variable
// the height of the camera is fixed during this
GLvoid orbitCamera(GLfloat radius, GLfloat yPos, GLfloat deltaTime)
{
    camLocation.y = camViewTarget.y + yPos;

    cameraOrbitAngle += cameraOrbitAngleInc * deltaTime;
    if (cameraOrbitAngle > glm::radians(360.0)) cameraOrbitAngle -= glm::radians(360.0);

    camLocation.z = camViewTarget.z + (radius * cos(cameraOrbitAngle));
    camLocation.x = camViewTarget.x + (radius * sin(cameraOrbitAngle));
    //cout << cameraOrbitAngle << "\n";
}

// this function moves the camera to the destination a distance per iteration based on speed and deltaTime
GLboolean moveCamera(glm::vec3 destination, GLfloat speed, GLfloat deltaTime)
{
    // get the camera's predicted movement
    glm::vec3 predictedMovement = glm::normalize(destination - camera.Position) * speed * deltaTime;

    // check if the camera's next movement would overshoot the destination (distance left < predicted movement)
    // if not (distance left > predicted movement distance) move the camera as normal
    if (glm::length(destination - camera.Position) > glm::length(predictedMovement))
    {
        camera.Position += predictedMovement;
        return true;
    }
    else
    {
        camera.Position = destination;
        return false;
    }

    // older implementation of this function
    /*if (glm::length(cameraMoveDest - camLocation) < glm::length(cameraMoveInc * deltaTime))
    {
        camLocation = cameraMoveDest;
    }
    else
    {
        camLocation += cameraMoveInc * deltaTime;
    }*/
}

GLfloat negateOrNot(GLfloat value)
{
    if (rand() % 2 == 1)
        value *= -1;

    return value;
}//end negateOrNot()
#pragma endregion

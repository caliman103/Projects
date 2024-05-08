#ifndef MODELS.H
#define MODELS.H

#include "Player.h"

class GameObject {
	// glm::vec3() - Consider this

	GLfloat xValue = 0.0;
	GLfloat yValue = 0.0;
	GLfloat zValue = 0.0;

public:
	void setXValue(GLfloat val) { xValue = val; }
	GLfloat getXValue() { return xValue; }
	
	void setYValue(GLfloat val) { yValue = val; }
	GLfloat getYValue() { return yValue; }
	
	void setZValue(GLfloat val) { zValue = val; }
	GLfloat getZValue() { return zValue; }

}; // End BoardItem

enum class BallType {
	earthBall = 1,
	fireBall,
	WaterBall,
	FootBall,
	windBall
};// End BallType

class Ball : public GameObject {
	GLfloat ballXinc = 0.0;
	GLfloat ballYinc = 0.0;
	GLfloat ballZinc = 0.0;
	GLfloat ballScale = 0.0;

	BallType type = BallType::CricketBall;

public:
	GLvoid setBallXinc(GLfloat newXinc) { ballXinc = newXinc; }
	GLvoid setBallYinc(GLfloat newYinc) { ballXinc = newYinc; }
	GLvoid setBallZinc(GLfloat newZinc) { ballXinc = newZinc; }
	GLvoid setBallScalar(GLfloat newScalar) { ballScale = newScalar; }
	void setBallType(BallType ballType) { type = ballType; }
	
	GLfloat getBallXinc() { return ballXinc; }
	GLfloat getBallYinc() { return ballYinc; }
	GLfloat getBallZinc() { return ballZinc; }
	GLfloat getBallScale() { return ballScale; }
	BallType getBallType() { return type; }

	GLvoid moveBall(GLfloat);
	GLvoid changeDirection();
	GLvoid increaseSpeed();
	GLvoid extraSpeed();
	GLvoid resetSpeed();
	GLboolean bringForward();
	GLvoid boundaryCheck(); 

};// End Ball

class Paddle : public GameObject {
	GLfloat paddleXinc;
	GLfloat paddleYinc;
	GLfloat paddleZinc;
	GLfloat paddleXScale;
	GLfloat paddleYScale;

public:
	void setPaddleXIncrement(GLfloat incr) { paddleXinc = incr; }
	GLfloat getPaddleXIncrement() { return paddleXinc; }

	void setPaddleYIncrement(GLfloat incr) { paddleYinc = incr; }
	GLfloat getPaddleYIncrement() { return paddleYinc; }

	void setPaddleZIncrement(GLfloat incr) { paddleZinc = incr; }
	GLfloat getPaddleZIncrement() { return paddleZinc; }

	void setPaddleXScale(GLfloat scale) { paddleXScale = scale; }
	GLfloat getPaddleXScale() { return paddleXScale; }

	void setPaddleYScale(GLfloat scale) { paddleYinc = scale; }
	GLfloat getPaddleYScale() { return paddleYScale; }
};// End Paddle

enum class ItemType {
	Bomb = 1,
	PaddleSizeInc,
	PaddleSizeDec,
	BallSpeedInc,
	PlayerScoreInc,
};// End ItemType

class SpecialItem : public GameObject {
	ItemType type = ItemType::Bomb;

public:
	void setItemType(ItemType itemType) { type = itemType; }
	ItemType getItemType() { return type; }

	void decreasePlayersPoints(Player, Player); // Bomb
	void increasePlayerPoints(Player);
	
	GLvoid decreasePaddleSize(Paddle);
	GLvoid increasePaddleSize(Paddle);
	
	GLvoid increaseBallSpeed(Ball);

};// End SpecialItem

#endif // !MODELS.H

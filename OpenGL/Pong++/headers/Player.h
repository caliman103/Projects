#ifndef PLAYER.H
#define PLAYER.H

#include <string>
 
class Player {
	int score = 0;
	std::string name = "";

public:
	Player() {}
	Player(std::string name, int score) : name{ name }, score{ score } { }

	void setName(std::string playerName) { name = playerName; }
	std::string getName() { return name; }

	void setScore(int playerScore) { score = playerScore; }
	int getScore() { return score; }
};

#endif // !PLAYER.H



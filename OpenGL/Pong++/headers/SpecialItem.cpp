#include "Models.h"
#include "Player.h"
#include "Ball.h"

void SpecialItem::decreasePlayersPoints(Player p1, Player p2) {
	int p1Points = p1.getScore();
	int p2Points = p2.getScore();
	
	p1Points--;
	p2Points--;

	p1.setScore(p1Points);
	p2.setScore(p2Points);
}// End decreasePlayersPoints

void SpecialItem::increasePlayerPoints(Player p) {
	int playerPoints = p.getScore();
	playerPoints++;
	p.setScore(playerPoints);
}// End increasePlayerPoints

GLvoid SpecialItem::decreasePaddleSize(Paddle p) {

}// End decreasePaddleSize

GLvoid SpecialItem::increasePaddleSize(Paddle p) {

}// End increasePaddleSize

GLvoid SpecialItem::increaseBallSpeed(Ball b) {

}// End decreasePaddleSize
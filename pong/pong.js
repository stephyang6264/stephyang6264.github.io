//global variables
var speedOfPaddle1 = 0;
const startPositionOfPaddle1 = document.getElementById("paddle1").offsetTop;;
var positionOfPaddle1 = document.getElementById("paddle1").offsetTop;
var speedOfPaddle2 = 0;
const startPositionOfPaddle2 = document.getElementById("paddle2").offsetTop;
var positionOfPaddle2 = document.getElementById("paddle2").offsetTop;

const paddleHeight = document.getElementById("paddle1").offsetHeight;
const paddleWidth = document.getElementById("paddle1").offsetWidth;

const gameboardHeight = document.getElementById("gameBoard").offsetHeight;
const gameboardWidth = document.getElementById("gameBoard").offsetWidth;

const ballHeight = document.getElementById("ball").offsetHeight;

const startTopPositionOfBall = document.getElementById("ball").offsetTop;
const startLeftPositionOfBall = document.getElementById("ball").offsetLeft;

var topPositionOfBall = startTopPositionOfBall;
var leftPositionOfBall = startLeftPositionOfBall;
var topSpeedOfBall = 0;
var leftSpeedOfBall = 0;

var score1 = 0;
var score2 = 0;
var checkScore1 = 0;
var checkScore2 = 0;

var bounce = new sound("spring.wav");
var exit = new sound("chime.flac");

// used to control game start/stop
var controlPlay;

//used to control speed of ball
const speedRange = 2;
const speedMinStart = 3;
var speedMin = speedMinStart;

var levels = document.getElementById("levelnum").innerHTML;

showLightBox("Welcom to Pong", "Move paddles using the w/s keys and up/down arrows. Each time two points have been scored the level and speed of the ball increases. The first player to ten points WINS!");

//move paddles
document.addEventListener('keydown', function(e) {
	//console.log("key down " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87){ // W
		speedOfPaddle1 = -10;
	}//if
	if (e.keyCode == 83 || e.which == 83){ // S
		speedOfPaddle1 = 10;
	}//if
	if (e.keyCode == 38 || e.which == 38){ // up arrow
		speedOfPaddle2 = -10;
	}//if
	if (e.keyCode == 40 || e.which == 40){ // down arrow
		speedOfPaddle2 = 10;
	}//if

});

//stop paddles
document.addEventListener('keyup', function(e) {
	//console.log("key up " + e.keyCode);
	if (e.keyCode == 87 || e.which == 87){ // W
		speedOfPaddle1 = 0;
	}//if
	if (e.keyCode == 83 || e.which == 83){ // S
		speedOfPaddle1 = 0;
	}//if
	if (e.keyCode == 38 || e.which == 38){ // up arrow
		speedOfPaddle2 = 0;
	}//if
	if (e.keyCode == 40 || e.which == 40){ // down arrow
		speedOfPaddle2 = 0;
	}//if

});

//object constructor to play sounds
//https://www.w3schools.com/graphics/game_sound.asp
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}//sound 

//start the ball movement
function startBall(){
	let direction = 1;
	topPositionOfBall = startTopPositionOfBall;
	leftPositionOfBall = startLeftPositionOfBall;
	
	//50% chance of starting in either direction (right or left)
	if(Math.random() < 0.5){
		direction = 1;
	} else {
		direction = -1;
	}//else
		
	topSpeedOfBall = Math.random() * speedRange + speedMin; 
	
	if(checkScore()){
	speedMin += 2;
	levels++;
	}//if
	
	leftSpeedOfBall = direction * (Math.random() * speedRange + speedMin);
	
	
	
}//startBall


// update locations of paddles and ball
function show(){
	
	//update positions of elements
	positionOfPaddle1 += speedOfPaddle1;
	positionOfPaddle2 += speedOfPaddle2;
	topPositionOfBall += topSpeedOfBall;
	leftPositionOfBall += leftSpeedOfBall;
	
	//stop paddle from leaving top of gameboard
	if(positionOfPaddle1 <= 0) {
		positionOfPaddle1 = 0;
	}//if
	if(positionOfPaddle2 <= 0) {
		positionOfPaddle2 = 0;
	}//if
	
	//stop paddle from leaving botton of gameboard
	if(positionOfPaddle1 >= gameboardHeight - paddleHeight) {
		positionOfPaddle1 = gameboardHeight - paddleHeight;
	}//if
	if(positionOfPaddle2 >= gameboardHeight - paddleHeight) {
		positionOfPaddle2 = gameboardHeight - paddleHeight;
	}//if
	
	//if ball hits top, or bottom, or gameboard, change direction
	if(topPositionOfBall <= 0 || topPositionOfBall >= gameboardHeight - ballHeight - 10){
		topSpeedOfBall *= -1;
	}//if
	
	//change scores
	if(leftPositionOfBall <= paddleWidth){
		
		if(!(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight)){
			score2++;
		}//if
	}//if
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		
		if(!(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight)){
			score1++;

		} 
	}//if
	
	
	//ball on left edge of gameboard
	if(leftPositionOfBall <= paddleWidth){
		
		//if ball hits left paddle, change direction
		if(topPositionOfBall > positionOfPaddle1 && topPositionOfBall < positionOfPaddle1 + paddleHeight){
			bounce.play();
			changeBallColour();
			leftSpeedOfBall *= -1;
		} else {
			exit.play();
			startBall();
		}//else
	}//if
	
	//ball on right edge of gameboard
	if(leftPositionOfBall >= gameboardWidth - paddleWidth - ballHeight){
		
		//if ball hits right paddle, change direction
		if(topPositionOfBall > positionOfPaddle2 && topPositionOfBall < positionOfPaddle2 + paddleHeight){
			bounce.play();
			leftSpeedOfBall *= -1;
			changeBallColour();
		} else {
			exit.play();
			startBall();
		}//else
	}//if

	
	
	document.getElementById("paddle1").style.top = positionOfPaddle1 + "px";
	document.getElementById("paddle2").style.top = positionOfPaddle2 + "px";
	document.getElementById("ball").style.top = topPositionOfBall + "px";
	document.getElementById("ball").style.left = leftPositionOfBall + "px";
	
	document.getElementById("score1").innerHTML = score1.toString();
	document.getElementById("score2").innerHTML = score2.toString();
	
	document.getElementById("levelnum").innerHTML = levels.toString();
	
	//end game after ten points
	if(score1 == 10 || score2 == 10){
		stopGame();
	}//if
	
}//show

//resume game play
function resumeGame(){
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}//resumeGame

//pause game play
function pauseGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
}//pauseGame

//stat game play
function startGame(){
	
	//reset scores, paddle locations
	score1 = 0;
	score2 = 0;
	checkScore1 = score1;
	checkScore2 = score2;
	levels = 1;
	speedMin = 3;
	positionOfPaddle1 = startPositionOfPaddle1;
	positionOfPaddle2 = startPositionOfPaddle2;
	
	startBall();
	
	if(!controlPlay){
		controlPlay = window.setInterval(show, 1000/60);
	}
}//startGame

//stop game play
function stopGame(){
	window.clearInterval(controlPlay);
	controlPlay = false;
	
	//show lightbox with score
	let message1 = "Tie Game";
	let message2 = "Close to continue.";
	
	
	if(score2 > score1){
		message1 = "Player 2 WINS with " + score2 + " points!";
		message2 = "Player 1 had " + score1 + " points.";
	} else if(score1 > score2){
		message1 = "Player 1 wins with " + score1 + " points!";
		message2 = "Player 2 had " + score2 + " points.";
	}//else
		
	showLightBox(message1, message2);
	
}//stopGame

//changes the colour of the ball
function changeBallColour(){
	let rand = Math.floor(Math.random() * 6);
	let colour = ["blue", "green", "#fe1c80", "yellow", "red", "purple", "orange", "white"];
	let currentColour = document.getElementById("ball").style.backgroundColor;
	
	if(currentColour == colour[rand]){
		rand = 7;
	}//if
	
	document.getElementById("ball").style.backgroundColor = colour[rand];
	
}//changeBallColour


/****Lightbox Code****/

// change the visibility of a divID
function changeVisibility (divID){
	var element = document.getElementById(divID);
	
	// if element exists, switch it's class between hidden and unhidden
	if(element){
		element.className = (element.className == 'hidden')? 'unhidden' : 'hidden';
	}//if
}//changeVisibility

//display message in lightbox
function showLightBox(message, message2){
	//set messages
	document.getElementById("message").innerHTML = message;
	document.getElementById("message2").innerHTML = message2;
	
	//show lightbox
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
}//showLightBox

//close light box
function continueGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	
}//continueGame

/****End of Lightbox Code****/

//checks if scores have changed
function checkScore(){
	
	if(((checkScore1 + 2) == score1 || (checkScore2 + 2) == score2 || ((checkScore1 + 1) == score1 && (checkScore2 + 1) == score2)) && (score1 != 0 || score2 != 0)){
		checkScore1 = score1;
		checkScore2 = score2;
		return true;
	}else{
		return false;
	}
}


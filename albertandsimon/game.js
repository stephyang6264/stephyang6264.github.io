const levels = [
	// level 0
	["flag", "rock", "", "", "",
	 "fenceside", "rock", "", "", "rider",
	 "", "tree", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "fenceup", "", "horseup", ""],
	
	// level 1
	["flag", "water", "", "", "",
	 "fenceside", "water", "", "", "rider",
	 "animate", "bridge animate", "animate", "animate", "animate",
	 "", "water", "", "", "",
	 "", "water", "horseup", "", ""],
	 
	 // level 2
	 ["tree", "tree", "flag", "tree", "tree",
	  "animate", "animate", "animate", "animate", "animate",
	  "water", "bridge", "water", "water", "water",
	  "", "", "", "fenceup", "",
	  "rider", "rock", "", "", "horseup"],
	  
	  // level 3
	  ["tree", "flag", "tree", "", "rider",
	  "", "fenceside", "", "", "",
	  "", "", "", "", "",
	  "animate", "animate", "animate", "water", "water",
	  "rock", "", "", "", "horseup"]
	]; // end of levels


const gridBoxes = document.querySelectorAll("#gameBoard div");
const noPassObstacles = ["rock", "tree", "water"];

var currentLevel = 0; //starting level
var riderOn = false; // is rider on?
var currentLocationOfHorse = 0;
var currentAnimation; // allows 1 animation per level
var widthOfBoard = 5;

var lives = 3;

var gameStatus = false;

showLightBox("Welcome to Albert and Simon's adventure", 
"Use the up/down and left/right arrow keys to help Albert and Simon navigate a tricky obsatcle course and arrive at the flag. You will have three lives which will be deducted every time you hit an enemy horse so WATCH OUT!");

// start game
window.addEventListener("load", function () {
	loadLevel();
});

//move horse
document.addEventListener("keydown", function (e) {
	
	switch (e.keyCode) {
		case 37: // left arrow
		  if (currentLocationOfHorse % widthOfBoard !== 0) {
			  if(gameStatus){tryToMove("left");}
			  
		  }		
		  break;
		case 38: // up arrow
		  if (currentLocationOfHorse - widthOfBoard >= 0) {
			  if(gameStatus){tryToMove("up");}
		  }
		  break;
		case 39: //right arrow
		  if (currentLocationOfHorse % widthOfBoard < widthOfBoard - 1){
			  if(gameStatus){tryToMove("right");}
		  }
		  break;
		case 40: // down arrow
		  if (currentLocationOfHorse + widthOfBoard < widthOfBoard * widthOfBoard) {
			  if(gameStatus){tryToMove("down");}
		  }
		  break;
	} // switch
}); // key even listener

// try to move horse
function tryToMove(direction) {
	
	// location before move
	let oldLocation = currentLocationOfHorse;
	
	// class of location before move 
	let oldClassName = gridBoxes[oldLocation].className;
	
	let nextLocation = 0; // location we wish to move to
	let nextClass = ""; // class of location we wish to move to
	
	let nextLocation2 = 0;
	let nextClass2 = "";
	
	let newClass = ""; // new class to switch to if move successful
	
	let message3 = "You lose";
	let message4 = "Oh no, you ran into a enemy horse. Click restart game to play again.";
	
	
	switch (direction) {
		case "left":
		  nextLocation = currentLocationOfHorse - 1 ;
		  break;
		case "right":
		  nextLocation = currentLocationOfHorse + 1 ;
		  break;
		case "up":
		  nextLocation = currentLocationOfHorse - widthOfBoard ;
		  break;
		case "down":
		  nextLocation = currentLocationOfHorse + widthOfBoard ;
		  break;
		  
	} //switch
	
	
	nextClass = gridBoxes[nextLocation].className;
	
	
	// if the obsatcle is not passable, don't move
	if (noPassObstacles.includes(nextClass)) { return; }
	
	// if it's a fence, and there is no rider, don't move
	if (!riderOn && nextClass.includes("fence")) { return; }
	
	// can't jump from bottom of fence
	if (riderOn && nextClass.includes("fenceup") && (direction == "up" || direction == "down")){
		return;
	}
	
	// can't jump from side of fence
	if (riderOn && nextClass.includes("fenceside") && (direction == "left" || direction == "right")){
		return;
	}
	
	// if there is a fence, move two spaces with animation
	if (nextClass.includes("fence")) {
		
		//rider must be on to jump
		if (riderOn){
			gridBoxes[currentLocationOfHorse].className = "";
			oldClassName = gridBoxes[nextLocation].className;
			
			
			
			// set values according to direction
			if (direction == "left"){
				nextClass = "jumpleft";
				nextClass2 = "horserideleft";
				nextLocation2 = nextLocation - 1;
			} else if (direction == "right"){
				nextClass = "jumpright";
				nextClass2 = "horserideright";
				nextLocation2 = nextLocation + 1;
			} else if (direction == "up"){
				nextClass = "jumpup";
				nextClass2 = "horserideup";
				nextLocation2 = nextLocation - widthOfBoard;
			} else if (direction == "down"){
				nextClass = "jumpdown";
				nextClass2 = "horseridedown";
				nextLocation2 = nextLocation + widthOfBoard;
			}
			
			
			
			//show horse jumping
			gridBoxes[nextLocation].className = nextClass;
			
			setTimeout(function() {
				
				// set jump back to just a fence
				gridBoxes[nextLocation].className = oldClassName;
				
				// update current location of horse to be 2 spaces past take off
				currentLocationOfHorse = nextLocation2;
				
				// get class of box after jump
				nextClass = gridBoxes[currentLocationOfHorse].className;
				
				//show horse and rider after landing
				gridBoxes[currentLocationOfHorse].className = nextClass2;
				
				// if next box is a flag, go up a level
				levelUp(nextClass);
			}, 350);
			return;
			
		} // if riderOn
		
	} // if class has a fence
	
	
	
	// if there is a rider, add rider
	if (nextClass == "rider") {
		riderOn = true;
	}
	// if there is a bridge in the old location keep it
	if (oldClassName.includes("bridge")){
		gridBoxes[oldLocation].className = "bridge";
	} else {
		gridBoxes[oldLocation].className = "";
	} // else
	
	// build name of new class
	newClass = (riderOn) ? "horseride" : "horse";
	newClass += direction; 
	
	// if there is a bridge in the next location, keep it
	if (gridBoxes[nextLocation].classList.contains("bridge")) {
		newClass += " bridge";
	}
	
	// move 1 space
	currentLocationOfHorse = nextLocation;
	gridBoxes[currentLocationOfHorse].className = newClass;
	
	// if it is an enemy
	if (nextClass.includes("enemy")) {
		lives--;
		showLives();
		//clearTimeout(currentAnimation); // cancels current animation
		//showLightBox2(message3, message4);
		//document.getElementById("lose").style.display = "block";
		return;
	}
	
	// move up to next level if needed
	levelUp(nextClass);
	
} //tryToMove

// move up a level
function levelUp(nextClass){
	let message3 = "Congradulaions!";
	let message4 = "You successfully completed all the levels!";
	
	if (nextClass == "flag" && riderOn){
		currentLevel++;
		lives = 3;
		showLives();
	    clearTimeout(currentAnimation); // cancels current animation
		
		// ends game if final level was reached
		if(currentLevel == 4){
			showLightBox2(message3, message4);
			
		 // document.getElementById("endgame").style.display = "block";
		  
		  return;  
		}
		
		document.getElementById("levelup").style.display = "block";
		setTimeout (function(){
		  
		 document.getElementById("levelup").style.display = "none";
		  loadLevel();
		},1000);
	}
}

//load levels 0 - maxlevel
function loadLevel(){
	let levelMap = levels[currentLevel];
	let animateBoxes;
	riderOn = false;
	
	// load board
	for (i = 0; i < gridBoxes.length; i++) {
	  gridBoxes[i].className = levelMap[i];
	  if(levelMap[i].includes("horse")) currentLocationOfHorse = i;
	} // for
	
	animateBoxes = document.querySelectorAll(".animate");
	
	animateEnemy(animateBoxes, 0 , "right");
	
} // loadLevel

// animate enemy lef to right (could add up and down to this)
// boxes - array of grid boxes that include animation
// index - current location of animation
// direction - current direction of animation
function animateEnemy(boxes, index, direction) {
	
	let enemyRun = boxes[index].className;
	//let message3 = "You Lose";
	//let message4 = "Oh no, you were hit by an enemy horse. Click restart game to play again.";
	
	// exit function if no animation
	if (boxes.length <= 0) { return; }
	
	// update images
	if (direction == "right") {
	  boxes[index].classList.add("enemyright");
	} else {
	  boxes[index].classList.add("enemyleft");
	}
	
	
	//remove images from other boxes
	for (i = 0; i < boxes.length; i++){
	  if(i != index) {
		boxes[i].classList.remove("enemyleft");
		boxes[i].classList.remove("enemyright");  
	  }  
	} // for
	
	//moving right
	if(direction == "right"){
		
		// turn around if hit right side
		if(index == boxes.length - 1 ){
		  index--;
		  direction = "left";
		} else {
		  index++;
		}
		
	// moving left
	} else {
		
	  // turn around if hit left side
	  if (index == 0){
		index++;
		direction = "right";	
	  } else {
	  index--;
	  }
	} // else
		
	// end game if enemy runs into horse
	if (enemyRun.includes("horse")){
		lives--;
		showLives();
		//showLightBox2(message3, message4);
		//gameStatus = false;
		//document.getElementById("lose").style.display = "block";
		return;
	}
	
	currentAnimation = setTimeout(function() {
		animateEnemy(boxes, index, direction);
	  }, 750);
} // animateEnemy

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

//display message in lightbox
function showLightBox2(message3, message4){
	//set messages
	document.getElementById("message3").innerHTML = message3;
	document.getElementById("message4").innerHTML = message4;
	
	//show lightbox
	changeVisibility("lightbox2");
	changeVisibility("boundaryMessage2");
}//showLightBox2

//close light box
function continueGame(){
	changeVisibility("lightbox2");
	changeVisibility("boundaryMessage2");
	
}//continueGame

/****End of Lightbox Code****/

function startGame(){
	changeVisibility("lightbox");
	changeVisibility("boundaryMessage");
	gameStatus = true;
} // startGame

function restartGame(){
	
	changeVisibility("lightbox2");
	changeVisibility("boundaryMessage2");
	gameStatus = true;
	currentLevel = 0;
	lives = 3;
	showLives();
	loadLevel();
	
} // restartGame

function showLives(){
	if(lives == 3){
		document.getElementById("lives").innerHTML = "&hearts;&nbsp;&hearts;&nbsp;&hearts;&nbsp;";
	}else if(lives == 2){
		document.getElementById("lives").innerHTML = "&hearts;&nbsp;&hearts;&nbsp;";
		clearTimeout(currentAnimation); // cancels current animation
		loadLevel();
	}else if(lives == 1){
		document.getElementById("lives").innerHTML = "&hearts;&nbsp;";
		clearTimeout(currentAnimation); // cancels current animation
		loadLevel();
	}else{
		document.getElementById("lives").innerHTML = "";
		showLightBox2("You Lose", "Click restart to play again.");
		clearTimeout(currentAnimation); // cancels current animation
		gameStatus = false;
	}
} // showLives

function replayGame(){
	gameStatus = true;
	currentLevel = 0;
	clearTimeout(currentAnimation); // cancels current animation
	lives = 3;
	showLives();
	loadLevel();
	
}//restartGame

function replayLevel(){
	gameStatus = true;
	clearTimeout(currentAnimation); // cancels current animation
	lives = 3;
	showLives();
	loadLevel();
}

function pauseGame(){
	clearTimeout(currentAnimation); // cancels current animation
	gameStatus = false;
}//pauseGame





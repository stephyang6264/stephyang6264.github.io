let currentPlayer = "X";
let gameStatus = ""; // "" - continue, "Tie", "X Wins", "O Wins"
let numTurns = 0;
let idNames = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

//reset board and all variables
function newGame(){
	
	//reset board
	for(var i = 0; i < idNames.length; i++){
		document.getElementById(idNames[i]).innerHTML = "";
	}//for
	
	numTurns = 0;
	gameStatus = 0;
	currentPlayer = "X";
	
	changeVisibility("controls");
}//newGame

//randomly choose a free box for computer
function computerTakeTurn(){
	let idName = "";
	var box1 = document.getElementById(idNames[0]).innerHTML;
	var box2 = document.getElementById(idNames[1]).innerHTML;
	var box3 = document.getElementById(idNames[2]).innerHTML;
	var box4 = document.getElementById(idNames[3]).innerHTML;
	var box5 = document.getElementById(idNames[4]).innerHTML;
	var box6 = document.getElementById(idNames[5]).innerHTML;
	var box7 = document.getElementById(idNames[6]).innerHTML;
	var box8 = document.getElementById(idNames[7]).innerHTML;
	var box9 = document.getElementById(idNames[8]).innerHTML;
	
	do{
		let rand = parseInt(Math.random()*9) + 1; //1-9
		idName = idNames[rand-1];
	
		
		//check horizontally
		 if((box1 == "X" || box1 == "O") && box1 == box2 && box3 == ""){
			document.getElementById(idNames[2]).innerHTML = currentPlayer;
			break;
		
		}else if((box3 == "X" || box3 == "O") && box3 == box2 && box1 == ""){
			document.getElementById(idNames[0]).innerHTML = currentPlayer;
			break;
		
		}else if((box1 == "X" || box1 == "O") && box1 == box3 && box2 == ""){
			document.getElementById(idNames[1]).innerHTML = currentPlayer;
			break;
		
		}else if((box4 == "X" || box4 == "O") && box4 == box5 && box6 == ""){
			document.getElementById(idNames[5]).innerHTML = currentPlayer;
			break;
		
		}else if((box5 == "X" || box5 == "O") && box5 == box6 && box4 == ""){
			document.getElementById(idNames[3]).innerHTML = currentPlayer;
			break;
		
		}else if((box4 == "X" || box4 == "O") && box4 == box6 && box5 == ""){
			document.getElementById(idNames[4]).innerHTML = currentPlayer;
			break;
		
		}else if((box7 == "X" || box7 == "O") && box7 == box8 && box9 == ""){
			document.getElementById(idNames[8]).innerHTML = currentPlayer;
			break;
		
		}else if((box8 == "X" || box8 == "O") && box8 == box9 && box7 == ""){
			document.getElementById(idNames[6]).innerHTML = currentPlayer;
			break;
		
		}else if((box7 == "X" || box7 == "O") && box7 == box9 && box8 == ""){
			document.getElementById(idNames[7]).innerHTML = currentPlayer;
			break;
		
		}//else if
		
		//check vertically
		else if((box1 == "X" || box1 == "O") && box1 == box4 && box7 == ""){
			document.getElementById(idNames[6]).innerHTML = currentPlayer;
			break;
		
		}else if((box4 == "X" || box4 == "O") && box4 == box7 && box1 == ""){
			document.getElementById(idNames[0]).innerHTML = currentPlayer;
			break;
		
		}else if((box7 == "X" || box7 == "O") && box7 == box1 && box4 == ""){
			document.getElementById(idNames[3]).innerHTML = currentPlayer;
			break;
		
		}else if((box2 == "X" || box2== "O") && box2 == box5 && box8 == ""){
			document.getElementById(idNames[7]).innerHTML = currentPlayer;
			break;
		
		}else if((box5 == "X" || box5 == "O") && box5 == box8 && box2 == ""){
			document.getElementById(idNames[1]).innerHTML = currentPlayer;
			break;
		
		}else if((box8 == "X" || box8 == "O") && box8 == box2 && box5 == ""){
			document.getElementById(idNames[4]).innerHTML = currentPlayer;
			break;
		
		}else if((box3 == "X" || box3 == "O") && box3 == box6 && box9 == ""){
			document.getElementById(idNames[8]).innerHTML = currentPlayer;
			break;
		
		}else if((box6 == "X" || box6 == "O") && box6 == box9 && box3 == ""){
			document.getElementById(idNames[2]).innerHTML = currentPlayer;
			break;
		
		}else if((box9 == "X" || box9 == "O") && box9 == box3 && box6 == ""){
			document.getElementById(idNames[5]).innerHTML = currentPlayer;
			break;
		
		}
		
		//check diagonally
		else if((box1 == "X" || box1 == "O") && box1 == box5 && box9 == ""){
			document.getElementById(idNames[8]).innerHTML = currentPlayer;
			break;
		
		}else if((box5 == "X" || box5 == "O") && box5 == box9 && box1 == ""){
			document.getElementById(idNames[0]).innerHTML = currentPlayer;
			break;
			
		}else if((box3 == "X" || box3 == "O") && box3 == box5 && box7 == ""){
			document.getElementById(idNames[6]).innerHTML = currentPlayer;
			break;
			
		}else if((box5 == "X" || box5 == "O") && box5 == box7 && box3 == ""){
			document.getElementById(idNames[2]).innerHTML = currentPlayer;
			break;
			
		}
		else if(document.getElementById(idName).innerHTML == ""){
			document.getElementById(idName).innerHTML = currentPlayer;
			break;
		
		}//else if
		
	}while(true);
}//computerTakeTurn

// take player turn
function playerTakeTurn(e){
	if(e.innerHTML == ""){
	e.innerHTML = currentPlayer;
	checkGameStatus();
	
	//game is over
	if(gameStatus != ""){
		setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
	}//if
	
	//if game not over, computer goes
	if(gameStatus == ""){
		setTimeout(function() {
			computerTakeTurn();
			checkGameStatus();
			
			//game is over
				if(gameStatus != ""){
					setTimeout(function() {showLightBox(gameStatus, "Game Over.");}, 500);
				}//if
			
		}, 500
		);
	}//if
	
	}else {
		showLightBox("This box is already selected.", "Please try another." );
		return;
	} //else
		
	
}//playerTakeTurn

// after each turn, check for a winner, a tie, or contiue playing
function checkGameStatus(){
	numTurns++;
	
	// check for a win
	if(checkWin()){
		gameStatus = currentPlayer + " wins!";
		return;
	}//if
	
	
	// check for tie
	if(numTurns == 9){
			gameStatus = "Tie Game";
	 }//if
	 
	 //switch current players
	 currentPlayer = (currentPlayer == "X" ? "O" : "X");
	 
	 
} // checkGameStatus

// check for a win, there are 8 win paths
function checkWin(){
	let cb = []; //current board
	cb[0] = ""; 
	cb[1] = document.getElementById("one").innerHTML;
	cb[2] = document.getElementById("two").innerHTML;
	cb[3] = document.getElementById("three").innerHTML;
	cb[4] = document.getElementById("four").innerHTML;
	cb[5] = document.getElementById("five").innerHTML;
	cb[6] = document.getElementById("six").innerHTML;
	cb[7] = document.getElementById("seven").innerHTML;
	cb[8] = document.getElementById("eight").innerHTML;
	cb[9] = document.getElementById("nine").innerHTML;
	
	// top row
	if(cb[1] != "" && cb[1] == cb[2] && cb[2] == cb[3]){
		return true;
	}//if
	
	// middle row
	if(cb[4] != "" && cb[4] == cb[5] && cb[5] == cb[6]){
		return true;
	}//if
	
	//bottom row
	if(cb[7] != "" && cb[7] == cb[8] && cb[8] == cb[9]){
		return true;
	}//if
	
	// first column
	if(cb[1] != "" && cb[1] == cb[4] && cb[4] == cb[7]){
		return true;
	}//if
	
	// second column
	if(cb[2] != "" && cb[2] == cb[5] && cb[5] == cb[8]){
		return true;
	}//if
	
	//third column
	if(cb[3] != "" && cb[3] == cb[6] && cb[6] == cb[9]){
		return true;
	}//if
	
	// across
	if(cb[1] != "" && cb[1] == cb[5] && cb[5] == cb[9]){
		return true;
	}//if
	
	if(cb[3] != "" && cb[3] == cb[5] && cb[5] == cb[7]){
		return true;
	}//if
	
}//checkWin

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
	
	// if the game is over, show controls
	if(gameStatus != ""){
		changeVisibility("controls");
	}//if
	
}//continueGame
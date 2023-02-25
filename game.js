
let SL;
let head;
let lenght;
let apple;
let skinColorString;
let oldx2;
let oldy2;
let goUp = false;
let goLeft = true;
let goDown = false;
let goRight = false;
let notDone = true;
let interval;
let score = 3;
let speed;
let gameLost;
let timerMin;
let timerSec;
let timerMill;
let timeCounter;

window.addEventListener("keydown", changeDirection);

function gameStartUp(){
	SL = 1;
	SL = new Map();	
	head = XYC(10, 7);
	SL.set(2, XYC(11, 7));
	SL.set(3, XYC(12, 7));
	lenght = 3;
	score = 3;
	scoreNumber.innerText = score;
	apple;
	skinColorString;
	oldx2 = 1;
	oldy2 = 1;
	gameLost = false;
	timerMin = 0;
	timerSec = 0;
	timerMill = 0;
	goUp = false;
	goLeft = true;
	goDown = false;
	goRight = false;
	notDone = false;

	if(snakeColor == 1){
		skinColorString = "rgb(100,200,100)"	
	}	
	else if(snakeColor == 2){
		skinColorString = "rgb(0,0,220)"	
	}	
	else{
		skinColorString = "rgb(200,200,0)"	
	}

	if(gameDifficulty == 1){
		speed = 400;	
	}	
	else if(gameDifficulty == 2){
		speed = 250;	
	}	
	else{
		speed = 150;
	}
	interval = setInterval(gameWhileLoop, speed);
	timeCounter = setInterval(timerFunction, 100);
	for(let b = 0; b<1;b++){
	generateApple();
	}


}
function gameWhileLoop(){
	oldx = NTX(head);
	oldy = NTY(head);
	
	if(goUp) {
		if(NTY(head) == 0){
			gameOver();
		}
		let x = NTX(head);
		let y = NTY(head);
		y -= 1;
		head = XYC(x, y);
	}
	if(goLeft) {
		if(NTY(head) == 0 & NTX(head) == 1){
			gameOver();
		}
		let x = NTX(head);
		let y = NTY(head);
		x -= 1;
		head = XYC(x, y);
	}
	if(goDown) {
		if(NTY(head) == 14){
			gameOver();
		}
		let x = NTX(head);
		let y = NTY(head);
		y += 1;
		head = XYC(x, y);
	}
	if(goRight) {
		let x = NTX(head);
		let y = NTY(head);
		x += 1;
		head = XYC(x, y);
	}
	ctx.strokeStyle = skinColorString;
	ctx.strokeRect(NTX(head)*30-20, NTY(head)*30+10, 10, 10);


	notDone = true;
	if(NTX(head)< 1 || NTY(head) < 0){
		gameOver();
	}
	if(NTX(head) > 15){
		gameOver();
	}
	updateFrame();
}
function updateFrame(){
    for(let i = 1; i < lenght;) {
		i += 1;
		oldx2 = NTX(SL.get(i));
		oldy2 = NTY(SL.get(i));
		if(head == SL.get(i)) {
			gameOver();
		}
		SL.set(i, XYC(oldx, oldy));
		ctx.lineWidth = 10;  
		oldx = oldx2;
		oldy = oldy2;
		ctx.strokeStyle = skinColorString;
		ctx.strokeRect(NTX(SL.get(i))*30-20, NTY(SL.get(i))*30+10, 10, 10);	
	
	}
	ctx.strokeStyle = "rgb(0,0,0)";
	ctx.strokeRect(oldx2*30-20, oldy2*30+10, 10, 10);
	ctx.strokeStyle = skinColorString;
	ctx.strokeRect(NTX(head)*30-20, NTY(head)*30+10, 10, 10);

	if(head == apple) {
		lenght += 1;		
		score += 1;		
		SL.set(lenght, XYC(oldx2, oldy2));		
		generateApple();
		scoreNumber.innerText = score;
		if(score > cHighScore){
			cHighScore = score;
			highScore.innerText = score;
			document.cookie = "high="+score+"; expires=Fri, 18 September 2099 11:00:00 UTC; path=/";
		}
	}
	if(gameLost){
		ctx.strokeStyle = "rgb(0, 0, 0)";
		ctx.fillRect(0, 0, 450, 450);
		ctx.strokeStyle = "rgb(40, 60, 40)";
    	ctx.lineWidth = 0.1;  	      
   		for(let i = 0; i < 450;){
   		     i += 30;
     		   for(let j = 0; j < 450;){
      		      j += 30;
      		      ctx.strokeRect(0, i, 450, 0.1);
        		    ctx.strokeRect(j, 0, 0.1, 450);
       			}
    	}
	}
}
function generateApple(){
    let ax = Math.floor(Math.random()*15+1);
    let ay = Math.floor(Math.random()*15+1);
    for(let i = 1; i < lenght;){
        i++;
        if(XYC(ax, ay) == SL.get(i) || XYC(ax, ay) == head){
            i = 0;
            ax = Math.floor(Math.random()*15+1);
            ay = Math.floor(Math.random()*15+1);
        }
	}
		ctx.lineWidth = 10;  
		if(ay == 15){
			if (ax == 15){
				ctx.strokeStyle = "rgb(200, 100, 100)";
				ctx.strokeRect(10, 0+10, 10, 10);
				ay = 0;
				ax = 1;
			}
			else{
			ctx.strokeStyle = "rgb(200, 100, 100)";
			ctx.strokeRect(ax*30+10, 0+10, 10, 10);
			}
		}
		else{
        ctx.strokeStyle = "rgb(200, 100, 100)";
		ctx.strokeRect(ax*30-20, ay*30+10, 10, 10);
		}    
    apple = XYC(ax, ay);
}
function timerFunction(){
	timerMill += 1;
	if(timerMill == 10){
		timerMill = 0;
		timerSec += 1;
	}
	if(timerSec == 60){
		timerSec = 0;
		timerMin += 1;
	}

	timeBoard.innerText = "Time: "+timerMin+"-"+timerSec+"."+timerMill;
}
function gameOver(){
	gameLost = true;
	console.log("dab naggit!");
	clearInterval(interval);
	clearInterval(timeCounter);
	scoreNumber.innerText = score;
	ctx.strokeStyle = "rgb(0, 0, 0)";
	ctx.fillRect(0, 0, 450, 450);
	ctx.strokeStyle = "rgb(40, 60, 40)";
    ctx.lineWidth = 0.1;  	      
    for(let i = 0; i < 450;){
        i += 30;
        for(let j = 0; j < 450;){
            j += 30;
            ctx.strokeRect(0, i, 450, 0.1);
            ctx.strokeRect(j, 0, 0.1, 450);
        }
    }
	startGame = document.createElement("div");
    startGame.id = "startGameButton";
    startGame.innerText = "Start the game";
    playArea.append(startGame);
    startGame.addEventListener('click', () => {
        gameStartUp();
        playArea.removeChild(startGame);
    });
}
function pauseGame(){
	clearInterval(interval);
}
function unpauseGame(){
	interval = setInterval(gameWhileLoop, speed);
}

function XYC(x, y) {
	return 15 * (x - 1) + y;	
}
function NTX(num) {
	let x = 1;	
	while(num >= 15) {	
		num -= 15;	
		x += 1;	
	}
	return x;
}
function NTY(num) {
	return num % 15;
}

function changeDirection(event){
    const keyPressed = event.keyCode;
    const LEFT = 37; const UP = 38; const RIGHT = 39; const DOWN = 40;
	const W = 87; const A = 65; const S = 83; const D = 68;
    switch(true){
        case(keyPressed == UP || keyPressed == W):
		if(!goDown & notDone){
			goUp = true;
			goLeft = false;
			goDown = false;
			goRight = false;
			notDone = false;
		}			
        break;
        case(keyPressed == LEFT || keyPressed == A):
		if(!goRight & notDone){
			goUp = false;
			goLeft = true;
			goDown = false;
			goRight = false;
			notDone = false;
		}		
        break;
        case(keyPressed == DOWN || keyPressed == S):
		if(!goUp & notDone){
			goUp = false;
			goLeft = false;
			goDown = true;
			goRight = false;
			notDone = false;
		}	
        break;
        case(keyPressed == RIGHT || keyPressed == D):
		if(!goLeft & notDone){
			goUp = false;
			goLeft = false;
			goDown = false;
			goRight = true;
			notDone = false;
		}	
        break;
    }
};
let gameCanvas = document.createElement("canvas");
let ctx = gameCanvas.getContext("2d");
let scoreNumber;
let highScore;
let timeBoard;
let bestTime;
gameCanvas.height = 450;
gameCanvas.width = 450;
gameCanvas.id = "gameCanvas";
let gamePaused = false;

const playButton = document.querySelector("#menuPlay");
playButton.addEventListener('mouseover', ()=>{
    playButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
});
playButton.addEventListener('mouseout', ()=>{
    playButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
});
playButton.addEventListener('click', () => {
    while (menuDiv.hasChildNodes()) {menuDiv.removeChild(menuDiv.firstChild);}
    let playArea = document.createElement("div");
    playArea.id = "playArea";
    menuDiv.append(playArea);
    playArea.append(gameCanvas);

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
    let startGame = document.createElement("div");
    startGame.id = "startGameButton";
    startGame.innerText = "Start the game";
    playArea.append(startGame);
    startGame.addEventListener('click', () => {
        gameStartUp();
        playArea.removeChild(startGame);
    });
    startGame.addEventListener('mouseover', ()=>{
        startGame.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    startGame.addEventListener('mouseout', ()=>{
        startGame.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });

    let pauseButton = document.createElement("div");
    pauseButton.classList.add("menuButtons");
    pauseButton.innerText = "Pause";
    pauseButton.style.height = "30px";
    menuDiv.append(pauseButton);
    pauseButton.addEventListener('click', () => {
        if(gamePaused){
            unpauseGame();
            pauseButton.innerText = "Pause";
            gamePaused = false;
        }
        else{
            pauseGame();
            pauseButton.innerText = "Unpause";
            gamePaused = true;
        }
    });
    pauseButton.addEventListener('mouseover', ()=>{
        pauseButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    pauseButton.addEventListener('mouseout', ()=>{
        pauseButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });

    let pbackButton = document.createElement("div");
    pbackButton.classList.add("menuButtons");
    pbackButton.innerText = "Go back";
    pbackButton.style.height = "30px";
    menuDiv.append(pbackButton);
    pbackButton.addEventListener('click', () => {
        gameOver();
        backSpace(); 
    });
    pbackButton.addEventListener('mouseover', ()=>{
        pbackButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    pbackButton.addEventListener('mouseout', ()=>{
        pbackButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });
    timeBoard = document.createElement("div");
    timeBoard.id = "timer";
    timeBoard.innerText = "Time: 00-00.0";
    rightBar.append(timeBoard);

    scoreNumber = document.createElement("div");
    scoreNumber.id = "score";
    scoreNumber.innerText = score;
    rightBar.append(scoreNumber);

    highScore = document.createElement("div");
    highScore.id = "score";
    highScore.innerText = cHighScore;
    rightBar.append(highScore);

    bestTime = document.createElement("div");
    bestTime.id = "timer";
    bestTime.style.marginTop = "5px";
    bestTime.innerText = "Best time: "+cBestTime;
    rightBar.append(bestTime);
});
const settingsButton = document.querySelector("#menuSettings");
settingsButton.addEventListener('mouseover', ()=>{
    settingsButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
});
settingsButton.addEventListener('mouseout', ()=>{
    settingsButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
});
settingsButton.addEventListener('click', () => {
    while (menuDiv.hasChildNodes()) {menuDiv.removeChild(menuDiv.firstChild);}
    let difficultyButton = document.createElement("div");
    difficultyButton.classList.add("menuButtons");
    if(gameDifficulty == 1){    
        difficultyButton.innerText = "Difficulty: Easy";       
    }
    if(gameDifficulty == 2){    
        difficultyButton.innerText = "Difficulty: Normal";       
    }
    if(gameDifficulty == 3){       
        difficultyButton.innerText = "Difficulty: Hard";       
    }
    difficultyButton.style.marginTop = "80px";
    menuDiv.append(difficultyButton);
    difficultyButton.addEventListener('click', () => {
        let i = true;
        if(gameDifficulty == 1 & i){
            gameDifficulty = 2;
            difficultyButton.innerText = "Difficulty: Normal";
            i = false;
        }
        if(gameDifficulty == 2 & i){
            gameDifficulty = 3;
            difficultyButton.innerText = "Difficulty: Hard";
            i = false;
        }
        if(gameDifficulty == 3 & i){
            gameDifficulty = 1;
            difficultyButton.innerText = "Difficulty: Easy";
            i = false;
        }
    });
    difficultyButton.addEventListener('mouseover', ()=>{
        difficultyButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    difficultyButton.addEventListener('mouseout', ()=>{
        difficultyButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });
    let colorButton = document.createElement("div");
    colorButton.classList.add("menuButtons");
    if(snakeColor == 1){    
        colorButton.innerText = "Snake color: Green";       
    }
    if(snakeColor == 2){    
        colorButton.innerText = "Snake color: Blue";       
    }
    if(snakeColor == 3){       
        colorButton.innerText = "Snake color: Yellow";       
    }
    menuDiv.append(colorButton);
    colorButton.addEventListener('click', () => {
        let i = true;
        if(snakeColor == 1 & i){
            snakeColor = 2;
            colorButton.innerText = "Snake color: Blue";
            i = false;
        }
        if(snakeColor == 2 & i){
            snakeColor = 3;
            colorButton.innerText = "Snake color: Yellow";
            i = false;
        }
        if(snakeColor == 3 & i){
            snakeColor = 1;
            colorButton.innerText = "Snake color: Green";
            i = false;
        }
    });
    colorButton.addEventListener('mouseover', ()=>{
        colorButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    colorButton.addEventListener('mouseout', ()=>{
        colorButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });
    let backButton = document.createElement("div");
    backButton.classList.add("menuButtons");
    backButton.innerText = "Go back";
    menuDiv.append(backButton);
    backButton.addEventListener('click', () => {
        document.cookie = "difficulty="+gameDifficulty+"; expires=Fri, 18 September 2099 11:00:00 UTC; path=/";
        document.cookie = "color="+snakeColor+"; expires=Fri, 18 September 2099 11:00:00 UTC; path=/";
        backSpace(); 
    });
    backButton.addEventListener('mouseover', ()=>{
        backButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    backButton.addEventListener('mouseout', ()=>{
        backButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });
});

const shareButton = document.querySelector("#menuShare");
shareButton.addEventListener('mouseover', ()=>{
    shareButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
});
shareButton.addEventListener('mouseout', ()=>{
    shareButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
});

const leaderboardsButton = document.querySelector("#menuLeaderboards");
leaderboardsButton.addEventListener('mouseover', ()=>{
    leaderboardsButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
});
leaderboardsButton.addEventListener('mouseout', ()=>{
    leaderboardsButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
});
leaderboardsButton.addEventListener('click', () => {
    while (menuDiv.hasChildNodes()) {menuDiv.removeChild(menuDiv.firstChild);}

    let lbackButton = document.createElement("div");
    lbackButton.classList.add("menuButtons");
    lbackButton.innerText = "Go back";
    menuDiv.append(lbackButton);
    lbackButton.addEventListener('click', () => {
        backSpace(); 
    });
    lbackButton.addEventListener('mouseover', ()=>{
        lbackButton.style.boxShadow = "0 0 2em rgb(100, 100, 255)";
    });
    lbackButton.addEventListener('mouseout', ()=>{
        lbackButton.style.boxShadow = "0 0 1em rgb(40, 40, 240)";
    });
});
function backSpace(){
    while (menuDiv.hasChildNodes()) {
        menuDiv.removeChild(menuDiv.firstChild);
    }
    while (rightBar.hasChildNodes()) {
        rightBar.removeChild(rightBar.firstChild);
    }
    menuDiv.append(playButton);
    menuDiv.append(settingsButton);
    menuDiv.append(shareButton);
    menuDiv.append(leaderboardsButton);
}
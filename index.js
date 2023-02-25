
const menuDiv = document.querySelector("#center");
const rightBar = document.querySelector("#right");
const leftBar = document.querySelector("#left");

let cHighScore = 0;
let cBestTime = 0;
let gameDifficulty = 2;//1 easy 2 normal 3 hard
let snakeColor = 1;//1 green 2 blue 3 yellow
getCookie();

function getCookie(){
    const cDecoded = decodeURIComponent(document.cookie);
    let cArray = cDecoded.split("; ");
    if(cArray != null){
        for(let i = -1; i < cArray.length - 1;){
            i++;
            if(cArray[i].includes("high")){
                let temp = cHighScore;
                cHighScore = cArray[i].substring(5);   
                cHighScore = cHighScore.replace(";", "");
                if(cHighScore == null){
                    cHighScore = temp;  
                }
            }
        }
        for(let i = -1; i < cArray.length - 1;){
            i++;
            if(cArray[i].includes("best")){
                let temp = cBestTime;
                cBestTime = cArray[i].substring(5);   
                cBestTime = cBestTime.replace(";", "");
                if(cBestTime == null){
                    cBestTime = temp;  
                }
            }
        }
        for(let i = -1; i < cArray.length - 1;){
            i++;
            if(cArray[i].includes("difficulty")){
                let temp = gameDifficulty;
                console.log("check "+ gameDifficulty);
                gameDifficulty = cArray[i].substring(11);   
                gameDifficulty = gameDifficulty.replace(";", "");
                console.log("check "+ gameDifficulty);
                if(gameDifficulty == null){
                    gameDifficulty = temp;  
                }
            }
        }
        for(let i = -1; i < cArray.length - 1;){
            i++;
            if(cArray[i].includes("color")){
                let temp = snakeColor;
                snakeColor = cArray[i].substring(6);   
                snakeColor = snakeColor.replace(";", "");
                if(snakeColor == null){
                    snakeColor = temp;  
                }
            }
        }
    
        
    }
    else{

    }
    console.log(cHighScore);
    console.log(cBestTime);
    console.log(gameDifficulty);
    console.log(snakeColor);
}


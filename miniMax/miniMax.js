
let gameState = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
let botPlayer = ' ';
let humanPlayer = ' ';
let possibilities = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let spaces;

let hasFreeSpace = function() {
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] == 'e') {
            return true;
        }
    }
    return false;
}

let checkGameState = function() {
    for (let i = 0; i < possibilities.length; i++) {
        if (gameState[possibilities[i][0]] != 'e' && gameState[possibilities[i][0]] == gameState[possibilities[i][1]] && gameState[possibilities[i][0]] == gameState[possibilities[i][2]]) {
            return gameState[possibilities[i][0]];
        }
    }
    if (!hasFreeSpace()) {
        return 'D';
    }
    return 'e';
}

let aiPlay = function() {
    let bestScore = -1000;
    let bestMoves = [];
    for (let i = 0; i < 9; i++)
    {
        if (gameState[i] == 'e')
        {

            gameState[i] = botPlayer;
            let curScore = miniMax(9, false);
            gameState[i] = 'e';
            if (curScore > bestScore)
            {
                bestScore = curScore;
                for (let j = 0; j < bestMoves.length; j++) {
                    bestMoves.pop();
                }
                bestMoves = [i];
            } else if (curScore == bestScore) {
                bestMoves.push(i);
            }
        }
    }
    let index = parseInt(Math.random() * 100 % bestMoves.length)
    gameState[bestMoves[index]] = botPlayer;
}

let miniMax = function(depth, isMaximizing) {
    let winner = checkGameState();
    if (winner != 'e')
    {
        return (winner == botPlayer && gameState[4] == botPlayer) ? (2 + depth) 
               : (winner == botPlayer) ? (1 + depth)
               : (winner == humanPlayer && gameState[4] == humanPlayer) ? (-2 - depth)
               : (winner == humanPlayer) ? (-1 - depth)
                                         : 0;
    }
    let bestScore = ((isMaximizing) ? -1000 : 1000);
    for (let i = 0; i < 9; i++)
    {
        if (gameState[i] == 'e')
        {
            gameState[i] = (isMaximizing) ? botPlayer : humanPlayer;
            let curScore = miniMax(depth - 1, !isMaximizing);
            gameState[i] = 'e';
            if ((isMaximizing && (curScore > bestScore)) || (!isMaximizing && (curScore < bestScore)))
            {
                bestScore = curScore;
            }
        }
    }
    return bestScore;
}

let display = function() {
    for (let i = 0; i < spaces.length; i++) {
        spaces[i].innerHTML = (gameState[i] == 'O') ? '<div class="circle"><div></div></div>' : (gameState[i] == 'X') ? '<div class="cross"><div></div><div></div></div>' : '';
    }
}

let reset = function () {
    gameState = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
    document.getElementById("board").innerHTML = '<div id="choosePlayerPiece"><button type="button" onclick="choosePlayerPiece(\'O\')"><div class="circle"><div></div></div></button><button type="button" onclick="choosePlayerPiece(\'X\')"><div class="cross"><div></div><div></div></div></button></div>';
    document.getElementById("info").innerHTML = 'Choose a piece';
}

let endScreen = function (msg) {
    document.getElementById("board").innerHTML += '<div id="screen">' + msg + '<button type="button" onclick="reset()">Reset</button></div>';
}

let play = function() {
    if (gameState[this.id] == "e") {
        gameState[this.id] = humanPlayer;
        let curState = checkGameState();
        if (curState != 'e') {
            endScreen((curState == 'D') ? "Draw" : (curState + "'s wins"));
        }
        aiPlay();
        curState = checkGameState();
        if (curState != 'e') {
            endScreen((curState == 'D') ? "Draw" : (curState + "'s wins"));
        }
        display();
    }
}

let chooseFirstPlayer = function(player) {
    document.getElementById("board").innerHTML = '<div class="spaces" id="0"></div><div class="spaces" id="1"></div><div class="spaces" id="2"></div><div class="spaces" id="3"></div><div class="spaces" id="4"></div><div class="spaces" id="5"></div><div class="spaces" id="6"></div><div class="spaces" id="7"></div><div class="spaces" id="8"></div>';
    document.getElementById("info").innerHTML = '';
    //make divs clicable
    spaces = document.getElementsByClassName("spaces");
    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener("click", play);
    };
    if (player == "computer") {
        aiPlay();
        display();
    }
}

let choosePlayerPiece = function(player) {
    humanPlayer = player;
    botPlayer = humanPlayer == 'X' ? 'O' : 'X';
    document.getElementById("board").innerHTML = '<div id="chooseFirstPlayer"><button type="button" onclick="chooseFirstPlayer(\'human\')"><i class="fa-solid fa-person fa-5x"></i></button><button type="button" onclick="chooseFirstPlayer(\'computer\')"><i class="fa-solid fa-robot fa-4x"></i></button></div>';
    document.getElementById("info").innerHTML = 'Who goes first?';
}


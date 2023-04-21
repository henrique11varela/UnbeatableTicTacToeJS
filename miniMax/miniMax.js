
let gameState = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
let botPlayer = ' ';
let humanPlayer = ' ';
let possibilities = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
let spaces = [];
let board = document.getElementById("board");

//circle element
const circleEl = document.createElement("div");
circleEl.classList.add("circle");
circleEl.append(document.createElement("div"));

//cross element
const crossEL = document.createElement("div");
crossEL.classList.add("cross");
crossEL.append(document.createElement("div"), document.createElement("div"));

function hasFreeSpace() {
    for (let i = 0; i < gameState.length; i++) {
        if (gameState[i] == 'e') {
            return true;
        }
    }
    return false;
}

function checkGameState() {
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

function aiPlay() {
    let bestScore = -1000;
    let bestMoves = [];
    for (let i = 0; i < 9; i++) {
        if (gameState[i] == 'e') {

            gameState[i] = botPlayer;
            let curScore = miniMax(9, false);
            gameState[i] = 'e';
            if (curScore > bestScore) {
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
    let s = document.querySelector("#board").children[bestMoves[index]];
    if (gameState[bestMoves[index]] == 'O') {
        s.append(circleEl.cloneNode(true));
    } else if (gameState[bestMoves[index]] == 'X') {
        s.append(crossEL.cloneNode(true));
    }
}

function miniMax(depth, isMaximizing) {
    let winner = checkGameState();
    if (winner != 'e') {
        return (winner == botPlayer && gameState[4] == botPlayer) ? (2 + depth)
            : (winner == botPlayer) ? (1 + depth)
                : (winner == humanPlayer && gameState[4] == humanPlayer) ? (-2 - depth)
                    : (winner == humanPlayer) ? (-1 - depth)
                        : 0;
    }
    let bestScore = ((isMaximizing) ? -1000 : 1000);
    for (let i = 0; i < 9; i++) {
        if (gameState[i] == 'e') {
            gameState[i] = (isMaximizing) ? botPlayer : humanPlayer;
            let curScore = miniMax(depth - 1, !isMaximizing);
            gameState[i] = 'e';
            if ((isMaximizing && (curScore > bestScore)) || (!isMaximizing && (curScore < bestScore))) {
                bestScore = curScore;
            }
        }
    }
    return bestScore;
}

function reset() {
    gameState = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    //button O
    const buttonO = document.createElement("button");
    buttonO.append(circleEl.cloneNode(true));
    buttonO.onclick = function () {
        choosePlayerPiece('O');
    }
    //buttonX
    const buttonX = document.createElement("button");
    buttonX.append(crossEL.cloneNode(true));
    buttonX.onclick = function () {
        choosePlayerPiece('X');
    }
    //menu
    const tempEl = document.createElement("div");
    tempEl.id = "choosePlayerPiece";
    tempEl.append(buttonO, buttonX);

    document.getElementById("board").append(tempEl);
    document.getElementById("info").textContent = 'Choose a piece';
}

function endScreen(msg) {
    let resetButtonEl = document.createElement("button");
    with (resetButtonEl) {
        textContent = "Reset";
        onclick = reset;
    }
    let endMsgEl = document.createElement("div");
    endMsgEl.id = "screen";
    endMsgEl.append(msg, resetButtonEl);
    board.append(endMsgEl);
}

function play() {
    if (gameState[this.id] == "e") {
        gameState[this.id] = humanPlayer;
        //display
        if (gameState[this.id] == 'O') {
            this.append(circleEl.cloneNode(true));
        } else if (gameState[this.id] == 'X') {
            this.append(crossEL.cloneNode(true));
        }
        let curState = checkGameState();
        if (curState != 'e') {
            endScreen((curState == 'D') ? "Draw" : (curState + "'s wins"));
        }
        aiPlay();
        curState = checkGameState();
        if (curState != 'e') {
            endScreen((curState == 'D') ? "Draw" : (curState + "'s wins"));
        }
    }
}

function chooseFirstPlayer(player) {
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    let s = document.createElement("div");
    s.classList.add("spaces");
    for (let i = 0; i < 9; i++) {
        let a = s.cloneNode();
        a.id = i;
        a.onclick = play;
        board.append(a);
    }
    document.getElementById("info").textContent = '';
    if (player == "computer") {
        aiPlay();
    }
}

function choosePlayerPiece(player) {
    humanPlayer = player;
    botPlayer = humanPlayer == 'X' ? 'O' : 'X';
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }
    //menu
    let menu = document.createElement("div");
    menu.id = "chooseFirstPlayer";
    //button human
    let buttonHumanEl = document.createElement("button");
    let personIcon = document.createElement("i");
    personIcon.classList.add("fa-solid", "fa-person", "fa-5x");
    buttonHumanEl.append(personIcon);
    buttonHumanEl.onclick = function () {
        chooseFirstPlayer("human");
    }
    //button computer
    let buttonComputerEl = document.createElement("button");
    let computerIcon = document.createElement("i");
    computerIcon.classList.add("fa-solid", "fa-robot", "fa-4x");
    buttonComputerEl.append(computerIcon);
    buttonComputerEl.onclick = function () {
        chooseFirstPlayer("computer");
    }
    menu.append(buttonHumanEl, buttonComputerEl);
    document.getElementById("board").append(menu);
    document.getElementById("info").textContent = 'Who goes first?';
}


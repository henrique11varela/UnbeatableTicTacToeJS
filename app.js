let turn = "O";
let state = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
const spaces = document.getElementsByClassName("spaces");

//endscreen add
let endScreen = function(msg) {
    document.getElementById("board").innerHTML += '<div id="screen">' + msg + '<button type="button" onclick="reset()">Reset</button></div>';
}

//update state, draw and change turn
let updateState = function(id) {
    state[id] = turn;
    draw(id);
    turn = turn == "O"?"X":"O";
}

//check lines, columns and diagonals
//and bot play
let botPlay = function() {
    let possibilities = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    //check if going to win or if in check
    let win = [];//to attack
    let check = [];//in check
    for (let i = 0; i < possibilities.length; i++) {//add checks to arrays
        let line = [];
        for (let j = 0; j < possibilities[i].length; j++) {
            line.push(state[possibilities[i][j]]);
        }
        let noEs = line.filter((a) => {return a != "e"});
        if (noEs.length == 2 && noEs[0] == noEs[1] && noEs[0] == "X") {
            win.push(possibilities[i]);
        }
        if (noEs.length == 2 && noEs[0] == noEs[1] && noEs[0] == "O") {
            check.push(possibilities[i]);
        }
    }
    for (let i = 0; i < check.length; i++) {//concat win with check
        win.push(check[i]);
    }
    //attack or defend with attack priority
    if (win.length > 0) {
        let line = [];
        for (let i = 0; i < win[0].length; i++) {
            line.push(state[win[0][i]]);
        }
        updateState(win[0][line.indexOf("e")]);
    } 
    //if center is free, take center
    else if (state[4] == "e") {
        updateState(4);
    }
    //if center taken and corners are free, take a corner
    else if (state[4] == "O" && (state[0] == "e" || state[2] == "e" || state[6] == "e" || state[8] == "e")) {
        let corners = [0, 2, 6, 8];
        let freeCorners = [];
        for (let i = 0; i < corners.length; i++) {
            if (state[corners[i]] == "e") {
                freeCorners.push(corners[i]);
            }
        }
        updateState(freeCorners[Math.floor(Math.random() * freeCorners.length)]);
    }
    //if center is bot then take edges
    else if (state[4] == "X" && (state[1] == "e" || state[3] == "e" || state[5] == "e" || state[7] == "e")) {
        let corners = [1, 3, 5, 7];
        let freeCorners = [];
        for (let i = 0; i < corners.length; i++) {
            if (state[corners[i]] == "e") {
                freeCorners.push(corners[i]);
            }
        }
        updateState(freeCorners[Math.floor(Math.random() * freeCorners.length)]);
    }
    else { //play random
        let emptySpaces = [];
        for (let i = 0; i < state.length; i++) {
            if (state[i] == "e") {
                emptySpaces.push(i);
            }
        }
        updateState(emptySpaces[Math.floor(Math.random() * emptySpaces.length)]);
    }
    checkGameState();
}

let checkGameState = function() {
    let possibilities = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
    for (let i = 0; i < possibilities.length; i++) {
        let line = [];
        for (let j = 0; j < possibilities[i].length; j++) {
            line.push(state[possibilities[i][j]]);
        }
        let noEs = line.filter((a) => {return a != "e"});
        if (noEs.length == 3 && noEs[0] == noEs[1] && noEs[1] == noEs[2]) {
                endScreen("X's wins");
                return false;
        }    
    }
    return true;
}

//draw inside the div
let draw = function(id) {
    if (state[id] == "O") {
        spaces[id].innerHTML = '<div class="circle"><div></div></div>';
    }
    else if (state[id] == "X") {
        spaces[id].innerHTML = '<div class="cross"><div></div><div></div></div>';
    }
}

//reset game
let reset = function() {
    for (let i = 0; i < state.length; i++) {
        state[i] = "e";
        spaces[i].innerHTML = "";
    }
    document.getElementById("board").innerHTML = '<div class="spaces" id="0"></div><div class="spaces" id="1"></div><div class="spaces" id="2"></div><div class="spaces" id="3"></div><div class="spaces" id="4"></div><div class="spaces" id="5"></div><div class="spaces" id="6"></div><div class="spaces" id="7"></div><div class="spaces" id="8"></div>';
    turn = "O";
    for (let i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener("click", play);
    };
}

//main function
let play = function() {
    console.log("click");
    if (state[parseInt(this.id)] == "e") {
        if (checkGameState()) {
            updateState(parseInt(this.id));
            if (state.includes("e")) {
                botPlay();
            }
            else {
                endScreen("Draw");
            }
        }
    }
};

//make divs clicable
for (let i = 0; i < spaces.length; i++) {
    spaces[i].addEventListener("click", play);
};
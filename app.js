let turn = "O";
let state = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];
const spaces = document.getElementsByClassName("spaces");

//endscreen add
let endScreen = function(msg) {
    document.getElementById("board").innerHTML += '<div id="screen">' + msg + '</div>';
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
    //if going to win, win, if check defend
    let win = [];//to attack
    let check = [];//to defend
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

    for (let i = 0; i < check.length; i++) {
        win.push(check[i]);
    }

    if (win.length > 0) {
        let line = [];
        for (let i = 0; i < win[0].length; i++) {
            line.push(state[win[0][i]]);
        }
        updateState(win[0][line.indexOf("e")]);
    } 
    //play on the edges if theres pieces in the corners and center is empty
    else if ((state[0] == "O" || state[2] == "O" || state[6] == "O" || state[8] == "O") && state[4] == "e") {
        let edges = [1, 3, 5, 7];
        updateState(edges[Math.floor(Math.random() * 4)]);
    }
    else if (state[4] == "e") { //play in the center
        updateState(4);
    }else { //play random
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
    if (state.filter((a) => {return a == "e"}).length == 0) {
        endScreen("Draw");
        return false;
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

//main function
let play = function() {
    if (state[parseInt(this.id)] == "e") {
        if (checkGameState()) {
            updateState(parseInt(this.id));
            botPlay();
        }
    }
};

//make divs clicable
for (let i = 0; i < spaces.length; i++) {
    spaces[i].addEventListener("click", play);
};
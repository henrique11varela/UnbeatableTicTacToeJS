let turn = "O";

let state = ["e", "e", "e", "e", "e", "e", "e", "e", "e"];

//change turn
let changeTurn = function() {
    turn = turn=="O"?"X":"O";
};

//update state
let updateState = function(id) {
    state[id] = turn;
    console.log(state);
}

//draw inside the div
let draw = function(spc) {
    if (turn == "O") {
        spc.innerHTML = '<div class="circle"><div></div></div>';
    }
    else {
        spc.innerHTML = '<div class="cross"><div></div><div></div></div>';
    }
}

//main function
let play = function() {
    if (this.innerHTML == "") {
        
        updateState(parseInt(this.id));
        draw(this);
        changeTurn();
    }
};

//make divs clicable
const spaces = document.getElementsByClassName("spaces");
for (let i = 0; i < spaces.length; i++) {
    spaces[i].addEventListener("click", play);
};


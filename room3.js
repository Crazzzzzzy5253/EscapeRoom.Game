//Pantry
function inspectPantry(){
    if(!gameState.pantryInspected){
        gameState.pantryInspected = true;
        writeText("Sack seem movable and there is a note.");
        document.querySelectorAll(".pantryHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else{
        writeText("Maybe moving the sacks could do something?");
    }
}
function notePantry(){
    writeText("Heaviest stayed on the bottom.");
}

let pantryOrder = [];
const correctPantryOrder = ["salt", "rice", "flour"];

function pantrySacks() {
    
    if (gameState.pantrySolved) {
        writeText("The sacks are already arranged correctly.");
        return;
    }

    pantryPuzzle();
}

function pantryPuzzle() {
    pantryOrder = [];

    const puzzleArea = document.getElementById("puzzleArea");
    puzzleArea.innerHTML = `
        <p style="text-align:center;">Click the sacks in the correct order.</p>

        <div class="pantryPuzzleContainer">
            <button class="pantryPuzzleBtn" onclick="pressPantry('flour')">Flour</button>
            <button class="pantryPuzzleBtn" onclick="pressPantry('rice')">Rice</button>
            <button class="pantryPuzzleBtn" onclick="pressPantry('salt')">Salt</button>
        </div>
    `;
}

function pressPantry(item) {
    pantryOrder.push(item);
    writeText("You moved the " + item + ".");

    
    for (let i = 0; i < pantryOrder.length; i++) {
        if (pantryOrder[i] !== correctPantryOrder[i]) {
            writeText("Wrong order! The sacks are put back.");
            pantryOrder = [];
            return;
        }
    }

    
    if (pantryOrder.length === correctPantryOrder.length) {
        solvePantryPuzzle();
    }
}

function solvePantryPuzzle() {
    gameState.pantrySolved = true;

    writeText('You arranged the sacks correctly. One of them broke open where a note came out: "<span style="color:blue;font-weight:bold;">9</span>" .');

    
    document.getElementById("puzzleArea").innerHTML = "";

    const moveSacksBtn = document.querySelector(
        "button[onclick='pantrySacks()']"
    );

    if (moveSacksBtn) {
        moveSacksBtn.disabled = true;
        moveSacksBtn.style.opacity = "0.5";
        moveSacksBtn.style.cursor = "not-allowed";
    }
    saveGame();

}

//Fridge
function inspectFridge(){
    writeText("There is a note on the fridge.");
    document.querySelectorAll(".fridgeHidden")
            .forEach(btn => btn.style.display = "block");
}

function noteFridge(){
    writeText('Rooms and their leave time:<br>Room 1 - 09/4/2019<br>Room 4 - 25/7/2020<br>Room 2 - 11/11/2020<br>Room 3 - Occupied');
}


//Sink
function inspectSink(){
    if(!gameState.sinkInspected){
        gameState.sinkInspected = true;
        writeText("There is a note on the sink. Maybe it has something usefull?");
        document.querySelectorAll(".sinkHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else{
        writeText("There is a note on the sink.");
    }
}
function noteSink(){
    writeText('Rice 5kg, Flour 3kg, Salt 10kg.<br>The last guest is always last.');
}


//Kitchen
function returnRoom2() {
    saveGame();
    window.location.href = "Room2.html";
}
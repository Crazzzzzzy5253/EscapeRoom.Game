//Suitcase
function showSuitcasePuzzle() {
    clearPuzzleArea();

    const puzzle = `
        <h3>Suitcase Lock</h3>
        <p>Enter the 3-digit code:</p>

        <div class="codeRow">
            <div class="codeSlot"><div class="symbol">■</div><input type="number" id="code1"></div>
            <div class="codeSlot"><div class="symbol">●</div><input type="number" id="code2"></div>
            <div class="codeSlot"><div class="symbol">★</div><input type="number" id="code3"></div>
        </div>

        <button onclick="checkSuitcaseCode()">Unlock</button>
    `;

    document.getElementById("puzzleArea").innerHTML = puzzle;
}

function checkSuitcaseCode() {
    const code =
        code1.value + code2.value + code3.value;

    if (code === "223") {
        gameState.suitcaseOpened = true;
        writeText("The suitcase clicks open. There is a small key and a note inside.");
        clearPuzzleArea();
        document.querySelectorAll(".suitcaseHidden").forEach(btn => btn.style.display = "block");
    } else {
        writeText("The lock doesn't budge.");
    }
}

function inspectSuitcase() {
    if (gameState.suitcaseOpened) {
        writeText("The suitcase is already open.");
        clearPuzzleArea();
        return;
    }
    writeText("The suitcase has a 3-digit combination lock.");
    showSuitcasePuzzle();
}

function suitcaseNote() {
    writeText('<span style="color:red;">6</span>');
}

function nightstandKey(button) {
    addToInventory("Small Key");
    writeText("Picked up a Small Key.");
    gameState.smallKey = true;
    button.disabled = true;
    saveGame();
}

//Bed
function inspectBed() {
    if (!gameState.bedInspected) {
        gameState.bedInspected = true;
        writeText("You inspect the bed and notice something tucked under the pillow.");
        document.querySelectorAll(".bedHidden").forEach(btn => btn.style.display = "block");
    } else {
        writeText("You already inspected the bed.");
    }
}

function noteBed() {
    writeText("Room is hiding the clues for the suitcase.");
}

//Nightstand
function inspectNightstand() {
    if (!gameState.nightstandInspected) {
        gameState.nightstandInspected = true;
        writeText("Drawer seems to be locked. On top you see 3 star shaped toys.");
        document.querySelectorAll(".nightstandHidden").forEach(btn => btn.style.display = "block");
    } 
    if(gameState.nightstandUnlocked == true){
        writeText("Drawer is unlocked. On top you see 3 star shaped toys.");
    }
    else {
        writeText("Drawer is locked. On top you see 3 star shaped toys.");
    }
}

function unlockNightstand(button) {
    if (!gameState.nightstandUnlocked) {
        if (gameState.smallKey) {
            gameState.nightstandUnlocked = true;
            writeText("You unlocked the drawer. Inside is a matchbox and a torn paper.");
            document.querySelectorAll(".nightstandHidden2").forEach(btn => btn.style.display = "block");
            button.disabled = true;
        } else {
            writeText("You don't have a key.");
        }
    }
}

function pickupMatchbox(button) {
    addToInventory("Matchbox");
    writeText("Picked up Matchbox.");
    button.disabled = true;
    gameState.matchboxPickedUp = true;
    saveGame();
}

function nightstandNote() {
    writeText("Clock time is important.");
}

//Window
function inspectWindow() {
    if (!gameState.windowInspected) {
        gameState.windowInspected = true;
        writeText("There are candles next to the window and drawings on the window: 2 squares & 1 circle.");
        document.querySelectorAll(".windowHidden").forEach(btn => btn.style.display = "block");
    } else {
        writeText("There are candles next to the window and drawings on the window: 2 squares & 1 circle.");
    }
}

function lightCandles(button) {
    if (gameState.matchboxPickedUp) {
        writeText("Soot marks appear saying: '19:30'");
        button.disabled = true;
    } else {
        writeText("You need something to light them.");
    }
}

//Clock
function inspectClock(){
    if(!gameState.clockInspected){
        gameState.clockInspected = true;
        writeText("You could change time on the clock, maybe something happens?");
        document.querySelectorAll(".clockHidden")
            .forEach(btn => btn.style.display = "block");
    }
    if(gameState.clockUnlocked == true){
        writeText('Clock is opened, you see a green <span class="clue-green">1</span> drawn inside the clock and a key.');
    }
    else{
        writeText("Perhaps changing clock time could do something.");
    }
}

function changeTime(){
    clearPuzzleArea();

    const puzzle2 = `
        <h3>Clock Time</h3>
        <p>Enter the time (HH:MM):</p>

        <div class="codeRow">
            <div class="codeSlot"><input type="number" id="time1" min="0" max="9"></div>
            <div class="codeSlot"><input type="number" id="time2" min="0" max="9"></div>
            <span style="font-size: 24px; padding: 0 5px;">:</span>
            <div class="codeSlot"><input type="number" id="time3" min="0" max="9"></div>
            <div class="codeSlot"><input type="number" id="time4" min="0" max="9"></div>
        </div>

        <button onclick="checkClockTime()">Set Time</button>
    `;

    document.getElementById("puzzleArea").innerHTML = puzzle2;
}
function checkClockTime() {
    const time =
        document.getElementById("time1").value +
        document.getElementById("time2").value +
        document.getElementById("time3").value +
        document.getElementById("time4").value;

    if (time === "1930") {
        writeText('The clock clicks! You hear a small mechanism unlock nearby. You see a green <span class="clue-green">1</span> drawn inside the clock and a key.');
        gameState.clockUnlocked = true;
        clearPuzzleArea();
        
        document.querySelectorAll(".clockHidden2")
            .forEach(btn => btn.style.display = "block");

         document.querySelectorAll(".clockHidden")
            .forEach(btn => btn.style.display = "none");
            saveGame();
    } else {
        writeText("Nothing happens. Maybe the time is wrong.");
    }
}

function keyRoom2(button){
    addToInventory("Dining Room Key")
    writeText("Picked up Dining Room Key.");
    button.disabled = true;
    gameState.keyRoom2Pickedup = true;
    saveGame();
}

//Dining room
function inspectDoor2() {
    writeText(gameState.unlockedRoom2 ? "The door is unlocked." : "Door is locked.");
    document.querySelectorAll(".room2Hidden")
        .forEach(btn => btn.style.display = "block");
}

function unlockRoom2(button) {
    if (gameState.keyRoom2Pickedup) {
        writeText("Door unlocked.");
        button.disabled = true;
        gameState.unlockedRoom2 = true;
        document.querySelectorAll(".room2Hidden2").forEach(btn => btn.style.display = "block");
        saveGame();
    } else {
        writeText("You don't have the key.");
    }
}

function enterRoom2() {
    saveGame();
    window.location.href = "Room2.html";
}

//Exit
function inspectExitDoor() {
    writeText("The exit door has a keypad with colored squares above the numbers.");
    document.querySelectorAll(".exitHidden")
        .forEach(btn => btn.style.display = "block");
}

function showExitPuzzle() {
    clearPuzzleArea();

    document.getElementById("puzzleArea").innerHTML = `
        <p style="text-align:center;">Enter the correct sequence.</p>

        <div class="exitPuzzleRow">
            <div class="exitSlot">
                <div class="exitColor red"></div>
                <input type="number" id="exit1">
            </div>
            <div class="exitSlot">
                <div class="exitColor green"></div>
                <input type="number" id="exit2">
            </div>
            <div class="exitSlot">
                <div class="exitColor purple"></div>
                <input type="number" id="exit3">
            </div>
            <div class="exitSlot">
                <div class="exitColor white"></div>
                <input type="number" id="exit4">
            </div>
            <div class="exitSlot">
                <div class="exitColor blue"></div>
                <input type="number" id="exit5">
            </div>
            <div class="exitSlot">
                <div class="exitColor black"></div>
                <input type="number" id="exit6">
            </div>
        </div>

        <button onclick="checkExitCode()">Confirm</button>
    `;
}

function checkExitCode() {
    const code =
        exit1.value +
        exit2.value +
        exit3.value +
        exit4.value +
        exit5.value +
        exit6.value;

    if (code === "618293") {
        clearPuzzleArea();
        writeText("<strong>Thank you for staying.</strong>");

        document.querySelectorAll(".exitHidden2")
            .forEach(btn => {
                btn.style.display = "block";
                btn.disabled = false;
            });

        document.querySelectorAll(".exitHidden")
            .forEach(btn => btn.style.display = "none");

    } else {
        writeText("The door remains locked.");
    }
}

function finishGame() {
    writeText("<strong>Thank you for staying.</strong>");
    saveGame();

    setTimeout(() => {
        window.location.href = "End.html";
    }, 2000);
}

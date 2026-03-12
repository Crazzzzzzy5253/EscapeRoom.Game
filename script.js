const headers = document.querySelectorAll('.naslovObjekta');
const inventory = [];

const gameState = {
    suitcaseOpened: false,
    bedInspected: false,
    nightstandInspected: false,
    smallKey: false,
    nightstandUnlocked: false,
    matchboxPickedUp: false,
    windowInspected: false,
    clockInspected: false,
    keyRoom2PickedUp: false,
    inspectDoorRoom2: false,
    unlockedRoom2: false,
};

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        // Zatvori panel
        document.querySelectorAll('.sadrzajObjekta').forEach(panel => {
            if (panel !== content) panel.style.display = 'none';
        });

        document.querySelectorAll('.naslovObjekta').forEach(h => {
            if (h !== header) h.classList.remove('otvoreno');
        });

        // Da je jedan panel otvoren
        if (content.style.display === 'block') {
            content.style.display = 'none';
            header.classList.remove('otvoreno');
        } else {
            content.style.display = 'block';
            header.classList.add('otvoreno');
        }
    });
});


// Dodavanje itema
function addToInventory(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        updateInventoryUI();
    }
}

// Azuriranje vizualnog inventorija
function updateInventoryUI() {
    const container = document.getElementById("inventoryItems");
    container.innerHTML = "";

    inventory.forEach(item => {
        const div = document.createElement("div");
        div.className = "inventoryItem";
        div.textContent = item;
        container.appendChild(div);
    });
}

// Ispisivanje texta
function writeText(message) {
    const log = document.getElementById("textLog");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight; // auto-scroll
}

// Brisanje prijasnih puzzle djela
function clearPuzzleArea() {
    document.getElementById("puzzleArea").innerHTML = "";
}


// Suitcase
function showSuitcasePuzzle() {
    clearPuzzleArea();

    const puzzle = `
        <h3>Suitcase Lock</h3>
        <p>Enter the 3-digit code:</p>

        <div class="codeRow">
            <div class="codeSlot">
                <div class="symbol">■</div>
                <input type="number" id="code1" min="0" max="9">
            </div>

            <div class="codeSlot">
                <div class="symbol">●</div>
                <input type="number" id="code2" min="0" max="9">
            </div>

            <div class="codeSlot">
                <div class="symbol">★</div>
                <input type="number" id="code3" min="0" max="9">
            </div>
        </div>

        <button onclick="checkSuitcaseCode()">Unlock</button>
    `;

    document.getElementById("puzzleArea").innerHTML = puzzle;
}

    function checkSuitcaseCode() {
    const code =
        document.getElementById("code1").value +
        document.getElementById("code2").value +
        document.getElementById("code3").value;

    if (code === "223") {
        gameState.suitcaseOpened = true;

        writeText("The suitcase clicks open. There is a small key and a note inside.");
        clearPuzzleArea();

        document.querySelectorAll(".suitcaseHidden")
            .forEach(btn => btn.style.display = "block");
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

function suitcaseNote(){
    writeText('<span style="color:red;">6</span>');
}

function nightstandKey(button) {
    addToInventory("Small Key");
    writeText("Picked up a Small Key.");
    gameState.smallKey = true;
    button.disabled = true;
}

// Bed
function inspectBed() {
    if (!gameState.bedInspected) {
        gameState.bedInspected = true;
        writeText("You inspect the bed and notice something tucked under the pillow.");

        document.querySelectorAll(".bedHidden")
            .forEach(btn => btn.style.display = "block");
    } else {
        writeText("You already inspected the bed.");
    }
}
function noteBed() {
    writeText("Room is hiding the clues for the suitcase.");
}

// Nightstand

function inspectNightstand(){
    if (!gameState.nightstandInspected){
        gameState.nightstandInspected = true;
        writeText("Drawer seems to be locked. You see 3 toys on the nightstand shaped like a star.");

        document.querySelectorAll(".nightstandHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else{
        writeText("Drawer is unlocked, on the drawer are 3 star shaped toys.")
    }
}

function unlockNightstand(button){
    if(!gameState.nightstandUnlocked){
        if(gameState.smallKey == true){
        gameState.nightstandUnlocked = true;
        writeText("You unlocked the drawer. Inside is a matchbox and a torn paper.");
        document.querySelectorAll(".nightstandHidden2")
            .forEach(btn => btn.style.display = "block");
        button.disabled = true; }
        else{
            writeText("You don't have a key to unlock the drawer.");
        }
    }
}


function pickupMatchbox(button) {
    addToInventory("Matchbox");
    writeText("Picked up Matchbox.");
    button.disabled = true;
    gameState.matchboxPickedup = true;
}

function nightstandNote(){
    writeText("Clock time is important hence dinner was exactly when the candles were lit.");
}

//Window
function inspectWindow(){
    if(!gameState.windowInspected){
        gameState.windowInspected = true;
        writeText("There are candles next to the window and 3 drawings on the window: 2 squares and 1 circle. Wonder what you can do with them.")
        document.querySelectorAll(".windowHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else {
        writeText("There are 3 drawings on the window: 2 squares and 1 circle.")
    }
}

function lightCandles(button){
    if(gameState.matchboxPickedup == true){
    writeText("Soot marks appear on the window saying: '19:30' ");
    button.disabled = true;
    }
    else{
        writeText("You don't have anything to light the candles with.")
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
        clearPuzzleArea();
        
        document.querySelectorAll(".clockHidden2")
            .forEach(btn => btn.style.display = "block");

         document.querySelectorAll(".clockHidden")
            .forEach(btn => btn.style.display = "none");
    } else {
        writeText("Nothing happens. Maybe the time is wrong.");
    }
}

function keyRoom2(button){
    addToInventory("Dining Room Key")
    writeText("Picked up Dining Room Key.");
    button.disabled = true;
    gameState.keyRoom2Pickedup = true;
}
// Dining room door
function inspectDoor2(){
    if(!gameState.inspectDoorRoom2){
        gameState.inspectDoorRoom2 = true;
        writeText("Door is locked, you need a key to unlock it.");
        document.querySelectorAll(".room2Hidden")
            .forEach(btn => btn.style.display = "block");
    }
    if(gameState.unlockedRoom2 == true){
        writeText("The door is unlocked.");
    }
    else{
        writeText("Door is locked.");
    }
}

function unlockRoom2(button){
    if(gameState.keyRoom2Pickedup == true){
        writeText("Door has been unlocked.")
        button.disabled = true;
        gameState.unlockedRoom2 = true;
        document.querySelectorAll(".room2Hidden2    ")
            .forEach(btn => btn.style.display = "block");
    }
    else{
        writeText("You don't have a key to unlock this door.")
    }
}
function enterRoom2(){
    window.location.href = "Room2.html";
}

// Ulaz u prvu sobu
function enterRoom1(){
    window.location.href = "Room1.html";
}


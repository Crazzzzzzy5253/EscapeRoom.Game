// Menu Board
let menuPuzzleButton = null;
function inspectMenu(){
    if(!gameState.menuInspected){
        gameState.menuInspected = true;
        writeText("Menu shows: Soup 10$, Stew 13$, Bread 3$, Wine 20$. There is something on the back aswell.");
        document.querySelectorAll(".menuHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else{
        writeText("Menu shows: Soup 10$, Stew 13$, Bread 3$, Wine 20$. Checking the backside could be helpfull.");
    }
}
function inspectMenu2(){
    writeText('There are 2 sequences on it: <br> ■ ■ ● ★ ■ ♥ ♥ ■ <br> Red-Green-Purple-White-Blue-Black');
}

function showMenuPuzzle(button) {
    menuPuzzleButton = button;
    clearPuzzleArea();

    document.getElementById("puzzleArea").innerHTML = `
        <h3>Menu Board</h3>
        <p>Click the items in the correct order.</p>

        <button onclick="menuClick('bread')">Bread ($3)</button>
        <button onclick="menuClick('wine')">Wine ($20)</button>
        <button onclick="menuClick('stew')">Stew ($13)</button>
        <button onclick="menuClick('soup')">Soup ($10)</button>
    `;
}
let menuSequence = [];
const correctMenuOrder = ["bread", "soup", "stew", "wine"];

function menuClick(item) {
    menuSequence.push(item);

    if (item !== correctMenuOrder[menuSequence.length - 1]) {
        writeText("That order seems wrong. Try again.");
        menuSequence = [];
        return;
    }

    if (menuSequence.length === correctMenuOrder.length) {
        solveMenuPuzzle();
    }
}

function solveMenuPuzzle() {
    writeText(
        'You hear the cabinet unlock. Inside is a bottle opener and a purple <span style="color:purple;font-weight:bold;">8</span>.'
    );
    gameState.menuSolved = true;
    document.querySelectorAll(".cabinetHidden2")
            .forEach(btn => btn.style.display = "block");
    if (menuPuzzleButton) {
        menuPuzzleButton.style.display = "none";
    }

    clearPuzzleArea();
    saveGame();
}

//Cabinet
function inspectCabinet(){
    if(!gameState.cabinetInspected){
        gameState.cabinetInspected = true;
        writeText("You see a note on the cabinet. Cabinet is locked, maybe there is a way to unlock it?");
        document.querySelectorAll(".cabinetHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else if(gameState.menuSolved == true){
        writeText('Cabinet is unlocked. Inside is a purple <span style="color:purple;font-weight:bold;">8</span>');
    }
    else{
        writeText("Cabinet is locked");
    }
}
function inspectNoteCabinet(){
    writeText("The cheapest always went first.");
}

//Fireplace
let fireplaceSequence = [];
const correctFireplaceOrder = ["square", "square", "circle", "star", "square", "hearth", "hearth", "square"];

function inspectFireplace() {
    if (!gameState.fireplaceInspected) {
        gameState.fireplaceInspected = true;
        writeText("Fireplace stones have strange symbols. Maybe there's a sequence to press.");
        document.querySelectorAll(".fireplaceHidden").
            forEach(btn => btn.style.display = "block");
    } else if (!gameState.fireplaceSolved) {
        writeText("The fireplace has buttons with symbols: ■ ■ ● ★ ■ ♥ ♥ ■");
    } else {
        writeText("The hidden compartment in the fireplace is open.");
    }
}

function inspectFireplaceButtons() {
    showFireplacePuzzle();
}

function showFireplacePuzzle() {
    clearPuzzleArea();
    document.getElementById("puzzleArea").innerHTML = `
        <h3>Fireplace Symbols</h3>
        <p>Click the symbols in the correct order to unlock the hidden compartment.</p>
        <button onclick="fireplaceClick('square')">■ Square</button>
        <button onclick="fireplaceClick('circle')">● Circle</button>
        <button onclick="fireplaceClick('star')">★ Star</button>
        <button onclick="fireplaceClick('hearth')">♥ Hearth</button>
    `;
}

function fireplaceClick(symbol) {
    fireplaceSequence.push(symbol);

    if (symbol !== correctFireplaceOrder[fireplaceSequence.length - 1]) {
        writeText("Wrong order! Try again.");
        fireplaceSequence = [];
        return;
    }

    if (fireplaceSequence.length === correctFireplaceOrder.length) {
        solveFireplacePuzzle();
    }
}

function solveFireplacePuzzle() {
    writeText("You hear a click! The hidden compartment opens. Inside is a kitchen key and a note: 'Count what's missing.'");
    gameState.fireplaceSolved = true;
    document.querySelectorAll(".fireplaceHidden2").forEach(btn => btn.style.display = "block");
    clearPuzzleArea();
    saveGame();
}

function fireplaceNote() {
    writeText("The note says: 'Count what's missing.'");
}

function kitchenKeyPickup(button) {
    gameState.kitchenKeyPickedUp = true;
    writeText("Picked up the Kitchen Key.");
    addToInventory("Kitchen Key");
    button.disabled = true;
    saveGame();
}

//Dining table
function inspectTable(){
    if(!gameState.tableInspected){
        gameState.tableInspected = true;
        writeText("Table is set for 5, only 3 white plates remain. Some are missing.");
    }
    else{
        writeText("Table is missing 2 white plates.");
    }
}

//Kitchen
function inspectKitchenDoor(){
     if (gameState.kitchenDoorUnlocked == true) {
        writeText("The kitchen door is already unlocked.");
        showKitchenButtons(); // make sure buttons are visible
        return;
    }
    if(!gameState.kitchenDoorInspected){
        gameState.kitchenDoorInspected = true;
        writeText("Kitchen door is locked");
        document.querySelectorAll(".kitchenHidden")
            .forEach(btn => btn.style.display = "block");
    }
    else{
        writeText("Kitchen door is locked, you don't have a key to unlock it.");
    }
}

function unlockKitchen(button){
    if(gameState.kitchenKeyPickedUp == true){
        writeText("You unlocked Kitchen Door.");
        button.disabled = true;
        gameState.kitchenDoorUnlocked = true;
        document.querySelectorAll(".kitchenHidden2")
            .forEach(btn => btn.style.display = "block");
            saveGame();
    }
    else{
        writeText("You don't have a key to unlock this door.");
    }
}
function enterRoom3(){
    saveGame();
    window.location.href = "Room3.html";
}
//Guest room
function enterRoom1(){
    saveGame();
    window.location.href = "Room1.html";
}

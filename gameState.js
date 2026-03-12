
const savedGameState = localStorage.getItem("gameState");
const savedInventory = localStorage.getItem("inventory");

const gameState = savedGameState ? JSON.parse(savedGameState) : {
    suitcaseOpened: false,
    bedInspected: false,
    nightstandInspected: false,
    smallKey: false,
    nightstandUnlocked: false,
    matchboxPickedUp: false,
    windowInspected: false,
    clockInspected: false,
    clockUnlocked: false,
    keyRoom2Pickedup: false,
    inspectDoorRoom2: false,
    unlockedRoom2: false,
    tableInspected: false,
    cabinetInspected: false,
    fireplaceInspected: false,
    menuInspected: false,
    kitchenDoorInspected: false,
    menuSolved: false,
    bottleOpenerPickup: false,
    fireplaceSolved: false,
    kitchenKeyPickedUp: false,
    sinkInspected: false,
    pantryInspected: false,
    pantrySolved: false,
    kitchenDoorUnlocked: false,
};

const inventory = savedInventory ? JSON.parse(savedInventory) : [];

function saveGame() {
    localStorage.setItem("gameState", JSON.stringify(gameState));
    localStorage.setItem("inventory", JSON.stringify(inventory));
}

function resetUIToDefault() {
    document.querySelectorAll("button").forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = "";
        btn.style.cursor = "";
    });

    document.querySelectorAll(`
        .bedHidden, .nightstandHidden, .nightstandHidden2,
        .suitcaseHidden, .clockHidden, .clockHidden2,
        .room2Hidden, .room2Hidden2,
        .menuHidden, .cabinetHidden, .cabinetHidden2,
        .fireplaceHidden, .fireplaceHidden2,
        .kitchenHidden, .kitchenHidden2,
        .pantryHidden, .exitHidden, .exitHidden2,
        .windowHidden, .sinkHidden, .fridgeHidden
    `).forEach(el => el.style.display = "none");

    const puzzle = document.getElementById("puzzleArea");
    if (puzzle) puzzle.innerHTML = "";

    const log = document.getElementById("textLog");
    if (log) log.innerHTML = "";
}

function resetGame() {
    
    localStorage.removeItem("gameState");
    localStorage.removeItem("inventory");
    localStorage.removeItem("textLog");
    localStorage.removeItem("hintLevel");
    window.location.href = "index.html"; 
}

function startGame(){
    window.location.href = "Room1.html";
}



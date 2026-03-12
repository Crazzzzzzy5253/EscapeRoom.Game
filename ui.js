
const headers = document.querySelectorAll('.naslovObjekta');

headers.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;

        document.querySelectorAll('.sadrzajObjekta')
            .forEach(p => p !== content && (p.style.display = 'none'));

        document.querySelectorAll('.naslovObjekta')
            .forEach(h => h !== header && h.classList.remove('otvoreno'));

        content.style.display =
            content.style.display === 'block' ? 'none' : 'block';

        header.classList.toggle('otvoreno');
    });
});

function writeText(message) {
    const log = document.getElementById("textLog");
    log.innerHTML += `<p>${message}</p>`;
    log.scrollTop = log.scrollHeight;
    localStorage.setItem("textLog", log.innerHTML);
}

function clearPuzzleArea() {
    document.getElementById("puzzleArea").innerHTML = "";
}

function addToInventory(item) {
    if (!inventory.includes(item)) {
        inventory.push(item);
        updateInventoryUI();
        saveGame();
    }
}

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

function restoreTextLog() {
    const savedTextLog = localStorage.getItem("textLog");
    if (savedTextLog) {
        const log = document.getElementById("textLog");
        log.innerHTML = savedTextLog;
        log.scrollTop = log.scrollHeight;
    }
}

function restoreRoomUI() {
    
    if (gameState.bedInspected) {
        document.querySelectorAll(".bedHidden").forEach(btn => btn.style.display = "block");
    }

    
    if (gameState.nightstandInspected) {
        document.querySelectorAll(".nightstandHidden").forEach(btn => btn.style.display = "block");
    }
    if (gameState.nightstandUnlocked) {
        document.querySelectorAll(".nightstandHidden2").forEach(btn => btn.style.display = "block");
    }

   
    if (gameState.suitcaseOpened) {
        document.querySelectorAll(".suitcaseHidden").forEach(btn => btn.style.display = "block");
    }

    
    if (gameState.clockUnlocked) {
        document.querySelectorAll(".clockHidden2").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".clockHidden").forEach(btn => btn.style.display = "none");
    } else if (gameState.clockInspected) {
        document.querySelectorAll(".clockHidden").forEach(btn => btn.style.display = "block");
    }

    
    if (gameState.keyRoom2Pickedup) {
        document.querySelectorAll(".room2Hidden2").forEach(btn => btn.style.display = "block");
    }

    
    if (gameState.menuSolved) {
        document.querySelectorAll(".cabinetHidden2").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".menuHidden").forEach(btn => btn.style.display = "none");
    }

   
    if (gameState.fireplaceSolved) {
        document.querySelectorAll(".fireplaceHidden2").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".fireplaceHidden").forEach(btn => btn.style.display = "none");
    }

   
    if (gameState.kitchenKeyPickedUp) {
        const btn = document.querySelector("button[onclick='kitchenKeyPickup(this)']");
        if (btn) btn.disabled = true;
    }
    if(gameState.kitchenDoorUnlocked){
        document.querySelectorAll(".kitchenHidden2").forEach(btn => btn.style.display = "block");
        document.querySelectorAll(".kitchenHidden").forEach(btn => btn.style.display = "none");
    }
  
    if (gameState.pantrySolved) {
        const btn = document.querySelector("button[onclick='pantrySacks()']");
        if (btn) {
            btn.disabled = true;
            btn.style.opacity = 0.5;
            btn.style.cursor = "not-allowed";
        }
    }
    
    if (gameState.sinkInspected) {
    document.querySelectorAll(".sinkHidden").forEach(btn => btn.style.display = "block");
}

   
    if (gameState.matchboxPickedUp) {
        const btn = document.querySelector("button[onclick='pickupMatchbox(this)']");
        if (btn) btn.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    resetUIToDefault();  
    updateInventoryUI();  
    restoreTextLog();     
    restoreRoomUI();  
    hintLevel = parseInt(localStorage.getItem("hintLevel")) || 0;    
});

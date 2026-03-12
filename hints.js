let hintLevel = 0;

function showHint() {
    hintLevel++;

    const hint = getHintForCurrentProgress();

    writeText("<em>Hint:</em> " + hint);
    localStorage.setItem("hintLevel", hintLevel);
}

function getHintForCurrentProgress() {

    /* ROOM 1*/

    if (!gameState.suitcaseOpened) {
        if (hintLevel === 1) return "Some objects in the room have numbers hidden in colors.";
        if (hintLevel === 2) return "The window drawings match the shapes on the suitcase lock.";
        return "Candles, notes, and colored numbers help form the suitcase code.";
    }

    if (!gameState.nightstandUnlocked) {
        if (hintLevel === 1) return "You found a key earlier. Maybe it fits somewhere nearby.";
        return "Try using the Small Key on the locked drawer.";
    }

    if (!gameState.clockUnlocked) {
        if (hintLevel === 1) return "Fire and light sometimes reveal hidden things.";
        if (hintLevel === 2) return "The candles near the window reveal a time.";
        return "Set the clock to the time revealed in soot.";
    }

    if (!gameState.unlockedRoom2) {
        if (hintLevel === 1) return "A key fell out of something mechanical.";
        return "Use the Dining Room Key on the Dining Room door.";
    }

    /* ROOM 2*/

    if (!gameState.menuSolved) {
        if (hintLevel === 1) return "The cabinet note talks about price order.";
        return "Click menu items from cheapest to most expensive.";
    }

    if (!gameState.fireplaceSolved) {
        if (hintLevel === 1) return "Symbols appear in more than one place.";
        return "Repeat the symbol sequence you saw earlier.";
    }

    if (!gameState.kitchenKeyPickedUp) {
        return "The fireplace opened something important.";
    }

    if (!gameState.kitchenDoorInspected || !document.querySelector(".kitchenHidden2")) {
        return "You now have a key that opens another room.";
    }

    /* ROOM 3*/

    if (!gameState.pantrySolved) {
        if (hintLevel === 1) return "Weight matters in storage.";
        return "Arrange sacks from heaviest to lightest using the notes.";
    }

    /* FINAL DOOR */

    return "Combine all colored numbers you've discovered throughout the game.";
}

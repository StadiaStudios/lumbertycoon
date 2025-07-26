// cheatCodes.js

// Define the cheat money amount
const CHEAT_MONEY_AMOUNT = 10000;

// Define the new cheat code for resetting progress
const DEBUG_RESET_CHEAT_CODE = "debugresetprogress";
const DEBUG_RESET_PROGRESS_CODE = "debugresetprog"; // New cheat code for resetting progress

// Mobile Swipe Cheat Code variables
let startX = 0;
let startY = 0;
let downSwipes = 0;
let rightSwipes = 0;
const swipeThreshold = 50; // Minimum distance for a swipe to register
const swipeTimeout = 1500; // Max time between swipes in a sequence (1.5 seconds - increased for leniency)
let lastSwipeTime = 0;

// Keyboard Cheat Code variables
const KEYBOARD_CHEAT_CODE = "makemearichman";
let keyboardCheatSequence = "";

// References to game functions passed from the main script
let _showMessage;
let _updateCurrencyDisplay;
let _saveGame;
let _resetGameProgress;
let _showConfirmationModal;
let _moneyCountRef; // Reference to the moneyCount variable

/**
 * Resets the state of the mobile swipe cheat.
 */
const resetSwipeCheat = () => {
    downSwipes = 0;
    rightSwipes = 0;
    lastSwipeTime = 0;
    console.log("Swipe cheat sequence reset.");
};

/**
 * Handles the touch start event for mobile swipe cheat detection.
 * @param {TouchEvent} e - The touch event object.
 */
const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        // Reset if too much time has passed since the last swipe
        if (Date.now() - lastSwipeTime > swipeTimeout) {
            resetSwipeCheat();
        }
        console.log(`Touch start: (${startX}, ${startY})`);
    }
};

/**
 * Handles the touch end event for mobile swipe cheat detection.
 * @param {TouchEvent} e - The touch event object.
 */
const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;

        const diffX = endX - startX;
        const diffY = endY - startY;

        let swipeDetected = false;

        // Check for down swipe
        if (diffY > swipeThreshold && Math.abs(diffX) < swipeThreshold) {
            downSwipes++;
            rightSwipes = 0; // Reset right swipes if a down swipe occurs
            lastSwipeTime = Date.now();
            swipeDetected = true;
            console.log(`Down swipe detected. Down swipes: ${downSwipes}`);
        }
        // Check for right swipe
        else if (diffX > swipeThreshold && Math.abs(diffY) < swipeThreshold) {
            // Only increment right swipes if we have at least one down swipe
            if (downSwipes > 0) {
                rightSwipes++;
                lastSwipeTime = Date.now();
                swipeDetected = true;
                console.log(`Right swipe detected. Right swipes: ${rightSwipes}`);
            } else {
                console.log("Right swipe before any down swipes, resetting.");
                resetSwipeCheat(); // Reset if right swipe comes before down swipes
            }
        }

        if (!swipeDetected) {
            console.log("No valid swipe detected, resetting sequence.");
            resetSwipeCheat(); // Reset if not a clear down or right swipe
        }

        // Check for "makemearichman" cheat code activation via swipe
        // Reduced required swipes to 3 down and 3 right
        if (downSwipes >= 3 && rightSwipes >= 3) {
            // Access moneyCount via the passed reference
            if (_moneyCountRef) {
                _moneyCountRef.value += CHEAT_MONEY_AMOUNT;
            }
            _showMessage(`CHEAT ACTIVATED! +${CHEAT_MONEY_AMOUNT} Money!`, 'success');
            _updateCurrencyDisplay();
            _saveGame();
            resetSwipeCheat(); // Reset after successful activation
            console.log("Swipe cheat activated!");
        }
    }
};

/**
 * Handles the key down event for keyboard cheat code detection.
 * @param {KeyboardEvent} e - The keyboard event object.
 */
const handleKeyDown = (e) => {
    const key = e.key.toLowerCase();

    // Only consider alphanumeric characters for the cheat code sequences
    if (key.match(/^[a-zA-Z0-9]$/)) {
        keyboardCheatSequence += key;
    } else {
        // Reset sequence if a non-alphanumeric key is pressed
        keyboardCheatSequence = "";
    }

    // Keep the sequence length limited to the longest cheat code length
    const maxLength = Math.max(KEYBOARD_CHEAT_CODE.length, DEBUG_RESET_CHEAT_CODE.length, DEBUG_RESET_PROGRESS_CODE.length); // Updated maxLength
    if (keyboardCheatSequence.length > maxLength) {
        keyboardCheatSequence = keyboardCheatSequence.substring(keyboardCheatSequence.length - maxLength);
    }

    // Check for "makemearichman" cheat code
    if (keyboardCheatSequence.endsWith(KEYBOARD_CHEAT_CODE)) {
        if (_moneyCountRef) {
            _moneyCountRef.value += CHEAT_MONEY_AMOUNT;
        }
        _showMessage(`CHEAT ACTIVATED! +${CHEAT_MONEY_AMOUNT} Money!`, 'success');
        _updateCurrencyDisplay();
        _saveGame();
        keyboardCheatSequence = ""; // Reset after successful activation
    }
    // Check for "debugresetprogress" cheat code
    else if (keyboardCheatSequence.endsWith(DEBUG_RESET_CHEAT_CODE)) {
        _showConfirmationModal(
            "Are you sure you want to reset all game progress? This cannot be undone!",
            () => {
                _resetGameProgress();
            }
        );
        keyboardCheatSequence = ""; // Reset after activation attempt (whether confirmed or not)
    }
    // New: Check for "debugresetprog" cheat code
    else if (keyboardCheatSequence.endsWith(DEBUG_RESET_PROGRESS_CODE)) {
        _showConfirmationModal(
            "Are you sure you want to reset ALL game progress? This will revert everything to default!",
            () => {
                _resetGameProgress();
            }
        );
        keyboardCheatSequence = ""; // Reset after activation attempt (whether confirmed or not)
    }
};

/**
 * Initializes cheat code event listeners and provides necessary game functions.
 * This function should be called after the main game variables and functions
 * are defined and ready.
 * @param {object} gameFunctions - An object containing references to game functions.
 * @param {object} gameFunctions.moneyCountRef - A mutable reference to the game's moneyCount.
 * @param {function} gameFunctions.showMessage - Function to display in-game messages.
 * @param {function} gameFunctions.updateCurrencyDisplay - Function to update currency UI.
 * @param {function} gameFunctions.saveGame - Function to save game state.
 * @param {function} gameFunctions.resetGameProgress - Function to reset game progress.
 * @param {function} gameFunctions.showConfirmationModal - Function to show a confirmation modal.
 */
export const initCheatCodes = (gameFunctions) => {
    _moneyCountRef = gameFunctions.moneyCountRef;
    _showMessage = gameFunctions.showMessage;
    _updateCurrencyDisplay = gameFunctions.updateCurrencyDisplay;
    _saveGame = gameFunctions.saveGame;
    _resetGameProgress = gameFunctions.resetGameProgress;
    _showConfirmationModal = gameFunctions.showConfirmationModal;

    document.documentElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.documentElement.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    console.log("Cheat codes initialized.");
};

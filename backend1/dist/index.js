// import { getBuiltinModule } from "node:process";
import { Piece, addPiece, board, createBoard, createStock, getBoard, setInteractionLocked } from "./board.js";
createStock();
const checkButton = document.getElementById("check");
const resetButton = document.getElementById("reset");
const startHideButton = document.getElementById("start-hide");
const hintButton = document.getElementById("hint");
const hideSecondsInput = document.getElementById("hide-seconds");
const pieceCountFilterInput = document.getElementById("piece-count-filter");
const timerStatus = document.getElementById("timer-status");
const maxHints = 3;
let hidePiecesTimeout;
let countdownInterval;
let correctboard = new Map();
let hintsRemaining = 0;
let hintsAvailable = false;
board.clear();
setInteractionLocked(false);
createBoard();
updateHintButton();
startHideButton?.addEventListener("click", () => { startHideTimer(); });
checkButton?.addEventListener("click", () => { checkpos(); });
resetButton?.addEventListener("click", () => { resetPos(); });
hintButton?.addEventListener("click", () => { showHint(); });
async function loadRandomPosition() {
    const pieceCountFilter = getPieceCountFilter();
    const response = await fetch(`http://localhost:3000/random-position?pieceCount=${pieceCountFilter}`);
    const position = await response.json();
    board.clear();
    for (const square of position.board) {
        let piece;
        switch (square.type) {
            case "b":
                piece = "bishop";
                break;
            case "n":
                piece = "knight";
                break;
            case "k":
                piece = "king";
                break;
            case "q":
                piece = "queen";
                break;
            case "r":
                piece = "rook";
                break;
            case "p":
                piece = "pawn";
                break;
            default: continue;
        }
        addPiece(square.square, new Piece(square.color, piece));
    }
    correctboard = new Map(getBoard());
    hintsRemaining = maxHints;
    hintsAvailable = false;
    updateHintButton();
    createBoard();
}
function checkpos() {
    clearCorrectHighlights();
    clearHintHighlights();
    let correctPieces = 0;
    for (const [square, correctPiece] of correctboard) {
        const currentPiece = board.get(square);
        if (currentPiece === undefined) {
            continue;
        }
        if (currentPiece.type !== correctPiece.type ||
            currentPiece.color !== correctPiece.color) {
            continue;
        }
        correctPieces++;
        highlightCorrectSquare(square);
    }
    const totalPieces = correctboard.size;
    const scoreMessage = `${correctPieces}/${totalPieces} right`;
    console.log(scoreMessage);
    setTimerStatus(scoreMessage);
    return correctPieces === totalPieces && board.size === totalPieces;
}
function resetPos() {
    clearTimers();
    setInteractionLocked(false);
    hintsAvailable = correctboard.size > 0;
    clearHintHighlights();
    updateHintButton();
    board.clear();
    for (const [square, piece] of correctboard) {
        addPiece(square, new Piece(piece.color, piece.type));
    }
    setTimerStatus("");
    createBoard();
}
async function startHideTimer() {
    const hideSeconds = getHideSeconds();
    clearTimers();
    setInteractionLocked(true);
    hintsAvailable = false;
    updateHintButton();
    clearHintHighlights();
    setTimerStatus("Loading position...");
    try {
        await loadRandomPosition();
    }
    catch (error) {
        console.error(error);
        setInteractionLocked(false);
        setTimerStatus("Could not load a position. Make sure the server is running.");
        return;
    }
    const endTime = Date.now() + hideSeconds * 1000;
    updateCountdown(endTime);
    countdownInterval = window.setInterval(() => {
        updateCountdown(endTime);
    }, 100);
    hidePiecesTimeout = window.setTimeout(() => {
        clearTimers();
        setInteractionLocked(false);
        hintsAvailable = true;
        updateHintButton();
        board.clear();
        createBoard();
        setTimerStatus("Pieces hidden. Rebuild the position from memory.");
    }, hideSeconds * 1000);
}
function getHideSeconds() {
    if (!(hideSecondsInput instanceof HTMLInputElement)) {
        return 5;
    }
    const hideSeconds = Number(hideSecondsInput.value);
    if (!Number.isFinite(hideSeconds) || hideSeconds < 0) {
        hideSecondsInput.value = "5";
        return 5;
    }
    return hideSeconds;
}
function getPieceCountFilter() {
    if (!(pieceCountFilterInput instanceof HTMLSelectElement)) {
        return "10-20";
    }
    return encodeURIComponent(pieceCountFilterInput.value);
}
function setTimerStatus(message) {
    if (timerStatus !== null) {
        timerStatus.textContent = message;
    }
}
function updateCountdown(endTime) {
    const secondsLeft = Math.max(0, (endTime - Date.now()) / 1000);
    const formattedSeconds = formatSeconds(secondsLeft);
    setTimerStatus(`${formattedSeconds} second${formattedSeconds === "1" ? "" : "s"} left`);
}
function formatSeconds(seconds) {
    if (seconds >= 1) {
        return String(Math.ceil(seconds));
    }
    return seconds.toFixed(1);
}
function clearTimers() {
    if (hidePiecesTimeout !== undefined) {
        window.clearTimeout(hidePiecesTimeout);
        hidePiecesTimeout = undefined;
    }
    if (countdownInterval !== undefined) {
        window.clearInterval(countdownInterval);
        countdownInterval = undefined;
    }
}
function clearCorrectHighlights() {
    for (const square of document.querySelectorAll(".correct-square")) {
        square.classList.remove("correct-square");
    }
}
function showHint() {
    clearHintHighlights();
    if (!hintsAvailable || hintsRemaining <= 0) {
        setTimerStatus("No hints left.");
        updateHintButton();
        return;
    }
    const hintSquare = findMissingSquare();
    if (hintSquare === null) {
        setTimerStatus("No missing squares left.");
        return;
    }
    hintsRemaining--;
    highlightHintSquare(hintSquare);
    setTimerStatus(`${hintsRemaining} hint${hintsRemaining === 1 ? "" : "s"} left`);
    updateHintButton();
}
function findMissingSquare() {
    for (const [square, correctPiece] of correctboard) {
        const currentPiece = board.get(square);
        if (currentPiece === undefined ||
            currentPiece.type !== correctPiece.type ||
            currentPiece.color !== correctPiece.color) {
            return square;
        }
    }
    return null;
}
function highlightCorrectSquare(squareName) {
    const square = document.querySelector(`[data-square="${squareName}"]`);
    if (square !== null) {
        square.classList.add("correct-square");
    }
}
function highlightHintSquare(squareName) {
    const square = document.querySelector(`[data-square="${squareName}"]`);
    if (square !== null) {
        square.classList.add("hint-square");
    }
}
function clearHintHighlights() {
    for (const square of document.querySelectorAll(".hint-square")) {
        square.classList.remove("hint-square");
    }
}
function updateHintButton() {
    if (!(hintButton instanceof HTMLButtonElement)) {
        return;
    }
    hintButton.disabled = !hintsAvailable || hintsRemaining <= 0;
    hintButton.textContent = `Hint (${hintsRemaining})`;
}
// console.log(game);
//createBoard();
//# sourceMappingURL=index.js.map
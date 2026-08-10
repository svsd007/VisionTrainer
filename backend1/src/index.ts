// import { getBuiltinModule } from "node:process";
import { Piece, addPiece, board, createBoard, createStock, getBoard, type PieceColor, type PieceType} from "./board.js";


createStock();

const response = await fetch("http://localhost:3000/random-position");
const position = await response.json();



const checkButton = document.getElementById("check");
const resetButton = document.getElementById("reset");

board.clear();



for (const square of position.board) {
    let piece: PieceType;

    switch (square.type) {
        case "b": piece = "bishop"; break;
        case "n": piece = "knight"; break;
        case "k": piece = "king"; break;
        case "q": piece = "queen"; break;
        case "r": piece = "rook"; break;
        case "p": piece = "pawn"; break;
        default: continue;
    }

    addPiece(
        square.square,
        new Piece(square.color, piece)
    );
}





const correctboard = new Map(getBoard());

checkButton?.addEventListener("click", () => {checkpos()});
resetButton?.addEventListener("click", () => {resetPos()});

function checkpos() {
    if (board.size !== correctboard.size) {
        console.log("Not correct");
        return false;
    }

    for (const [square, correctPiece] of correctboard) {
        const currentPiece = board.get(square);

        if (currentPiece === undefined) {
            console.log("Not correct");
            return false;
        }

        if (
            currentPiece.type !== correctPiece.type ||
            currentPiece.color !== correctPiece.color
        ) {
            console.log("Not correct");
            return false;
        }
    }

    console.log("Correct!");
    return true;
}


function resetPos() {

}




createBoard();

// console.log(game);
//createBoard();




import { Piece, addPiece, board, createBoard, type PieceColor, type PieceType} from "./board.js";


const p1: PieceType  = "pawn";
let  p1color: PieceColor = "black";



const pawn1 = new Piece(p1color, p1);

console.log(pawn1);
addPiece("a1", pawn1);


// const body = document.body
// body.append("hello world")

// const div = document.createElement("div")
// body.append(div)

createBoard();







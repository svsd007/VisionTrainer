import { Piece, addPiece, board, createBoard } from "./board.js";
const p1 = "pawn";
let p1color = "black";
const pawn1 = new Piece(p1color, p1);
console.log(pawn1);
addPiece("a1", pawn1);
// const body = document.body
// body.append("hello world")
// const div = document.createElement("div")
// body.append(div)
createBoard();
//# sourceMappingURL=index.js.map
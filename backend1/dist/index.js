import { Piece, addPiece, board, createBoard } from "./board.js";
const p1 = "pawn";
let p1color = "w";
let p2color = "b";
const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
for (const file of files) {
    const pawn = new Piece(p2color, p1);
    addPiece(file + 7, pawn);
}
const blacking = new Piece(p2color, "king");
const blackqueen = new Piece(p2color, "queen");
addPiece("e8", blacking);
addPiece("d8", blackqueen);
addPiece("b8", new Piece(p2color, "knight"));
addPiece("g8", new Piece(p2color, "knight"));
addPiece("c8", new Piece(p2color, "bishop"));
addPiece("f8", new Piece(p2color, "bishop"));
addPiece("a8", new Piece(p2color, "rook"));
addPiece("h8", new Piece(p2color, "rook"));
for (const file of files) {
    const pawn = new Piece(p1color, p1);
    addPiece(file + 2, pawn);
}
const king = new Piece(p1color, "king");
const queen = new Piece(p1color, "queen");
addPiece("e1", king);
addPiece("d1", queen);
addPiece("b1", new Piece(p1color, "knight"));
addPiece("g1", new Piece(p1color, "knight"));
addPiece("c1", new Piece(p1color, "bishop"));
addPiece("f1", new Piece(p1color, "bishop"));
addPiece("a1", new Piece(p1color, "rook"));
addPiece("h1", new Piece(p1color, "rook"));
// ^ Default board
const body = document.body;
body.append("hello world");
const div = document.createElement("div");
body.append(div);
createBoard();
//# sourceMappingURL=index.js.map
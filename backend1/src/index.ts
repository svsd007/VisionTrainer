import { Piece, board, type PieceColor, type PieceType} from "./board.js";


const p1: PieceType  = "pawn";
let  p1color: PieceColor = "black";



const pawn1 = new Piece(p1color, p1);

console.log(pawn1);
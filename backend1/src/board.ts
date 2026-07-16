

export type PieceColor = "white" | "black"
export type PieceType = 
    | "pawn"
    | "rook"
    | "bishop"
    | "knight"
    | "king"
    | "queen";


export class Piece {
    color: PieceColor;
    type: PieceType;

    constructor(color: PieceColor, type: PieceType) {
        this.color = color
        this.type = type
    }


}


export const board = new Map<string, Piece>();

export function addPiece(square: string, piece: Piece){
    board.set(square, piece)
}

export function removePiece(square: string){
    board.delete(square)
}

export function getPiece(square: string){
    return board.get(square)
}
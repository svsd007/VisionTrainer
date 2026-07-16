export class Piece {
    color;
    type;
    constructor(color, type) {
        this.color = color;
        this.type = type;
    }
}
export const board = new Map();
export function addPiece(square, piece) {
    board.set(square, piece);
}
export function removePiece(square) {
    board.delete(square);
}
export function getPiece(square) {
    return board.get(square);
}
//# sourceMappingURL=board.js.map
export type PieceColor = "white" | "black";
export type PieceType = "pawn" | "rook" | "bishop" | "knight" | "king" | "queen";
export declare class Piece {
    color: PieceColor;
    type: PieceType;
    constructor(color: PieceColor, type: PieceType);
}
export declare const board: Map<string, Piece>;
//# sourceMappingURL=board.d.ts.map
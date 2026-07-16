export type PieceColor = "white" | "black";
export type PieceType = "pawn" | "rook" | "bishop" | "knight" | "king" | "queen";
export declare class Piece {
    color: PieceColor;
    type: PieceType;
    constructor(color: PieceColor, type: PieceType);
}
export declare const board: Map<string, Piece>;
export declare function addPiece(square: string, piece: Piece): void;
export declare function removePiece(square: string): void;
export declare function getPiece(square: string): Piece | undefined;
export declare function createBoard(): void;
//# sourceMappingURL=board.d.ts.map
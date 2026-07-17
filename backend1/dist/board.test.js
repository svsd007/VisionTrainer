import { describe, test, expect, beforeEach } from "vitest";
import { Piece, board, addPiece, removePiece, getPiece } from "../src/board.js";
beforeEach(() => {
    board.clear;
});
describe("Piece", () => {
    test("creates a white queen", () => {
        const queen = new Piece("w", "queen");
        expect(queen.color).toBe("w");
        expect(queen.type).toBe("queen");
    });
    describe("Board", () => {
        test("creates a board", () => {
            const queen1 = new Piece("w", "queen");
            expect(board.size).toBe(0);
            addPiece("d1", queen1);
            expect(board.size).toBe(1);
            const newPiece = getPiece("d1");
            expect(newPiece).toBe(queen1);
            removePiece("d1");
            expect(board.size).toBe(0);
        });
    });
});
//# sourceMappingURL=board.test.js.map
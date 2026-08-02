export type PieceColor = "w" | "b"
export type PieceType = 
    | "pawn"
    | "rook"
    | "bishop"
    | "knight"
    | "king"
    | "queen";



// Piece class for creating board
export class Piece {
    color: PieceColor;
    type: PieceType;

    constructor(color: PieceColor, type: PieceType) {
        this.color = color
        this.type = type
    }


}


//  This board is different from chess.js.board
export const board = new Map<string, Piece>();

export function addPiece(square: string, piece: Piece){
    board.set(square, piece)
}

export function removePiece(square: string){
    board.delete(square)
}



export function getPiece(square: string){

        return board.get(square) ;

}



const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]

let draggedFrom: string | null = null;



// REQUIRES: nothing
// MODIFIES: index.html
// EFFECTS: Creates a board with DOM manipulation. For each square on a board, it checks whether
// a piece exists in the board hashamp and displays the piece on the board if it exsits. 
export function createBoard() {
    const htmlboard = document.getElementById("board");

    if (htmlboard === null) {
        return;
    }

    htmlboard.innerHTML = "";

    for (let i: number = 8; i > 0 ; i--) {
        
        for (const file of files) {
            const squareName: string = file + i;
            const piece = getPiece(squareName);
            let square_color: string = "black";

            // Logic: get letter position, ie A-> 1, B -> 2
            // if letterposition + row is even then the square is black else is white
            const letterposition = file.charCodeAt(0) - 96;
            if ((letterposition + i) % 2 === 0) {
                square_color = "black";


            }  else {
                square_color = "white";

                
            }

            const square = document.createElement("div");
            square.classList.add(square_color + "-square");
            square.dataset.square = squareName;

            square.addEventListener("dragover", (event) => {
                event.preventDefault();
                square.classList.add("drop-target");
            });

            square.addEventListener("dragleave", () => {
                square.classList.remove("drop-target");
            });

            square.addEventListener("drop", (event) => {
                event.preventDefault();
                square.classList.remove("drop-target");

                if (draggedFrom === null || draggedFrom === squareName) {
                    draggedFrom = null;
                    return;
                }

                const draggedPiece = getPiece(draggedFrom);

                if (draggedPiece === undefined) {
                    draggedFrom = null;
                    return;
                }

                addPiece(squareName, draggedPiece);
                removePiece(draggedFrom);
                draggedFrom = null;
                createBoard();
            });

            if (piece !== undefined) {
                const selectedPieceType: string = piece.type;
                const selectedPiece = document.createElement("img");
                selectedPiece.classList.add("piece");
                selectedPiece.draggable = true;

                selectedPiece.addEventListener("dragstart", () => {
                    draggedFrom = squareName;
                    selectedPiece.classList.add("dragging");
                });

                selectedPiece.addEventListener("dragend", () => {
                    draggedFrom = null;
                    selectedPiece.classList.remove("dragging");
                });

                selectedPiece.src = `../backend1/assets/pieces-basic-svg/${selectedPieceType}-${piece.color}.svg`;
                square.append(selectedPiece);
            }

            htmlboard.append(square);
        }
    }
}
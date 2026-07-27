

export type PieceColor = "w" | "b"
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

        return board.get(square) ;

}



const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]

export function createBoard() {
    const htmlboard = document.getElementById("board");

    for (let i: number = 8; i > 0 ; i--) {
        
        for (const file of files) {
            const piece = getPiece(file + i);
            let square_color: string = "black";

            // Logic: get letter position, ie A-> 1, B -> 2
            // if letterposition + row is even then the square is black else is white
            const letterposition = file.charCodeAt(0) - 96;
            if ((letterposition + i) % 2 === 0) {
                square_color = "black";


            }  else {
                square_color = "white";

                
            }

            if (piece === undefined) {
                const square = document.createElement("div")
                square.classList.add(square_color + "-square");
                htmlboard?.append(square)
                
                
            } else {
                const square = document.createElement("div")
                square.classList.add(square_color + "-square");
                

                const selectedPieceType: string = piece?.type;
                const selectedPiece = document.createElement("img");
                selectedPiece.classList.add("piece");
                
                selectedPiece.src = `../backend1/assets/pieces-basic-svg/${selectedPieceType}-${piece.color}.svg`;
                square.append(selectedPiece);
                htmlboard?.append(square);
                
            }

            

        }
    }
}
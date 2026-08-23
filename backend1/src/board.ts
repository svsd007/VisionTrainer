export type PieceColor = "w" | "b";

export type PieceType =
    | "pawn"
    | "rook"
    | "bishop"
    | "knight"
    | "king"
    | "queen";


// --------------------
// PIECE
// --------------------

export class Piece {
    color: PieceColor;
    type: PieceType;

    constructor(color: PieceColor, type: PieceType) {
        this.color = color;
        this.type = type;
    }
}


// --------------------
// BOARD DATA
// --------------------

export const board = new Map<string, Piece>();

export function addPiece(square: string, piece: Piece) {
    board.set(square, piece);
}

export function removePiece(square: string) {
    board.delete(square);
}

export function getPiece(square: string) {
    return board.get(square);
}

export function getBoard() {
    return board;
}


// --------------------
// DRAG STATE
// --------------------

let draggedFrom: string | null = null;

// Used when dragging a piece from the stock
let draggedStockPiece: Piece | null = null;

let interactionLocked = false;

export function setInteractionLocked(locked: boolean) {
    interactionLocked = locked;

    for (const piece of document.querySelectorAll<HTMLImageElement>(".piece")) {
        piece.draggable = !interactionLocked;
        piece.classList.toggle("locked-piece", interactionLocked);
    }
}


// --------------------
// BOARD
// --------------------

const files: string[] = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
];

export function createBoard() {
    const htmlboard = document.getElementById("board");

    if (htmlboard === null) {
        return;
    }

    htmlboard.innerHTML = "";

    for (let rank = 8; rank > 0; rank--) {
        for (const file of files) {
            const squareName = file + rank;

            const piece = getPiece(squareName);

            const letterPosition = file.charCodeAt(0) - 96;

            let squareColor: string;

            if ((letterPosition + rank) % 2 === 0) {
                squareColor = "black";
            } else {
                squareColor = "white";
            }

            const square = document.createElement("div");

            square.classList.add("board-square", squareColor + "-square");
            square.dataset.square = squareName;


            // --------------------
            // ALLOW DROP
            // --------------------

            square.addEventListener("dragover", (event) => {
                if (interactionLocked) {
                    return;
                }

                event.preventDefault();

                square.classList.add("drop-target");
            });


            square.addEventListener("dragleave", () => {
                square.classList.remove("drop-target");
            });


            // --------------------
            // DROP
            // --------------------

            square.addEventListener("drop", (event) => {
                if (interactionLocked) {
                    return;
                }

                event.preventDefault();

                square.classList.remove("drop-target");


                // --------------------
                // CASE 1:
                // Piece came from stock
                // --------------------

                if (draggedStockPiece !== null) {
                    addPiece(
                        squareName,
                        new Piece(
                            draggedStockPiece.color,
                            draggedStockPiece.type
                        )
                    );

                    draggedStockPiece = null;
                    draggedFrom = null;

                    createBoard();

                    return;
                }


                // --------------------
                // CASE 2:
                // Piece came from board
                // --------------------

                if (
                    draggedFrom === null ||
                    draggedFrom === squareName
                ) {
                    draggedFrom = null;

                    return;
                }


                const draggedPiece = getPiece(draggedFrom);


                if (draggedPiece === undefined) {
                    draggedFrom = null;

                    return;
                }


                // Put piece on new square
                addPiece(squareName, draggedPiece);

                // Remove from old square
                removePiece(draggedFrom);


                draggedFrom = null;

                createBoard();
            });


            // --------------------
            // DISPLAY PIECE
            // --------------------

            if (piece !== undefined) {
                const selectedPiece =
                    document.createElement("img");

                selectedPiece.classList.add("piece");
                selectedPiece.classList.toggle("locked-piece", interactionLocked);

                selectedPiece.draggable = !interactionLocked;


                selectedPiece.src =
                    `../backend1/assets/pieces-basic-svg/` +
                    `${piece.type}-${piece.color}.svg`;


                // --------------------
                // DRAG PIECE FROM BOARD
                // --------------------

                selectedPiece.addEventListener(
                    "dragstart",
                    (event) => {
                        if (interactionLocked) {
                            event.preventDefault();
                            return;
                        }

                        draggedFrom = squareName;

                        // We know we're not dragging from stock
                        draggedStockPiece = null;

                        selectedPiece.classList.add(
                            "dragging"
                        );
                    }
                );


                selectedPiece.addEventListener(
                    "dragend",
                    (event) => {
                        if (interactionLocked) {
                            return;
                        }

                        if (
                            draggedFrom !== null &&
                            isOutsideBoard(event.clientX, event.clientY)
                        ) {
                            removePiece(draggedFrom);
                            createBoard();
                        }

                        draggedFrom = null;

                        selectedPiece.classList.remove(
                            "dragging"
                        );
                    }
                );


                square.append(selectedPiece);
            }


            htmlboard.append(square);
        }
    }
}


// --------------------
// PIECE STOCK
// --------------------

export function createStock() {
    const stock = document.getElementById("stock");

    if (stock === null) {
        return;
    }

    stock.innerHTML = "";


    const pieceTypes: PieceType[] = [
        "pawn",
        "knight",
        "bishop",
        "rook",
        "queen",
        "king",
    ];


    // --------------------
    // WHITE PIECES
    // --------------------

    for (const pieceType of pieceTypes) {
        createStockPiece(
            stock,
            pieceType,
            "w"
        );
    }


    // --------------------
    // BLACK PIECES
    // --------------------

    for (const pieceType of pieceTypes) {
        createStockPiece(
            stock,
            pieceType,
            "b"
        );
    }
}


// --------------------
// CREATE ONE STOCK PIECE
// --------------------

function createStockPiece(
    stock: HTMLElement,
    pieceType: PieceType,
    color: PieceColor
) {
    const square = document.createElement("div");

    square.classList.add("stock-square");


    const image = document.createElement("img");

    image.classList.add("piece");
    image.classList.toggle("locked-piece", interactionLocked);

    image.draggable = !interactionLocked;


    image.src =
        `../backend1/assets/pieces-basic-svg/` +
        `${pieceType}-${color}.svg`;


    // --------------------
    // DRAG FROM STOCK
    // --------------------

    image.addEventListener("dragstart", (event) => {
        if (interactionLocked) {
            event.preventDefault();
            return;
        }

        draggedStockPiece =
            new Piece(color, pieceType);

        // Not coming from a board square
        draggedFrom = null;

        image.classList.add("dragging");
    });


    image.addEventListener("dragend", () => {
        draggedStockPiece = null;

        image.classList.remove("dragging");
    });


    square.append(image);

    stock.append(square);
}

function isOutsideBoard(clientX: number, clientY: number) {
    const htmlboard = document.getElementById("board");

    if (htmlboard === null) {
        return false;
    }

    const boardBounds = htmlboard.getBoundingClientRect();

    return (
        clientX < boardBounds.left ||
        clientX > boardBounds.right ||
        clientY < boardBounds.top ||
        clientY > boardBounds.bottom
    );
}

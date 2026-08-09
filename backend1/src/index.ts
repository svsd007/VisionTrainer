import { Piece, addPiece, board, createBoard, jsontoboard, type PieceColor, type PieceType} from "./board.js";
//import fs from "fs";
//import readline from "readline";
// import { json } from "stream/consumers";
// import { compileFunction } from "vm";
// const p1: PieceType  = "pawn";
// let  p1color: PieceColor = "w";
// let  p2color: PieceColor = "b";
// const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]


// for (const file of files) {
//             const pawn = new Piece(p2color, p1);    
//             addPiece(file + 7, pawn)
// }

// const blacking = new Piece(p2color, "king");    
// const blackqueen = new Piece(p2color, "queen");    

// addPiece("e8", blacking);
// addPiece("d8", blackqueen);
// addPiece("b8", new Piece(p2color, "knight"));
// addPiece("g8", new Piece(p2color, "knight"));
// addPiece("c8", new Piece(p2color, "bishop"));
// addPiece("f8", new Piece(p2color, "bishop"));
// addPiece("a8", new Piece(p2color, "rook"));
// addPiece("h8", new Piece(p2color, "rook"));



// for (const file of files) {
//             const pawn = new Piece(p1color, p1);    
//             addPiece(file + 2, pawn)
// }

// const king = new Piece(p1color, "king");    
// const queen = new Piece(p1color, "queen");    

// addPiece("e1", king);
// addPiece("d1", queen);
// addPiece("b1", new Piece(p1color, "knight"));
// addPiece("g1", new Piece(p1color, "knight"));
// addPiece("c1", new Piece(p1color, "bishop"));
// addPiece("f1", new Piece(p1color, "bishop"));
// addPiece("a1", new Piece(p1color, "rook"));
// addPiece("h1", new Piece(p1color, "rook"));


// ^ Default board

// const body = document.body
// body.append("hello world")

// const div = document.createElement("div")
// body.append(div)



// const inputPath = "./data/processed/positions.jsonl";
// const indexPath = "./data/processed/positions.idx";

// const offsetText = fs.readFileSync(indexPath, "utf-8");

// const offsets = offsetText
//     .split("\n")
//     .filter((line) => line !== "")
//     .map(Number);


// const randomIndex = Math.floor(Math.random() * offsets.length);
// const offsetStart = offsets [randomIndex];
// const offsetEnd = offsets [randomIndex + 1];

// if (offsetStart === undefined) {
//     throw new Error("No position offset found");
// }

// if (offsetEnd === undefined) {
//     throw new Error("No position offset found");
// }


// console.log("start = " + offsetStart);
// console.log("end = " + offsetEnd);

// const stream = fs.createReadStream(inputPath, "utf-8");

// const read1 = readline.createInterface({
//     input: stream,
//     crlfDelay: Infinity
// })

// let currentindex = 0;
// //Why do i have to use await?
// let game = "";

// // for await (const line of read1) {

// //     if (offsetStart === currentindex) {
// //         game += line;
// //         break;
// //     } else {
// //         currentindex += Buffer.byteLength(line + "\n", "utf-8");
// //     }

// // }



// const length = offsetEnd - offsetStart;

// const file = await fs.promises.open(inputPath, "r");

// const buffer = Buffer.alloc(length);

// await file.read(
//     buffer,
//     0,
//     length,
//     offsetStart
// );

// await file.close();

// const line = buffer.toString("utf-8").trim();

// console.log(line);


// const position = JSON.parse(line);


// for (const square of position.board) {
//     const Ptype = square.type;
//     let piece: PieceType;
//     switch (true) {
//         case (Ptype === "b"):
//             piece = "bishop";
//             break;
//         case (Ptype == "n"):
//             piece = "knight";
//             break;
//         case (Ptype == "k"):
//             piece = "king";
//             break;
//         case (Ptype == "q"):
//             piece = "queen";
//             break;
//         case (Ptype == "r"):
//             piece = "rook";
//             break;
//         case (Ptype == "p"):
//             piece = "pawn";
//             break;
//     }
//     const thisPiece = new Piece(square.color!, piece!);
//     addPiece(square.square, thisPiece);

    
// }
const response = await fetch("http://localhost:3000/random-position");
const position = await response.json();

board.clear();

for (const square of position.board) {
    let piece: PieceType;

    switch (square.type) {
        case "b": piece = "bishop"; break;
        case "n": piece = "knight"; break;
        case "k": piece = "king"; break;
        case "q": piece = "queen"; break;
        case "r": piece = "rook"; break;
        case "p": piece = "pawn"; break;
        default: continue;
    }

    addPiece(
        square.square,
        new Piece(square.color, piece)
    );
}



createBoard();

// console.log(game);
//createBoard();




import { Piece, addPiece, board, createBoard, type PieceColor, type PieceType} from "./board.js";
import fs from "fs";
import readline from "readline";
import { json } from "stream/consumers";
import { compileFunction } from "vm";


const inputPath = "./data/processed/positions.jsonl";
const indexPath = "./data/processed/positions.idx";

const offsetText = fs.readFileSync(indexPath, "utf-8");

const offsets = offsetText
    .split("\n")
    .filter((line) => line !== "")
    .map(Number);

export async function getPos() {

    board.clear();
    const randomIndex = Math.floor(Math.random() * (offsets.length - 1));
    const offsetStart = offsets [randomIndex];
    const offsetEnd = offsets [randomIndex + 1];

    if (offsetStart === undefined) {
        throw new Error("No position offset found");
    }

    if (offsetEnd === undefined) {
        throw new Error("No position offset found");
    }


    const stream = fs.createReadStream(inputPath, "utf-8");

    const read1 = readline.createInterface({
        input: stream,
        crlfDelay: Infinity
    })

    let currentindex = 0;
    //Why do i have to use await?
    let game = "";

    // for await (const line of read1) {

    //     if (offsetStart === currentindex) {
    //         game += line;
    //         break;
    //     } else {
    //         currentindex += Buffer.byteLength(line + "\n", "utf-8");
    //     }

    // }



    const length = offsetEnd - offsetStart;

    const file = await fs.promises.open(inputPath, "r");

    const buffer = Buffer.alloc(length);

    await file.read(
        buffer,
        0,
        length,
        offsetStart
    );

    await file.close();

    const line = buffer.toString("utf-8").trim();

    console.log(line);


    const position = JSON.parse(line);


    for (const square of position.board) {
        const Ptype = square.type;
        let piece: PieceType;
        switch (true) {
            case (Ptype === "b"):
                piece = "bishop";
                break;
            case (Ptype == "n"):
                piece = "knight";
                break;
            case (Ptype == "k"):
                piece = "king";
                break;
            case (Ptype == "q"):
                piece = "queen";
                break;
            case (Ptype == "r"):
                piece = "rook";
                break;
            case (Ptype == "p"):
                piece = "pawn";
                break;
        }
        const thisPiece = new Piece(square.color!, piece!);
        addPiece(square.square, thisPiece);

        
    }
    
    return position;
}




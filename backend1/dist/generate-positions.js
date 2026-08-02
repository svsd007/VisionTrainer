import { Chess } from "chess.js";
import fs from "fs";
import readline from "readline";
import { Piece, addPiece, board, createBoard } from "./board.js";
import { json } from "stream/consumers";
const pospath = "./data/raw/LumbrasGigaBase_OTB_ELO2400.pgn";
const outputPath = "./data/processed/positions.jsonl";
// const testpgn = fs.readFileSync(testpgnpath, "utf-8");
// export class Position {
//     board: string[]
//     w_player: string;
//     b_player: string;
//     constructor(w_player: string, b_player: string, board: string[]) {
//         this.board = board;
//         this.w_player = w_player;
//         this.b_player = b_player;
//     }
// }
fs.writeFileSync(outputPath, "", "utf-8");
let positions = [];
const stream = fs.createReadStream(pospath, { encoding: "utf-8" });
const read1 = readline.createInterface({
    input: stream,
    crlfDelay: Infinity
});
let currentgame = "";
let numpositions = 0;
for await (const line of read1) {
    currentgame += line + "\n";
    let trimmedline = line.trim();
    if (trimmedline.endsWith("1-0") ||
        trimmedline.endsWith("0-1") ||
        trimmedline.endsWith("1/2-1/2") ||
        trimmedline.endsWith("*")) {
        let game = new Chess();
        try {
            game.loadPgn(currentgame);
        }
        catch (error) {
            console.error("invalid pgn");
            currentgame = "";
            continue;
        }
        let moves = game.history();
        const min = 20;
        const max = moves.length;
        if (max >= min) {
            const randomMove = Math.floor(Math.random() * (max - min + 1)) + min;
            const replay = new Chess();
            for (let i = 0; i < randomMove && i < moves.length; i++) {
                replay.move(moves[i]);
            }
            savegame(replay, game.getHeaders()["White"] ?? "Unknown", game.getHeaders()["Black"] ?? "Unknown");
            numpositions++;
            currentgame = "";
        }
        else {
            currentgame = "";
        }
    }
    if (numpositions >= 5000) {
        pushgames();
        break;
    }
}
pushgames();
function savegame(game, wheader, bheader) {
    const board = game.board().flatMap(rank => rank.filter(square => square !== null));
    //const w_player = game.getHeaders()["White"];
    //const b_player = game.getHeaders()["Black"];
    const w_player = wheader;
    const b_player = bheader;
    const position = {
        w_player: w_player,
        b_player: b_player,
        board: board
    };
    positions.push(position);
    //add game board to positions
    if (positions.length >= 1000) {
        //push positons
        pushgames();
    }
}
function pushgames() {
    if (positions.length === 0) {
        return;
    }
    //push positions
    let bigString = "";
    for (const position of positions) {
        bigString = bigString + JSON.stringify(position) + "\n";
    }
    fs.appendFileSync(outputPath, bigString, "utf-8");
    //reset positions
    positions = [];
}
// Old code:
// console.log(testpgn.slice(0, 1996))
// console.log(testpgn.split("[Event "))
// const chessgame = new Chess();
// chessgame.loadPgn(testpgn.slice(0, 1996));
// const moves = chessgame.history();
// console.log(moves);
// console.log("Move count:", moves.length);
// const replay = new Chess();
// for (let i: number = 0; i < 100 && i < moves.length; i++) {
//     replay.move(moves[i]!);
// }
// // interpretfen(replay)
// console.log(replay.board())
// for (const square of replay.board()) {
// }
// const files: string[] = ["a", "b", "c", "d", "e", "f", "g", "h"]
// export function interpretfen(game: Chess) {
//     const fen: string = game.fen();
//     const boardpart = fen.split(" ")[0];
//     if (boardpart == undefined) {
//         throw new Error("undefined fen");
//     }
//     const ranks = boardpart.split("/");
//     console.log(ranks)
//     for (const rank of ranks) {
//         let fileindex = 0;
//         for (const character of rank) {
//             if (!Number.isNaN(Number(character))) {
//                 fileindex = fileindex + Number(character)
//             } else {
//                 let file: string = files[fileindex]!;
//                 fileindex = fileindex + 1;
//                 let pieceposition: string = (file + (8 - ranks.indexOf(rank)));
//             }
//         }
//     }
// }
//# sourceMappingURL=generate-positions.js.map
import { Chess } from "chess.js";
import fs from "fs";
const testpgnpath = "./data/raw/testgames.pgn";
const testpgn = fs.readFileSync(testpgnpath, "utf-8");
console.log(testpgn.slice(0, 1996));
const chessgame = new Chess();
chessgame.loadPgn(testpgn.slice(0, 1996));
const moves = chessgame.history();
console.log(moves);
console.log("Move count:", moves.length);
const replay = new Chess();
for (let i = 0; i < 100 && i < moves.length; i++) {
    replay.move(moves[i]);
}
console.log(replay.fen());
//# sourceMappingURL=generate-positions.js.map
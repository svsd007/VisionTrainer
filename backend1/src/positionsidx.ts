
import fs from "node:fs";
import readline from "node:readline";

const inputPath = "./data/processed/positions.jsonl";
const indexPath = "./data/processed/positions.idx";
const underTenIndexPath = "./data/processed/positions-under-10.idx";
const tenToTwentyIndexPath = "./data/processed/positions-10-20.idx";
const twentyPlusIndexPath = "./data/processed/positions-20-plus.idx";

const inputStream = fs.createReadStream(inputPath, {
    encoding: "utf-8",
});

const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
});

let currentOffset = 0;
let indexText = "";
let underTenIndexText = "";
let tenToTwentyIndexText = "";
let twentyPlusIndexText = "";

for await (const line of lines) {
    indexText += currentOffset + "\n";

    const position = JSON.parse(line);
    const pieceCount = position.board.length;

    if (pieceCount < 10) {
        underTenIndexText += currentOffset + "\n";
    } else if (pieceCount <= 20) {
        tenToTwentyIndexText += currentOffset + "\n";
    } else {
        twentyPlusIndexText += currentOffset + "\n";
    }

    currentOffset += Buffer.byteLength(line + "\n", "utf-8");
}

fs.writeFileSync(indexPath, indexText, "utf-8");
fs.writeFileSync(underTenIndexPath, underTenIndexText, "utf-8");
fs.writeFileSync(tenToTwentyIndexPath, tenToTwentyIndexText, "utf-8");
fs.writeFileSync(twentyPlusIndexPath, twentyPlusIndexText, "utf-8");


import fs from "node:fs";
import readline from "node:readline";

const inputPath = "./data/processed/positions.jsonl";
const indexPath = "./data/processed/positions.idx";

const inputStream = fs.createReadStream(inputPath, {
    encoding: "utf-8",
});

const lines = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
});

let currentOffset = 0;
let indexText = "";

for await (const line of lines) {
    indexText += currentOffset + "\n";

    currentOffset += Buffer.byteLength(line + "\n", "utf-8");
}

fs.writeFileSync(indexPath, indexText, "utf-8");
import fs from "fs";


const inputPath = "./data/processed/positions.jsonl";
const indexPaths = {
    all: "./data/processed/positions.idx",
    "under-10": "./data/processed/positions-under-10.idx",
    "10-20": "./data/processed/positions-10-20.idx",
    "20-plus": "./data/processed/positions-20-plus.idx",
} as const;

export type PieceCountFilter = keyof typeof indexPaths;

const allOffsets = readOffsets(indexPaths.all);
const offsetEnds = new Map<number, number>();
const fileSize = fs.statSync(inputPath).size;

for (let index = 0; index < allOffsets.length; index++) {
    const offset = allOffsets[index];
    const nextOffset = allOffsets[index + 1] ?? fileSize;

    if (offset !== undefined) {
        offsetEnds.set(offset, nextOffset);
    }
}

const offsetsByFilter = new Map<PieceCountFilter, number[]>();

for (const filter of Object.keys(indexPaths) as PieceCountFilter[]) {
    offsetsByFilter.set(filter, readOffsets(indexPaths[filter]));
}

export async function getPos(filter: PieceCountFilter = "all") {
    const offsets = offsetsByFilter.get(filter) ?? offsetsByFilter.get("all");

    if (offsets === undefined || offsets.length === 0) {
        throw new Error("No position offsets found");
    }

    const randomIndex = Math.floor(Math.random() * offsets.length);
    const offsetStart = offsets[randomIndex];

    if (offsetStart === undefined) {
        throw new Error("No position offset found");
    }

    const offsetEnd = offsetEnds.get(offsetStart);

    if (offsetEnd === undefined) {
        throw new Error("No position offset found");
    }

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

    return JSON.parse(line);
}

function readOffsets(indexPath: string) {
    return fs.readFileSync(indexPath, "utf-8")
        .split("\n")
        .filter((line) => line !== "")
        .map(Number);
}


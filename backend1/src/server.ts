import express from "express";
import cors from "cors";
import { getPos, type PieceCountFilter } from "./jsontopos.js";

const app = express();
const port = 3000;

app.use(cors());

const pieceCountFilters = new Set<PieceCountFilter>([
    "all",
    "under-10",
    "10-20",
    "20-plus",
]);

app.get("/random-position", async (req, res) => {
    const requestedFilter = req.query.pieceCount;
    const pieceCountFilter =
        typeof requestedFilter === "string" &&
        pieceCountFilters.has(requestedFilter as PieceCountFilter)
            ? requestedFilter as PieceCountFilter
            : "all";

    const position = await getPos(pieceCountFilter);
    res.json(position);
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});

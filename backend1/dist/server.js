import express from "express";
import cors from "cors";
import { getPos } from "./jsontopos.js";
const app = express();
const port = 3000;
app.use(cors());
const pieceCountFilters = new Set([
    "all",
    "under-10",
    "10-20",
    "20-plus",
]);
app.get("/random-position", async (req, res) => {
    const requestedFilter = req.query.pieceCount;
    const pieceCountFilter = typeof requestedFilter === "string" &&
        pieceCountFilters.has(requestedFilter)
        ? requestedFilter
        : "all";
    const position = await getPos(pieceCountFilter);
    res.json(position);
});
app.listen(port, () => {
    console.log("Server running on port " + port);
});
//# sourceMappingURL=server.js.map
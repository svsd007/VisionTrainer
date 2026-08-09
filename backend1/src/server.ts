import express from "express";
import cors from "cors";
import { getPos } from "./jsontopos.js";

const app = express();
const port = 3000;

app.use(cors());

app.get("/random-position", async (_req, res) => {
    const position = await getPos();
    res.json(position);
});

app.listen(port, () => {
    console.log("Server running on port " + port);
});
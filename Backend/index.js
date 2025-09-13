import express from "express";
import bodyParser from "body-parser";
import { appRoutes } from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use("/api", appRoutes);

app.listen(5001, () => console.log("Server running on port 5001"));

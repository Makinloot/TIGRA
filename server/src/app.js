import express from "express";
import cors from "cors";
import vehicleRouter from "./routes/vehicleRouter.js";
import warehousesRouter from "./routes/warehousesRouter.js";
import auctionsRouter from "./routes/auctionsRouter.js";
import copartLocationsRouter from "./routes/copartLocationsRouter.js";
import iaaLocationsRouter from "./routes/iaaLocationsRouter.js";
import telegramBotRouter from "./routes/telegramBotRouter.js";

const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// routes
app.use("/vehicles", vehicleRouter);
app.use("/warehouses", warehousesRouter);
app.use("/auctions", auctionsRouter);
app.use("/copartLocations", copartLocationsRouter);
app.use("/iaaLocations", iaaLocationsRouter);
app.use("/tigra-bot", telegramBotRouter);

export { app };

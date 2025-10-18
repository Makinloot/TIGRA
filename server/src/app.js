import express from "express";
import cors from "cors";
import vehicleRouter from "./routes/vehicleRouter.js";
const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// routes
app.use("/vehicles", vehicleRouter);

export { app };

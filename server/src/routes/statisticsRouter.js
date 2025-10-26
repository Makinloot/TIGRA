import express from "express";
import { driversStatistics } from "../controllers/statisticsController.js";

const router = express.Router();

router.get("/drivers", driversStatistics);

export default router;

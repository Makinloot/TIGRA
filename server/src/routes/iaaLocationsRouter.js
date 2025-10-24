import express from "express";
import { getIaaLocations } from "../controllers/iaaLocationsController.js";

const router = express.Router();

router.get("/", getIaaLocations);

export default router;

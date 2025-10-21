import express from "express";
import { getCopartLocations } from "../controllers/copartLocatiosController.js";

const router = express.Router();

router.get("/", getCopartLocations);

export default router;

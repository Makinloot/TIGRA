import express from "express";
import { getAllAuctions } from "../controllers/auctionsController.js";

const router = express.Router();

router.get("/", getAllAuctions);

export default router;

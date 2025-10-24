import express from "express";
import { sendMessage, broadcastMessage, getGroups } from "../controllers/telegramBotController.js";

const router = express.Router();

// Send message to specific chat ID
router.post("/send", sendMessage);

// Broadcast message to all registered users or specific group
router.post("/broadcast", broadcastMessage);

// Broadcast to Texas Appointments group
router.post("/broadcast/texas", (req, res) => {
  req.body.group = "TEXAS APPOINTMENT";
  return broadcastMessage(req, res);
});

// Get available groups
router.get("/groups", getGroups);

export default router;

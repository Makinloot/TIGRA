import express from "express";
import {
  getAllVehicles,
  addVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicleController.js";
const router = express.Router();

router.get("/", getAllVehicles);
router.post("/", addVehicle);
router.put("/:id", updateVehicle);
router.delete("/:id", deleteVehicle);

export default router;

import Vehicle from "../models/vehicleModel.js";
import {
  calculateAuctionStatistics,
  calculateRoutesStatistics,
  calculateDriverStatistics,
} from "../utils/dispatchStatistics.js";

async function routeStatistics(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();

    calculateRoutesStatistics(vehicles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

async function auctionStatistics(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();

    calculateAuctionStatistics(vehicles);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

async function driversStatistics(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json(calculateDriverStatistics(vehicles));
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export { routeStatistics, auctionStatistics, driversStatistics };

import CoaprtLocations from "../models/copartLocationsModel.js";

async function getCopartLocations(req, res) {
  try {
    const locations = await CoaprtLocations.find();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching copart locations:", error);
    res.status(500).json({ error: "Failed to fetch copart locations" });
  }
}

export { getCopartLocations };

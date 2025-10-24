import IaaLocations from "../models/iaaLocationsModel.js";

async function getIaaLocations(req, res) {
  try {
    const locations = await IaaLocations.find();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching IAA locations:", error);
    res.status(500).json({ error: "Failed to fetch IAA locations" });
  }
}

export { getIaaLocations };

import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String, required: true },
  zip: { type: String, required: true },
  phone: { type: String, required: true },
});

const copartSchema = new mongoose.Schema({
  state: { type: String, required: true },
  locations: { type: [locationSchema], required: true },
});

const IaaLocations = mongoose.model("Iaa", copartSchema, "iaa-locations");

export default IaaLocations;

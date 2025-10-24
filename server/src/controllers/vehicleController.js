import Vehicle from "../models/vehicleModel.js";

// Import validation utilities
import {
  validateVIN,
  validatePrice,
  validateRequiredFields,
  validateVehicleUpdate,
  validateDates,
} from "../utils/vehicleValidation.js";

// Import VIN service
import { decodeAndValidateVIN } from "../services/vinService.js";

// Import transformation utilities
import {
  normalizeVehicleDoc,
  applyAppointmentUpdate,
  buildUpdatePayload,
  removeUndefinedValues,
} from "../utils/vehicleTransform.js";

// Import slot handler
import {
  processVINSlots,
  applyGeneralUpdates,
} from "../utils/vehicleSlotHandler.js";

/**
 * API Route Handlers
 * All validation, transformation, and VIN decoding logic is in separate modules
 */

/**
 * GET /vehicles
 * Retrieves all vehicles sorted by creation date (newest first)
 * @returns {Array} Array of normalized vehicle objects
 */
async function getAllVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();
    const normalized = vehicles.map((vehicle) => normalizeVehicleDoc(vehicle));
    res.status(200).json(normalized);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

/**
 * POST /vehicles
 * Creates a new vehicle with comprehensive validation
 * Validation rules:
 * - VIN: Required, 17 characters, must decode via NHTSA API
 * - Auction, Warehouse, Route, Driver Number: Required
 * - Price: Required, non-negative number
 * - Dates: Pickup cannot be past, delivery cannot be before pickup
 * @returns {Object} Created vehicle object
 */
async function addVehicle(req, res) {
  try {
    const payload = applyAppointmentUpdate(req.body);
    const validationErrors = [];

    // Validate VIN
    const vinValidation = validateVIN(payload.vin);
    if (!vinValidation.valid) {
      return res.status(400).json({ message: vinValidation.error });
    }
    payload.vin = vinValidation.normalizedVin;

    // Validate required fields
    const requiredFieldErrors = validateRequiredFields(payload);
    validationErrors.push(...requiredFieldErrors);

    // Validate price
    const priceValidation = validatePrice(payload.price);
    if (!priceValidation.valid) {
      validationErrors.push(priceValidation.error);
    }
    
    // Validate dates
    const dateErrors = validateDates(payload.pickupDate, payload.deliveryDate);
    validationErrors.push(...dateErrors);
    
    if (validationErrors.length > 0) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: validationErrors 
      });
    }

    // Decode VIN and auto-populate vehicle details
    try {
      const decoded = await decodeAndValidateVIN(payload.vin);
      payload.make = decoded.make;
      payload.model = decoded.model;
      payload.year = decoded.year;
    } catch (decodeError) {
      return res.status(400).json({
        message: decodeError.message,
        error: decodeError.message,
      });
    }

    const vehicle = await Vehicle.create(payload);
    const normalized = normalizeVehicleDoc(vehicle);
    res.status(201).json(normalized);
  } catch (error) {
    console.log(error);
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    res.status(500).json({ message: error.message });
  }
}


/**
 * PUT /vehicles/:id
 * Updates an existing vehicle with support for multiple VIN slots
 * Handles:
 * - Primary vehicle (vin, make, model, year)
 * - Up to 4 additional vehicles (vin2-5, make2-5, model2-5, year2-5)
 * - General field updates (auction, warehouse, route, dates, etc.)
 * - VIN decoding when VIN changes
 * - Field validation (dates, phone, price)
 * @returns {Object} Updated vehicle object
 */
async function updateVehicle(req, res) {
  const { id: idParam } = req.params;
  const { additionalVehicles: _unusedAdditionalVehicles, ...flatUpdates } =
    req.body;

  try {
    if (!idParam) {
      return res
        .status(400)
        .json({ message: "Vehicle ID parameter is required" });
    }

    const existingVehicleDoc = await Vehicle.findById(idParam);

    if (!existingVehicleDoc) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID ${idParam} not found` });
    }

    const existingVehicle = normalizeVehicleDoc(existingVehicleDoc);
    let updatedVehicle = { ...existingVehicle };
    const unsetFields = {};

    const markUnset = (key) => {
      if (!key) return;
      unsetFields[key] = "";
    };

    // Validate updates
    const validationErrors = validateVehicleUpdate(flatUpdates, existingVehicle);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: validationErrors,
      });
    }

    // Process VIN slots and general updates
    try {
      const slotResult = await processVINSlots({
        flatUpdates,
        existingVehicle,
        updatedVehicle,
        markUnset,
      });

      updatedVehicle = slotResult.updatedVehicle;
      const cleanedAdditionalVehicles = slotResult.updatedAdditionalVehicles;
      const generalUpdates = slotResult.generalUpdates;

      // Apply general field updates
      updatedVehicle = applyGeneralUpdates(updatedVehicle, generalUpdates, markUnset);

      // Set or remove additionalVehicles array based on content
      if (cleanedAdditionalVehicles.length) {
        updatedVehicle.additionalVehicles = cleanedAdditionalVehicles;
      } else {
        delete updatedVehicle.additionalVehicles;
        markUnset("additionalVehicles");
      }
    } catch (error) {
      console.error("VIN processing failed:", error);
      return res.status(502).json({
        message: error.message || "Failed to process VIN updates",
      });
    }

    // Apply appointment normalization and strip internal fields
    const serializedUpdate = applyAppointmentUpdate(updatedVehicle);

    // Ensure primary VIN is uppercase
    if (typeof serializedUpdate.vin === "string") {
      serializedUpdate.vin = serializedUpdate.vin.trim().toUpperCase();
    }

    // Remove undefined values and build update payload
    const cleanedUpdate = removeUndefinedValues(serializedUpdate);
    const updatePayload = buildUpdatePayload(cleanedUpdate, unsetFields);

    // If no changes, return existing vehicle
    if (!Object.keys(updatePayload).length) {
      const normalized = normalizeVehicleDoc(existingVehicleDoc);
      return res.status(200).json(normalized);
    }

    // Apply update to database with validation
    await Vehicle.findByIdAndUpdate(idParam, updatePayload, {
      new: false,
      runValidators: true,
      timestamps: true,
    });

    // Fetch updated vehicle to return
    const savedVehicle = await Vehicle.findById(idParam);

    if (!savedVehicle) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID ${idParam} not found after update` });
    }

    const normalized = normalizeVehicleDoc(savedVehicle);

    return res.status(200).json(normalized);
  } catch (error) {
    console.log(error);
    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: "Validation failed", errors });
    }
    return res.status(500).json({ message: error.message });
  }
}

/**
 * DELETE /vehicles/:id
 * Permanently deletes a vehicle from the database
 * Returns the deleted vehicle data for confirmation/audit purposes
 * @returns {Object} Deleted vehicle object with success message
 */
async function deleteVehicle(req, res) {
  const { id: idParam } = req.params;

  try {
    if (!idParam) {
      return res
        .status(400)
        .json({ message: "Vehicle ID parameter is required" });
    }

    const existingVehicle = await Vehicle.findById(idParam);

    if (!existingVehicle) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID ${idParam} not found` });
    }

    await Vehicle.findByIdAndDelete(idParam);

    return res.status(200).json({
      message: `Vehicle with ID ${idParam} deleted successfully`,
      vehicle: normalizeVehicleDoc(existingVehicle),
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export { getAllVehicles, addVehicle, updateVehicle, deleteVehicle };

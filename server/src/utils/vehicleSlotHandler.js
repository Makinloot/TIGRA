import { decodeVIN, shouldDecodeVIN } from "../services/vinService.js";

/**
 * Vehicle Slot Handler
 * Manages primary and additional vehicle VIN slots (up to 5 total)
 */

/**
 * Maximum number of vehicle slots (primary + additional vehicles)
 */
export const MAX_VEHICLE_SLOTS = 5;

/**
 * Generates configuration for all vehicle slots
 * @returns {Array} Array of slot configurations
 */
export const generateSlotConfigs = () => {
  return Array.from({ length: MAX_VEHICLE_SLOTS }, (_, idx) => {
    const slotNumber = idx + 1;
    return {
      vinKey: slotNumber === 1 ? "vin" : `vin${slotNumber}`,
      makeKey: slotNumber === 1 ? "make" : `make${slotNumber}`,
      modelKey: slotNumber === 1 ? "model" : `model${slotNumber}`,
      yearKey: slotNumber === 1 ? "year" : `year${slotNumber}`,
      additionalIndex: slotNumber === 1 ? null : slotNumber - 2,
    };
  });
};

/**
 * Processes all VIN slots for vehicle update
 * Handles VIN changes, decoding, and field updates for primary and additional vehicles
 * @param {Object} params - Processing parameters
 * @param {Object} params.flatUpdates - Flat update payload from request
 * @param {Object} params.existingVehicle - Current vehicle data
 * @param {Object} params.updatedVehicle - Vehicle object being built
 * @param {Function} params.markUnset - Function to mark fields for unsetting
 * @returns {Promise<Object>} Result with updatedVehicle and updatedAdditionalVehicles
 * @throws {Error} If VIN decoding fails or primary VIN is empty
 */
export const processVINSlots = async ({
  flatUpdates,
  existingVehicle,
  updatedVehicle,
  markUnset,
}) => {
  const slotConfigs = generateSlotConfigs();
  const updatedAdditionalVehicles = [];
  const generalUpdates = { ...flatUpdates };
  delete generalUpdates.additionalVehicles;

  for (const slot of slotConfigs) {
    const { vinKey, makeKey, modelKey, yearKey, additionalIndex } = slot;

    // Determine incoming VIN value
    const incomingVinRaw = Object.prototype.hasOwnProperty.call(
      flatUpdates,
      vinKey
    )
      ? flatUpdates[vinKey]
      : undefined;
    const normalizedIncomingVin =
      typeof incomingVinRaw === "string"
        ? incomingVinRaw.trim().toUpperCase()
        : incomingVinRaw;

    // Determine existing VIN from flat fields or additionalVehicles array
    const existingFlatVin = existingVehicle[vinKey];
    const existingAdditionalVin =
      additionalIndex !== null &&
      Array.isArray(existingVehicle.additionalVehicles)
        ? existingVehicle.additionalVehicles[additionalIndex]?.vin
        : undefined;

    const previousVin = existingFlatVin || existingAdditionalVin || "";
    const hasIncomingVin = normalizedIncomingVin !== undefined;
    // Empty strings remove VINs, undefined leaves the prior value in place
    const finalVin = hasIncomingVin
      ? normalizedIncomingVin || ""
      : previousVin;

    // Remove VIN-related fields from general updates (handled separately)
    delete generalUpdates[vinKey];
    delete generalUpdates[makeKey];
    delete generalUpdates[modelKey];
    delete generalUpdates[yearKey];

    // Primary VIN (slot 1) is required and cannot be removed
    if (slot.additionalIndex === null && !finalVin) {
      throw new Error("Primary VIN cannot be empty");
    }

    // If VIN is being removed (empty string), unset all related fields
    if (!finalVin) {
      delete updatedVehicle[vinKey];
      delete updatedVehicle[makeKey];
      delete updatedVehicle[modelKey];
      delete updatedVehicle[yearKey];
      markUnset(vinKey);
      markUnset(makeKey);
      markUnset(modelKey);
      markUnset(yearKey);
      continue;
    }

    // Retrieve existing vehicle details (make, model, year)
    let makeValue = existingVehicle[makeKey];
    let modelValue = existingVehicle[modelKey];
    let yearValue = existingVehicle[yearKey];

    // For additional vehicles, check additionalVehicles array as fallback
    if (
      slot.additionalIndex !== null &&
      Array.isArray(existingVehicle.additionalVehicles)
    ) {
      const existingAdditional =
        existingVehicle.additionalVehicles[slot.additionalIndex];
      if (existingAdditional) {
        makeValue = makeValue || existingAdditional.make;
        modelValue = modelValue || existingAdditional.model;
        yearValue = yearValue || existingAdditional.year;
      }
    }

    // Decode VIN if it changed or if vehicle details are missing
    if (
      shouldDecodeVIN(
        hasIncomingVin,
        finalVin,
        previousVin,
        makeValue,
        modelValue,
        yearValue
      )
    ) {
      try {
        const decoded = await decodeVIN(finalVin);
        if (decoded) {
          makeValue = decoded.make || makeValue || "";
          modelValue = decoded.model || modelValue || "";
          yearValue = decoded.year || yearValue || "";
        }
      } catch (decodeError) {
        throw new Error(`Failed to decode VIN via NHTSA: ${decodeError.message}`);
      }
    }

    // Update vehicle data
    updatedVehicle[vinKey] = finalVin;
    updatedVehicle[makeKey] = makeValue || "";
    updatedVehicle[modelKey] = modelValue || "";
    updatedVehicle[yearKey] = yearValue || "";

    // For additional vehicles, also populate additionalVehicles array
    if (slot.additionalIndex !== null) {
      updatedAdditionalVehicles[slot.additionalIndex] = {
        vin: finalVin,
        make: makeValue || "",
        model: modelValue || "",
        year: yearValue || "",
      };
    }
  }

  // Filter out empty additional vehicles
  const cleanedAdditionalVehicles = updatedAdditionalVehicles.filter(
    (vehicle) => vehicle && vehicle.vin
  );

  return {
    updatedVehicle,
    updatedAdditionalVehicles: cleanedAdditionalVehicles,
    generalUpdates,
  };
};

/**
 * Applies general field updates (non-VIN fields)
 * @param {Object} updatedVehicle - Vehicle object being updated
 * @param {Object} generalUpdates - General field updates
 * @param {Function} markUnset - Function to mark fields for unsetting
 * @returns {Object} Updated vehicle object
 */
export const applyGeneralUpdates = (updatedVehicle, generalUpdates, markUnset) => {
  Object.entries(generalUpdates).forEach(([key, value]) => {
    if (
      key.startsWith("vin") ||
      key.startsWith("make") ||
      key.startsWith("model") ||
      key.startsWith("year")
    ) {
      // VIN-related fields already handled in slot loop
      return;
    }

    if (value === undefined) {
      // Undefined means remove the field
      delete updatedVehicle[key];
      markUnset(key);
    } else {
      updatedVehicle[key] = value;
    }
  });

  return updatedVehicle;
};

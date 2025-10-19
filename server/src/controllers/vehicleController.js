import axios from "axios";
import Vehicle from "../models/vehicleModel.js";

const normalizeVehicleDoc = (doc) => {
  if (!doc) return doc;

  const json = doc.toObject ? doc.toObject() : { ...doc };

  if (json._id) {
    json.id = json._id.toString();
  }

  delete json._id;
  delete json.__v;

  if (
    json.appointment &&
    typeof json.appointment === "object" &&
    "appointment" in json.appointment
  ) {
    json.appointment = json.appointment.appointment;
  }

  return json;
};

const applyAppointmentUpdate = (payload = {}) => {
  const { appointment, _id, id, __v, createdAt, updatedAt, ...rest } = payload;

  const update = { ...rest };

  if (appointment !== undefined) {
    update.appointment = {
      auction: Boolean(appointment?.auction),
      warehouse: Boolean(appointment?.warehouse),
    };
  }

  return update;
};

// Fetch all vehicles @route GET /vehicles
async function getAllVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find().lean();
    const normalized = vehicles.map((vehicle) => normalizeVehicleDoc(vehicle));
    res.status(200).json(normalized);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Add a vehicle @route POST /vehicles
async function addVehicle(req, res) {
  try {
    const payload = applyAppointmentUpdate(req.body);

    if (!payload.vin) {
      return res.status(400).json({ message: "Primary VIN is required" });
    }

    payload.vin = payload.vin.trim().toUpperCase();

    try {
      const decoded = await decodeVinSafe(payload.vin);

      if (decoded) {
        const { make = "", model = "", year = "" } = decoded;
        payload.make = make;
        payload.model = model;
        payload.year = year;
      }
    } catch (decodeError) {
      return res.status(502).json({
        message: "Failed to decode VIN via NHTSA",
        error: decodeError.message,
      });
    }

    const vehicle = await Vehicle.create(payload);
    const normalized = normalizeVehicleDoc(vehicle);
    res.status(201).json(normalized);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Update a vehicle @route PUT /vehicles/:id
const MAX_VEHICLE_SLOTS = 5;

// decode vin code to get make, model, year
const decodeVinSafe = async (vin) => {
  if (!vin) return null;

  try {
    // External VIN decoding is best-effort; failures are surfaced to caller
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/decodevinvalues/${vin}?format=json`
    );

    const decoded = response.data?.Results?.[0] ?? {};

    return {
      make: decoded?.Make?.trim() || "",
      model: decoded?.Model?.trim() || "",
      year: decoded?.ModelYear?.trim() || "",
    };
  } catch (error) {
    console.error(`Failed to decode VIN ${vin}:`, error);
    throw error;
  }
};

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
    // Work on a copy so we can compute the final payload before committing
    const updatedVehicle = { ...existingVehicle };
    const updatedAdditionalVehicles = [];
    const unsetFields = {};

    const markUnset = (key) => {
      if (!key) return;
      unsetFields[key] = "";
    };

    const slotConfigs = Array.from({ length: MAX_VEHICLE_SLOTS }, (_, idx) => {
      const slotNumber = idx + 1;
      return {
        vinKey: slotNumber === 1 ? "vin" : `vin${slotNumber}`,
        makeKey: slotNumber === 1 ? "make" : `make${slotNumber}`,
        modelKey: slotNumber === 1 ? "model" : `model${slotNumber}`,
        yearKey: slotNumber === 1 ? "year" : `year${slotNumber}`,
        additionalIndex: slotNumber === 1 ? null : slotNumber - 2,
      };
    });

    const generalUpdates = { ...flatUpdates };
    delete generalUpdates.additionalVehicles;

    try {
      for (const slot of slotConfigs) {
        const { vinKey, makeKey, modelKey, yearKey, additionalIndex } = slot;

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

        delete generalUpdates[vinKey];
        delete generalUpdates[makeKey];
        delete generalUpdates[modelKey];
        delete generalUpdates[yearKey];

        if (slot.additionalIndex === null && !finalVin) {
          return res
            .status(400)
            .json({ message: "Primary VIN cannot be empty" });
        }

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

        let makeValue = existingVehicle[makeKey];
        let modelValue = existingVehicle[modelKey];
        let yearValue = existingVehicle[yearKey];

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

        let decoded;
        try {
          if (hasIncomingVin && finalVin !== previousVin) {
            // Primary change or explicit VIN swap -> decode for fresh vehicle details
            decoded = await decodeVinSafe(finalVin);
          } else if (!makeValue || !modelValue || !yearValue) {
            // Fill missing vehicle metadata opportunistically
            decoded = await decodeVinSafe(finalVin);
          }
        } catch (decodeError) {
          return res.status(502).json({
            message: "Failed to decode VIN via NHTSA",
            error: decodeError.message,
          });
        }

        if (decoded) {
          makeValue = decoded.make || makeValue || "";
          modelValue = decoded.model || modelValue || "";
          yearValue = decoded.year || yearValue || "";
        }

        updatedVehicle[vinKey] = finalVin;
        updatedVehicle[makeKey] = makeValue || "";
        updatedVehicle[modelKey] = modelValue || "";
        updatedVehicle[yearKey] = yearValue || "";

        if (slot.additionalIndex !== null) {
          updatedAdditionalVehicles[slot.additionalIndex] = {
            vin: finalVin,
            make: makeValue || "",
            model: modelValue || "",
            year: yearValue || "",
          };
        }
      }
    } catch (error) {
      console.error("VIN decoding failed:", error);
      return res.status(502).json({
        message: "Failed to decode VIN via NHTSA",
        error: error.message,
      });
    }

    const cleanedAdditionalVehicles = updatedAdditionalVehicles.filter(
      (vehicle) => vehicle && vehicle.vin
    );

    updatedVehicle.additionalVehicles = cleanedAdditionalVehicles;

    Object.entries(generalUpdates).forEach(([key, value]) => {
      if (
        key.startsWith("vin") ||
        key.startsWith("make") ||
        key.startsWith("model") ||
        key.startsWith("year")
      ) {
        // VIN family fields are handled via the slot loop above
        return;
      }

      if (value === undefined) {
        // Undefined removes a property so UI can clear fields explicitly
        delete updatedVehicle[key];
        markUnset(key);
      } else {
        updatedVehicle[key] = value;
      }
    });

    if (cleanedAdditionalVehicles.length) {
      updatedVehicle.additionalVehicles = cleanedAdditionalVehicles;
    } else {
      delete updatedVehicle.additionalVehicles;
      markUnset("additionalVehicles");
    }

    const serializedUpdate = applyAppointmentUpdate(updatedVehicle);

    if (typeof serializedUpdate.vin === "string") {
      serializedUpdate.vin = serializedUpdate.vin.trim().toUpperCase();
    }

    Object.keys(serializedUpdate).forEach((key) => {
      if (serializedUpdate[key] === undefined) {
        delete serializedUpdate[key];
      }
    });

    const updatePayload = {};

    if (Object.keys(serializedUpdate).length) {
      updatePayload.$set = serializedUpdate;
    }

    if (Object.keys(unsetFields).length) {
      updatePayload.$unset = unsetFields;
    }

    if (!Object.keys(updatePayload).length) {
      const normalized = normalizeVehicleDoc(existingVehicleDoc);
      return res.status(200).json(normalized);
    }

    await Vehicle.findByIdAndUpdate(idParam, updatePayload, {
      new: false,
      runValidators: true,
      timestamps: true,
    });

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
    return res.status(500).json({ message: error.message });
  }
}

// Delete a vehicle @route DELETE /vehicles/:id
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

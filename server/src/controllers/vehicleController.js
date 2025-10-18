import axios from "axios";

let testData = [
  {
    id: 1,
    auction: "iaai",
    comment: "asdasd",
    creationDate: "2025-10-18T19:59:28.000Z",
    driverNumber: "123456",
    price: 1000,
    route: "asdasd",
    warehouse: "Barami",
    vin: "12345678901234567",
    make: "TOYOTA",
    model: "Prius C",
    year: "2015",
    pickupDate: "18/10",
    deliveryDate: "18/10",
    appointment: {
      auction: true,
      warehouse: true,
    },
  },
];

const getNumericId = (value) => {
  // Treat both numeric and string IDs uniformly when calculating the next ID
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const generateVehicleId = () => {
  // Next ID is derived from the current max to keep identifiers stable across restarts
  const numericIds = testData
    .map((vehicle) => getNumericId(vehicle.id))
    .filter((id) => id !== null);
  const maxId = numericIds.length ? Math.max(...numericIds) : 0;
  return maxId + 1;
};

// Fetch all vehicles @route GET /vehicles
function getAllVehicles(req, res) {
  try {
    res.status(200).json(testData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}

// Add a vehicle @route POST /vehicles
function addVehicle(req, res) {
  console.log(req.body);
  try {
    // Server owns ID generation to ensure uniqueness regardless of client input
    const newVehicle = {
      id: generateVehicleId(),
      ...req.body,
    };
    testData.push(newVehicle);
    res.status(200).json(newVehicle);
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
  const { additionalVehicles: incomingAdditionalVehicles, ...flatUpdates } =
    req.body;

  try {
    if (!idParam) {
      return res
        .status(400)
        .json({ message: "Vehicle ID parameter is required" });
    }

    const vehicleIndex = testData.findIndex(
      (vehicle) => String(vehicle.id) === String(idParam)
    );

    if (vehicleIndex === -1) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID ${idParam} not found` });
    }

    const existingVehicle = testData[vehicleIndex];
    // Work on a copy so we can compute the final payload before committing
    const updatedVehicle = { ...existingVehicle };
    const updatedAdditionalVehicles = [];

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
      } else {
        updatedVehicle[key] = value;
      }
    });

    testData[vehicleIndex] = updatedVehicle;

    return res.status(200).json(updatedVehicle);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

// Delete a vehicle @route DELETE /vehicles/:id
function deleteVehicle(req, res) {
  const { id: idParam } = req.params;

  try {
    if (!idParam) {
      return res
        .status(400)
        .json({ message: "Vehicle ID parameter is required" });
    }

    const vehicleIndex = testData.findIndex(
      (vehicle) => String(vehicle.id) === String(idParam)
    );

    if (vehicleIndex === -1) {
      return res
        .status(404)
        .json({ message: `Vehicle with ID ${idParam} not found` });
    }

    const [removedVehicle] = testData.splice(vehicleIndex, 1);

    return res.status(200).json({
      message: `Vehicle with ID ${idParam} deleted successfully`,
      vehicle: removedVehicle,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export { getAllVehicles, addVehicle, updateVehicle, deleteVehicle };

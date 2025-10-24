import axios from "axios";

/**
 * VIN Decoding Service
 * Handles all VIN-related operations including decoding via NHTSA API
 */

/**
 * Decodes VIN using NHTSA API to extract vehicle details
 * @param {string} vin - 17-character VIN code
 * @returns {Promise<Object>} Object with make, model, year properties
 * @throws {Error} If API request fails
 */
export const decodeVIN = async (vin) => {
  if (!vin) return null;

  try {
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

/**
 * Validates and decodes VIN for vehicle creation
 * Ensures VIN decodes successfully and returns complete vehicle data
 * @param {string} vin - VIN to decode
 * @returns {Promise<Object>} Decoded vehicle data
 * @throws {Error} If decoding fails or returns incomplete data
 */
export const decodeAndValidateVIN = async (vin) => {
  const decoded = await decodeVIN(vin);

  if (!decoded || !decoded.make || !decoded.model || !decoded.year) {
    throw new Error("VIN could not be decoded. Please verify the VIN is correct.");
  }

  return decoded;
};

/**
 * Determines if VIN should be decoded based on context
 * @param {boolean} hasIncomingVin - Whether VIN is being updated
 * @param {string} finalVin - The VIN to potentially decode
 * @param {string} previousVin - The previous VIN value
 * @param {string} makeValue - Existing make value
 * @param {string} modelValue - Existing model value
 * @param {string} yearValue - Existing year value
 * @returns {boolean} True if VIN should be decoded
 */
export const shouldDecodeVIN = (
  hasIncomingVin,
  finalVin,
  previousVin,
  makeValue,
  modelValue,
  yearValue
) => {
  // VIN changed - decode to get fresh vehicle details
  if (hasIncomingVin && finalVin !== previousVin) {
    return true;
  }

  // Missing details - attempt to fill via VIN decode
  if (!makeValue || !modelValue || !yearValue) {
    return true;
  }

  return false;
};

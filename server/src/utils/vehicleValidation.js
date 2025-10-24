import moment from "moment";

/**
 * Vehicle Validation Utilities
 * Contains all validation logic for vehicle data
 */

/**
 * Validates USA phone number format
 * Accepts 10-digit format (e.g., 5551234567) or 11-digit with leading 1 (e.g., 15551234567)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid USA phone format
 */
export const validateUSAPhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) return true;
  if (cleaned.length === 11 && cleaned[0] === "1") return true;
  return false;
};

/**
 * Validates pickup and delivery dates
 * Business rules:
 * - Both dates are required
 * - Dates must be in DD/MM format (year assumed to be current year)
 * - Pickup date cannot be in the past
 * - Delivery date cannot be before pickup date
 * @param {string} pickupDate - Pickup date in DD/MM format
 * @param {string} deliveryDate - Delivery date in DD/MM format
 * @returns {string[]} Array of validation error messages (empty if valid)
 */
export const validateDates = (pickupDate, deliveryDate) => {
  const errors = [];
  
  if (!pickupDate) {
    errors.push("Pickup date is required");
  }
  
  if (!deliveryDate) {
    errors.push("Delivery date is required");
  }
  
  if (pickupDate && deliveryDate) {
    // Parse dates in DD/MM format, assuming current year
    const currentYear = new Date().getFullYear();
    const pickup = moment(pickupDate + "/" + currentYear, "DD/MM/YYYY");
    const delivery = moment(deliveryDate + "/" + currentYear, "DD/MM/YYYY");
    const today = moment().startOf("day");
    
    if (!pickup.isValid()) {
      errors.push("Pickup date format is invalid (expected DD/MM)");
    } else if (pickup.isBefore(today)) {
      errors.push("Pickup date cannot be in the past");
    }
    
    if (!delivery.isValid()) {
      errors.push("Delivery date format is invalid (expected DD/MM)");
    } else if (pickup.isValid() && delivery.isBefore(pickup)) {
      errors.push("Delivery date cannot be before pickup date");
    }
  }
  
  return errors;
};

/**
 * Validates VIN format
 * @param {string} vin - VIN to validate
 * @returns {Object} { valid: boolean, error: string|null }
 */
export const validateVIN = (vin) => {
  if (!vin) {
    return { valid: false, error: "VIN is required" };
  }

  const normalizedVin = vin.trim().toUpperCase();
  
  if (normalizedVin.length !== 17) {
    return { valid: false, error: "VIN must be exactly 17 characters" };
  }

  return { valid: true, error: null, normalizedVin };
};

/**
 * Validates price value
 * @param {*} price - Price to validate
 * @returns {Object} { valid: boolean, error: string|null }
 */
export const validatePrice = (price) => {
  if (price === undefined || price === null) {
    return { valid: false, error: "Price is required" };
  }

  if (typeof price !== "number" || price < 0) {
    return { valid: false, error: "Price must be a non-negative number" };
  }

  return { valid: true, error: null };
};

/**
 * Validates required fields for vehicle creation
 * @param {Object} payload - Vehicle data payload
 * @returns {string[]} Array of validation error messages
 */
export const validateRequiredFields = (payload) => {
  const errors = [];

  if (!payload.auction) errors.push("Auction is required");
  if (!payload.warehouse) errors.push("Warehouse is required");
  if (!payload.route) errors.push("Route is required");
  if (!payload.driverNumber) errors.push("Driver number is required");

  return errors;
};

/**
 * Validates vehicle update payload
 * @param {Object} updates - Update payload
 * @param {Object} existingVehicle - Existing vehicle data
 * @returns {string[]} Array of validation error messages
 */
export const validateVehicleUpdate = (updates, existingVehicle) => {
  const errors = [];

  // Validate driver number if being updated
  if (updates.driverNumber !== undefined && updates.driverNumber !== null) {
    if (updates.driverNumber && !validateUSAPhone(updates.driverNumber)) {
      errors.push("Driver number must be a valid USA phone number");
    }
  }

  // Validate price if being updated
  if (updates.price !== undefined && updates.price !== null) {
    if (typeof updates.price !== "number" || updates.price < 0) {
      errors.push("Price must be a non-negative number");
    }
  }

  // Validate dates if being updated
  const pickupDate = updates.pickupDate || existingVehicle.pickupDate;
  const deliveryDate = updates.deliveryDate || existingVehicle.deliveryDate;

  if (updates.pickupDate || updates.deliveryDate) {
    const dateErrors = validateDates(pickupDate, deliveryDate);
    errors.push(...dateErrors);
  }

  return errors;
};

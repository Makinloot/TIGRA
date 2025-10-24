/**
 * Vehicle Data Transformation Utilities
 * Handles data normalization and transformation for API responses
 */

/**
 * Normalizes a Mongoose vehicle document for API response
 * - Converts MongoDB _id to id string
 * - Removes internal Mongoose fields (__v)
 * - Unwraps nested appointment structure if present
 * @param {Object} doc - Mongoose document or plain object
 * @returns {Object} Normalized vehicle object
 */
export const normalizeVehicleDoc = (doc) => {
  if (!doc) return doc;

  const json = doc.toObject ? doc.toObject() : { ...doc };

  if (json._id) {
    json.id = json._id.toString();
  }

  delete json._id;
  delete json.__v;

  // Handle legacy nested appointment structure
  if (
    json.appointment &&
    typeof json.appointment === "object" &&
    "appointment" in json.appointment
  ) {
    json.appointment = json.appointment.appointment;
  }

  return json;
};

/**
 * Prepares update payload by normalizing appointment structure
 * - Strips out read-only/internal fields (_id, id, __v, timestamps)
 * - Ensures appointment is stored as {auction: boolean, warehouse: boolean}
 * @param {Object} payload - Raw update payload from request
 * @returns {Object} Sanitized update object
 */
export const applyAppointmentUpdate = (payload = {}) => {
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

/**
 * Builds MongoDB update payload with $set and $unset operators
 * @param {Object} serializedUpdate - Update data to set
 * @param {Object} unsetFields - Fields to unset
 * @returns {Object} MongoDB update payload
 */
export const buildUpdatePayload = (serializedUpdate, unsetFields) => {
  const updatePayload = {};

  if (Object.keys(serializedUpdate).length) {
    updatePayload.$set = serializedUpdate;
  }

  if (Object.keys(unsetFields).length) {
    updatePayload.$unset = unsetFields;
  }

  return updatePayload;
};

/**
 * Removes undefined values from an object
 * @param {Object} obj - Object to clean
 * @returns {Object} Cleaned object
 */
export const removeUndefinedValues = (obj) => {
  const cleaned = { ...obj };
  Object.keys(cleaned).forEach((key) => {
    if (cleaned[key] === undefined) {
      delete cleaned[key];
    }
  });
  return cleaned;
};

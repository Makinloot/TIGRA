import mongoose from "mongoose";

// USA phone number validator (supports various formats)
const validateUSAPhone = (phone) => {
  if (!phone) return false;
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  // Must be 10 or 11 digits (11 if starts with 1)
  if (cleaned.length === 10) return true;
  if (cleaned.length === 11 && cleaned[0] === "1") return true;
  return false;
};

const appointmentSchema = new mongoose.Schema(
  {
    auction: {
      type: Boolean,
      default: false,
    },
    warehouse: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const additionalVehicleSchema = new mongoose.Schema(
  {
    vin: {
      type: String,
      trim: true,
    },
    make: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
  },
  { _id: false }
);

const vehicleSchema = new mongoose.Schema(
  {
    auction: {
      type: String,
      trim: true,
      required: [true, "Auction is required"],
    },
    comment: {
      type: String,
      trim: true,
    },
    driverNumber: {
      type: String,
      trim: true,
      required: [true, "Driver number is required"],
      validate: {
        validator: validateUSAPhone,
        message: "Driver number must be a valid USA phone number",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    route: {
      type: String,
      trim: true,
      required: [true, "Route is required"],
    },
    warehouse: {
      type: String,
      trim: true,
      required: [true, "Warehouse is required"],
    },
    vin: {
      type: String,
      trim: true,
      required: [true, "VIN is required"],
      uppercase: true,
      minlength: [17, "VIN must be 17 characters"],
      maxlength: [17, "VIN must be 17 characters"],
    },
    make: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    pickupDate: {
      type: String,
      trim: true,
      required: [true, "Pickup date is required"],
    },
    deliveryDate: {
      type: String,
      trim: true,
      required: [true, "Delivery date is required"],
    },
    appointment: {
      type: appointmentSchema,
      default: () => ({
        auction: false,
        warehouse: false,
      }),
    },
    additionalVehicles: {
      type: [additionalVehicleSchema],
      default: undefined,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    canceled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite issues in watch mode
const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;

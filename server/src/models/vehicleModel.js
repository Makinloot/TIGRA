import mongoose from "mongoose";

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
      required: true,
    },
    comment: {
      type: String,
      trim: true,
    },
    driverNumber: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
    },
    route: {
      type: String,
      trim: true,
    },
    warehouse: {
      type: String,
      trim: true,
    },
    vin: {
      type: String,
      trim: true,
      required: true,
      uppercase: true,
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
    },
    deliveryDate: {
      type: String,
      trim: true,
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
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite issues in watch mode
const Vehicle =
  mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);

export default Vehicle;

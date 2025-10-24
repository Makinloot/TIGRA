import mongoose from "mongoose";

const telegramUserSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      default: null,
    },
    firstName: {
      type: String,
      default: null,
    },
    lastName: {
      type: String,
      default: null,
    },
    subscribedGroups: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const TelegramUser = mongoose.model("TelegramUser", telegramUserSchema);

export default TelegramUser;

import TelegramBot from "node-telegram-bot-api";
import TelegramUser from "../models/telegramUserModel.js";

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

// Available groups/chats
const AVAILABLE_GROUPS = [
  "TEXAS APPOINTMENT",
  "RAME SXVA",
  "RAME MOSAPIQREBELI",
];

// Listen for incoming messages and save/update user info
bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id.toString();
    const username = msg.from.username || null;
    const firstName = msg.from.first_name || null;
    const lastName = msg.from.last_name || null;
    const text = msg.text;

    console.log(
      `Received message from ${chatId} (${username || "no username"}): ${text}`
    );

    // Find existing user or create new one
    let user = await TelegramUser.findOne({ chatId });

    if (!user) {
      // Create new user
      user = await TelegramUser.create({
        chatId,
        username,
        firstName,
        lastName,
        subscribedGroups: [],
      });
      console.log(`New user registered: ${chatId}`);
    } else {
      // Update existing user info
      user.username = username;
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();
    }

    // Handle /start command
    if (text === "/start") {
      const welcomeMessage = user.firstName
        ? `Welcome, ${user.firstName}! 👋\n\nChoose which groups you want to join:`
        : `Welcome! 👋\n\nChoose which groups you want to join:`;

      const keyboard = {
        inline_keyboard: AVAILABLE_GROUPS.map((group) => [
          {
            text: user.subscribedGroups.includes(group) ? `✅ ${group}` : group,
            callback_data: `toggle_${group}`,
          },
        ]),
      };

      await bot.sendMessage(chatId, welcomeMessage, {
        reply_markup: keyboard,
      });
      return;
    }

    // Handle /mygroups command
    if (text === "/mygroups") {
      if (user.subscribedGroups.length === 0) {
        await bot.sendMessage(
          chatId,
          "You haven't joined any groups yet.\n\nUse /start to join groups."
        );
      } else {
        const groupsList = user.subscribedGroups
          .map((g) => `✅ ${g}`)
          .join("\n");
        await bot.sendMessage(
          chatId,
          `Your subscribed groups:\n\n${groupsList}`
        );
      }
      return;
    }

    // Default response for other messages
    await bot.sendMessage(
      chatId,
      "Use /start to manage your group subscriptions\nUse /mygroups to see your current groups"
    );
  } catch (error) {
    console.error("Error handling Telegram message:", error);
  }
});

// Handle callback queries (button clicks)
bot.on("callback_query", async (query) => {
  try {
    const chatId = query.message.chat.id.toString();
    const data = query.data;

    if (data.startsWith("toggle_")) {
      const groupName = data.replace("toggle_", "");
      const user = await TelegramUser.findOne({ chatId });

      if (!user) {
        await bot.answerCallbackQuery(query.id, { text: "User not found!" });
        return;
      }

      // Toggle subscription
      if (user.subscribedGroups.includes(groupName)) {
        user.subscribedGroups = user.subscribedGroups.filter(
          (g) => g !== groupName
        );
        await user.save();
        await bot.answerCallbackQuery(query.id, { text: `Left ${groupName}` });
      } else {
        user.subscribedGroups.push(groupName);
        await user.save();
        await bot.answerCallbackQuery(query.id, {
          text: `Joined ${groupName}`,
        });
      }

      // Update the keyboard
      const keyboard = {
        inline_keyboard: AVAILABLE_GROUPS.map((group) => [
          {
            text: user.subscribedGroups.includes(group) ? `✅ ${group}` : group,
            callback_data: `toggle_${group}`,
          },
        ]),
      };

      await bot.editMessageReplyMarkup(keyboard, {
        chat_id: chatId,
        message_id: query.message.message_id,
      });
    }
  } catch (error) {
    console.error("Error handling callback query:", error);
  }
});

// Send message to specific chat ID via API
async function sendMessage(req, res) {
  try {
    const { chatId, message } = req.body;

    if (!chatId || !message) {
      return res.status(400).json({
        error: "chatId and message are required",
      });
    }

    await bot.sendMessage(chatId, message);

    res.json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    res.status(500).json({
      error: "Failed to send message",
      details: error.message,
    });
  }
}

// Broadcast message to all registered users or specific group
async function broadcastMessage(req, res) {
  try {
    const { message, group } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "message is required",
      });
    }

    // Build query based on group filter
    let query = {};
    if (group) {
      if (!AVAILABLE_GROUPS.includes(group)) {
        return res.status(400).json({
          error: `Invalid group. Available groups: ${AVAILABLE_GROUPS.join(
            ", "
          )}`,
        });
      }
      query = { subscribedGroups: group };
    }

    // Get users from database
    const users = await TelegramUser.find(query);

    if (users.length === 0) {
      return res.status(404).json({
        error: group
          ? `No users found in group: ${group}`
          : "No registered users found",
      });
    }

    const results = {
      total: users.length,
      sent: 0,
      failed: 0,
      group: group || "ALL",
      errors: [],
    };

    // Send message to each user
    for (const user of users) {
      try {
        await bot.sendMessage(user.chatId, message);
        results.sent++;
        console.log(
          `Message sent to ${user.chatId} (${
            user.username || "no username"
          }) - Group: ${group || "ALL"}`
        );
      } catch (error) {
        results.failed++;
        results.errors.push({
          chatId: user.chatId,
          error: error.message,
        });
        console.error(`Failed to send to ${user.chatId}:`, error.message);
      }
    }

    res.json({
      success: true,
      message: "Broadcast completed",
      results,
    });
  } catch (error) {
    console.error("Error broadcasting message:", error);
    res.status(500).json({
      error: "Failed to broadcast message",
      details: error.message,
    });
  }
}

// Get available groups
function getGroups(req, res) {
  res.json({
    groups: AVAILABLE_GROUPS,
  });
}

export { sendMessage, broadcastMessage, getGroups };

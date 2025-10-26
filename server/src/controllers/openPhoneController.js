import axios from "axios";

const OPENPHONE_API_URL = "https://api.openphone.com/v1/messages";

// USA phone number validator
const validateUSAPhone = (phone) => {
  if (!phone) return false;
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) return true;
  if (cleaned.length === 11 && cleaned[0] === "1") return true;
  return false;
};

export async function sendMessage(req, res) {
  try {
    console.log("Request body:", req.body);
    let { content, to, phoneNumberId, userId, setInboxStatus } = req.body;

    // Parse 'to' if it's a string
    if (typeof to === "string") {
      try {
        to = JSON.parse(to);
      } catch (e) {
        return res.status(400).json({
          message: "Invalid 'to' format. Must be a valid JSON array.",
        });
      }
    }

    // Validate required fields
    if (!content || !to || !Array.isArray(to)) {
      console.log("Validation failed - content:", content, "to:", to, "isArray:", Array.isArray(to));
      return res.status(400).json({
        message: "Missing required fields: content and to (array) are required",
      });
    }

    // Validate content is not empty
    if (typeof content !== "string" || content.trim().length === 0) {
      return res.status(400).json({
        message: "Content must be a non-empty string",
      });
    }

    // Validate phone numbers are USA format
    const invalidNumbers = [];
    for (const phoneNumber of to) {
      if (!validateUSAPhone(phoneNumber)) {
        invalidNumbers.push(phoneNumber);
      }
    }

    if (invalidNumbers.length > 0) {
      return res.status(400).json({
        message: "Invalid USA phone number format",
        invalidNumbers: invalidNumbers,
        hint: "Phone numbers must be 10 digits or 11 digits starting with 1",
      });
    }

    // Prepare request payload
    const payload = {
      content,
      from: "+19786222577",
      to,
    };

    // Add optional fields if provided
    if (phoneNumberId) payload.phoneNumberId = phoneNumberId;
    if (userId) payload.userId = userId;
    if (setInboxStatus) payload.setInboxStatus = setInboxStatus;

    // Make API request to OpenPhone
    const response = await axios.post(OPENPHONE_API_URL, payload, {
      headers: {
        Authorization: process.env.OPEN_PHONE_API_KEY,
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: response.data,
    });
  } catch (error) {
    console.error("OpenPhone API Error:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || "Failed to send message",
      error: error.response?.data || error.message,
    });
  }
}

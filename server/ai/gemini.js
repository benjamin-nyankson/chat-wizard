const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Keep conversation context as an array of { role, parts } objects
let chat = null;

async function getGeminiResponse(message, history = []) {
  try {
    // Only start a chat once (if not already started)
    if (!chat) {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      chat = model.startChat({
        history: history.map(msg => ({
          role: msg.role === "assistant" ? "model" : msg.role,
          parts: [{ text: msg.content }],
        })),
      });
    }

    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't process your request.";
  }
}

module.exports = { getGeminiResponse };

import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompts } from "../utils/systemPrompts.js";
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  systemInstruction: systemPrompts.DR_POSITIVE,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

let chatHistory = [];
const chatController = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    chatHistory.push({
      role: "user",
      parts: [{ text: message }],
    });

    // Start a chat session with the model
    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
    });

    // Send a message to the model
    const result = await chatSession.sendMessage(message);

    // Extract the response text
    const botResponse = result.response.text();

    chatHistory.push({
      role: "model",
      parts: [{ text: botResponse }],
    });

    res.status(200).json({ message: botResponse });
  } catch (error) {
    console.error("Error:", error.message || error);
    res
      .status(500)
      .json({ error: error.message || "An unexpected error occurred." });
  }
};

export default chatController;

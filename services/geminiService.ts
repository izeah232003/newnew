
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getSpiritualGuidance = async (userMood: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user is feeling ${userMood} on their spiritual journey. Provide a warm, encouraging 2-3 sentence guide and a relevant Bible verse with its reference. Format as JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            message: {
              type: Type.STRING,
              description: "A warm, encouraging guide based on the journey theme."
            },
            verse: {
              type: Type.STRING,
              description: "A relevant Bible verse text."
            },
            reference: {
              type: Type.STRING,
              description: "The Bible verse reference (e.g., Psalm 23:1)."
            }
          },
          required: ["message", "verse", "reference"]
        },
      },
    });

    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("No response from pathfinder");
  } catch (error) {
    console.error("Error fetching guidance:", error);
    return {
      message: "Even when the path is foggy, Grace is your steady guide. Take a moment to rest in His presence today.",
      verse: "The Lord is my shepherd; I shall not want.",
      reference: "Psalm 23:1"
    };
  }
};

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { animal_name } = req.body;
  if (!animal_name) return res.status(400).json({ error: "animal_name is required" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `3 facts about ${animal_name}`,
    });

    res.send(response.text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch facts" });
  }
}

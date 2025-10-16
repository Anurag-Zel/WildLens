import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Allow browser requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const { animal_name } = req.body;
  if (!animal_name) return res.status(400).json({ error: "animal_name is required" });

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: `3 facts about ${animal_name}`,
    });

    res.status(200).send(response.text);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch facts" });
  }
}

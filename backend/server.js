import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai"

dotenv.config()

const app = express()
const port = process.env.SERVER_PORT
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.use(cors())
app.use(express.json())

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

app.get('/', async(req,res) => {
    res.send("Welcome")
})

app.post("/gemini", async(req, res) => {
    const { animal_name } = req.body;
    if (!animal_name) {
        return res.status(400).json({ error: "animal_name is required" });
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: `3 facts about ${animal_name}`,
        });
        res.send(response.text);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch facts" });
    }
});

app.post("/classify", async (req, res) => {
    const { img_url } = req.body

    if (!img_url) {
        return res.status(400).json({ error: "img_url is required" })
    }

    try {
        const response = await fetch("https://animal-image-classifier-7212.onrender.com/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image_url: img_url })  // 
        })

        const data = await response.json()

        if (!response.ok) {
            return res.status(response.status).json(data)
        }

        return res.json({
            label: data.label,
            index: data.index
        })

    } catch (error) {
        console.error("Error while calling classifier:", error)
        return res.status(500).json({ error: "Failed to fetch prediction" })
    }
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
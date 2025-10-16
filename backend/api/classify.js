export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const { img_url } = req.body;
  if (!img_url) return res.status(400).json({ error: "img_url is required" });

  try {
    const response = await fetch("https://animal-image-classifier-7212.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: img_url }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(response.status).json(data);

    res.json({ label: data.label, index: data.index });
  } catch (err) {
    console.error("Error while calling classifier:", err);
    res.status(500).json({ error: "Failed to fetch prediction" });
  }
}

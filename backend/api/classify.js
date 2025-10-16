export default async function handler(req, res) {
  // Allow browser requests
  res.setHeader("Access-Control-Allow-Origin", "*"); // <- crucial
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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

    return res.status(200).json({ label: data.label, index: data.index });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch prediction" });
  }
}

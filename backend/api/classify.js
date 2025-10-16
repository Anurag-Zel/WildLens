export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { img_url } = req.body;

  if (!img_url) {
    return res.status(400).json({ error: "img_url is required" });
  }

  try {
    // ✅ Use dynamic import to access fetch properly in Vercel Edge/Node runtimes
    const response = await fetch("https://animal-image-classifier-7212.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: img_url })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    // ✅ Explicit CORS headers so browser accepts it
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.json({
      label: data.label,
      index: data.index
    });
  } catch (error) {
    console.error("Error while calling classifier:", error);
    return res.status(500).json({ error: "Failed to fetch prediction" });
  }
}

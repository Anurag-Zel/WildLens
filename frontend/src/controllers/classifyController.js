export const classifyAnimal = async (img_url) => {
  try {
    const response = await fetch("https://wild-lens-eight.vercel.app/api/classify.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img_url })
    });

    const data = await response.json();
    return data.label || "Unknown";
  } catch (err) {
    console.log(err)
    return "Error identifying image";
  }
};

export const classifyAnimal = async (img_url) => {
  try {
    const response = await fetch("http://localhost:4000/classify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img_url })
    });

    const data = await response.json();
    return data.label || "Unknown";
  } catch (err) {
    return "Error identifying image";
  }
};

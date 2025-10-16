import React, { useState } from "react";
import { classifyAnimal } from "../controllers/classifyController";

const HomePage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facts, setFacts] = useState([]);
  const [loadingFacts, setLoadingFacts] = useState(false);

  // Capitalize first letter
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Predict animal
  const handleClassify = async () => {
    if (!imgUrl) return alert("Please enter an image URL");

    setLoading(true);
    setResult(null);
    setFacts([]); // reset facts if user changes image

    const label = await classifyAnimal(imgUrl);
    setResult(capitalize(label)); // capitalize the prediction
    setLoading(false);
  };

  // Parse the text into facts
  const parseFacts = (text) => {
    // Remove introductory sentence like "Here are 3 facts about tigers:"
    let cleanedText = text.replace(/^.*?:\s*/, "").trim();

    // Remove leading numbers like 1., 2., 3.
    cleanedText = cleanedText.replace(/\d+\.\s*/g, "");

    // Split into facts by double newlines or single newline
    const factsArray = cleanedText
      .split(/\n{1,2}/)
      .map(f => f.replace(/\*\*/g, "").trim()) // remove bold markdown
      .filter(f => f.length > 0);

    return factsArray;
  };

  // Fetch 3 facts from /gemini
  const handleFetchFacts = async () => {
    if (!result) return;

    setLoadingFacts(true);
    try {
      const response = await fetch("https://wild-lens-eight.vercel.app/api/gemini.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animal_name: result }),
      });

      const text = await response.text();

      // Remove introductory sentence like "Here are 3 facts about tigers:"
      let cleanedText = text.replace(/^.*?:\s*/, "").trim();

      const factsArray = parseFacts(cleanedText);
      setFacts(factsArray);
    } catch (error) {
      console.error("Error fetching facts:", error);
      alert("Failed to fetch facts");
    }
    setLoadingFacts(false);
  };

  const handleChange = (e) => {
    const url = e.target.value;
    setImgUrl(url);
    setPreviewUrl(url);
    setResult(null);
    setFacts([]);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>
          Welcome to <span style={{ color: "#6C63FF" }}>WildLens</span> 🐾
        </h1>
        <p style={styles.subtitle}>
          Paste an animal image URL below to identify it!
        </p>

        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter image URL"
            value={imgUrl}
            onChange={handleChange}
            style={styles.input}
          />
          <button onClick={handleClassify} style={styles.button}>
            {loading ? "Identifying..." : "Identify Animal"}
          </button>
        </div>

        {/* Preview image */}
        {previewUrl && (
          <div style={styles.previewContainer}>
            <img
              src={previewUrl}
              alt="Preview"
              style={styles.previewImage}
              onError={() => setPreviewUrl(null)}
            />
          </div>
        )}

        {/* Prediction result */}
        {result && (
          <h2 style={styles.result}>
            🧠 Prediction: <span>{result}</span>
          </h2>
        )}

        {/* Button to fetch 3 facts, only visible after prediction */}
        {result && facts.length === 0 && (
          <button onClick={handleFetchFacts} style={styles.factsButton}>
            {loadingFacts
              ? "Fetching facts..."
              : `Do you want to know 3 facts about ${result}?`}
          </button>
        )}

        {/* Facts display */}
        {facts.length > 0 && (
          <div style={styles.factsContainer}>
            <h3>📖 3 Facts about {result}:</h3>
            <ul>
              {facts.map((fact, idx) => {
                const [title, description] = fact.split(/:(.+)/); // split at first colon
                return (
                  <li key={idx} style={{ marginBottom: "12px" }}>
                    {description
                      ? (
                        <>
                          <strong>{title.trim()}:</strong> {description.trim()}
                        </>
                      )
                      : fact} {/* fallback if no colon */}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(to right, #74ebd5, #ACB6E5)",
    fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    background: "white",
    padding: "50px 40px",
    borderRadius: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
    width: "90%",
    maxWidth: "500px",
    textAlign: "center",
  },
  title: { margin: "0 0 10px", fontSize: "2.5rem", fontWeight: "700", color: "#333", lineHeight: "1.2" },
  subtitle: { marginBottom: "25px", color: "#555", fontSize: "1.1rem", fontWeight: "500" },
  inputGroup: { display: "flex", marginBottom: "20px", gap: "10px" },
  input: { flex: 1, padding: "12px", borderRadius: "12px", border: "1px solid #ccc", fontSize: "1rem", fontWeight: "500" },
  button: { padding: "12px 25px", borderRadius: "12px", background: "#6C63FF", color: "white", border: "none", cursor: "pointer", fontWeight: "600", fontSize: "1rem", transition: "background 0.3s, transform 0.2s" },
  previewContainer: { marginTop: "25px" },
  previewImage: { maxWidth: "100%", borderRadius: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" },
  result: { marginTop: "25px", fontSize: "1.5rem", fontWeight: "600", color: "#333", lineHeight: "1.3" },
  factsButton: { marginTop: "15px", padding: "10px 20px", borderRadius: "10px", background: "#FF7F50", color: "white", border: "none", cursor: "pointer", fontWeight: "600", transition: "background 0.3s" },
  factsContainer: { marginTop: "20px", textAlign: "left", background: "#f7f7f7", padding: "15px", borderRadius: "10px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)" },
};

export default HomePage;

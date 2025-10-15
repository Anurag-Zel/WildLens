import React, { useState } from "react";
import { classifyAnimal } from "../controllers/classifyController";

const HomePage = () => {
  const [imgUrl, setImgUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!imgUrl) return alert("Please enter an image URL");

    setLoading(true);
    setResult(null);

    const label = await classifyAnimal(imgUrl);
    setResult(label);
    setLoading(false);
  };

  const handleChange = (e) => {
    const url = e.target.value;
    setImgUrl(url);
    setPreviewUrl(url);
    setResult(null);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to <span style={{ color: "#6C63FF" }}>WildLens</span> 🐾</h1>
        <p style={styles.subtitle}>Paste an animal image URL below to identify it!</p>

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

        {result && <h2 style={styles.result}>🧠 Prediction: <span>{result}</span></h2>}
      </div>
    </div>
  );
};

const styles = {
  // Page background and font
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
  title: {
    margin: "0 0 10px",
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#333",
    lineHeight: "1.2",
  },
  subtitle: {
    marginBottom: "25px",
    color: "#555",
    fontSize: "1.1rem",
    fontWeight: "500",
  },
  inputGroup: { display: "flex", marginBottom: "20px", gap: "10px" },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    fontWeight: "500",
  },
  button: {
    padding: "12px 25px",
    borderRadius: "12px",
    background: "#6C63FF",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "background 0.3s, transform 0.2s",
  },
  previewContainer: { marginTop: "25px" },
  previewImage: {
    maxWidth: "100%",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
  },
  result: {
    marginTop: "25px",
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#333",
    lineHeight: "1.3",
  },
};

export default HomePage;

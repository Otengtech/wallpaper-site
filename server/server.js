import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

const API_KEY = "6RVEhwZ9Tdnfw1ke6dTfcMAHtDDjA1EG";

app.get("/api/wallpapers", async (req, res) => {
  const category = req.query.category || "all";
  const page = req.query.page || 1;

  let query = category;
  let resolution = "3840x2160";
  let url = `https://wallhaven.cc/api/v1/search?apikey=${API_KEY}&page=${page}&sorting=random&resolutions=${resolution}`;

  if (category !== "all") {
    url += `&q=${encodeURIComponent(category)}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (e) {
    console.log("Backend error:", e);
    res.status(500).json({ error: "Failed to fetch wallpapers" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

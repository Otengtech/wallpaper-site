import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";

const app = express();
app.use(cors());

const API_KEY = "6RVEhwZ9Tdnfw1ke6dTfcMAHtDDjA1EG";
const cache = new NodeCache({ stdTTL: 30 }); // cache for 30 seconds

app.get("/api/wallpapers", async (req, res) => {
  const category = req.query.category || "all";
  const page = req.query.page || 1;

  // Build Wallhaven API URL
  let resolution = "3840x2160"; // 4K
  let url = `https://wallhaven.cc/api/v1/search?apikey=${API_KEY}&page=${page}&sorting=random&resolutions=${resolution}`;

  if (category !== "all") {
    url += `&q=${encodeURIComponent(category)}`;
  }

  try {
    // Return cached data if exists
    const cachedData = cache.get(url);
    if (cachedData) return res.json(cachedData);

    // Fetch from Wallhaven using axios
    const response = await axios.get(url, { timeout: 7000 });
    let data = response.data;

    // Shuffle results for extra randomness
    if (data.data && Array.isArray(data.data)) {
      data.data = data.data.sort(() => Math.random() - 0.5);
    }

    // Cache the response
    cache.set(url, data);

    res.json(data);
  } catch (err) {
    console.error("Backend error:", err.message);
    res.status(500).json({ error: "Failed to fetch wallpapers" });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

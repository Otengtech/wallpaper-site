import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";

const app = express();
app.use(cors());

const PEXELS_API_KEY = "Rwm0ojPUYWYH2Ch1an2FYHFzsVoR0Wy4fg07llpObQkB65IiAE89ssLK"; // keep secret
const cache = new NodeCache({ stdTTL: 30 }); // cache for 30 seconds

app.get("/api/wallpapers", async (req, res) => {
  const category = req.query.category || "nature";
  const page = req.query.page || 1;
  const perPage = 20;

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(category)}&orientation=portrait&per_page=${perPage}&page=${page}`;

  try {
    // Check cache
    const cachedData = cache.get(url);
    if (cachedData) return res.json(cachedData);

    // Fetch from Pexels
    const response = await axios.get(url, {
      headers: { Authorization: PEXELS_API_KEY },
      timeout: 7000,
    });

    let data = response.data;

    // Shuffle results for randomness
    if (data.photos && Array.isArray(data.photos)) {
      data.photos = data.photos.sort(() => Math.random() - 0.5);
    }

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

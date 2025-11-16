import express from "express";
import axios from "axios";
import cors from "cors";
import NodeCache from "node-cache";

const app = express();
app.use(cors());

const API_KEY = "6RVEhwZ9Tdnfw1ke6dTfcMAHtDDjA1EG";
const cache = new NodeCache({ stdTTL: 30 });

app.get("/api/wallpapers", async (req, res) => {
  const category = req.query.category || "all";
  const page = req.query.page || 1;

  // Enhanced portrait filtering
  const resolution = "1080x1920";
  const ratios = "9x16,10x16,9x18"; // Multiple portrait ratios
  const purity = "100"; // SFW content only

  let url = `https://wallhaven.cc/api/v1/search?apikey=${API_KEY}&page=${page}&sorting=random&resolutions=${resolution}&ratios=${ratios}&purity=${purity}`;
  
  if (category !== "all") {
    url += `&q=${encodeURIComponent(category)}`;
  }

  try {
    const cachedData = cache.get(url);
    if (cachedData) return res.json(cachedData);

    const response = await axios.get(url, { timeout: 7000 });
    let data = response.data;

    // Filter to ensure only portrait images
    if (data.data && Array.isArray(data.data)) {
      data.data = data.data
        .filter(wallpaper => {
          // Additional client-side ratio validation
          const ratio = wallpaper.ratio;
          if (!ratio) return true;
          
          const [width, height] = ratio.split(':').map(Number);
          return height > width; // Ensure portrait orientation
        })
        .sort(() => Math.random() - 0.5);
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
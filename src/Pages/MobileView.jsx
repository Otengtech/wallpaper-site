import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaDownload,
  FaBars,
  FaTimes,
  FaLeaf,
  FaPalette,
  FaThLarge,
  FaCity,
  FaRocket,
  FaCat,
  FaCar,
  FaCloud,
  FaRegMoon,
  FaSun,
  FaGripHorizontal,
  FaCameraRetro,
  FaTachometerAlt,
  FaMountain,
  FaWater,
  FaStar,
  FaTheaterMasks,
} from "react-icons/fa";

const iconMap = {
  all: <FaTachometerAlt />,
  nature: <FaLeaf />,
  abstract: <FaPalette />,
  minimal: <FaThLarge />,
  city: <FaCity />,
  space: <FaRocket />,
  animals: <FaCat />,
  cars: <FaCar />,
  landscape: <FaMountain />,
  dark: <FaRegMoon />,
  light: <FaSun />,
  texture: <FaGripHorizontal />,
  vintage: <FaCameraRetro />,
  superhero: <FaTheaterMasks />,
  aesthetic: <FaStar />,
  gradient: <FaSun />,
  geometric: <FaThLarge />,
  floral: <FaLeaf />,
  beach: <FaWater />,
  mountains: <FaMountain />,
  cyberpunk: <FaCity />,
  fantasy: <FaRocket />,
};

const WallpapersSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const categories = [
    { id: "all", name: "All Wallpapers" },
    { id: "nature", name: "Nature" },
    { id: "landscape", name: "Landscape" },
    { id: "mountains", name: "Mountains" },
    { id: "beach", name: "Beach & Ocean" },
    { id: "city", name: "City & Urban" },
    { id: "supercars", name: "Supercars" },
    { id: "cyberpunk", name: "Cyberpunk" },
    { id: "space", name: "Space & Galaxy" },
    { id: "fantasy", name: "Fantasy" },
    { id: "abstract", name: "Abstract" },
    { id: "gradient", name: "Gradient" },
    { id: "geometric", name: "Geometric" },
    { id: "floral", name: "Floral" },
    { id: "texture", name: "Textures" },
    { id: "minimal", name: "Minimal" },
    { id: "aesthetic", name: "Aesthetic" },
    { id: "dark", name: "Dark Mode" },
    { id: "light", name: "Light Mode" },
    { id: "vintage", name: "Vintage" },
    { id: "superhero", name: "Superhero" },
  ];

  // High-resolution 
  const getMobileOptimizedQuery = (category) => {
    const queries = {
      all: "mobile wallpaper 4k portrait",
      nature: "nature wallpaper 4k mobile landscape forest",
      landscape: "landscape wallpaper 4k mobile mountains sunset",
      mountains: "mountain wallpaper 4k mobile scenic",
      beach: "beach ocean wallpaper 4k mobile tropical",
      city: "city urban wallpaper 4k mobile skyscraper night",
      cyberpunk: "cyberpunk wallpaper 4k mobile neon futuristic",
      supercars: "supercar luxury sports car wallpaper 4k mobile ferrari lamborghini porsche bugatti",
      space: "space galaxy wallpaper 4k mobile universe stars",
      fantasy: "fantasy wallpaper 4k mobile digital art",
      abstract: "abstract wallpaper 4k mobile colorful art",
      gradient: "gradient wallpaper 4k mobile colorful",
      geometric: "geometric wallpaper 4k mobile pattern",
      floral: "floral wallpaper 4k mobile flowers",
      texture: "texture wallpaper 4k mobile pattern",
      minimal: "minimal wallpaper 4k mobile simple clean",
      aesthetic: "aesthetic wallpaper 4k mobile artistic",
      dark: "dark wallpaper 4k mobile amoled black",
      light: "light wallpaper 4k mobile bright white",
      vintage: "vintage wallpaper 4k mobile retro",
      superhero: "superhero wallpaper 4k mobile marvel dc",
    };
    return queries[category] || queries.all;
  };

  useEffect(() => {
    const container = document.getElementById("ad-container-300x250");
    if (container) {
      container.innerHTML = "";
      const script = document.createElement("script");
      script.innerHTML = `
        atOptions = {
          'key' : '6676d68ba7d23941b9617404b8afd159',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      container.appendChild(script);

      const script2 = document.createElement("script");
      script2.src = "//www.highperformanceformat.com/6676d68ba7d23941b9617404b8afd159/invoke.js";
      script2.async = true;
      container.appendChild(script2);
    }
  }, []);

  const fetchWallpapers = async (category = "all", pageNum = 1) => {
    try {
      setIsLoading(true);
      
      const query = getMobileOptimizedQuery(category);
      
      // Use search endpoint for more relevant results
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          query
        )}&page=${pageNum}&per_page=20&orientation=portrait&client_id=${accessKey}`
      );

      if (!res.ok) throw new Error(`API response: ${res.status}`);
      
      const data = await res.json();
      
      // Get high-quality images only
      const highResWallpapers = Array.isArray(data.results) 
        ? data.results.filter(wallpaper => 
            wallpaper.width >= 2000 && wallpaper.height >= 3000 // Minimum 2000x3000 for good mobile quality
          )
        : [];
      
      setWallpapers(highResWallpapers.slice(0, 16));
      
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
      
      // Fallback to random photos if search fails
      try {
        const fallbackRes = await fetch(
          `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
            "wallpaper 4k"
          )}&count=16&orientation=portrait&client_id=${accessKey}`
        );
        
        if (fallbackRes.ok) {
          const fallbackData = await fallbackRes.json();
          setWallpapers(Array.isArray(fallbackData) ? fallbackData : []);
        } else {
          setWallpapers([]);
        }
      } catch (fallbackErr) {
        console.error("Fallback also failed:", fallbackErr);
        setWallpapers([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchWallpapers(selectedCategory);
  }, [selectedCategory]);

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchWallpapers(selectedCategory, nextPage);
  };

  const handlePrevious = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchWallpapers(selectedCategory, prevPage);
    }
  };

  const handleDownload = async (wallpaper) => {
    try {
      // Use the highest quality available
      const downloadUrl = wallpaper.urls.raw + "&w=2160&q=85"; // 4K quality
      const response = await fetch(downloadUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `wallpaper-${wallpaper.id}-4k.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      // Fallback to regular URL
      const link = document.createElement("a");
      link.href = wallpaper.urls.full;
      link.download = `wallpaper-${wallpaper.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, y: -4 },
  };

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar for md+ */}
        <div className="hidden md:flex flex-col w-64 flex-shrink-0 gap-3">
          <h3 className="text-xl font-bold mb-3">Categories</h3>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                selectedCategory === cat.id
                  ? "bg-purple-600/30 text-white border border-purple-500/40"
                  : "bg-transparent text-gray-300 hover:bg-white/10"
              }`}
            >
              <span className="text-xl">
                {iconMap[cat.id] || <FaPalette />}
              </span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1">
          {/* Mobile menu button */}
          <div className="md:hidden mb-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsMenuOpen(true)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
            >
              <FaBars size={18} /> Browse Categories
            </motion.button>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              4K Mobile Wallpapers{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Collection
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Ultra HD mobile wallpapers optimized for modern smartphones. Download in 4K quality.
            </p>
          </motion.div>

          {/* Wallpapers Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full"
              />
            </div>
          ) : wallpapers.length > 0 ? (
            <motion.div
              layout
              className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              {wallpapers.map((wall) => (
                <motion.div
                  key={wall.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedWallpaper(wall)}
                >
                  <img
                    src={wall.urls.regular}
                    alt={wall.alt_description || "4K Mobile Wallpaper"}
                    className="w-full h-auto object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
                    loading="lazy"
                  />

                  {/* Quality Badge */}
                  <div className="absolute top-3 right-3 bg-green-600/90 text-white px-2 py-1 rounded-full text-xs font-bold">
                    4K
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                    <h4 className="text-sm font-semibold line-clamp-2 mb-2">
                      {wall.alt_description || "Premium Wallpaper"}
                    </h4>
<<<<<<< HEAD
                    <p className="text-xs text-gray-300 mb-3">
                      {wall.width} × {wall.height}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWallpaper(wall);
                        }}
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                      >
                        Preview
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(wall);
                        }}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                      >
                        <FaDownload size={14} /> Download 4K
=======
                    <div className="flex gap-2">
                     <button
                            onClick={() => setSelectedWallpaper(wall)}
                            className="bg-white text-black px-3 py-1 rounded-full text-xs hover:bg-gray-200 transition"
                          >
                            View
                          </button>


                      <button
                        onClick={() =>
                          handleDownload(wall.urls.full, wall.id + ".jpg")
                        }
                        className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                      >
                        <FaDownload size={14} />
>>>>>>> ee12a9df046a2240e77ffc61d04bd97939276356
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No high-resolution wallpapers found. Try another category.</p>
            </div>
          )}

          <div className="my-6 flex justify-center">
            <div id="ad-container-300x250"></div>
          </div>

          {/* Pagination */}
          {wallpapers.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-3 text-gray-400 text-sm">
                Page {page} • {wallpapers.length} wallpapers
              </span>
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl border-r border-white/10 p-6 flex flex-col md:hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Categories</h3>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white/80 hover:text-white p-2 rounded-lg"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="space-y-3 overflow-y-auto">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                    selectedCategory === cat.id
                      ? "bg-purple-600/30 text-white border border-purple-500/40"
                      : "bg-transparent text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl">
                    {iconMap[cat.id] || <FaPalette />}
                  </span>
                  <span>{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wallpaper Modal */}
      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
            onClick={() => setSelectedWallpaper(null)}
          >
            <div className="relative max-w-md w-full">
              <motion.img
                src={selectedWallpaper.urls.regular}
                alt={selectedWallpaper.alt_description || "4K Mobile Wallpaper"}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="w-full h-auto rounded-2xl object-contain shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              
              {/* Download button in modal */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDownload(selectedWallpaper);
                  }}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700 transition flex items-center gap-2 shadow-lg"
                >
                  <FaDownload size={16} /> Download 4K
                </button>
              </div>
              
              <button
                onClick={() => setSelectedWallpaper(null)}
                className="absolute -top-12 right-0 text-white bg-black/40 hover:bg-black/60 p-3 rounded-full"
              >
                <FaTimes size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WallpapersSection;
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
  FaMobileAlt,
  FaDesktop,
  FaRegMoon,
  FaSun,
  FaGripHorizontal,
  FaCameraRetro,
  FaTachometerAlt,
} from "react-icons/fa";

const iconMap = {
  nature: <FaLeaf />,
  abstract: <FaPalette />,
  minimal: <FaThLarge />,
  city: <FaCity />,
  space: <FaRocket />,
  animals: <FaCat />,
  cars: <FaCar />,
  sky: <FaCloud />,
  phone: <FaMobileAlt />,
  desktop: <FaDesktop />,
  dark: <FaRegMoon />,
  light: <FaSun />,
  texture: <FaGripHorizontal />,
  vintage: <FaCameraRetro />,
  all: <FaTachometerAlt />,
};

const categories = [
  { id: "all", name: "All Wallpapers" },
  { id: "nature", name: "Nature" },
  { id: "abstract", name: "Abstract" },
  { id: "minimal", name: "Minimal" },
  { id: "city", name: "City & Urban" },
  { id: "space", name: "Space & Galaxy" },
  { id: "animals", name: "Animals" },
  { id: "cars", name: "Cars & Vehicles" },
  { id: "sky", name: "Sky & Clouds" },
  { id: "phone", name: "Phone Wallpapers" },
  { id: "desktop", name: "Desktop Wallpapers" },
  { id: "dark", name: "Dark Mode" },
  { id: "light", name: "Light Mode" },
  { id: "texture", name: "Textures" },
  { id: "vintage", name: "Vintage" },
];

const WallpapersSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});

  // Build query for backend/Wallhaven
  const buildQuery = (category) => {
    if (category === "all") return "";
    const queries = {
      nature: "nature landscape forest mountain",
      abstract: "abstract digital art",
      minimal: "minimal simple",
      city: "city urban architecture",
      space: "space galaxy universe",
      animals: "animals wildlife",
      cars: "cars automotive supercars",
      sky: "sky clouds",
      phone: "mobile phone",
      desktop: "desktop 4k",
      dark: "dark black",
      light: "light white bright",
      texture: "texture pattern",
      vintage: "vintage retro",
    };
    return queries[category] || category;
  };

  // Fetch wallpapers from backend
  const fetchWallpapers = async (category = "all", pageNum = 1) => {
    try {
      setIsLoading(true);
      const query = buildQuery(category);
      const url = `http://localhost:5000/api/wallpapers?category=${query}&page=${pageNum}`;
      const res = await fetch(url);
      const data = await res.json();
      setWallpapers(data.data || []);
      preloadNextPage(data.data || [], category, pageNum + 1);
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
      setWallpapers([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Preload next page images
  const preloadNextPage = async (currentData, category, nextPageNum) => {
    try {
      const query = buildQuery(category);
      const url = `http://localhost:5000/api/wallpapers?category=${query}&page=${nextPageNum}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.data) {
        data.data.forEach((wall) => {
          const img = new Image();
          img.src = wall.path; // preload 3K preview
        });
      }
    } catch (err) {
      console.warn("Preloading next page failed:", err);
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

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleDownload = async (wallpaper) => {
    try {
      const imageUrl = wallpaper.path || wallpaper.url;
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `wallpaper-${wallpaper.id}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
      window.open(wallpaper.path || wallpaper.url, "_blank");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, y: -4 },
  };

  // Ads script
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
      script2.src =
        "//www.highperformanceformat.com/6676d68ba7d23941b9617404b8afd159/invoke.js";
      script2.async = true;
      container.appendChild(script2);
    }
  }, []);

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
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
          {/* Mobile menu */}
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
              Wallpapers{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Showcase
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Browse high-quality wallpapers with fast loading.
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
          ) : (
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
                    src={wall.thumbs?.large || wall.path}
                    alt={wall.tags?.[0]?.name || "Wallpaper"}
                    className={`w-full h-auto object-cover rounded-2xl transition duration-500 ${
                      loadedImages[wall.id]
                        ? "opacity-100 blur-0"
                        : "opacity-0 blur-xl"
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(wall.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-300 p-2 flex flex-col justify-end">
                    <h4 className="text-xs font-semibold line-clamp-1">
                      {wall.tags?.[0]?.name || "Wallpaper"}
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWallpaper(wall);
                        }}
                        className="bg-white text-black px-2 py-1 md:px-4 md:py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(wall);
                        }}
                        className="bg-purple-600 text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                      >
                        <FaDownload size={14} /> Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Ads */}
          <div className="my-6 flex justify-center">
            <div id="ad-container-300x250"></div>
          </div>

          {/* Pagination */}
          {wallpapers.length > 0 && (
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-4 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition"
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
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-0"
            onClick={() => setSelectedWallpaper(null)}
          >
            <button
              onClick={() => setSelectedWallpaper(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm"
            >
              <FaTimes size={24} />
            </button>

            <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              4K
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(selectedWallpaper);
              }}
              className="absolute bottom-4 right-4 z-10 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition flex items-center gap-2 backdrop-blur-sm"
            >
              <FaDownload size={16} /> Download
            </button>

            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedWallpaper.path}
              alt={selectedWallpaper.tags?.[0]?.name || "Wallpaper"}
              className="w-full object-cover cursor-pointer"
              onClick={(e) => e.stopPropagation()}
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WallpapersSection;

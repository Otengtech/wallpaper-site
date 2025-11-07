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

const WallpapersSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [wallpapers, setWallpapers] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null); // modal state

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

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

  useEffect(() => {
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
    document.getElementById("ad-container-300x250").appendChild(script);

    const script2 = document.createElement("script");
    script2.src =
      "//www.highperformanceformat.com/6676d68ba7d23941b9617404b8afd159/invoke.js";
    script2.async = true;
    document.getElementById("ad-container-300x250").appendChild(script2);
  }, []);

  const fetchWallpapers = async (category = "wallpapers", pageNum = 1) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${category}&page=${pageNum}&per_page=12&orientation=portrait&client_id=${accessKey}`
      );
      const data = await res.json();
      setWallpapers(data.results || []);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchWallpapers(
      selectedCategory === "all" ? "wallpapers" : selectedCategory
    );
  }, [selectedCategory]);

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after fetch
    fetchWallpapers(
      selectedCategory === "all" ? "wallpapers" : selectedCategory,
      nextPage
    );
  };

  const handlePrevious = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after fetch
      fetchWallpapers(
        selectedCategory === "all" ? "wallpapers" : selectedCategory,
        prevPage
      );
    }
  };

  const handleDownload = async (url, filename) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = filename || "wallpaper.jpg";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Download failed:", err);
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
              Wallpapers{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Showcase
              </span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base">
              Browse high-quality wallpapers (9:16 portrait) for any device.
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
              className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6"
            >
              {wallpapers.map((wall) => (
                <motion.div
                  key={wall.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300"
                >
                  <img
                    src={wall.urls.small}
                    alt={wall.alt_description || "Wallpaper"}
                    className="w-full object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-300 p-2 flex flex-col justify-end">
                    <h4 className="text-xs font-semibold line-clamp-1">
                      {wall.alt_description || "Untitled"}
                    </h4>
                    <div className="flex gap-1 mt-1">
                      <button
                        onClick={() => setSelectedWallpaper(wall)}
                        className="bg-white text-black px-2 py-1 rounded-full text-xs hover:bg-gray-200 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          handleDownload(wall.urls.full, wall.id + ".jpg")
                        }
                        className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold hover:bg-purple-700 transition flex items-center gap-1"
                      >
                        <FaDownload size={12} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="my-6 flex justify-center">
            <div id="ad-container-300x250"></div>
          </div>

          {/* Pagination */}
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-0 md:p-10"
            onClick={() => setSelectedWallpaper(null)}
          >
            <motion.img
              src={selectedWallpaper.urls.regular}
              alt={selectedWallpaper.alt_description || "Wallpaper"}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full top-0 h-full left-0 md:h-auto md:max-w-4xl object-contain cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedWallpaper(null)}
              className="absolute top-5 right-5 md:top-10 md:right-10 text-white bg-black/40 hover:bg-black/60 p-2 rounded-full"
            >
              <FaTimes size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WallpapersSection;

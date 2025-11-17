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
  all: <FaTachometerAlt />,
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

  // Fixed fetch function
  const fetchWallpapers = async (category, pg = 1) => {
    try {
      setIsLoading(true);

      const query = category === "all" ? "wallpapers" : category;

      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(
          query
        )}&count=12&orientation=portrait&client_id=${accessKey}`
      );

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setWallpapers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
      setWallpapers([]);
    } finally {
      setIsLoading(false);
    }
  };

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
    
    const container = document.getElementById("ad-container-300x250");
    if (container) {
      container.appendChild(script);

      const script2 = document.createElement("script");
      script2.src =
        "//www.highperformanceformat.com/6676d68ba7d23941b9617404b8afd159/invoke.js";
      script2.async = true;
      container.appendChild(script2);
    }
  }, []);

  // Load when category changes
  useEffect(() => {
    setPage(1);
    fetchWallpapers(selectedCategory);
  }, [selectedCategory]);

  const handleNext = () => {
    const next = page + 1;
    setPage(next);
    fetchWallpapers(selectedCategory, next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    if (page > 1) {
      const prev = page - 1;
      setPage(prev);
      fetchWallpapers(selectedCategory, prev);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Fixed download function
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
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, y: -4 },
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedWallpaper(null);
      }
    };

    if (selectedWallpaper) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedWallpaper]);

  return (
    <section className="bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6">
        {/* Sidebar (Desktop) */}
        <div className="hidden md:flex flex-col w-64 gap-3">
          <h3 className="text-xl font-bold mb-3">Categories</h3>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-3 p-4 rounded-xl transition-all ${
                selectedCategory === cat.id
                  ? "bg-purple-600/30 border border-purple-500/40"
                  : "bg-transparent text-gray-300 hover:bg-white/10"
              }`}
            >
              <span className="text-xl">{iconMap[cat.id]}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Menu */}
          <div className="md:hidden mb-6">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsMenuOpen(true)}
              className="w-full bg-white/10 p-3 rounded-xl border border-white/20 flex items-center justify-center gap-3 text-white"
            >
              <FaBars /> Browse Categories
            </motion.button>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center md:text-left mb-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Wallpapers{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Showcase
              </span>
            </h2>
            <p className="text-gray-400 text-sm">
              Browse high-quality 9:16 portrait wallpapers.
            </p>
          </motion.div>

          {/* Wallpapers Grid */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full"
              />
            </div>
          ) : (
            <motion.div 
              className="columns-2 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            >
              {wallpapers.map((wall) => (
                <motion.div
                  key={wall.id}
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-white/10 hover:border-purple-400/40 transition"
                >
                  <img
                    src={wall.urls.small}
                    alt={wall.alt_description || "Wallpaper"}
                    className="w-full object-cover rounded-2xl cursor-pointer"
                    onClick={() => setSelectedWallpaper(wall)}
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end">
                    <h4 className="text-xs font-semibold line-clamp-1 mb-2">
                      {wall.alt_description || "Untitled"}
                    </h4>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedWallpaper(wall)}
                        className="bg-white text-black px-3 py-2 rounded-full text-xs hover:bg-gray-200 transition"
                      >
                        View
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(wall.urls.full, `${wall.id}.jpg`);
                        }}
                        className="bg-purple-600 text-white px-3 py-2 rounded-full text-xs flex items-center gap-1 hover:bg-purple-700 transition"
                      >
                        <FaDownload size={12} /> 
                        <span>Download</span>
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
              className={`px-6 py-2 rounded-xl border border-white/20 hover:bg-white/10 transition ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition"
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
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 bg-black/95 p-6 z-50 md:hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Categories</h3>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition"
              >
                <FaTimes size={20} />
              </button>
            </div>

            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl transition ${
                    selectedCategory === cat.id
                      ? "bg-purple-600/30 border border-purple-500/40"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl">{iconMap[cat.id]}</span>
                  <span className="font-medium">{cat.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal View */}
      <AnimatePresence>
        {selectedWallpaper && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedWallpaper(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedWallpaper.urls.regular}
                alt={selectedWallpaper.alt_description || "Wallpaper"}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />

              {/* Download button in modal */}
              <div className="absolute bottom-4 right-4">
                <button
                  onClick={() => handleDownload(selectedWallpaper.urls.full, `${selectedWallpaper.id}.jpg`)}
                  className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition flex items-center gap-2 font-semibold"
                >
                  <FaDownload size={16} />
                  Download
                </button>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedWallpaper(null)}
                className="absolute top-4 right-4 text-white bg-black/60 hover:bg-black/80 p-3 rounded-full transition-colors"
              >
                <FaTimes size={20} />
              </button>

              {/* Image info */}
              <div className="absolute bottom-4 left-4 bg-black/60 text-white p-3 rounded-lg max-w-md">
                <p className="text-sm font-medium">
                  {selectedWallpaper.alt_description || "Beautiful wallpaper"}
                </p>
                {selectedWallpaper.user?.name && (
                  <p className="text-xs text-gray-300 mt-1">
                    by {selectedWallpaper.user.name}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WallpapersSection;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
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
  FaBars,
  FaTimes,
  FaDownload,
} from "react-icons/fa";
import AdBanner from "../Components/AdBanner";

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

const queryMap = {
  all: "wallpapers",
  phone: "phone wallpaper vertical",
  desktop: "4k desktop wallpaper",
  dark: "dark aesthetic wallpaper",
  light: "bright minimal wallpaper",
  texture: "texture pattern wallpaper",
  vintage: "vintage retro wallpaper",
};

const CollectionsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [wallpapers, setWallpapers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

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

  const categories = [
    { id: "all", name: "All Wallpapers" },
    { id: "nature", name: "Nature" },
    { id: "abstract", name: "Abstract" },
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

  const [selectedWallpaper, setSelectedWallpaper] = useState(null); // modal state

  // ✅ Fetch Wallpapers
  const fetchWallpapers = async (category) => {
    try {
      setIsLoading(true);

      const query = queryMap[category] || category;

      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${query}&count=12&client_id=${accessKey}`
      );
      const data = await res.json();
      setWallpapers(Array.isArray(data) ? data : []);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ FIX: Fetch when category changes
  useEffect(() => {
    fetchWallpapers(selectedCategory);
  }, [selectedCategory]);

  // ✅ Download Handler
  const handleDownload = async (url, filename) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.04, y: -6 },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3 text-center">
            Explore Stunning{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
        </motion.div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-3"
          >
            <FaBars size={18} /> Browse Categories
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 bg-white/5 border border-white/10 rounded-2xl p-6">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center gap-3 my-2 p-3 rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? "bg-purple-600/30 border border-purple-400/40"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{iconMap[cat.id]}</span>
                {cat.name}
              </button>
            ))}
          </aside>

          {/* Wallpapers Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-14 h-14 border-4 border-purple-500 border-t-transparent animate-spin rounded-full" />
              </div>
            ) : (
              <>
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
                      className="break-inside-avoid group relative rounded-2xl overflow-hidden border border-white/10 bg-transparent backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300"
                    >
                      <img
                        src={wall.urls.small}
                        alt={wall.alt_description || "Wallpaper"}
                        className="w-full object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                        <h4 className="text-xs font-semibold line-clamp-1">
                          {wall.alt_description || "Untitled"}
                        </h4>

                        <div className="flex gap-1 mt-2">
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
                            className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-purple-700 transition flex items-center gap-1"
                          >
                            <FaDownload size={12} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <div className="my-6 flex justify-center">
            <div id="ad-container-300x250"></div>
          </div>

                {/* Refresh */}
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => fetchWallpapers(selectedCategory)}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                  >
                  More Images
                  </button>
                </div>
              </>
            )}
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
            className="fixed inset-0 bg-black/90 p-6 z-50"
          >
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Categories</h3>
              <button onClick={() => setIsMenuOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-4 rounded-xl text-gray-300 hover:bg-white/10"
              >
                {iconMap[cat.id]} {cat.name}
              </button>
            ))}
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
            className="fixed inset-0 z-50 h-[100vh] flex items-center justify-center bg-black/90 backdrop-blur-lg p-0 md:p-10"
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

export default CollectionsSection;

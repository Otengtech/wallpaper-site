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

const CollectionsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [wallpapers, setWallpapers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

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

  // Fetch wallpapers dynamically from Unsplash
  const fetchWallpapers = async (category = "wallpapers", pageNum = 1) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${category}&page=${pageNum}&per_page=12&client_id=${accessKey}`
      );
      const data = await res.json();
      setWallpapers(data.results || []);
      window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to top after fetch
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

  // Load next or previous pages
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

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05, y: -6 },
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

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            Explore Stunning{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <p className="text-gray-400 text-left max-w-2xl mx-auto">
            Browse high-quality wallpapers curated from Unsplash — organized by
            category.
          </p>
        </motion.div>

        {/* Mobile Menu Button (top, wide) */}
        <div className="lg:hidden mb-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsMenuOpen(true)}
            className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all duration-300"
          >
            <FaBars size={18} />
            <span className="font-medium">Browse Categories</span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Sidebar (Desktop) */}
          <motion.aside
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block w-72 flex-shrink-0 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 self-start"
          >
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.02, x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-400/40 text-white"
                      : "bg-transparent border-transparent text-gray-300 hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl">
                    {iconMap[cat.id] || <FaPalette />}
                  </span>
                  <span className="font-medium">{cat.name}</span>
                </motion.button>
              ))}
            </div>
          </motion.aside>

          {/* Wallpapers Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-14 h-14 border-4 border-purple-500 border-t-transparent rounded-full"
                />
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {wallpapers.map((wall) => (
                    <motion.div
                      key={wall.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300"
                    >
                      <img
                        src={wall.urls.small}
                        alt={wall.alt_description || "Wallpaper"}
                        className="w-full h-64 object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
                      />

                      {/* Overlay with buttons */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                        <h4 className="text-sm font-semibold line-clamp-1">
                          {wall.alt_description || "Untitled"}
                        </h4>

                        <div className="flex gap-2 mt-2">
                          <a
                            href={wall.links.html}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-black px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition"
                          >
                            View
                          </a>

                          <button
                            onClick={() =>
                              handleDownload(wall.urls.full, wall.id + ".jpg")
                            }
                            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                          >
                            <FaDownload size={14} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="my-6 flex justify-center">
                  <div id="ad-container-300x250"></div>
                </div>

                {/* Pagination Controls */}
                <div className="flex justify-center gap-4 mt-10">
                  <button
                    onClick={handlePrevious}
                    disabled={page === 1}
                    className={`px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition ${
                      page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    Previous Images
                  </button>
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition"
                  >
                    Show More Images
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Categories Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-3xl border-r border-white/10 p-6 flex flex-col"
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
    </section>
  );
};

export default CollectionsSection;

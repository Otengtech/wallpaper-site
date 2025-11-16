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
  FaExpand,
  FaCompress,
  FaSearch,
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
  const [orientation, setOrientation] = useState("portrait"); // "portrait" or "landscape"
  const [searchQuery, setSearchQuery] = useState("");

  // Build query for backend
  const buildQuery = (category) => {
    if (category === "all") return "wallpapers";
    const queries = {
      nature: "nature landscape",
      abstract: "abstract digital art", 
      minimal: "minimal simple",
      city: "city urban architecture",
      space: "space galaxy universe",
      animals: "animals wildlife",
      cars: "cars automotive",
      sky: "sky clouds",
      phone: "mobile phone",
      desktop: "desktop computer",
      dark: "dark black",
      light: "light white bright",
      texture: "texture pattern",
      vintage: "vintage retro",
    };
    return queries[category] || category;
  };

  // Fetch wallpapers from backend
  const fetchWallpapers = async (category = "all", pageNum = 1, orient = orientation) => {
    try {
      setIsLoading(true);
      const query = buildQuery(category);
      const url = `https://wallpaper-site-lojq.onrender.com/api/wallpapers?category=${query}&page=${pageNum}&orientation=${orient}`;
      const res = await fetch(url);
      const data = await res.json();
      setWallpapers(data.photos || []);
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
      setWallpapers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchWallpapers(selectedCategory, 1, orientation);
  }, [selectedCategory, orientation]);

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchWallpapers(selectedCategory, nextPage, orientation);
  };

  const handlePrevious = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchWallpapers(selectedCategory, prevPage, orientation);
    }
  };

  const toggleOrientation = () => {
    setOrientation(prev => prev === "portrait" ? "landscape" : "portrait");
    setPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory(searchQuery.trim());
      setPage(1);
      setSearchQuery("");
    }
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const handleDownload = async (wallpaper) => {
    try {
      const imageUrl = wallpaper.src.original;
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
      window.open(wallpaper.src.original, "_blank");
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
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-3">Categories</h3>
            
            {/* Orientation Toggle */}
            <div className="mb-4 p-3 bg-gray-800 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">View Mode:</span>
                <button
                  onClick={toggleOrientation}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs transition-all ${
                    orientation === "portrait"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {orientation === "portrait" ? <FaMobileAlt /> : <FaDesktop />}
                  {orientation === "portrait" ? "Mobile" : "Desktop"}
                </button>
              </div>
              <p className="text-xs text-gray-400">
                {orientation === "portrait" ? "9:16 Portrait" : "16:9 Landscape"}
              </p>
            </div>

            {/* Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                <input
                  type="text"
                  placeholder="Search wallpapers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

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
          {/* Mobile menu and controls */}
          <div className="md:hidden mb-6 space-y-4">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsMenuOpen(true)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white py-3 rounded-xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all"
            >
              <FaBars size={18} /> Browse Categories
            </motion.button>

            {/* Mobile Orientation Toggle */}
            <div className="flex items-center justify-between bg-gray-800/50 p-3 rounded-xl">
              <span className="text-sm">View Mode:</span>
              <button
                onClick={toggleOrientation}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  orientation === "portrait"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {orientation === "portrait" ? <FaMobileAlt /> : <FaDesktop />}
                {orientation === "portrait" ? "Mobile (9:16)" : "Desktop (16:9)"}
              </button>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search wallpapers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </form>
          </div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                    Wallpapers
                  </span>
                </h2>
                <p className="text-gray-400 text-sm md:text-base">
                  {orientation === "portrait" 
                    ? "Beautiful mobile wallpapers (9:16)" 
                    : "Stunning desktop wallpapers (16:9)"
                  }
                </p>
              </div>
              
              {/* Desktop Orientation Toggle */}
              <div className="hidden md:flex items-center gap-4 mt-4 md:mt-0">
                <div className="text-right">
                  <div className="text-sm text-gray-400">Current View</div>
                  <div className="text-lg font-semibold">
                    {orientation === "portrait" ? "Mobile (9:16)" : "Desktop (16:9)"}
                  </div>
                </div>
                <button
                  onClick={toggleOrientation}
                  className={`p-3 rounded-xl border transition-all ${
                    orientation === "portrait"
                      ? "bg-purple-600 border-purple-500 text-white"
                      : "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                  }`}
                >
                  {orientation === "portrait" ? <FaMobileAlt size={20} /> : <FaDesktop size={20} />}
                </button>
              </div>
            </div>
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
              className={`gap-6 space-y-6 ${
                orientation === "portrait" 
                  ? "columns-2 sm:columns-2 md:columns-3 xl:columns-4"
                  : "columns-2 md:columns-2 xl:columns-3"
              }`}
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
                    src={wall.src.medium}
                    alt={wall.photographer}
                    className={`w-full h-auto object-cover rounded-2xl transition duration-500 ${
                      orientation === "portrait" ? "aspect-[9/16]" : "aspect-video"
                    } ${
                      loadedImages[wall.id]
                        ? "opacity-100 blur-0"
                        : "opacity-0 blur-xl"
                    }`}
                    loading="lazy"
                    onLoad={() => handleImageLoad(wall.id)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition duration-300 p-2 flex flex-col justify-end">
                    <h4 className="text-xs font-semibold line-clamp-1">
                      by {wall.photographer}
                    </h4>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedWallpaper(wall);
                        }}
                        className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(wall);
                        }}
                        className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition flex items-center gap-2"
                      >
                        <FaDownload size={14} /> Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* No Results */}
          {!isLoading && wallpapers.length === 0 && (
            <div className="text-center py-20">
              <div className="text-gray-400 text-lg mb-2">No wallpapers found</div>
              <div className="text-gray-500 text-sm">Try a different category or search term</div>
            </div>
          )}

          {/* Ads */}
          <div className="my-6 flex justify-center">
            <div id="ad-container-300x250"></div>
          </div>

          {/* Pagination */}
          {wallpapers.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={handlePrevious}
                disabled={page === 1}
                className={`px-6 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition flex items-center gap-2 ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Previous
              </button>
              
              <div className="text-gray-300 text-sm">
                Page {page} • {orientation === "portrait" ? "Mobile" : "Desktop"} View
              </div>
              
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition flex items-center gap-2"
              >
                Next Page
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
            
            {/* Mobile Search in Drawer */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search wallpapers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </form>
            
            <div className="space-y-3 overflow-y-auto flex-1">
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
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
            onClick={() => setSelectedWallpaper(null)}
          >
            <button
              onClick={() => setSelectedWallpaper(null)}
              className="absolute top-4 right-4 z-10 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full backdrop-blur-sm"
            >
              <FaTimes size={24} />
            </button>

            <div className="absolute top-4 left-4 z-10 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              {orientation === "portrait" ? "4K Mobile" : "4K Desktop"}
            </div>

            <div className="absolute top-4 left-32 z-10 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
              by {selectedWallpaper.photographer}
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
              src={selectedWallpaper.src.large2x}
              alt={selectedWallpaper.photographer}
              className="max-w-full max-h-full object-contain cursor-pointer"
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
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";

const Popular = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1); // current page
  const [selectedWallpaper, setSelectedWallpaper] = useState(null); // modal state
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // Categories you want to fetch
  const categories = [
    "fast super cars",
    "beautiful places",
    "abstract",
    "nature",
  ];

  // Fetch wallpapers from Unsplash
  const fetchPopularWallpapers = async (pageNum = 1) => {
    try {
      setIsLoading(true);

      // Fetch all categories in parallel
      const promises = categories.map((category) =>
        fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            category
          )}&per_page=6&page=${pageNum}&client_id=${accessKey}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);

      // Combine results from all categories
      const combinedWallpapers = results.flatMap((res) => res.results || []);
      setWallpapers(combinedWallpapers);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Error fetching wallpapers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularWallpapers(page);
  }, [page]);

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, y: -5 },
  };

  // Download function
  const handleDownload = async (url, name) => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("Error downloading image:", err);
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
    document.getElementById("ad-container-300x250").appendChild(script);

    const script2 = document.createElement("script");
    script2.src =
      "//www.highperformanceformat.com/6676d68ba7d23941b9617404b8afd159/invoke.js";
    script2.async = true;
    document.getElementById("ad-container-300x250").appendChild(script2);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            Most <span className="text-purple-500">Popular</span> Wallpapers
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore the most beautiful wallpapers of fast cars, nature, abstract
            art, and stunning places.
          </p>
        </motion.div>

        <div className="my-6 flex justify-center">
          <div id="ad-container-300x250"></div>
        </div>

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
          <>
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
                  className="break-inside-avoid group relative overflow-hidden rounded-2xl border border-white/10 bg-transparent backdrop-blur-xl hover:border-purple-400/40 transition-all duration-300"
                >
                  <img
                    src={wall.urls.small}
                    alt={wall.alt_description || "Wallpaper"}
                    className="w-full object-cover rounded-2xl group-hover:opacity-90 transition duration-300"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300 p-4 flex flex-col justify-end">
                    <h4 className="text-sm font-semibold line-clamp-1 mb-2">
                      {wall.alt_description || "Untitled"}
                    </h4>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedWallpaper(wall)}
                        className="bg-white text-black px-3 md:px-4 py-2 rounded-full text-xs hover:bg-gray-200 transition"
                      >
                        View
                      </button>

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

            {/* Pagination Buttons */}
            <div className="flex justify-center mt-10 gap-4">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
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

export default Popular;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaDownload, FaTimes } from "react-icons/fa";

const Popular = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedWallpaper, setSelectedWallpaper] = useState(null);
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const categories = [
    "fast super cars",
    "beautiful places",
    "abstract",
    "nature",
  ];

  const fetchPopularWallpapers = async (pageNum = 1) => {
    try {
      setIsLoading(true);

      const promises = categories.map((category) =>
        fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
            category
          )}&per_page=6&page=${pageNum}&client_id=${accessKey}`
        ).then((res) => res.json())
      );

      const results = await Promise.all(promises);
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
      {selectedWallpaper && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-lg p-4"
          onClick={() => setSelectedWallpaper(null)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative max-w-6xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedWallpaper.urls.regular}
              alt={selectedWallpaper.alt_description || "Wallpaper"}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />
            
            {/* Download button in modal */}
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => handleDownload(selectedWallpaper.urls.full, selectedWallpaper.id + ".jpg")}
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
    </section>
  );
};

export default Popular;
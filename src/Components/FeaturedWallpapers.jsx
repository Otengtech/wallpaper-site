import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const FeaturedWallpapers = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const wallpapers = [
    {
      id: 1,
      title: "Northern Lights",
      category: "nature",
      image:
        "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=1000&q=80",
      downloads: "12.4K",
      resolution: "4K",
    },
    {
      id: 2,
      title: "Mountain Lake",
      category: "nature",
      image:
        "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1000&q=80",
      downloads: "8.7K",
      resolution: "8K",
    },
    {
      id: 3,
      title: "Cyber City",
      category: "city",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      downloads: "15.2K",
      resolution: "4K",
    },
    {
      id: 4,
      title: "Abstract Waves",
      category: "abstract",
      image:
        "https://images.unsplash.com/photo-1579546929662-711aa81148cf?auto=format&fit=crop&w=1000&q=80",
      downloads: "9.3K",
      resolution: "4K",
    },
  ];

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, duration: 0.8 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, y: -10, transition: { duration: 0.3 } },
  };

  // Handle image download
  const handleDownload = (imageUrl, title) => {
    fetch(imageUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${title}.jpg`;
        link.click();
        URL.revokeObjectURL(link.href);
      });
  };

  // Auto slide effect (for small screens)
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % wallpapers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  // Swipe gestures
  const handleTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e) => (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextImage();
    else if (distance < -50) prevImage();
  };

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % wallpapers.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev === 0 ? wallpapers.length - 1 : prev - 1));



  return (
    <section
      id="featured"
      className="py-20 bg-gradient-to-br from-gray-900 to-black relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Wallpapers
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore and download high-quality wallpapers for your setup.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {wallpapers.map((wallpaper) => (
            <motion.div
              key={wallpaper.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onHoverStart={() => setHoveredCard(wallpaper.id)}
              onHoverEnd={() => setHoveredCard(null)}
              onClick={() => setSelectedImage(wallpaper)}
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredCard === wallpaper.id ? 1 : 0,
                    y: hoveredCard === wallpaper.id ? 0 : 20,
                  }}
                  className="absolute bottom-4 left-4 right-4"
                >
                  <div className="flex justify-between items-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(wallpaper.image, wallpaper.title);
                      }}
                      className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm"
                    >
                      Download
                    </motion.button>
                    <div className="text-white text-sm">
                      {wallpaper.resolution}
                    </div>
                  </div>
                </motion.div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold mb-2 line-clamp-1">
                  {wallpaper.title}
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400 capitalize">
                    {wallpaper.category}
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {wallpaper.downloads}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 md:text-center hidden md:block text-left">
          <Link
            to="/collections"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 px-6 mt-4 py-3 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Browse Wallpapers
          </Link>
        </div>

        {/* Mobile Slider */}
        <div
          className="sm:hidden relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {wallpapers.map((wallpaper) => (
              <div
                key={wallpaper.id}
                className="min-w-full relative"
                onClick={() => setSelectedImage(wallpaper)}
              >
                <img
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(wallpaper.image, wallpaper.title);
                    }}
                    className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm"
                  >
                    Download
                  </button>
                  <div className="text-white text-sm">
                    {wallpaper.resolution}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
        <div className="mt-6 md:text-center block md:hidden text-left">
          <Link
            to="/collections"
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 px-6 mt-4 py-3 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Browse Wallpapers
          </Link>
        </div>

        {/* Modal Viewer */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)} // Close when clicking outside
            >
              <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()} // prevent modal close when clicking image
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-6 right-3 text-white text-3xl font-bold hover:text-cyan-400"
                >
                  &times;
                </button>
                <motion.img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="w-full max-h-[80vh] object-contain rounded-2xl"
                />
                <div className="text-center mt-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() =>
                      handleDownload(selectedImage.image, selectedImage.title)
                    }
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold"
                  >
                    Download
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturedWallpapers;

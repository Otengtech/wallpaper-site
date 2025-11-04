import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const CollectionsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [visibleImages, setVisibleImages] = useState(12);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollContainerRef = useRef(null);

  // Extended categories with icons and counts
  const categories = [
    { id: 'all', name: 'All Wallpapers', icon: '🌅', count: 1250 },
    { id: 'nature', name: 'Nature', icon: '🏞️', count: 320 },
    { id: 'abstract', name: 'Abstract', icon: '🎨', count: 180 },
    { id: 'minimal', name: 'Minimal', icon: '⚪', count: 150 },
    { id: 'city', name: 'City & Urban', icon: '🏙️', count: 210 },
    { id: 'space', name: 'Space & Galaxy', icon: '🚀', count: 95 },
    { id: 'anime', name: 'Anime', icon: '🇯🇵', count: 165 },
    { id: 'animals', name: 'Animals', icon: '🐆', count: 140 },
    { id: 'cars', name: 'Cars & Vehicles', icon: '🏎️', count: 88 },
    { id: 'sky', name: 'Sky & Clouds', icon: '☁️', count: 120 },
    { id: 'art', name: 'Digital Art', icon: '👨‍🎨', count: 195 },
    { id: 'phone', name: 'Phone Wallpapers', icon: '📱', count: 430 },
    { id: 'tablet', name: 'Tablet Wallpapers', icon: '📟', count: 280 },
    { id: 'desktop', name: 'Desktop Wallpapers', icon: '💻', count: 340 },
    { id: 'gradient', name: 'Gradient', icon: '🌈', count: 110 },
    { id: 'dark', name: 'Dark Mode', icon: '🌙', count: 175 },
    { id: 'light', name: 'Light Mode', icon: '☀️', count: 130 },
    { id: 'texture', name: 'Textures', icon: '🧱', count: 85 },
    { id: 'pattern', name: 'Patterns', icon: '🔷', count: 75 },
    { id: 'vintage', name: 'Vintage', icon: '📻', count: 65 },
  ];

  // Sample wallpapers data
  const wallpapers = [
    // Nature
    { id: 1, category: 'nature', title: "Mountain Lake", resolution: "4K", downloads: "12.4K", premium: false, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { id: 2, category: 'nature', title: "Forest Path", resolution: "8K", downloads: "8.7K", premium: true, url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // Abstract
    { id: 3, category: 'abstract', title: "Color Waves", resolution: "4K", downloads: "15.2K", premium: false, url: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // City
    { id: 4, category: 'city', title: "Cyber City", resolution: "4K", downloads: "9.3K", premium: false, url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // Space
    { id: 5, category: 'space', title: "Deep Space", resolution: "8K", downloads: "11.8K", premium: true, url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // Animals
    { id: 6, category: 'animals', title: "Wild Tiger", resolution: "4K", downloads: "7.6K", premium: false, url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // Phone
    { id: 7, category: 'phone', title: "Minimal Phone", resolution: "1080x1920", downloads: "23.4K", premium: false, url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // Desktop
    { id: 8, category: 'desktop', title: "Ultra Wide", resolution: "5120x1440", downloads: "18.9K", premium: true, url: "https://images.unsplash.com/photo-1501854140801-50d01698950b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    
    // Add more samples for each category...
    { id: 9, category: 'anime', title: "Anime Scene", resolution: "4K", downloads: "14.2K", premium: false, url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { id: 10, category: 'cars', title: "Sports Car", resolution: "4K", downloads: "9.8K", premium: true, url: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { id: 11, category: 'sky', title: "Sunset Clouds", resolution: "8K", downloads: "16.7K", premium: false, url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
    { id: 12, category: 'gradient', title: "Purple Gradient", resolution: "4K", downloads: "12.1K", premium: false, url: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" },
  ];

  // Filter wallpapers based on selected category
  const filteredWallpapers = selectedCategory === 'all' 
    ? wallpapers 
    : wallpapers.filter(wp => wp.category === selectedCategory);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Load more images
  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleImages(prev => prev + 12);
      setIsLoading(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="collections" className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover thousands of stunning wallpapers organized by categories. 
            Find the perfect background for every device and mood.
          </p>
        </motion.div>

        {/* Mobile Category Toggle */}
        <div className="lg:hidden mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 text-white font-semibold flex items-center justify-between"
          >
            <span>Browse Categories</span>
            <motion.span
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▼
            </motion.span>
          </motion.button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-80 flex-shrink-0"
          >
            {/* Mobile Categories Menu */}
            <AnimatePresence>
              {(isMobileMenuOpen || window.innerWidth >= 1024) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 lg:sticky lg:top-8 lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto"
                >
                  <h3 className="text-white text-lg font-semibold mb-4 flex items-center">
                    <span className="mr-2">📁</span>
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setVisibleImages(12);
                          if (window.innerWidth < 1024) {
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all duration-300 flex items-center justify-between group ${
                          selectedCategory === category.id
                            ? 'bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 text-white'
                            : 'text-gray-300 hover:bg-white/5 hover:text-white border border-transparent'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{category.icon}</span>
                          <span className="font-medium">{category.name}</span>
                        </div>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === category.id
                            ? 'bg-purple-500 text-white'
                            : 'bg-white/10 text-gray-400'
                        }`}>
                          {category.count}
                        </span>
                      </motion.button>
                    ))}
                  </div>

                  {/* Quick Filters */}
                  <div className="mt-8 pt-6 border-t border-white/10">
                    <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wider">
                      Quick Filters
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {['4K', '8K', 'Free', 'Premium'].map((filter) => (
                        <motion.button
                          key={filter}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-300 hover:text-white text-sm transition-all duration-300"
                        >
                          {filter}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Main Content Area */}
          <div className="flex-1 min-h-screen">
            {/* Category Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {categories.find(cat => cat.id === selectedCategory)?.name}
                  </h3>
                  <p className="text-gray-400">
                    {filteredWallpapers.length} wallpapers available
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <select className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="downloads">Most Downloads</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Loading Animation */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-20"
                >
                  <div className="text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
                    />
                    <p className="text-gray-400">Loading amazing wallpapers...</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wallpapers Grid */}
            {!isLoading && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                ref={scrollContainerRef}
              >
                {filteredWallpapers.slice(0, visibleImages).map((wallpaper) => (
                  <motion.div
                    key={wallpaper.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="group bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden cursor-pointer"
                  >
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <motion.img
                        src={wallpaper.url}
                        alt={wallpaper.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* Premium Badge */}
                      {wallpaper.premium && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                            PREMIUM
                          </span>
                        </div>
                      )}

                      {/* Hover Actions */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex justify-between items-center">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-black px-4 py-2 rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300"
                          >
                            Download
                          </motion.button>
                          <div className="text-white text-sm bg-black/50 rounded-full px-3 py-1">
                            {wallpaper.resolution}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-4">
                      <h3 className="text-white font-semibold mb-2 line-clamp-1">
                        {wallpaper.title}
                      </h3>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-cyan-400 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                          </svg>
                          {wallpaper.downloads}
                        </span>
                        <span className="text-gray-400 capitalize">
                          {wallpaper.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Load More Button */}
            {!isLoading && visibleImages < filteredWallpapers.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadMore}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300"
                >
                  Load More Wallpapers
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CollectionsSection;
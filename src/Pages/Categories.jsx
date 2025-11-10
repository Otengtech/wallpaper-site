import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaTree,
  FaCity,
  FaStar,
  FaCar,
  FaCloud,
  FaMobileAlt,
  FaDesktop,
  FaMoon,
  FaSun,
  FaPalette,
  FaHistory,
  FaShapes,
  FaArrowRight,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CategoriesSection = () => {
  const categories = [
    {
      id: "all",
      name: "All Wallpapers",
      icon: <FaShapes />,
      description: "Browse our complete collection of stunning wallpapers",
      count: "1,250+",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      popular: true,
      to: "/collections",
    },
    {
      id: "nature",
      name: "Nature",
      icon: <FaTree />,
      description: "Breathtaking landscapes, forests, and natural wonders",
      count: "320+",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      popular: true,
      to: "/collections",
    },
    {
      id: "abstract",
      name: "Abstract",
      icon: <FaPalette />,
      description:
        "Creative patterns, geometric designs, and artistic expressions",
      count: "180+",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      to: "/collections",
    },
    {
      id: "city",
      name: "City & Urban",
      icon: <FaCity />,
      description: "Urban landscapes, skylines, and metropolitan vibes",
      count: "210+",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      to: "/collections",
    },
    {
      id: "space",
      name: "Space & Galaxy",
      icon: <FaStar />,
      description: "Cosmic wonders, galaxies, and astronomical phenomena",
      count: "95+",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      popular: true,
      to: "/collections",
    },
    {
      id: "animals",
      name: "Animals",
      icon: <FaTree />,
      description: "Wildlife, pets, and fascinating animal portraits",
      count: "140+",
      color: "from-amber-500 to-yellow-500",
      bgColor: "bg-amber-500/10",
      to: "/collections",
    },
    {
      id: "cars",
      name: "Cars & Vehicles",
      icon: <FaCar />,
      description: "Luxury cars, sports vehicles, and automotive excellence",
      count: "88+",
      color: "from-gray-500 to-blue-500",
      bgColor: "bg-gray-500/10",
      to: "/collections",
    },
    {
      id: "sky",
      name: "Sky & Clouds",
      icon: <FaCloud />,
      description: "Dramatic skies, sunsets, and cloud formations",
      count: "120+",
      color: "from-sky-500 to-blue-500",
      bgColor: "bg-sky-500/10",
      to: "/collections",
    },
    {
      id: "phone",
      name: "Phone Wallpapers",
      icon: <FaMobileAlt />,
      description: "Optimized for mobile devices with perfect aspect ratios",
      count: "430+",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-500/10",
      popular: true,
      to: "/collections",
    },
    {
      id: "desktop",
      name: "Desktop Wallpapers",
      icon: <FaDesktop />,
      description: "High-resolution wallpapers for desktop and laptop screens",
      count: "340+",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-500/10",
      popular: true,
      to: "/collections",
    },
    {
      id: "dark",
      name: "Dark Mode",
      icon: <FaMoon />,
      description: "Elegant dark themes perfect for OLED screens",
      count: "175+",
      color: "from-gray-700 to-gray-900",
      bgColor: "bg-gray-700/10",
      to: "/collections",
    },
    {
      id: "light",
      name: "Light Mode",
      icon: <FaSun />,
      description: "Bright and minimal designs for clear visibility",
      count: "130+",
      color: "from-yellow-400 to-orange-400",
      bgColor: "bg-yellow-400/10",
      to: "/collections",
    },
    {
      id: "texture",
      name: "Textures",
      icon: <FaShapes />,
      description: "Abstract textures, materials, and surface patterns",
      count: "85+",
      color: "from-stone-500 to-gray-500",
      bgColor: "bg-stone-500/10",
      to: "/collections",
    },
    {
      id: "vintage",
      name: "Vintage",
      icon: <FaHistory />,
      description: "Retro styles, nostalgic designs, and classic aesthetics",
      count: "65+",
      color: "from-rose-500 to-orange-500",
      bgColor: "bg-rose-500/10",
      to: "/collections",
    },
  ];

  const popularCategories = categories.filter((cat) => cat.popular);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
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
    <section
      id="categories"
      className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Explore{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Categories
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover wallpapers organized by style, device, and theme. Find the
            perfect background that matches your personality.
          </p>
        </motion.div>
        <div className="my-6 flex justify-center">
        <div id="ad-container-300x250"></div>
      </div>

        {/* Popular Categories */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              Popular Categories
            </h3>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Most visited</span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category) => (
              <motion.div
                key={category.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Icon */}
                <Link href={category.to}>
                <div
                  className={`${category.bgColor} w-16 h-16 rounded-2xl text-purple-400 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
              </Link>

                {/* Content */}
                <h4 className="text-white font-semibold text-lg mb-2">
                  {category.name}
                </h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {category.description}
                </p>

                {/* Footer */}
                <Link
                  to="/collections"
                  className="flex items-center justify-between"
                >
                  <span className="text-purple-400 text-sm font-medium">
                    {category.count} wallpapers
                  </span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="text-gray-400 group-hover:text-purple-400 transition-colors duration-300"
                  >
                    <FaArrowRight />
                  </motion.div>
                </Link>

                {/* Hover Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* All Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 cursor-pointer overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-20 h-20 bg-white rounded-full -translate-y-10 translate-x-10" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8" />
              </div>

              {/* Icon */}
              <div
                className={`${category.bgColor} w-14 h-14 rounded-xl text-sky-500 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10`}
              >
                {category.icon}
              </div>

              {/* Content */}
              <h4 className="text-white font-semibold mb-2 relative z-10">
                {category.name}
              </h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed relative z-10">
                {category.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between relative z-10">
                <span className="text-cyan-400 text-sm font-medium">
                  {category.count}
                </span>
                <div className="flex items-center space-x-2 text-gray-400 text-sm">
                  <FaDownload className="w-3 h-3" />
                  <span>Popular</span>
                </div>
              </div>

              {/* Hover Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-600/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-300 mb-6">
              Browse our complete collection or use advanced search to find the
              perfect wallpaper.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCategoryClick("all")}
              className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-2xl transition-all duration-300"
            >
              Explore All Wallpapers
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;

import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaPaintBrush, FaBolt, FaGem, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutSection = () => {
  const [ref, inView] = useInView({
  threshold: 0.3,
  triggerOnce: true,
});

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, duration: 0.4 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};


  const features = [
    {
      icon: <FaPaintBrush className="text-purple-400 text-3xl" />,
      title: "Curated Collection",
      description:
        "Hand-picked wallpapers from talented artists and photographers worldwide.",
    },
    {
      icon: <FaBolt className="text-white text-3xl" />,
      title: "Lightning Fast",
      description:
        "Optimized downloads and seamless browsing experience across all devices.",
    },
    {
      icon: <FaGem className="text-white text-3xl" />,
      title: "Premium Quality",
      description:
        "4K and 8K resolution wallpapers for the best visual experience.",
    },
    {
      icon: <FaHeart className="textwhite text-3xl" />,
      title: "Completely Free",
      description:
        "All wallpapers are free to download with no hidden costs or watermarks.",
    },
  ];

  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 bg-gray-950 text-white"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">
        {/* Left: Text Content */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Why Choose{" "}<span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              WallHub?
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-gray-300 text-lg text-left leading-relaxed max-w-xl mx-auto lg:mx-0"
          >
            Discover a world of stunning visuals crafted to inspire and elevate
            your digital spaces. From breathtaking landscapes to modern digital
            art — explore wallpapers that redefine your screen’s look and feel.
          </motion.p>

          <Link to="/about"
            variants={itemVariants}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 px-6 py-3 rounded-full font-semibold text-lg transition-all duration-300"
          >
            About Us
          </Link>
        </motion.div>

        {/* Right: Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex-1 grid sm:grid-cols-2 gap-6 w-full"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/5 border border-white/10 cursor-pointer backdrop-blur-xl rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 text-center"
            >
              <div className="mb-3 flex justify-start">{feature.icon}</div>
              <h1
                className="text-left text-sky-500 text-xl mb-2"
              >
                {feature.title}
              </h1>
              <p className="text-gray-300 text-left text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

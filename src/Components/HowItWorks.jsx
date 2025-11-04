import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaSearch, FaMobileAlt, FaBolt, FaDownload, FaUsers, FaRocket } from "react-icons/fa";

const HowItWorks = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const steps = [
    {
      icon: <FaSearch className="text-3xl text-cyan-400" />,
      title: "Browse & Discover",
      description:
        "Explore thousands of wallpapers by category, color, or popularity. Find the perfect fit effortlessly.",
    },
    {
      icon: <FaMobileAlt className="text-3xl text-blue-400" />,
      title: "Preview & Choose",
      description:
        "Preview wallpapers on various devices before downloading. See details and ratings instantly.",
    },
    {
      icon: <FaBolt className="text-3xl text-emerald-400" />,
      title: "Download & Enjoy",
      description:
        "Quick one-click downloads. Multiple resolutions available — no watermarks or hassle.",
    },
  ];

  const stats = [
    { icon: <FaDownload className="text-cyan-400 text-2xl" />, value: "2M+", label: "Monthly Downloads" },
    { icon: <FaUsers className="text-blue-400 text-2xl" />, value: "50K+", label: "Active Users" },
    { icon: <FaRocket className="text-emerald-400 text-2xl" />, value: "99.9%", label: "Uptime" },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.4 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={item}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            How It{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Works
            </span>
          </motion.h2>
          <motion.p
            variants={item}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            Get your dream wallpaper in just a few steps — fast, easy, and beautifully simple.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.03, borderColor: "rgba(6,182,212,0.4)" }}
              className="flex flex-col items-center text-center border border-white/10 bg-transparent rounded-2xl p-8 hover:bg-white/5 transition-all duration-300"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-10 border-t border-white/10 pt-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center text-center"
            >
              {stat.icon}
              <h4 className="text-2xl font-bold text-white mt-3">{stat.value}</h4>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;

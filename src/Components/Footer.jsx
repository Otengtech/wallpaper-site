import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaGithub, FaDribbble } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "Twitter", icon: <FaTwitter />, href: "#" },
    { name: "Instagram", icon: <FaInstagram />, href: "#" },
    { name: "GitHub", icon: <FaGithub />, href: "#" },
    { name: "Dribbble", icon: <FaDribbble />, href: "#" },
  ];

  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Categories", href: "#categories" },
    { name: "Collections", href: "#collections" },
    { name: "Popular", href: "#popular" },
    { name: "Policy", href: "#policy" },
  ];

  const stats = [
    { label: "Wallpapers", value: "50K+" },
    { label: "Users", value: "1M+" },
    { label: "Downloads", value: "10M+" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                WallHub
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              Discover and download beautiful, high-quality wallpapers for every
              device — simple, fast, and free.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3 mt-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg p-3 text-gray-400 hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 text-center gap-6"
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <h4 className="text-2xl font-bold text-white">{stat.value}</h4>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm space-y-4 md:space-y-0"
        >
          <p>© {currentYear} WallHub. All rights reserved.</p>

          <div className="flex items-center">
            Developed by Ebenezer Oteng
          </div>
        </motion.div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
          <h4 className="text-white font-semibold text-lg">
            Ready to find your next favorite wallpaper?
          </h4>
          <Link to="/collections"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Start Exploring
          </Link>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;

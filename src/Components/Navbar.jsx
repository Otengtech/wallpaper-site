import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll effect for blur/shadow on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: "Popular", href: "/popular" },
    { name: "Collections", href: "/collections" },
    { name: "About", href: "/about" },
  ];

  return (
    <>
      {/* ─── TOP NAVBAR ─────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-gray-900/20 backdrop-blur-xl border-b border-white/10 shadow-lg"
            : "bg-gray-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600"
            >
              WallHub
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? "text-cyan-400"
                      : "text-white/80 hover:text-white"
                  } px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden bg-white/10 backdrop-blur-lg text-white p-3 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ─── FULLSCREEN MOBILE MENU ─────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col bg-gradient-to-br from-gray-900/90 to-cyan-800/80 backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                WallHub
              </span>
              <button
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
                className="bg-white/10 backdrop-blur-lg text-white p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Links */}
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              className="flex flex-col items-center justify-center flex-1 space-y-6"
            >
              {navItems.map((item, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-2xl font-semibold ${
                      location.pathname === item.href
                        ? "text-cyan-400"
                        : "text-white/90 hover:text-white"
                    } transition-all duration-300`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Decorative Backgrounds */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

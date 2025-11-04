import React from "react";
import { motion } from "framer-motion";
import { 
  FaHeart, 
  FaRocket, 
  FaUsers, 
  FaPalette, 
  FaAward, 
  FaGlobe,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaArrowRight,
  FaStar,
  FaDownload,
  FaMobileAlt,
  FaDesktop
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Founder & Creative Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Passionate about digital art and user experience. Former UI/UX designer at TechCorp.",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Full-stack developer with 8+ years experience. Loves creating seamless digital experiences.",
      social: { twitter: "#", linkedin: "#", github: "#" }
    },
    {
      id: 3,
      name: "Aisha Patel",
      role: "Content Curator",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      bio: "Digital artist and photographer. Curates the most stunning visuals for our collection.",
      social: { twitter: "#", linkedin: "#", instagram: "#" }
    },
    {
      id: 4,
      name: "David Kim",
      role: "Community Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Builds and nurtures our amazing community. Always listening to your feedback.",
      social: { twitter: "#", linkedin: "#", github: "#" }
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Users", icon: <FaUsers /> },
    { number: "10K+", label: "Wallpapers", icon: <FaPalette /> },
    { number: "150+", label: "Countries", icon: <FaGlobe /> },
    { number: "4.9", label: "Rating", icon: <FaStar /> }
  ];

  const values = [
    {
      icon: <FaHeart />,
      title: "Passion for Quality",
      description: "Every wallpaper is carefully curated and optimized for the best visual experience."
    },
    {
      icon: <FaRocket />,
      title: "Innovation",
      description: "We constantly explore new styles and technologies to enhance your experience."
    },
    {
      icon: <FaUsers />,
      title: "Community First",
      description: "Our community's feedback drives our decisions and improvements."
    },
    {
      icon: <FaAward />,
      title: "Excellence",
      description: "We strive for excellence in every aspect of our platform and service."
    }
  ];

  const features = [
    {
      icon: <FaDownload />,
      title: "Free Downloads",
      description: "All wallpapers are completely free to download and use."
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Optimized",
      description: "Perfectly sized for all mobile devices and screen resolutions."
    },
    {
      icon: <FaDesktop />,
      title: "HD Quality",
      description: "High-resolution wallpapers that look stunning on any display."
    },
    {
      icon: <FaPalette />,
      title: "Daily Updates",
      description: "Fresh content added daily to keep your device looking new."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
        duration: 0.5
      }
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                WallHub
              </span>
            </h1>
            <p className="text-md text-left md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're passionate about bringing stunning visuals to your devices. 
              Our mission is to make every screen beautiful, one wallpaper at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our <span className="text-purple-400">Story</span>
              </h2>
              <div className="space-y-4 text-left text-gray-300 text-md leading-relaxed">
                <p>
                  Founded in 2025, WallHub started as a simple passion project between 
                  a group of designers and developers who believed that everyone deserves 
                  access to beautiful, high-quality wallpapers.
                </p>
                <p>
                  What began as a small collection of curated images has grown into a 
                  thriving community of over 50,000 users worldwide. We're committed to 
                  providing free, stunning wallpapers that inspire creativity and bring 
                  joy to everyday device usage.
                </p>
              </div>
              
              <Link to="/collections"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-4 rounded-full font-semibold flex items-center space-x-2 hover:shadow-2xl transition-all duration-300"
              >
                <span>Explore Our Collection</span>
                <FaArrowRight />
              </Link>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="text-4xl text-purple-400">
                    <FaPalette />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 aspect-video flex items-center justify-center">
                  <div className="text-4xl text-cyan-400">
                    <FaRocket />
                  </div>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 aspect-video flex items-center justify-center">
                  <div className="text-4xl text-pink-400">
                    <FaHeart />
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 aspect-square flex items-center justify-center">
                  <div className="text-4xl text-yellow-400">
                    <FaUsers />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center"
              >
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300">
                  <div className="text-3xl text-purple-400 mb-4 flex justify-center">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-purple-400">Values</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The principles that guide everything we do at Wallify
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="text-4xl text-purple-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-purple-400">Wallify</span>
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg border border-white/10 rounded-2xl p-8 text-center group hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300"
              >
                <div className="text-3xl text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Our <span className="text-purple-400">Team</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              The passionate individuals behind Wallify's success
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-300"
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-purple-500/50 group-hover:border-purple-400 transition-colors duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-purple-400 text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                <div className="flex justify-center space-x-3">
                  <a href={member.social.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
                    <FaTwitter />
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
                    <FaLinkedin />
                  </a>
                  <a href={member.social.github} className="text-gray-400 hover:text-gray-300 transition-colors">
                    <FaGithub />
                  </a>
                  {member.social.instagram && (
                    <a href={member.social.instagram} className="text-gray-400 hover:text-pink-500 transition-colors">
                      <FaInstagram />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
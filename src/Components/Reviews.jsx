import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaStar, FaUserFriends, FaSmile, FaCheckCircle } from "react-icons/fa";

const ReviewsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const reviews = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "UI/UX Designer",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdpcmx8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&q=60&w=500",
      rating: 5,
      comment:
        "The wallpapers are breathtaking and crystal-clear. WallHub always inspires my design projects with their high-quality visuals.",
      date: "2 days ago",
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Tech Enthusiast",
      avatar:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
      rating: 5,
      comment:
        "Absolutely love this platform. Super fast downloads and the mobile wallpapers fit perfectly on all my devices!",
      date: "1 week ago",
    },
    {
      id: 3,
      name: "Emily Thompson",
      role: "Photography Student",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80",
      rating: 4,
      comment:
        "Beautiful nature collections! I use these for inspiration in my photography studies. The color tones are just perfect.",
      date: "3 days ago",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, duration: 0.6 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
    hover: {
      scale: 1.03,
      y: -8,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const StarRating = ({ rating }) => (
    <div className="flex space-x-1 text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <FaStar key={i} className={`${i < rating ? "opacity-100" : "opacity-30"}`} />
      ))}
    </div>
  );

  return (
    <section
      id="reviews"
      className="py-20 bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2
            variants={cardVariants}
            className="text-5xl font-bold mb-4"
          >
            What Our Users <span className="text-purple-500">Say</span>
          </motion.h2>
          <motion.p
            variants={cardVariants}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Join thousands of happy users who’ve transformed their screens with
            our stunning high-resolution wallpapers.
          </motion.p>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover="hover"
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col shadow-lg hover:border-purple-400/30 transition-all"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h3 className="font-semibold text-lg">{review.name}</h3>
                  <p className="text-sm text-gray-400">{review.role}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-3">
                <StarRating rating={review.rating} />
              </div>

              {/* Comment */}
              <p className="text-gray-300 leading-relaxed mb-6">
                "{review.comment}"
              </p>

              {/* Footer */}
              <div className="mt-auto flex justify-between items-center text-sm text-gray-400 border-t border-white/10 pt-4">
                <span>{review.date}</span>
                <span className="text-purple-400 font-medium">Verified User</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <FaStar />, number: "4.9/5", label: "Average Rating" },
              { icon: <FaSmile />, number: "12K+", label: "Happy Users" },
              { icon: <FaUserFriends />, number: "50K+", label: "Reviews" },
              { icon: <FaCheckCircle />, number: "99%", label: "Satisfaction" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-3xl text-purple-400 mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;

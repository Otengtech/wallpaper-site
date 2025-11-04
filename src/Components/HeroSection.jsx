import React from "react";

const HeroSectionGrid = () => {
  const previewImages = [
    "https://images.unsplash.com/photo-1502691876148-a84978e59af8?auto=format&fit=crop&w=800&q=80", // Northern Lights
    "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80", // Mountain Lake
    "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80", // Forest Sunset
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80", // Night Sky
  ];

  const stats = [
    { number: "500K+", label: "Downloads" },
    { number: "50K+", label: "Users" },
    { number: "24/7", label: "Available" },
  ];

  return (
    <section className="relative min-h-screen bg-gray-900 flex items-center overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,black,transparent)]" />

      {/* Content wrapper */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: TEXT */}
          <div className="text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              Your Daily Dose of{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Digital Inspiration
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Discover millions of stunning wallpapers — from breathtaking
              landscapes to abstract art. Find the perfect background for every
              device and mood.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-gray-900 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Explore Collection
              </button>
              <button className="px-6 sm:px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300">
                Upload Wallpaper
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10 pt-6">
              {stats.map((stat, i) => (
                <div key={i} className="text-white text-center lg:text-left">
                  <h4 className="text-2xl sm:text-3xl font-bold">{stat.number}</h4>
                  <h4 className="text-gray-400 text-xs sm:text-sm uppercase tracking-wide">
                    {stat.label}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: IMAGE GRID */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 transform rotate-2 sm:rotate-3 max-w-xs sm:max-w-sm md:max-w-md">
              {previewImages.map((img, i) => (
                <div
                  key={i}
                  className={`rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl transition-transform duration-500 hover:scale-105 ${
                    i % 2 !== 0 ? "translate-y-6 sm:translate-y-8" : ""
                  }`}
                >
                  <img
                    src={img}
                    alt={`Wallpaper ${i + 1}`}
                    className="w-full h-36 sm:h-48 md:h-56 object-cover"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {/* Glowing orbs */}
            <div className="absolute -top-8 -right-6 w-16 sm:w-24 h-16 sm:h-24 bg-purple-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-8 -left-6 w-20 sm:w-32 h-20 sm:h-32 bg-cyan-500/20 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionGrid;

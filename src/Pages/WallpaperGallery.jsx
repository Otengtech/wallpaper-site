import React, { useEffect, useState } from "react";

const WallpaperGallery = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchWallpapers = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.unsplash.com/search/photos?page=${page}&per_page=15&query=wallpapers&client_id=${accessKey}`
      );
      const data = await res.json();
      if (data.results) {
        setWallpapers((prev) => [...prev, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching wallpapers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallpapers();
  }, [page]);

  // Infinite scroll: load more when bottom reached
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 200 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="bg-gray-900 min-h-screen py-10 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-10">
        Explore <span className="text-cyan-400">Wallpapers</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 max-w-7xl mx-auto">
        {wallpapers.map((img) => (
          <div key={img.id} className="relative group overflow-hidden rounded-xl">
            <img
              src={img.urls.small}
              alt={img.alt_description || "Wallpaper"}
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            {/* Overlay for attribution */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent text-white text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {img.user.name}
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <p className="text-center text-gray-400 mt-6">Loading wallpapers...</p>
      )}
    </section>
  );
};

export default WallpaperGallery;

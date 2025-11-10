import React, {useEffect} from "react";
import HeroSection from "../Components/HeroSection.jsx";
import AboutSection from "../Components/AboutSection.jsx";
import FeaturedWallpapers from "../Components/FeaturedWallpapers.jsx";
import HowItWorks from "../Components/HowItWorks.jsx";
import Reviews from "../Components/Reviews.jsx";
const Home = () => {
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
    <div className="bg-gray-900">
      <HeroSection />
      <div className="my-6 flex justify-center">
        <div id="ad-container-300x250"></div>
      </div>
      <AboutSection />
      <FeaturedWallpapers />
      <HowItWorks />
      <Reviews />
    </div>
  );
};

export default Home;

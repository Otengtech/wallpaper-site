import React from 'react';
import HeroSection from '../Components/HeroSection.jsx';
import AboutSection from '../Components/AboutSection.jsx';
import FeaturedWallpapers from '../Components/FeaturedWallpapers.jsx';
import HowItWorks from '../Components/HowItWorks.jsx';
const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <FeaturedWallpapers />
      <HowItWorks />
    </div>
  );
}

export default Home;

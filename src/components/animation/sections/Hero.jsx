import React from "react";
import BannerVideo from "../../../assets/banner-video.mp4";
import './Styles.css'

const Hero = () => {
  return (
    <section className="relative h-full">
      <video className="grayscale bannervideo" autoPlay muted loop>
        <source src={BannerVideo} type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;

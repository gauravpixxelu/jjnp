import React from "react";
import BannerVideo from "../../../assets/banner.mp4";
import './Styles.css'

const Hero = () => {
  return (
    <section className="relative h-full">
      <video className="bannervideo" autoPlay muted loop>
        <source src={BannerVideo} type="video/mp4" />
      </video>
    </section>
  );
};

export default Hero;

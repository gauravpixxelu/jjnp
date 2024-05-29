import React, { useef, useState, useEffect } from "react";
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import Categories from "./Categories";
import Services from "./Services";

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <FeaturedProducts />
      {/* <Services /> */}
    </div>
  );
}

export default Home;

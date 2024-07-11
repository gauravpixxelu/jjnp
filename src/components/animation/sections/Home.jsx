import { useEffect } from 'react';
import Hero from "./Hero";
import FeaturedProducts from "./FeaturedProducts";
import Categories from "./Categories";
import Services from "./Services";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

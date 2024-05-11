import "locomotive-scroll/dist/locomotive-scroll.css";

import { AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { LocomotiveScrollProvider } from "react-locomotive-scroll";
import { ThemeProvider } from "styled-components";
import Loader from "./animation/Loader";
import ScrollTriggerProxy from "./animation/ScrollTriggerProxy";
import { dark } from "./animation/Themes";
import GlobalStyles from "../styles/GlobalStyles";
import Home from "./animation/sections/Home";
import Shop from "./animation/sections/Shop";
import NewArrival from "./animation/sections/NewArrival";
import About from "./animation/About";
export default function HomePage() {
  // useLocoScroll();
  const containerRef = useRef(null);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000);
  }, []);

  return (
    <div>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
          options={{
            smooth: true,
            // ... all available Locomotive Scroll instance options
            smartphone: {
              smooth: true,
            },
            tablet: {
              smooth: true,
            },
          }}
          watch={
            [
              //..all the dependencies you want to watch to update the scroll.
              //  Basicaly, you would want to watch page/location changes
              //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
            ]
          }
          containerRef={containerRef}
        >
          <AnimatePresence>{Loaded ? null : <Loader />}</AnimatePresence>
          <main className="App" data-scroll-container ref={containerRef}>
            <ScrollTriggerProxy />
            <AnimatePresence>
              {Loaded ? null : <Loader />}

              <Home key="home" />
              <Shop key="Shop" />
              <About key="About" />

              {/* <Shop key="Shop" /> */}

              {/* <NewArrival key="new arrival" /> */}

              {/* <About key="about" />
              <Shop key="Shop" />
              <Marquee key="marquee" />
              <NewArrival key="new arrival" />
              <Footer key="Footer" /> */}
            </AnimatePresence>
          </main>
        </LocomotiveScrollProvider>
      </ThemeProvider>
    </div>
  );
}

import { useParallax } from "react-scroll-parallax";
import "./PrallexStyle.css";

import { Typography } from "@material-tailwind/react";

const Parallax = () => {
  const scaleCParallax = useParallax({
    scaleX: [0, 3, "easeInQuad"],
  });

  const parallaxRotateY = useParallax({
    rotateY: [0, 360],
  });

  const parallaxRotateY2 = useParallax({
    rotateY: [0, 360],
  });

  const parallaxRotateY3 = useParallax({
    rotateY: [0, 360],
  });

  const parallaxEasing = useParallax({
    easing: "easeOutQuad",
    translateX: [-340, 100],
  });

  const parallaxEasingLeft = useParallax({
    easing: [1, -0.75, 0.5, 1.34],
    translateX: [0, -260],
    translateY: [1100, 0],
  });

  return (
    <div className="flex flex-col   ">
      <div className="lg:w-1/2 bg-black h-full flex items-center justify-center"></div>
      <div className="lg:w-1/2 bg-white h-full flex items-center justify-center"></div>
      <section className="bg-container relative">
        <img
          ref={parallaxRotateY.ref}
          className="parallax-image rotate-y"
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbiUyMHN0b3JlfGVufDB8fDB8fHww"
        />
        <div className="absolute-text">
          <h1 ref={parallaxEasing.ref} className="parallax-text">
            Welcome to our Fashion Store
          </h1>
          <h2 ref={parallaxEasingLeft.ref} className="parallax-text">
           
          </h2>
        </div>
      </section>
      <br />
    
      <section className="card-container" ref={scaleCParallax.ref}>
      <div className="absolute-text">
      <h1 ref={parallaxEasing.ref} className="parallax-text">
            New Arrivals
          </h1>
          </div>
        <div className="card">
          <img
            src="https://images.pexels.com/photos/2422294/pexels-photo-2422294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="parallax-image scale-x"
          />
        </div>
        <div className="card">
          <img
            src="https://images.pexels.com/photos/2422290/pexels-photo-2422290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="parallax-image scale-x"
          />
        </div>
      </section>
      <br />
      <br />
      <section className="card-container">
        <div className="card" ref={parallaxRotateY2.ref}>
          <img
            src="https://images.pexels.com/photos/3184398/pexels-photo-3184398.jpeg?auto=compress&cs=tinysrgb&w=800"
            className="parallax-image rotate-y"
          />
        </div>
        <div ref={parallaxRotateY3.ref} className="card">
          <img
            src="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            className="parallax-image rotate-y"
          />
        </div>
      </section>
      <br />
    </div>
  );
};

export default Parallax;

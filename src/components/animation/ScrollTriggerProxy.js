import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect } from 'react';
import { useLocomotiveScroll } from 'react-locomotive-scroll';

const ScrollTriggerProxy = () => {
  const { scroll } = useLocomotiveScroll();

  useEffect(() => {
    if (!scroll) return;

    const element = scroll.el;

    gsap.registerPlugin(ScrollTrigger);

    scroll.on('scroll', () => ScrollTrigger.update());
    ScrollTrigger.scrollerProxy(element, {
      scrollTop(value) {
        return arguments.length
          ? scroll.scrollTo(value, 0, 0)
          : scroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: element.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.refresh(); // Refresh ScrollTrigger
    return () => {
      ScrollTrigger.removeEventListener('refresh', () => scroll.update());
    };
  }, [scroll]);

  return null;
};

export default ScrollTriggerProxy;

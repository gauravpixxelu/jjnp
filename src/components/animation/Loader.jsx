import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  touch-action: none;
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 6;
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  background-color: black;

  svg {
    width: auto; /* Set the width of the SVG */
    height: auto; /* Let the height adjust automatically */
    overflow: visible;
    stroke-linejoin: round;
    stroke-linecap: round;

    g {
      path {
        stroke: #fff;
      }
    }
  }
`;

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: "easeInOut",
    },
  },
};
const textVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      yoyo: Infinity,
      ease: "easeInOut",
    },
  },
};

const Text = styled(motion.span)`
  font-size: ${(props) => props.theme.fontxl};
  color: ${(props) => props.theme.text};
  padding-top: 0.5rem;

  @media (max-width: 48em) {
    font-size: ${(props) => props.theme.fontlg};
  }
`;


const Loader = () => {
  return (
    <Container
      initial={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 2 }}
    >
      {/* <img src={star} alt="Wibe Fashion" /> */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enableBackground="new 0 0 24 24"
        height="48px"
        viewBox="0 0 24 24"
        width="48px"
        fill="none"
      >
        <g>
          <motion.path
            variants={pathVariants}
            initial="hidden"
            animate="visible"
            d="M 51.5 35.4 L 47 35.4 L 47 9.4 L 51.35 9.4 L 51.35 13.75 Q 52.75 11.65 54.925 10.225 A 8.658 8.658 0 0 1 58.478 8.913 A 11.315 11.315 0 0 1 60.1 8.8 A 11.612 11.612 0 0 1 62.633 9.059 Q 65.18 9.628 66.675 11.45 Q 68.85 14.1 68.85 18.45 L 68.85 35.4 L 64.35 35.4 L 64.35 18.95 A 9.632 9.632 0 0 0 64.179 17.08 Q 63.874 15.539 63.025 14.45 A 4.29 4.29 0 0 0 59.887 12.774 A 6.031 6.031 0 0 0 59.35 12.75 A 6.561 6.561 0 0 0 55.925 13.732 A 8.677 8.677 0 0 0 55 14.375 Q 52.95 16 51.5 18.2 L 51.5 35.4 Z M 111.9 33.3 L 113.8 29.55 A 9.278 9.278 0 0 0 115.372 30.613 Q 116.149 31.035 117.075 31.375 A 12.036 12.036 0 0 0 120.881 32.094 A 13.732 13.732 0 0 0 121.3 32.1 Q 124.1 32.1 125.525 31.175 A 3.725 3.725 0 0 0 126.292 30.529 A 2.526 2.526 0 0 0 126.95 28.8 A 3.561 3.561 0 0 0 126.793 27.727 A 3.106 3.106 0 0 0 126.425 26.95 A 3.192 3.192 0 0 0 125.961 26.403 Q 125.419 25.884 124.5 25.375 A 14.231 14.231 0 0 0 123.503 24.879 Q 122.272 24.319 120.45 23.7 Q 117.988 22.857 116.356 21.798 A 9.667 9.667 0 0 1 114.975 20.725 A 5.662 5.662 0 0 1 113.328 17.727 A 8.397 8.397 0 0 1 113.15 15.95 A 6.06 6.06 0 0 1 115.124 11.443 A 8.731 8.731 0 0 1 115.775 10.875 A 8.883 8.883 0 0 1 118.793 9.352 Q 120.071 8.973 121.604 8.854 A 18.764 18.764 0 0 1 123.05 8.8 A 20.397 20.397 0 0 1 125.273 8.916 Q 126.427 9.042 127.435 9.308 A 12.603 12.603 0 0 1 127.5 9.325 A 19.385 19.385 0 0 1 129.567 10.003 A 15.555 15.555 0 0 1 131 10.65 L 129.75 14.35 A 12.264 12.264 0 0 0 127.916 13.467 A 15.096 15.096 0 0 0 126.675 13.05 A 12.512 12.512 0 0 0 124.433 12.626 A 15.919 15.919 0 0 0 122.85 12.55 Q 120.25 12.55 118.9 13.6 Q 118.004 14.297 117.702 15.083 A 2.265 2.265 0 0 0 117.55 15.9 A 2.46 2.46 0 0 0 118.298 17.676 A 3.541 3.541 0 0 0 118.6 17.95 Q 119.633 18.786 122.599 19.767 A 42.189 42.189 0 0 0 122.7 19.8 Q 127.65 21.45 129.6 23.45 A 6.799 6.799 0 0 1 131.542 28.073 A 8.947 8.947 0 0 1 131.55 28.45 A 6.937 6.937 0 0 1 131.019 31.208 Q 130.325 32.828 128.725 33.975 Q 125.9 36 121.15 36 A 19.995 19.995 0 0 1 118.219 35.795 A 15.474 15.474 0 0 1 115.825 35.25 Q 113.618 34.553 112.124 33.468 A 9.114 9.114 0 0 1 111.9 33.3 Z M 81.85 35.4 L 77.1 35.4 L 77.1 0.5 A 56.142 56.142 0 0 1 79.256 0.281 A 73.778 73.778 0 0 1 81.625 0.125 A 100.403 100.403 0 0 1 86.09 0.002 A 110.971 110.971 0 0 1 86.75 0 A 22.979 22.979 0 0 1 90.07 0.227 Q 92.339 0.559 94.15 1.375 A 12.303 12.303 0 0 1 96.691 2.889 A 9.687 9.687 0 0 1 98.8 5.15 A 9.573 9.573 0 0 1 100.39 10.158 A 11.698 11.698 0 0 1 100.4 10.65 A 12.629 12.629 0 0 1 100.046 13.711 A 9.634 9.634 0 0 1 98.55 17 A 11.156 11.156 0 0 1 94.774 20.315 A 14.033 14.033 0 0 1 93.4 20.975 A 17.387 17.387 0 0 1 89.355 22.087 A 23.597 23.597 0 0 1 85.75 22.35 A 52.011 52.011 0 0 1 83.482 22.303 A 41.465 41.465 0 0 1 81.85 22.2 L 81.85 35.4 Z M 0 33.1 L 2.3 29.45 A 8.429 8.429 0 0 0 4.335 31.008 A 9.715 9.715 0 0 0 4.7 31.2 A 6.557 6.557 0 0 0 6.637 31.83 A 5.971 5.971 0 0 0 7.55 31.9 A 5.37 5.37 0 0 0 9.304 31.626 A 4.468 4.468 0 0 0 11.35 30.175 A 4.974 4.974 0 0 0 12.133 28.748 Q 12.641 27.369 12.731 25.281 A 21.654 21.654 0 0 0 12.75 24.35 L 12.75 0.4 L 17.5 0.4 L 17.5 23.85 Q 17.5 30.16 14.834 33.063 A 7.277 7.277 0 0 1 14.8 33.1 A 8.965 8.965 0 0 1 8.904 35.943 A 12.34 12.34 0 0 1 7.7 36 A 11.721 11.721 0 0 1 3.661 35.309 A 11.202 11.202 0 0 1 3.375 35.2 A 11.414 11.414 0 0 1 1.414 34.209 A 9.092 9.092 0 0 1 0 33.1 Z M 21.5 33.1 L 23.8 29.45 A 8.429 8.429 0 0 0 25.835 31.008 A 9.715 9.715 0 0 0 26.2 31.2 A 6.557 6.557 0 0 0 28.137 31.83 A 5.971 5.971 0 0 0 29.05 31.9 A 5.37 5.37 0 0 0 30.804 31.626 A 4.468 4.468 0 0 0 32.85 30.175 A 4.974 4.974 0 0 0 33.633 28.748 Q 34.141 27.369 34.231 25.281 A 21.654 21.654 0 0 0 34.25 24.35 L 34.25 0.4 L 39 0.4 L 39 23.85 Q 39 30.16 36.334 33.063 A 7.277 7.277 0 0 1 36.3 33.1 A 8.965 8.965 0 0 1 30.404 35.943 A 12.34 12.34 0 0 1 29.2 36 A 11.721 11.721 0 0 1 25.161 35.309 A 11.202 11.202 0 0 1 24.875 35.2 A 11.414 11.414 0 0 1 22.914 34.209 A 9.092 9.092 0 0 1 21.5 33.1 Z M 81.85 4.2 L 81.85 18.15 A 23.984 23.984 0 0 0 82.499 18.222 Q 83.081 18.278 83.8 18.325 A 34.044 34.044 0 0 0 85.012 18.381 A 45.565 45.565 0 0 0 86.35 18.4 Q 90.8 18.4 93.25 16.4 A 6.448 6.448 0 0 0 95.678 11.679 A 8.66 8.66 0 0 0 95.7 11.05 A 7.226 7.226 0 0 0 95.32 8.654 A 6.068 6.068 0 0 0 93.35 5.9 Q 91.482 4.39 88.35 4.08 A 17.29 17.29 0 0 0 86.65 4 A 65.563 65.563 0 0 0 85.021 4.02 A 54.969 54.969 0 0 0 84.1 4.05 A 45.637 45.637 0 0 0 82.659 4.132 A 37.52 37.52 0 0 0 81.85 4.2 Z M 108.2 11.5 L 104.65 11.5 L 104.25 0.4 L 108.6 0.4 L 108.2 11.5 Z"
          />
        </g>
      </svg>
    </Container>
  );
};

export default Loader;

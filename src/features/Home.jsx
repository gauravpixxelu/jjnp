import React from "react";
import CarouselWithContent from "../components/Crousels";
import RoundedCard from "../components/RoundedCard";
import { Rating as ReactRating } from "@smastrom/react-rating";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@smastrom/react-rating/style.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import ProductCard from "../components/ProductCard";
import Gallery from "../components/Gallery";
import { Typography } from "@material-tailwind/react";
import Homepage from "../components/Homepage";


const dummyTrendingCategories = [
  {
    id: 1,
    title: "Technology",
    image:
      "https://images.unsplash.com/photo-1620570623737-efc0ec4ab486?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2glMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "Fashion",
    image:
      "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Travel",
    image:
      "https://images.unsplash.com/photo-1605022600390-071c6f969b32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGphY2tldHN8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Travel",
    image:
      "https://images.unsplash.com/photo-1501127122-f385ca6ddd9d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFzaGlvbiUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Travel",
    image:
      "https://images.unsplash.com/photo-1482003297000-b7663a1673f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGZhc2hpb24lMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
  },
  // Add more categories as needed
];

export default function Home() {
  const splideOption = {
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    perPage: 5,

    breakpoints: {
      640: {
        perPage: 2,
      },
      480: {
        perPage: 2,
      },
    },
  };
  return (
    <div className="h-full">
      <Homepage />
      {/* <div>
        <CarouselWithContent />
      </div> */}
      {/* <div>
        <Typography variant="h4" className="p-2 text-center uppercase">
          TRENDING CATEGORIES
        </Typography>
        <div className="flex items-center lg:justify-center">
          <section className="w-full lg:max-w-[1100px] lg:px-10 lg:py-10">
            <Splide options={splideOption}>
              {dummyTrendingCategories.map((category, index) => (
                <SplideSlide key={index} className="splide__slide">
                  <RoundedCard category={category} url={category.image} />
                </SplideSlide>
              ))}
            </Splide>
          </section>
        </div>
      </div> */}
      {/* <div>
        <Typography variant="h4" className="p-2 text-center uppercase">
          Explore By
        </Typography>
        <Gallery />
      </div> */}
    </div>
  );
}

 

import React, { useState, Suspense, useEffect, useRef } from "react";
import { Carousel } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

import {
  HeartIcon,
  ShoppingCartIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import Loader from "./Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProductCard({
  data,
  selectedCategories,
  selectedSizes,
}) {
  const navigate = useNavigate();

  const ref = useRef([]);
  ref.current = [];

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleProductClick = (product) => {
    // Navigate to the ViewProduct page and pass product data as query parameter
    navigate(`/viewProduct/${product.id}`, { state: { product } });
  };

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  const nextArrow = false;

  let filteredProducts = [];

  if (data) {
    filteredProducts = data.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((category) =>
          product.categories.includes(category.value)
        );

      const matchesSize =
        selectedSizes.length === 0 ||
        selectedSizes.some((size) => product.sizes.includes(size.value));

      return matchesCategory && matchesSize;
    });
  }

  //animations
  useEffect(() => {
    if (ref.current) {
      ref.current.forEach((el, index) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay: index * 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top bottom-=100",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [ref, selectedCategories, selectedSizes]);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  return (
    <Suspense fallback={<Loader />}>
       <div className="grid grid-cols-1 mx-4 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:mx-8">
        {filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-gray-500 text-xl text-center">
              No products available
            </p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              ref={addtoRefs}
              key={index}
              className="relative"
            >
              <div className="cursor-pointer bg-FBFBFB">
                <img
                  key={index}
                  className="relative w-full md:h-[350px] lg:h-[350px] xl:h-[450px] object-contain"
                  src={product.productImages[0]}
                  alt={`product image ${index}`}
                  loading="lazy"
                  onClick={() => handleProductClick(product)}
                />
              </div>

              <div className="mt-4 pb-5">
                <p className=" font-normal text-black text-[18px]">{product.productName}</p>

                <div className="flex flex-wrap items-start justify-start bottom-0">
                  <p className=" mt-1 font-normal text-gray-700 text-[14px]">
                    {product.discountedPrice > 0 ? (
                      <span className="text-md  text-slate-900 mr-2">
                        {"₹" +
                          product.discountedPrice
                            .toFixed(0)
                            .toLocaleString("en-IN")}
                      </span>
                    ) : (
                      <span className="text-md font-bold text-slate-900 mr-2">
                        {"₹" +
                          product.originalPrice
                            .toFixed(0)
                            .toLocaleString("en-IN")}
                      </span>
                    )}

                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </Suspense>
  );
}

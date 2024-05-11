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
      <div className="flex  flex-wrap lg:flex-row h-lvh">
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
              // className="relative w-48 lg:w-1/4 overflow-hidden border  border-gray-200"
              // style={{ width: "333px", height: "416px" }}
              className="lg:w-333 lg:h-416 w-206 h-251"
            >
              <div className="cursor-pointer">
                {/* {product.productImages.map((image, index) => ( */}
                <img
                  key={index}
                  className="h-full w-full  aspect-square object-cover object-center p-6"
                  src={product.productImages[0]}
                  alt={`product image ${index}`}
                  loading="lazy"
                  onClick={() => handleProductClick(product)}
                />
                {/* ))} */}
              </div>

              {/* {product.discount !== 0 && (
                <span className="absolute top-0 left-0 w-28 z-10 opacity-90 translate-y-4 -translate-x-6 -rotate-45 bg-green-900 text-center text-sm text-white font-bold">
                  {product.discount}% OFF
                </span>
              )} */}
              <div className="mt-4 px-5 pb-5">
                <h5 className="text-lg  flex items-start justify-start ">
                  {product.productName}
                </h5>

                <div className="flex flex-wrap items-start justify-start bottom-0">
                  <p>
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
                    {/* {product.discountedPrice > 0 && (
                      <span className="text-sm text-gray-500 line-through mr-2">
                        {product.originalPrice.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    )} */}

                    {/* <span className="text-sm font-bold text-green-600 ">
                    {product.discount}% off
                  </span> */}

                    {/* <span className="flex flex-wrap gap-1">
                      {product.sizes.map((size, sizeIndex) => (
                        <span
                          key={sizeIndex}
                          className="bg-gray-200 text-sm text-gray-600 rounded-full px-3 py-1 mx-1 uppercase"
                        >
                          {size}
                        </span>
                      ))}
                    </span> */}
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

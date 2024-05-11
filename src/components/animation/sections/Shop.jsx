import React from "react";
import img1 from "../../../assets/Images/1.webp";
import img2 from "../../../assets/Images/2.webp";
import img3 from "../../../assets/Images/3.webp";
import img4 from "../../../assets/Images/4.webp";
import img5 from "../../../assets/Images/5.webp";

const Shop = () => {
  // Array of image paths
  const images = [img1, img2, img3, img5];

  return (
    <div className="w-full ">
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              New Arrivals
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md text-center">
              Discover the latest fashion trends and must-have pieces for your
              wardrobe.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {images.map((image, index) => (
              <div
                key={index}
                className="  rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                  <img
                    alt="Product Image"
                    className="w-full h-[400px] object-cover"
                    height={500}
                    src={image}
                    style={{
                      aspectRatio: "400/500",
                      objectFit: "cover",
                    }}
                    width={400}
                  />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;

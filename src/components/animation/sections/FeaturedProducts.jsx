import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Video1 from "../../../assets/video1.mp4";
import Video2 from "../../../assets/video2.mp4";

const FeaturedProducts = () => {
  const [productsData, setProductsData] = useState([]);
  const navigate = useNavigate();

  const handleGetProduct = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/getproducts`,
        {
          slug: false,
          category: false,
          page: 1,
          limit: 4,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const mappedProducts = response.data.products.map((product) => ({
        id: product._id,
        title: product.title,
        description: product.desc,
        slug: product.slug,
        discountedPrice: product.discount
          ? product.price - (product.price * product.discount) / 100
          : product.price,
        originalPrice: product.price,
        discount: product.discount || 0,
        colors: product.color,
        categories: product.category,
        sizes: product.size,
        productImages: product.imgs,
        inventory: product.availableQty,
      }));
      setProductsData(mappedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);

  const handleProductClick = (product) => {
    // Navigate to the ViewProduct page and pass product data as query parameter
    navigate(`/viewProduct/${product.id}`, { state: { product } });
  };

  return (
    <>
      <section className="mx-auto mt-6 mb-6 lg:mt-8 lg:mb-8">
        <h2 className="text-center text-2xl font-bold mb-4 lg:mb-8 uppercase tracking-wide">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 mx-4 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:mx-8">
          {productsData.map((product, index) => (
            <div
              key={index}
              className="flex justify-center cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <div className="w-full">
                <div className="bg-FBFBFB">
                  <img
                    className="relative w-full md:h-[350px] lg:h-[350px] xl:h-[450px] object-cover"
                    src={product.productImages[0]}
                    alt=""
                  />
                </div>
                <div className="mt-4">
                  <p className=" font-normal text-black text-[18px]">{product.title}</p>
                  <p className=" mt-1 font-normal text-gray-700 text-[14px] price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(product.originalPrice)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-6 mb-6 my-8 lg:mt-8 lg:mb-8">
        <div className="grid grid-cols-1 mx-4 gap-4 md:grid-cols-2 lg:grid-cols-2 lg:gap-6 lg:mx-8">
          <video className="videogd" autoPlay muted loop >
            <source src={Video1} type="video/mp4" />
          </video>
          <video className="videogd" autoPlay muted loop>
            <source src={Video2} type="video/mp4" />
          </video>
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;

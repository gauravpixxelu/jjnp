import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <section className="mx-auto mt-6 mb-6 lg:mt-12 lg:mb-12">
      <h2 className="text-center text-4xl font-normal mb-4 lg:mb-8">
        Featured
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
                  className="relative w-full md:h-[350px] lg:h-[350px] xl:h-[450px] object-contain"
                  src={product.productImages[0]}
                  alt=""
                />
              </div>
              <div className="mt-4">
                <p className=" font-normal text-black text-[18px]">{product.title}</p>
                <p className=" mt-1 font-normal text-gray-700 text-[14px]">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(product.originalPrice)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Toast from "../../components/Toast";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Topbar from "../../components/Topbar";
import Loader from "../../components/Loader";
gsap.registerPlugin(ScrollTrigger);

export default function Wishlist() {
  const navigate = useNavigate();
  const ref = useRef([]);
  ref.current = [];

  const [wishlistData, setWishlistData] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [progress, setProgress] = useState(30);
  const [loading, setLoading] = useState(false);
  const handlGetWishlist = async () => {
    setLoading(true);
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getwishlist`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setWishlistData(response.data.wishlist.wishlistItems);
      console.log(response.data.wishlist.wishlistItems);
      // setTableRows(mappedProducts);
      setLoading(false);
      setProgress(100);
      // navigate("/");
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handlRemoveFromWishlist = async (slugToRemove) => {
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/profile/removewishlist`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            token: accessToken1,
            slug: slugToRemove,
          },
        }
      );
      setToastMessage("Product Removed Successfully🙁..!");

      setWishlistData(response.data.wishlist.wishlistItems);
      handlGetWishlist();
    } catch (error) {
      setToastMessage("Sorry " + error.response.data.message);
    }
  };

  useEffect(() => {
    handlGetWishlist();

    if (toastMessage) {
      // Set a timeout to remove the toast after 4000 milliseconds (4 seconds)
      const toastTimer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      // Clear both timeouts if the component unmounts or if toastMessage or isExploding changes
      return () => {
        clearTimeout(toastTimer);
      };
    }
  }, [toastMessage]);

  const handleProductClick = (product) => {
    // Navigate to the ViewProduct page and pass product data as query parameter
    navigate(`/viewProduct/${product._id}`, {
      state: {
        product: {
          id: product._id,
          productName: product.productName,
          description: product.productDescription,
          slug: product.productSlug,
          discountedPrice:
            product.productPrice -
            (product.productPrice * product.productDiscount) / 100,
          originalPrice: product.productPrice,
          discount: product.productDiscount || 0,
          colors: product.productColor,
          categories: product.category,
          sizes: product.productSize,
          productImages: product.productImages,
          inventory: product.productQuantity,
        },
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //animations
  useEffect(() => {
    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  
    ref.current.forEach((el, index) => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 50 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
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
  
    // Return a cleanup function to remove ScrollTriggers when the component unmounts
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [wishlistData]);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  return (
    <div className="relative">
      <Topbar progress={progress} />

      
      <div className="relative mb-2">
        <div className="bg-black h-[200px] flex items-center justify-center">
          <Typography
            color="white"
            className="absolute text-center text-white opacity-100 Capitalize text-[36px]"
          >
             Shipping Addresses
          </Typography>
        </div>
      </div>

      {wishlistData.length === 0 && (
        <div className="flex flex-col items-center justify-center py-8 px-8">
          <Typography>Your Wishlist is Empty</Typography>
          <Link to="/productList">
            <span className="flex gap-2 font-bold">
              GO TO SHOP <BuildingStorefrontIcon className="h-5 w-5" />
            </span>
          </Link>
        </div>
      )}
      {loading ? (
        <>
          <p>Getting Your Wishlist</p>
        </>
      ) : (
        <div className="py-8 px-8 flex flex-wrap  items-center justify-center  w-full">
          {wishlistData.map((product, index) => (
            <div
              ref={addtoRefs}
              key={index}
              className="flex flex-col items-center justify-center rounded-lg cursor-pointer bg-white "
            >
              <div className="relative">
                <img
                  src={product.productImages[0]}
                  alt={product.productName}
                  className="h-auto w-full object-cover object-center"
                />
                <div className="mt-4">
                  <h2>{product.productName}</h2>
                  {/* <p className="">{product.productDescription}</p> */}
                  <p className="flex flex-wrap gap-3">
                    <span>
                      {(
                        product.productPrice -
                        (product.productPrice * product.productDiscount) / 100
                      ).toLocaleString("en-IN", {
                        style: "currency",
                        currency: "INR",
                      })}
                    </span>
                  </p>
                </div>
                <div className="flex gap-1 items-center mt-2">
                  <Button
                    className="mt-4 inline-block bg-white border-black border text-black rounded-none font-normal px-12 py-4 uppercase text-[12px]"
                    onClick={() => handlRemoveFromWishlist(product.productSlug)}
                  >
                    Remove
                  </Button>
                  <Button
                    className="mt-4 inline-block bg-black text-white border-black border rounded-none font-normal px-12 py-4 uppercase text-[12px]"
                    onClick={() => handleProductClick(product)}
                  >
                    Buy
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && <Toast message={toastMessage} />}
      </div>



      <div className="inline-block">
        <Link to={"/account"} className="flex items-center bg-black w-auto py-4 px-8 text-white gap-2 justify-center">
          <ChevronLeftIcon className="h-4 w-4 " />
          <Typography>Account</Typography>
        </Link>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import {
  Radio,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Carousel,
  IconButton,
  Select,
  Option,
  Typography,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";


import { ShoppingBagIcon, HeartIcon, } from "@heroicons/react/24/solid";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ConfettiExplosion from "react-confetti-explosion";
import axios from "axios";
import Cart from "../../components/Cart";
import Toast from "../../components/Toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@smastrom/react-rating/style.css";
import "@splidejs/splide/dist/css/splide.min.css";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import {
  CheckBadgeIcon,
  ChevronDownIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  ExclamationCircleIcon,
  GifIcon,
  GiftTopIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../config/AuthContext";
import RoundedCard from "../../components/RoundedCard";
import Topbar from "../../components/Topbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function ViewProduct(props) {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isExploding, setIsExploding] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQty, setSelectedQty] = useState(1); // Added state for quantity
  const [toastMessage, setToastMessage] = useState("");
  const [accordianOpen, setAccordianOpen] = useState(1);
  const [reminder, setReminer] = useState(true);
  const [reminderDisabled, setReminerDisabled] = useState(true);
  const [zoomed, setZoomed] = useState(false);
  const [progress, setProgress] = useState(30);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState("productdetails"); 

  const splideOption = {
    type: "loop",
    autoplay: true,
    pauseOnHover: false,
    resetProgress: false,
    perPage: 4,
    breakpoints: {
      640: {
        perPage: 2,
      },
      480: {
        perPage: 2,
      },
    },
  };

  const toggleZoom = () => {
    setZoomed(!zoomed);
  };

  const handleAccordianOpen = (value) =>
    setAccordianOpen(accordianOpen === value ? 0 : value);

  const handleDrawer = () => setDrawerOpen(!drawerOpen);
  const handleOpen = () => setOpen(!open);

  const handleCartDrawer = () => setCartDrawerOpen(!cartDrawerOpen);
  const handleCartOpen = () => setCartOpen(!cartOpen);

  const { id } = useParams();
  const location = useLocation();
  const product = location.state.product;

  const handleAddToCart = async () => {
    if (isLoggedIn) {
      if (!selectedSize || !selectedColor || selectedQty < 1) { // Check quantity too
        setSizeError(!selectedSize);
        setColorError(!selectedColor);
        return;
      } else {
        setSizeError(false);
        setColorError(false);
      }

      const accessToken1 = localStorage.getItem("accessToken");
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/products/addtocart`,
          {
            token: accessToken1,
            slug: product.slug,
            size: selectedSize,
            color: selectedColor,
            quantity: selectedQty,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        handleCartDrawer();
        handleCartOpen();
        setToastMessage(response.data.message + "..!");
        setIsExploding(true);
      } catch (error) {
        setToastMessage("Sorry " + error.response.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  const [selectedImage, setSelectedImage] = useState(product.productImages[0]);
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handlGetWishlist = async () => {
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
      setWishlist(response.data.wishlist.wishlistItems);
      isProductInWishlist();
    } catch (error) { }
  };

  const handlAddToWishlist = async () => {
    if (isLoggedIn) {
      const accessToken1 = localStorage.getItem("accessToken");

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/products/addtowishlist`,
          {
            token: accessToken1,
            slug: product.slug,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setToastMessage(response.data.message + "..!");
        handlGetWishlist();
      } catch (error) {
        setToastMessage("Sorry " + error.response.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  const handlGetReminder = async () => {
    if (isLoggedIn) {
      const accessToken1 = localStorage.getItem("accessToken");

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/products/setreminder`,
          {
            token: accessToken1,
            productId: product.id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success && !reminderDisabled) {
          setReminer(false);
          setToastMessage(response.data.message + "..!");
        } else if (response.data.disable) {
          setReminer(false);
          setToastMessage(
            "You have already opted in for reminders for this product"
          );
        }
        setReminerDisabled(response.data.disable);
      } catch (error) {
        setToastMessage("Sorry " + error.response.data.message);
      }
    } else {
      navigate("/login");
    }
  };

  const handlSendReminder = async () => {
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/products/remindermail`,
        {
          token: accessToken1,
          productId: product.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) { }
  };

  const handleGetRelatedProducts = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/relatedproducts`,
        {
          category: product.category,
          title: product.title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setRelatedProducts(response.data.relatedProducts);
      setProgress(100);
    } catch (error) {
    }
  };

  const handleRelatedProductClick = (product) => {
    navigate(`/viewProduct/${product._id}`, {
      state: {
        product: {
          id: product._id,
          productName: product.title,
          description: product.desc,
          slug: product.slug,
          discountedPrice:
            product.price - (product.price * product.discount) / 100,
          originalPrice: product.price,
          discount: product.discount || 0,
          colors: product.color,
          categories: product.category,
          sizes: product.size,
          productImages: product.imgs,
          inventory: product.availableQty,
        },
      },
    });
  };

  useEffect(() => {
    handleGetRelatedProducts();
    handlGetWishlist();
  }, []);

  const isProductInWishlist = () => {
    return wishlist.some((item) => item.productSlug === product.slug);
  };

  useEffect(() => {
    if (product.inventory > 0) {
      handlSendReminder();
    }
    isProductInWishlist();
    if (toastMessage || isExploding) {
      const toastTimer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      const explodeTimer = setTimeout(() => {
        setIsExploding(false);
      }, 1000);

      return () => {
        clearTimeout(toastTimer);
        clearTimeout(explodeTimer);
      };
    }
  }, [toastMessage, isExploding]);

  const handleGoToWishList = () => {
    localStorage.setItem("lastSelectedTab", "Wishlist");
    navigate("/wishlist");
  };

  const decreaseQuantity = () => {
    if (selectedQty > 1) {
      setSelectedQty((prevQty) => prevQty - 1);
    }
  };

  const increaseQuantity = () => {
    setSelectedQty((prevQty) => prevQty + 1);
  };

  const data = [
    {
      label: "Product Details",
      value: "productdetails",
      desc: product.description,
    },
    {
      label: "Materials",
      value: "materials",
      desc: `Our product is made with premium materials and Lining material for comfort and durability. The trim is crafted from Trim material for added elegance. With secure Closure type and material closures and carefully selected hardware, our product offers both style and functionality.`,
    },
    {
      label: "Return Policy",
      value: "returnpolicy",
      desc: `Our return policy ensures that you can shop with confidence. Items must be unused and in the same condition as you received them, with the original packaging intact. We offer refunds for returned items, minus any shipping charges. Please note that certain items may be subject to a restocking fee. For further details, please refer to our full return policy.`,
    },
    {
      label: "Who we are",
      value: "whoweare",
      desc: `Welcome to JJNPS, the new fashion brand redefining style. We are committed to creating amazing experiences for all fashion enthusiasts. Our vision is to make fashion easy for everyone. ople. We are always looking to make something that is easy for everyone.`,
    },
  ];

  const handleTabClick = (value) => {
    setActiveTab(value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  var settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <ChevronRightIcon />,
    prevArrow: <ChevronLeftIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className=" dark:bg-gray-950 bg-white text-black">
      <Topbar progress={progress} />

      <div className="relative">
        <Slider {...settings}>
          {product.productImages.map((imageUrl, index) => (
            <div key={index}>
              <img
                src={imageUrl}
                alt={`Product Image ${index + 1}`}
                className="w-full"
                onClick={() => setSelectedImage(imageUrl)}
              />
            </div>
          ))}
        </Slider>
        <div className="absolute inset-x-0 inset-y-0 hidden flex-wrap items-center justify-center lg:flex  ">
          <div className="z-50 w-[250px] h-[150px] flex items-center justify-center flex-wrap bg-white shadow-md">
            <h3 className="text-black text-center text-[24px] font-bold w-full">{product.title} <span className="mt-0 lg:mt-1 font-normal block text-gray-700 text-[18px] w-full price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(product.originalPrice)}</span>
            </h3>
          </div>
        </div>
      </div>


      <div className="relative py-4 px-4 lg:py-12 lg:px-8">
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <div className="w-full">
            <h3 className="text-black text-[16px] font-bold lg:text-[20px]">{product.title}</h3>
            <p className="mt-0 lg:mt-1 font-normal text-gray-700 text-[16px] price">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(product.originalPrice)}</p>
          </div>

          <div className="w-full">
            <h3 className="text-black text-[16px] font-bold lg:text-[20px]">Color</h3>
            <div className="flex gap-2 mt-1 lg:mt-2">
              {product.colors.map((color, index) => (
                <label
                  key={index}
                  className="cursor-pointer inline-block w-auto h-auto border border-black relative"
                >
                  <input
                    type="radio"
                    name="color"
                    value={selectedColor}
                    onChange={() => setSelectedColor(color)}
                    checked={selectedColor === color}
                    className="sr-only"
                  />
                  <span
                    className={`block w-auto h-auto py-2 px-4 text-[12px] ${selectedColor === color ? `bg-black text-white` : ''}`}
                  >{color}</span>
                </label>
              ))}
            </div>
            {colorError && <p className="text-red-500">Please select a color</p>}
          </div>


          <div className="w-full">
            <h3 className="text-black text-[16px] font-bold lg:text-[20px]">Size</h3>
            <div className="flex gap-2 mt-1 lg:mt-2">
              {product.sizes.map((size, index) => (
                <label
                  key={index}
                  className="cursor-pointer inline-block w-auto h-auto border border-black relative"
                >
                  <input
                    type="radio"
                    name="size"
                    value={selectedSize}
                    onChange={() => setSelectedSize(size)}
                    checked={selectedSize === size}
                    className="sr-only"
                  />
                  <span
                    className={`block w-auto h-auto py-2 px-4 text-[12px] ${selectedSize === size ? `bg-black text-white` : ''}`}
                  >{size}</span>
                </label>
              ))}
            </div>
            {sizeError && <p className="text-red-500">Please select a size</p>}
          </div>

          <div className="w-full">
            <h3 className="text-black text-[16px] font-bold lg:text-[20px]">Quantity</h3>
            <div className="flex items-center mt-1 lg:mt-2">
              <button
                onClick={decreaseQuantity}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                -
              </button>
              <span className="mx-3">{selectedQty}</span>
              <button
                onClick={increaseQuantity}
                className="px-3 py-1 bg-gray-200 rounded-md"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex mt-8">
          {product.inventory >= 1 && (
            <div className="flex flex-col gap-2 lg:flex-row">
              <Button
                className="flex items-center justify-center px-16 h-14 rounded-none shadow-none text-[14px] font-normal"
                onClick={handleAddToCart}
              >
                Add to bag
              </Button>
              {!isProductInWishlist() ? (
                <Button
                  className="flex items-center justify-center w-14 h-14 rounded-none p-0 bg-transparent shadow-none hover:shadow-none"
                  onClick={handlAddToWishlist}
                >
                  <HeartIcon className="h-8 w-8 stroke-black stroke-1	" />
                </Button>
              ) : (
                <Button
                  className="flex items-center justify-center w-14 h-14 rounded-none p-0 bg-transparent shadow-none hover:shadow-none"
                  onClick={() => {
                    handleGoToWishList();
                  }}
                >
                  <HeartIcon className="h-8 w-8 text-black" />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="fixed w-content bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
          {toastMessage && <Toast message={toastMessage} />}
        </div>
      </div>

      <section className="bg-gray-100 ">
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="w-full py-4 px-4 lg:py-12 lg:px-8">
            <Tabs value={activeTab}>
              <TabsHeader>
                {data.map(({ label, value }) => (
                  <Tab
                    key={value}
                    value={value}
                    onClick={() => handleTabClick(value)}
                    className={`bg-white h-16 shadow-none ${activeTab === value ? "active-op" : ""}`}
                  >
                    {label}
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
          <div className="w-full">
            <img src="./../view-product.jpg" alt="" />
          </div>
        </div>
      </section>

      <Dialog open={open} handler={handleOpen} size="md">
        <DialogBody>
          <div className="w-full">
            <Carousel className="rounded-lg bg-gray-800 text-black" loop={true}>
              {product.productImages.map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden cursor-zoom-out"
                  style={{ position: "relative", paddingTop: "100%" }}
                >
                  <div
                    className={`absolute inset-0 bg-cover bg-center cursor-zoom-in rounded-lg transition-transform duration-500 ${zoomed ? "scale-[2.5]" : ""
                      }`}
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={toggleZoom}
                  />
                </div>
              ))}
            </Carousel>
          </div>
        </DialogBody>
      </Dialog>


      <Cart drawerOpen={cartDrawerOpen} handleDrawer={handleCartDrawer} />
    </div>
  );
}

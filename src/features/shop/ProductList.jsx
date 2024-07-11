import React, {
  useState,
  useEffect,
  Suspense,
  useLayoutEffect,
  useRef,
} from "react";
import ProductCard from "../../components/ProductCard";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import Loader from "../../components/Loader";
import {
  Collapse,
  IconButton,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Topbar from "../../components/Topbar";

export default function ProductList() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [openPopover, setOpenPopover] = React.useState(false);
  const [openCategoryPopover, setOpenCategoryPopover] = useState(false);
  const [openSizePopover, setOpenSizePopover] = useState(false);
  const [openSortByPopover, setOpenSortByPopover] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [progress, setProgress] = useState(30);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  const animatedComponents = makeAnimated();

  const categoryOptions = [
    { id: 1, value: "men", label: "Men" },
    { id: 2, value: "women", label: "Women" },
    { id: 3, value: "kids", label: "Kids" },
  ];

  const sizeOptions = [
    { id: 1, value: "XS", label: "XS" },
    { id: 2, value: "S", label: "S" },
    { id: 3, value: "M", label: "M" },
    { id: 4, value: "L", label: "L" },
    { id: 5, value: "XL", label: "XL" },
    { id: 6, value: "XXL", label: "XXL" },
  ];

  const sortByOptions = [
    { id: 1, value: "price_high_to_low", label: "Price high to Low" },
    { id: 2, value: "price_low_to_high", label: "Price Low to high" },
    { id: 3, value: "discount", label: "Discount" },
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedSortBy, setSelectedSortBy] = useState(null);

  // Handle sorting change
  const handleSortByChange = (selectedOption) => {
    setSelectedSortBy(selectedOption);
  };

  // Apply sorting
  let sortedProducts = [...productsData];
  if (selectedSortBy) {
    switch (selectedSortBy.value) {
      case "price_high_to_low":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice)
        );
        break;
      case "price_low_to_high":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice)
        );
        break;
      case "discount":
        sortedProducts.sort(
          (a, b) => parseFloat(b.discount) - parseFloat(a.discount)
        );
        break;
      default:
        break;
    }
  }

  const handleGetProduct = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/getproducts`,
        {
          slug: false,
          category: false,
          page: currentPage,
          limit: itemsPerPage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const mappedProducts = response.data.products.map((product) => ({
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
      }));
      setProductsData(mappedProducts);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [currentPage]);

  // Pagination
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setTotalPages(Math.ceil(productsData.length / itemsPerPage));
  }, [productsData, itemsPerPage]);

  // Lazy Loading
  const [isLoading, setIsLoading] = useState(false);
  const productListRef = useRef(null);

  const handleScroll = () => {
    const scrollHeight = window.scrollY + window.innerHeight;
    const bodyHeight = document.body.scrollHeight;

    if (scrollHeight >= bodyHeight) {
      if (currentPage < totalPages && !isLoading) {
        setCurrentPage(currentPage + 1);
        setIsLoading(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages, isLoading]);

  useEffect(() => {
    if (isLoading) {
      handleGetProduct();
      setIsLoading(false);
    }
  }, [isLoading]);

  const showLoadMoreButton = currentPage < totalPages; // Check if there are more pages to load

  const loadMoreProducts = () => {
    if (showLoadMoreButton && !isLoading) {
      setCurrentPage(currentPage + 1);
      setIsLoading(true);
    }
  };

  const LoadingSkeleton = () => {
    return (
      <div className="flex flex-wrap lg:flex-row">
        {Array.from({ length: itemsPerPage }, (_, index) => (
          <div key={index} className="w-full lg:w-1/4 h-416 lg:h-251 p-4">
            <div className="bg-gray-300 h-64 lg:h-40 rounded-lg animate-pulse"></div>
            <div className="mt-4 bg-gray-300 h-6 w-3/4 lg:w-1/2 rounded-md animate-pulse"></div>
            <div className="mt-2 bg-gray-300 h-6 w-2/4 lg:w-1/3 rounded-md animate-pulse"></div>
          </div>
        ))}
      </div>
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <Topbar progress={progress} />
      <Suspense fallback={<Loader />}>

      <div className="relative bg-cover bg-center flex items-center justify-center min-h-[170px] lg:min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.png)` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-2xl lg:text-5xl font-bold">Discover Our Products</h1>
          </div>
        </div>
        
  
        <div className="">
          {sortedProducts.length === 0 ? (
            <div className="">
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              <div className="flex flex-col w-full bg-white text-black">


                {/* Product card section */}
                <div className="flex flex-wrap lg:block lg:py-12 py-4" ref={productListRef}>
                  <Suspense fallback={<Loader />}>
                    {loading && <LoadingSkeleton />}
                    <ProductCard
                      data={sortedProducts.slice(
                        (currentPage - 1) * itemsPerPage,
                        currentPage * itemsPerPage
                      )}
                      selectedCategories={selectedCategories}
                      selectedSizes={selectedSizes}
                    />
                  </Suspense>
                </div>
             
                {showLoadMoreButton && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="px-4 py-2 bg-black text-white rounded hover:bg-gray-900 focus:outline-none"
                      onClick={loadMoreProducts} // Call loadMoreProducts function when clicked
                    >
                      {isLoading ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Suspense>
    </div>
  );
}

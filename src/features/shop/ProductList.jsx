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

  // useEffect(() => {
  //   setTimeout(() => {

  //   }, 1000); // 1 second delay
  // }, []);
  // Loading Skeleton component
  // LoadingSkeleton component
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

  return (
    <div className="">
      <Topbar progress={progress} />
      <Suspense fallback={<Loader />}>
        <div className="p-2">
          <Typography variant="h4" className="uppercase text-center">
            Discover Our Products
          </Typography>
        </div>
        <div className="">
          {sortedProducts.length === 0 ? (
            <div className="">
              <LoadingSkeleton />
            </div>
          ) : (
            <>
              <div className="flex flex-col w-full bg-white text-black">
                {/* Filter controls */}
                {/* Popover for Categories */}
                <div className="flex items-end justify-end gap-5 p-2 z-20">
                  {/* <div className="cursor-pointer">
                    <Popover
                      placement="bottom"
                      open={openCategoryPopover}
                      handler={setOpenCategoryPopover}
                    >
                      <PopoverHandler
                        onMouseEnter={() => setOpenCategoryPopover(true)}
                        onMouseLeave={() => setOpenCategoryPopover(false)}
                      >
                        <Typography
                          variant="small"
                          className="focus:outline-none flex items-center uppercase text-xs"
                        >
                          {selectedCategories.length > 0 ? (
                            <p className="flex flex-wrap gap-1">
                              {selectedCategories.map((category, index) => (
                                <span
                                  key={index}
                                  className="border border-gray-300 px-2 py-1 rounded"
                                >
                                  {category.label}
                                </span>
                              ))}
                            </p>
                          ) : (
                            "Categories"
                          )}
                          <ChevronDownIcon className="w-5 h-5" />
                        </Typography>
                      </PopoverHandler>
                      <PopoverContent
                        onMouseEnter={() => setOpenCategoryPopover(true)}
                        onMouseLeave={() => setOpenCategoryPopover(false)}
                        className="z-50 max-w-[24rem]"
                      >
                        <div>
                          {categoryOptions.map((category) => (
                            <Checkbox
                              key={category.id}
                              className="cursor-pointer hover:text-gray-900"
                              label={category.label}
                              checked={selectedCategories.some(
                                (c) => c.value === category.value
                              )}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setSelectedCategories([
                                    ...selectedCategories,
                                    category,
                                  ]);
                                } else {
                                  setSelectedCategories(
                                    selectedCategories.filter(
                                      (c) => c.value !== category.value
                                    )
                                  );
                                }
                              }}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div> */}

                  {/* Popover for Size */}
                  {/* <div className="cursor-pointer">
                    <Popover
                      placement="bottom"
                      open={openSizePopover}
                      handler={setOpenSizePopover}
                    >
                      <PopoverHandler
                        onMouseEnter={() => setOpenSizePopover(true)}
                        onMouseLeave={() => setOpenSizePopover(false)}
                      >
                        <Typography
                          variant="small"
                          className="focus:outline-none flex items-center uppercase text-xs"
                        >
                          {selectedSizes.length > 0 ? (
                            <p className="flex flex-wrap gap-1">
                              {selectedSizes.map((size, index) => (
                                <span
                                  key={index}
                                  className="border border-gray-300 px-2 py-1 rounded"
                                >
                                  {size.label}
                                </span>
                              ))}
                            </p>
                          ) : (
                            "Sizes"
                          )}
                          <ChevronDownIcon className="w-5 h-5" />
                        </Typography>
                      </PopoverHandler>
                      <PopoverContent
                        onMouseEnter={() => setOpenSizePopover(true)}
                        onMouseLeave={() => setOpenSizePopover(false)}
                        className="z-50 max-w-[24rem]"
                      >
                        <div>
                          {sizeOptions.map((size) => (
                            <Checkbox
                              key={size.id}
                              className="cursor-pointer hover:text-gray-900"
                              label={size.label}
                              checked={selectedSizes.some(
                                (s) => s.value === size.value
                              )}
                              onChange={(event) => {
                                if (event.target.checked) {
                                  setSelectedSizes([...selectedSizes, size]);
                                } else {
                                  setSelectedSizes(
                                    selectedSizes.filter(
                                      (s) => s.value !== size.value
                                    )
                                  );
                                }
                              }}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div></div> */}

                  {/* Popover for Sort By */}
                  {/* <div className="cursor-pointer">
                    <Popover
                      placement="bottom"
                      open={openSortByPopover}
                      handler={setOpenSortByPopover}
                    >
                      <PopoverHandler
                        onMouseEnter={() => setOpenSortByPopover(true)}
                        onMouseLeave={() => setOpenSortByPopover(false)}
                      >
                        <Typography
                          variant="small"
                          className="focus:outline-none flex items-center uppercase text-xs"
                        >
                          {selectedSortBy ? (
                            <p className="flex flex-wrap gap-1">
                              {selectedSortBy.label}
                            </p>
                          ) : (
                            "Sort By"
                          )}
                          <ChevronDownIcon className="w-5 h-5" />
                        </Typography>
                      </PopoverHandler>
                      <PopoverContent
                        onMouseEnter={() => setOpenSortByPopover(true)}
                        onMouseLeave={() => setOpenSortByPopover(false)}
                        className="z-50 max-w-[24rem]"
                      >
                        <div>
                          {sortByOptions.map((sortBy) => (
                            <Checkbox
                              key={sortBy.id}
                              className="cursor-pointer hover:text-gray-900"
                              label={sortBy.label}
                              checked={selectedSortBy?.value === sortBy.value}
                              onChange={() => setSelectedSortBy(sortBy)}
                            />
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div> */}
                </div>

                {/* Product card section */}
                <div className="flex flex-wrap lg:block" ref={productListRef}>
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

                {/* Pagination */}
                {/* <div className="flex justify-center mt-4">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 mx-1 ${
                        currentPage === index + 1
                          ? "bg-black text-white"
                          : "bg-gray-500 text-white"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div> */}
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

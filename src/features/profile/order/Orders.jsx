import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
  Dialog,
  Select,
  Option,
  Tabs,
  TabsHeader,
  Tab,
  Input,
} from "@material-tailwind/react";
import {
  CheckBadgeIcon,
  RocketLaunchIcon,
  TruckIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  XCircleIcon,
  ArrowUturnLeftIcon,
} from "@heroicons/react/24/solid";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "../../../components/Loader";
import Topbar from "../../../components/Topbar";

gsap.registerPlugin(ScrollTrigger);

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Shipped",
    value: "Shipped",
  },
  {
    label: "Delivered",
    value: "Delivered",
  },
];

export default function Orders() {
  const navigate = useNavigate();
  const ref = useRef([]);
  ref.current = [];

  const [ordersData, setOrdersData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(30);

  const handleTabChange = (value) => {
    setSelectedTab(value);
  };
  const handlGetOrders = async () => {
    setLoading(true);
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getorders`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Sort orders by created time
      const sortedOrders = response.data.orders.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setOrdersData(sortedOrders);
      setLoading(false);
      setProgress(100);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlGetOrders();
  }, []);

  const handleOrderClick = (order) => {
    // Navigate to the ViewProduct page and pass product data as query parameter
    navigate(`/orderDetails/${order.orderId}`, { state: { order } });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRows = ordersData.filter((item) => {
    const isMatchingTab =
      selectedTab === "all" ||
      item.deliveryStatus.toLowerCase() === selectedTab.toLowerCase();

    const isMatchingSearch = item.products.some((order) => {
      return (
        order.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.color.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.price
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        order.size.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    return isMatchingTab && isMatchingSearch;
  });

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
            duration: 0.1,
            delay: index * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "bottom right-=100",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [ref, filteredRows]);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      // Corrected the condition here
      ref.current.push(el);
    }
  };

  const OrderLoadingSkeleton = () => {
    return (
      <div className="w-full p-2 bg-gray-100 rounded-none  overflow-auto mb-4 lg:hover:-translate-y-2 duration-300 hover:bg-gray-300 animate-pulse">
        <div className="flex gap-2">
          <div className="h-24 w-24 lg:h-40 lg:w-40 rounded-md bg-gray-200"></div>
          <div className="text-center ml-auto mr-auto mt-auto mb-auto text-md">
            <div className="h-4 w-40 bg-gray-200 mb-2"></div>
            <div className="h-3 w-20 bg-gray-200"></div>
            <div className="h-3 w-32 bg-gray-200 mt-1"></div>
          </div>
        </div>
        <div className="h-4 w-32 bg-gray-200 mt-3 ml-auto mr-auto"></div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <Topbar progress={progress} />
      <div>
        <Link to={"/account"} className="flex items-center">
          <ChevronLeftIcon className="h-5 w-5 " />
          <Typography>Account</Typography>
        </Link>
        <p className="text-2xl text-center text-slate-400 mb-5">My Orders</p>
      </div>
      {/* <div className="hidden lg:flex mb-5">
        <Typography variant="h3">
          <p>My Orders</p>
        </Typography>
      </div> */}
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10 p-2">
        <Tabs value="all" className="w-full md:w-max">
          <TabsHeader>
            {TABS.map(({ label, value }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleTabChange(value)}
              >
                &nbsp;&nbsp;{label}&nbsp;&nbsp;
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
        <div className="w-full md:w-72">
          <Input
            label="Search Order"
            value={searchQuery}
            onChange={handleSearch}
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      {loading && ordersData.length === 0 && (
        <div className="">
          {[...Array(5)].map((_, index) => (
            <OrderLoadingSkeleton key={index} />
          ))}
        </div>
      )}
      {!loading && ordersData.length === 0 && (
        <div className="flex items-center justify-center">
          <Typography>You don't have any orders yet.</Typography>
        </div>
      )}
      {loading && ordersData.length > 0 && (
        <div className="flex flex-wrap gap-2 lg:gap-6 items-center justify-center w-88">
          {[...Array(5)].map((_, index) => (
            <OrderLoadingSkeleton key={index} />
          ))}
        </div>
      )}
      {ordersData.length > 0 && loading ? (
        <div className="flex flex-wrap gap-2 lg:gap-6 items-center justify-center w-88">
          {[...Array(5)].map((_, index) => (
            <OrderLoadingSkeleton key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 lg:gap-6 items-center justify-center w-88  ">
          {filteredRows.map((item, index) => (
            <Card
              ref={addtoRefs}
              key={index}
              color="transparent"
              shadow={false}
              className="   cursor-pointer w-96 p-2 bg-gray-100 rounded-none rflow-auto overflow-auto mb-4 lg:hover:-translate-y-2 duration-300 hover:bg-gray-300"
            >
              <Typography
                variant="h5"
                className="mb-5 flex gap-1 items-center "
              >
                {item.deliveryStatus === "Delivered" ? (
                  <CheckBadgeIcon className="h-5 w-5 text-black" />
                ) : item.deliveryStatus === "Shipped" ? (
                  <TruckIcon className="h-5 w-5 text-black" />
                ) : item.deliveryStatus === "Canceled" ? (
                  <XCircleIcon className="h-5 w-5 text-black" />
                ) : item.deliveryStatus === "Returned" ? (
                  <ArrowUturnLeftIcon className="h-5 w-5 text-black" />
                ) : (
                  <RocketLaunchIcon className="h-5 w-5 text-black" />
                )}
                {item.deliveryStatus == "Delivered" ? (
                  <p>
                    {item.deliveryStatus} on{" "}
                    {new Date(item.updatedAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                  </p>
                ) : (
                  <p>{item.deliveryStatus}</p>
                )}
              </Typography>

              {item.products.map((order, index) => (
                <CardBody
                  key={index}
                  className="p-0"
                  onClick={() => {
                    handleOrderClick(item);
                  }}
                >
                  <div>
                    <div className="flex gap-2">
                      {item.orderImages.length > 0 && (
                        <img
                          key={index} // Assuming 'index' is defined elsewhere in your code
                          src={item.orderImages[index].images[0]} // Accessing the 'index' element directly
                          className="h-28 w-24 lg:h-40 lg:w-40 rounded-md lg:hover:scale-75 duration-500"
                          alt={`Product ${item.name}`}
                        />
                      )}

                      <div className="text-center ml-auto mr-auto mt-auto mb-auto text-md">
                        <p className="text-black">
                          {order.price.toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </p>
                        <p>
                          <p className="text-justify text-black">
                            {order.title}
                          </p>
                          <p className="text-justify text-black">
                            {order.color}, {order.size}
                          </p>
                        </p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              ))}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

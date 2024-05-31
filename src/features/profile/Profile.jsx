import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Dialog,
  DialogBody,
  DialogFooter,
  IconButton,
  DialogHeader,
} from "@material-tailwind/react";
import {
  IdentificationIcon,
  MapIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  BookmarkIcon,
  StarIcon,
  Cog6ToothIcon,
  PowerIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import Address from "./Address";
import Orders from "./order/Orders";
import Loader from "../../components/Loader";
import Wishlist from "./Wishlist";
import NavbarMenu from "../../components/NavbarMenu";
import { Footer } from "../../components/Footer";
import { useAuth } from "../../config/AuthContext";
import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Topbar from "../../components/Topbar";

gsap.registerPlugin(ScrollTrigger);

export default function Profile() {
  const [activeTab, setActiveTab] = useState(getLastSelectedTab());
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [progress, setProgress] = useState(30);

  const navigate = useNavigate();
  const ref = useRef([]);
  ref.current = [];

  const { accessToken, logout } = useAuth();
  const accessToken1 = localStorage.getItem("accessToken");

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  useEffect(() => {
    // Read dialog state from localStorage
    const storedDialogState = JSON.parse(localStorage.getItem("dialogOpen"));
    if (storedDialogState !== null) {
      setDialogOpen(storedDialogState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lastSelectedTab", activeTab);
  }, [activeTab, openDialog]);

  function getLastSelectedTab() {
    return localStorage.getItem("lastSelectedTab" || "My Information");
  }

  const handleMobileTabClick = (label) => {
    switch (label) {
      case "Profile":
        // setActiveTab(label);
        // setOpenDialog(true);
        // setDialogContent(<ProfileInfo />);
        navigate("/profileInfo");
        break;
      case "Saved Addresses":
        // setActiveTab(label);
        // setOpenDialog(true);
        navigate("/addresses");
        break;
      case "Orders":
        // setActiveTab(label);
        // setOpenDialog(true);
        navigate("/orders");
        break;
      case "Wishlist":
        // setActiveTab(label);
        // setOpenDialog(true);
        navigate("/wishlist");
        break;

      default:
        // setActiveTab(label);
        // setOpenDialog(false);
        // setDialogContent(null);
        break;
    }
  };

  const handleDesktopTabClick = (label) => {
    switch (label) {
      case "Profile":
        // setOpenDialog(true);
        // setDialogContent(<ProfileInfo />);
        navigate("/profileInfo");
        break;
      case "Saved Addresses":
        navigate("/addresses");
        break;
      case "Orders":
        // setActiveTab(label);
        // setOpenDialog(true);
        // setDialogContent(<Orders />);
        navigate("/orders");
        break;
      case "Wishlist":
        // setActiveTab(label);
        // setOpenDialog(true);
        // setDialogContent(<Wishlist />);
        navigate("/wishlist");
        break;
      case "Log Out":
        // setActiveTab(label);
        // setOpenDialog(true);
        // setDialogContent(<Wishlist />);
        handleLogout();
        break;

      default:
        // setActiveTab(label);
        // setOpenDialog(false);
        // setDialogContent(null);
        break;
    }
  };
  const renderForm = () => {
    switch (activeTab) {
      case "My Information":
        return <ProfileInfo />;
      case "Saved Addresses":
        return <Address />;
      case "My Orders":
        return <Orders />;
      case "Wishlist":
        return <Wishlist />;
      default:
        return null;
    }
  };

  const handleUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getuser`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setUserData(response.data.user);
      // Set form data with user data

      setLoading(false);
      setProgress(100);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login");
      }
      setLoading(false);
    }
  };

  //animations
  useEffect(() => {
    setLoading(false);
    handleUserData();
    if (ref.current) {
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
              start: "top right-=100",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }
  }, [ref]);

  const addtoRefs = (el) => {
    if (el && !ref.current.includes(el)) {
      ref.current.push(el);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-auto">
      <Topbar progress={progress} />

      {loading && (
        <div className=" flex items-center justify-center">
          <Loader />
        </div>
      )}
        <div className="relative mb-2 ">
          <div className="bg-black h-[200px] flex items-center justify-center">
            <Typography
              color="white"
              className="absolute text-center text-white opacity-100 Capitalize text-[36px]"
            >
              Hey, {userData.firstName} {userData.lastName}
            </Typography>
          </div>
        </div>  

      <div className="hidden lg:flex mt-16 mb-16 mx-8" ref={addtoRefs}>
        <div className="w-full">
          <div>
            <Card className=" rounded-lg bg-white shadow-none ">
              <div className="flex flex-wrap w-full items-center justify-between">
                {[
                  {
                    mainLabel: "Profile",
                    subLabels: ["Manage your information"],
                  },
                  {
                    mainLabel: "Saved Addresses",
                    subLabels: ["Manage shipping addresses"],
                  },
                  {
                    mainLabel: "Orders",
                    subLabels: ["View all orders"],
                  },
                  { mainLabel: "Wishlist", subLabels: ["Saved items"] },
                  { mainLabel: "Log Out", subLabels: ["You will be missed"] },
                ].map(({ mainLabel, subLabels = [] }, key) => (
                  <div key={key}>
                    <div
                      className="hover:text-gray-900 cursor-pointer transition duration-300 ease-in-out w-80 items-center justify-center text-center rounded-md cursor-pointer transition duration-300 ease-in-out"
                      onClick={() => handleDesktopTabClick(mainLabel)}
                    >
                      <div className="text-center">
                        <p className="text-center text-[24px]">{getPrefixIconByLabel(mainLabel)}</p>
                        <p className="text-[24px] text-black font-bold">{mainLabel}</p>
                      </div>
                      {subLabels.length > 0 && (
                        <div className="flex flex-col items-center justify-center">
                          {subLabels.map((subLabel, index) => (
                            <div key={index} className="text-sm text-gray-500 ">
                              <p className="text-[16px] mt-2">{subLabel}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
               
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const getPrefixIconByLabel = (label) => {
  switch (label) {
    case "Profile":
      return <IdentificationIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    case "Saved Addresses":
      return <MapIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    case "Orders":
      return <ShoppingBagIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    case "Wishlist":
      return <BookmarkIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    case "My Reviews & ratings":
      return <StarIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    case "Settings":
      return <Cog6ToothIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    case "Log Out":
      return <PowerIcon className="h-16 w-16 text-black m-auto mb-4 bg-gray-100 p-4 rounded-full" />;
    default:
      return null;
  }
};

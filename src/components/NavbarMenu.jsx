import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import {
  Bars3Icon,
} from "@heroicons/react/24/solid";

import Cart from "./Cart";
import {
  UserIcon,
  XMarkIcon,
  ShoppingBagIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../config/AuthContext";
import { useLocation } from "react-router-dom";

function NavList() {
  const navigate = useNavigate();

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0  lg:p-1">
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium text-black"
      >
        <Link to={"/productList"}>
          <ListItem className="flex items-center gap-2 py-2 pr-4">
            Shop
          </ListItem>
        </Link>
      </Typography>
      <Typography
        variant="small"
        color="blue-gray"
        className="font-medium text-black"
        onClick={() => navigate("/contactus")}
      >
        <ListItem className=" py-2 pr-4">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export default function NavbarMenu() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleDrawer = () => setDrawerOpen(!drawerOpen);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomepage = location.pathname === '/';
  const logoSrc = isSticky ? "/black-logo.png" : "/white-logo.png";
  const cartButtonColor = isSticky ? "white" : "black";
  const menuColor = isSticky ? "text-black" : "text-white";


  return (
    <>
      {isHomepage ? (
        <>
          <div className="flex items-center justify-center bg-gray-100 py-2">
            <p className="text-black font-bold text-[14px]">
              OFFER!!!! 📢 20% off on all brand{" "}
            </p>
          </div>

          <div className={`absolute z-50 py-4 px-8 w-full mx-auto bg-transparent ${isSticky ? 'sticky-nav' : ''}`}>
            <div className="relative mx-auto flex items-center justify-between ">
              <div className={`relative cursor-pointer font-normal text-[14px] flex items-end gap-2 ${menuColor}`} onClick={toggleIsNavOpen}>
                <Button
                  color={cartButtonColor}                  
                  className={`transition-transform duration-300 ease-in-out transform p-0 bg-transparent max-w-none max-h-none shadow-none hover:shadow-none ${isNavOpen ? "rotate-180" : ""}`}
                >
                  {isNavOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}                  
                </Button>
                Menu
              </div>

              <div className="relative">
                <Link to="/">
                  <img
                    src={logoSrc}
                    alt=""
                    className="mx-auto w-[105px] h-auto sm:mx-0 sm:shrink-0"
                  />
                </Link>
              </div>

              <div className="relative">
                <div className="hidden ml-auto">
                  <NavList />
                </div>

                <div className="flex align-center gap-5">
                  <Button
                    color={cartButtonColor}
                    className="p-0 bg-transparent shadow-none hover:shadow-none"
                    onClick={() => navigate("/account")}
                  >
                    <UserIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    color={cartButtonColor}
                    onClick={handleDrawer}
                    className="p-0 bg-transparent shadow-none hover:shadow-none"
                  >
                    <span>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </span>
                  </Button>

                  <Button
                    color={cartButtonColor}
                    className="p-0 bg-transparent shadow-none hover:shadow-none"
                  >
                    <span>
                      <HeartIcon className="h-5 w-5" />
                    </span>
                  </Button>
                </div>

                <Cart handleDrawer={handleDrawer} drawerOpen={drawerOpen} />
              </div>
            </div>

            <Collapse open={isNavOpen} className="overflow-auto ">
              <NavList />

              <div className="pl-2">{/* <ProfileMenu /> */}</div>
            </Collapse>
          </div>
        </>


      ) : (


        <div className="sticky top-0 z-50 py-4 px-8 w-full bg-gray-100 shadow-[0px_0px_20px_0px_rgba(0,0,0,0.2)]">
          <div className="relative mx-auto flex items-center justify-between ">
              <div className={`relative cursor-pointer font-normal text-[14px] flex items-end gap-2 text-black`} onClick={toggleIsNavOpen}>
                <Button            
                  className={`transition-transform duration-300 ease-in-out transform p-0 bg-transparent max-w-none max-h-none shadow-none text-black hover:shadow-none ${isNavOpen ? "rotate-180" : ""}`}
                >
                  {isNavOpen ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}                  
                </Button>
                Menu
              </div>

              <div className="relative">
                <Link to="/">
                  <img
                    src="../black-logo.png"
                    alt=""
                    className="mx-auto w-[105px] h-auto sm:mx-0 sm:shrink-0"
                  />
                </Link>
              </div>

              <div className="relative">
                <div className="hidden ml-auto">
                  <NavList />
                </div>

                <div className="flex align-center gap-5">
                  <Button
                    className="p-0 text-black bg-transparent shadow-none hover:shadow-none"
                    onClick={() => navigate("/account")}
                  >
                    <UserIcon className="h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleDrawer}
                    className="p-0 text-black bg-transparent shadow-none hover:shadow-none"
                  >
                    <span>
                      <ShoppingBagIcon className="h-5 w-5" />
                    </span>
                  </Button>

                  <Button
                    className="p-0 text-black bg-transparent shadow-none hover:shadow-none"
                  >
                    <span>
                      <HeartIcon className="h-5 w-5" />
                    </span>
                  </Button>
                </div>

                <Cart handleDrawer={handleDrawer} drawerOpen={drawerOpen} />
              </div>
            </div>

          <Collapse open={isNavOpen} className="overflow-auto ">
            <NavList />

            <div className="pl-2">{/* <ProfileMenu /> */}</div>
          </Collapse>
        </div>
      )}
    </>
  );
}

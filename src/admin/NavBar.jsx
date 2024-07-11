import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAdminAuth } from "../config/AdminAuth";
import { useNavigate } from "react-router-dom";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Account
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <a
          href="#"
          className="flex items-center hover:text-blue-500 transition-colors"
        >
          Blocks
        </a>
      </Typography>
    </ul>
  );
}

export default function NavBar() {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const [openNav, setOpenNav] = React.useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/superuserAuth");
  };
  return (
    <div className="sticky top-0 z-50 mx-auto p-2  lg:pl-6 bg-white p-3 shadow-xl">
      <div className="flex items-center justify-between ">
        <div className="px-2">
          <Typography
            as="a"
            onClick={() => navigate("/admin")}
            className="mr-auto cursor-pointer  font-medium "
          >
            <img
              src="/black-logo.png"
              alt=""
              className="block mx-auto h-10 scale-125 rounded-full sm:mx-0 sm:shrink-0"
            />
          </Typography>
        </div>
        <div className="hidden lg:block">
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium cursor-pointer"
            onClick={() => {
              handleLogout();
            }}
          >
            <Tooltip content="Logout" placement="top-end">
              <p className="flex items-center cursor-pointer transition-colors">
                <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-red-600 " />
              </p>
            </Tooltip>
          </Typography>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <Typography
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-medium cursor-pointer"
          onClick={() => {
            handleLogout();
          }}
        >
          <p className="flex items-center hover:text-blue-500 gap-1 transition-colors">
            Logout{" "}
            <ArrowLeftStartOnRectangleIcon className="h-5 w-5 text-red-200" />
          </p>
        </Typography>
      </Collapse>
    </div>
  );
}

import React, { useState, useEffect } from "react";
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
  Accordion,
  AccordionBody,
  AccordionHeader,
  DialogHeader,
} from "@material-tailwind/react";
import {
  IdentificationIcon,
  PresentationChartBarIcon,
  MapIcon,
  ShoppingBagIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  BookmarkIcon,
  StarIcon,
  Cog6ToothIcon,
  PowerIcon,
  ChevronLeftIcon,
  UserGroupIcon,
  InboxStackIcon,
  RectangleGroupIcon,
  PlusCircleIcon,
  ArrowUturnRightIcon,
  ChatBubbleBottomCenterIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import AddProduct from "./products/AddProduct";
import ViewAllProducts from "./products/ViewAllProducts";
import Orders from "./orders/Orders";
import NavBar from "./NavBar";
import { Footer } from "../components/Footer";
import { useAuth } from "../config/AuthContext";
import axios from "axios";
import Dashboard from "./Dashboard";
import Loader from "../components/Loader";
import Customers from "./Customers";
import ReturnedOrders from "./orders/Returned/ReturnedOrders";
import Complaints from "./Complaints";
import ContactQueries from "./ConatactQueries";
export default function Admin() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };
  const [activeTab, setActiveTab] = useState(getLastSelectedAdminTab());
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);

  const navigate = useNavigate();

  const handleTabClick = (label) => {
    setActiveTab(label);
  };

  useEffect(() => {
    localStorage.setItem("lastSelectedAdminTab", activeTab);
  }, [activeTab, openDialog]);

  function getLastSelectedAdminTab() {
    return localStorage.getItem("lastSelectedAdminTab") || "Dashboard";
  }

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
      // setFormData({ ...formData, userId });

      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleMobileTabClick = (label) => {
    switch (label) {
      case "Dashboard":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<Dashboard />);
        break;
      case "Orders":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<Orders />);
        break;
      case "Returned Orders":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<ReturnedOrders />);
        break;
      case "Add New Product":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<AddProduct />);
        break;
      case "View All Products":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<ViewAllProducts />);
        break;
      case "Customers":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<Customers />);
        break;
      case "Complaints":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<Complaints />);
        break;

      case "Contact Queries":
        setActiveTab(label);
        setOpenDialog(true);
        setDialogContent(<ContactQueries />);
        break;

      default:
        setActiveTab(label);
        setOpenDialog(false);
        setDialogContent(null);
        break;
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Orders":
        return <Orders />;
      case "Returned Orders":
        return <ReturnedOrders />;
      case "Add New Product":
        return <AddProduct />;
      case "View All Products":
        return <ViewAllProducts />;
      case "Customers":
        return <Customers />;
      case "Complaints":
        return <Complaints />;
      case "Contact Queries":
        return <ContactQueries />;

      default:
        return <Dashboard />;
    }
  };

  return (
    <div>
      {loading && <Loader />}

      <div className="flex lg:hidden ">
        <Card className="h-full w-full p-4 shadow-xl shadow-blue-gray-900/5">
          <div className="mb-2 p-4 shadow-sm">
            <Typography variant="h5" color="blue-gray">
              Hello, There
            </Typography>
          </div>

          <List>
            {[
              "Dashboard",
              "Orders",
              "Returned Orders",
              "Products",
              "Customers",
              "Complaints",
              "Contact Queries",
            ].map((label, key) =>
              label === "Products" ? (
                <Accordion
                  key={key}
                  open={open === 1}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === 1 ? "rotate-180" : ""
                      }`}
                    />
                  }
                >
                  <ListItem className="p-0" selected={open === 1}>
                    <AccordionHeader
                      onClick={() => handleOpen(1)}
                      className="border-b-0 p-3"
                    >
                      <ListItemPrefix>
                        {getPrefixIconByLabel(label)}
                      </ListItemPrefix>
                      <Typography
                        color="blue-gray"
                        className="mr-auto font-normal"
                      >
                        {label}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      <ListItem
                        onClick={() =>
                          handleMobileTabClick("View All Products")
                        }
                      >
                        <ListItemPrefix>
                          <RectangleGroupIcon
                            strokeWidth={5}
                            className="h-5 w-5"
                          />
                        </ListItemPrefix>
                        View All Products
                      </ListItem>
                      <ListItem
                        onClick={() => handleMobileTabClick("Add New Product")}
                      >
                        <ListItemPrefix>
                          <PlusCircleIcon strokeWidth={5} className="h-5 w-5" />
                        </ListItemPrefix>
                        Add New Product
                      </ListItem>
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                <ListItem
                  key={key}
                  onClick={() => handleMobileTabClick(label)}
                  className={`flex items-center gap-2 rounded${
                    activeTab === label
                      ? " bg-blue-500 active:bg-blue-500 focus:bg-blue-500 text-white active:text-white focus:text-white"
                      : " hover:bg-blue-500/10 focus:bg-blue-500/10 active:bg-blue-500/10"
                  }`}
                >
                  <ListItemPrefix>{getPrefixIconByLabel(label)}</ListItemPrefix>
                  {label}
                </ListItem>
              )
            )}
          </List>
        </Card>
      </div>

      <div className="flex lg:hidden h-full w-full shadow-xl shadow-blue-gray-900/5 bg-blue-50 overflow-auto">
        <Dialog
          open={openDialog}
          handler={handleTabClick}
          size="xxl"
          className="lg:hidden overflow-auto"
        >
          <div className="w-full sticky top-0 z-50">
            <NavBar />
          </div>
          <DialogHeader>
            <ChevronLeftIcon
              className="h-7 w-7"
              onClick={() => setOpenDialog(false)}
            />
            {activeTab}
          </DialogHeader>
          {dialogContent && <DialogBody>{dialogContent}</DialogBody>}
          <div>
            <Footer />
          </div>
        </Dialog>
      </div>

      <div className="hidden lg:block ">
        <div className="flex">
          <div>
            <Card className="h-[calc(100vh)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
              <div className="mb-2 p-4 shadow-sm">
                <Typography variant="h5" color="blue-gray">
                  Hello, There
                </Typography>
              </div>

              <List>
                {[
                  "Dashboard",
                  "Orders",
                  "Returned Orders",
                  "Products",
                  "Customers",
                  "Complaints",
                  "Contact Queries",
                ].map((label, key) =>
                  label === "Products" ? (
                    <Accordion
                      key={key}
                      open={open === 1}
                      icon={
                        <ChevronDownIcon
                          strokeWidth={2.5}
                          className={`mx-auto h-4 w-4 transition-transform ${
                            open === 1 ? "rotate-180" : ""
                          }`}
                        />
                      }
                    >
                      <ListItem className="p-0" selected={open === 1}>
                        <AccordionHeader
                          onClick={() => handleOpen(1)}
                          className="border-b-0 p-3"
                        >
                          <ListItemPrefix>
                            {getPrefixIconByLabel(label)}
                          </ListItemPrefix>
                          <Typography
                            color="blue-gray"
                            className="mr-auto font-normal"
                          >
                            {label}
                          </Typography>
                        </AccordionHeader>
                      </ListItem>
                      <AccordionBody className="py-1">
                        <List className="p-0">
                          <ListItem
                            onClick={() => handleTabClick("View All Products")}
                          >
                            <ListItemPrefix>
                              <RectangleGroupIcon
                                strokeWidth={5}
                                className="h-5 w-5"
                              />
                            </ListItemPrefix>
                            View All Products
                          </ListItem>
                          <ListItem
                            onClick={() => handleTabClick("Add New Product")}
                          >
                            <ListItemPrefix>
                              <PlusCircleIcon
                                strokeWidth={5}
                                className="h-5 w-5"
                              />
                            </ListItemPrefix>
                            Add New Product
                          </ListItem>
                        </List>
                      </AccordionBody>
                    </Accordion>
                  ) : (
                    <ListItem
                      key={key}
                      onClick={() => handleTabClick(label)}
                      className={`flex items-center gap-2 rounded${
                        activeTab === label
                          ? " bg-blue-500 active:bg-blue-500 focus:bg-blue-500 text-white active:text-white focus:text-white"
                          : " hover:bg-blue-500/10 focus:bg-blue-500/10 active:bg-blue-500/10"
                      }`}
                    >
                      <ListItemPrefix>
                        {getPrefixIconByLabel(label)}
                      </ListItemPrefix>
                      {label}
                    </ListItem>
                  )
                )}
              </List>
            </Card>
          </div>
          <div className="h-[calc(100vh-2rem)] w-full p-4 shadow-xl shadow-blue-gray-900/5 bg-blue-50 overflow-auto">
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

const getPrefixIconByLabel = (label) => {
  switch (label) {
    case "Dashboard":
      return <PresentationChartBarIcon className="h-5 w-5" />;
    case "Orders":
      return <ShoppingBagIcon className="h-5 w-5" />;
    case "Products":
      return <InboxStackIcon className="h-5 w-5" />;
    case "Customers":
      return <UserGroupIcon className="h-5 w-5" />;
    case "Returned Orders":
      return <ArrowUturnRightIcon className="h-5 w-5" />;
    case "Complaints":
      return <QuestionMarkCircleIcon className="h-5 w-5" />;
    case "Contact Queries":
      return <ChatBubbleBottomCenterIcon className="h-5 w-5" />;
    case "My Reviews & ratings":
      return <StarIcon className="h-5 w-5" />;
    case "Settings":
      return <Cog6ToothIcon className="h-5 w-5" />;
    case "Log Out":
      return <PowerIcon className="h-5 w-5" />;
    default:
      return null;
  }
};

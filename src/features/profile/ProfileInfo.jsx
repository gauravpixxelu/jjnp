import React, { useState, useEffect } from "react";
import {
  Radio,
  Button,
  Accordion,
  AccordionHeader,
  AccordionBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Loader from "../../components/Loader";
import Toast from "../../components/Toast";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
  ChevronLeftIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import Profile from "./Profile";
import Topbar from "../../components/Topbar";
export default function ProfileInfo() {
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  const [open, setOpen] = React.useState(1);
  const [progress, setProgress] = useState(30);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const toggleEditing = () => {
    setEditing(!editing);
  };

  const accessToken1 = localStorage.getItem("accessToken");

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
      setFormData({
        email: response.data.user.email,
        phone: response.data.user.phone,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        gender: response.data.user.gender,
      });

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

  const handleUpdateUserData = async () => {
    setLoading(true);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/profile/updateuser`,
        {
          token: accessToken1,
          email: formData.email,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: formData.gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setToastMessage(response.data.message + "..!");
      toggleEditing();
      setLoading(false);
      handleUserData();
    } catch (error) {
      setToastMessage(
        "Sorry Error occured while updating user data. Please try again."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    handleUserData();
  }, [editing]);

  useEffect(() => {
    if (toastMessage) {
      // Set a timeout to remove the toast after 4000 milliseconds (4 seconds)
      const toastTimer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      // Clear the timeouts if the component unmounts or if toastMessage or isExploding changes
      return () => {
        clearTimeout(toastTimer);
      };
    }
  }, [toastMessage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative">
      <Topbar progress={progress} />

      <div className="relative mb-2 ">
        <div className="bg-black h-[200px] flex items-center justify-center">
          <Typography
            color="white"
            className="absolute text-center text-white opacity-100 Capitalize text-[36px]"
          >
            Hey, {userData.firstName} {userData.lastName}
            <p className="text-2xl text-slate-400 mb-5">
              View or Edit Your Information
            </p>
          </Typography>
        </div>
      </div>

      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      
      <div className="py-12">
        <center>
          {error && <p>{error}</p>}

        </center>

        {editing ? (
          // Editable form
          <div>
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <div className=" w-full lg:w-1/4 p-2">
                <label htmlFor="first_name">First Name:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled={!editing}
                  value={formData.firstName}
                  name="firstName"
                  onChange={handleChange}
                />
                <label className="mt-6 inline-block" htmlFor="phone">Mobile Number:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled={!editing}
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                />
              </div>
              <div className=" w-full lg:w-1/4 p-2">
                <label htmlFor="last_name">Last Name:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled={!editing}
                  value={formData.lastName}
                  onChange={handleChange}
                  name="lastName"
                />
                <label className="mt-6 inline-block" htmlFor="last_name">Email Address:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled={!editing}
                  value={formData.email}
                  onChange={handleChange}
                  name="email"
                />
              </div>
            </div>
            <div className="flex gap-5  items-center justify-center">
              <label htmlFor="gender">Gender:</label>
              <Radio
                name="gender"
                label="Male"
                color="black"
                disabled={!editing}
                checked={formData.gender === "Male" ? true : false}
                value="Male" // Add this line
                onChange={handleChange}
                className="bg-white"
              />
              <Radio
                name="gender"
                label="Female"
                color="black"
                disabled={!editing}
                checked={formData.gender === "Female" ? true : false}
                value="Female" // Add this line
                onChange={handleChange}
                className="bg-white"
              />
            </div>
          </div>
        ) : (
          // Show saved data
          <div>
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <div className=" w-full lg:w-1/4 p-2">
                <label htmlFor="first_name">First Name:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled
                  value={userData.firstName}
                />
                <label className="mt-6 inline-block" htmlFor="phone">Mobile Number:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled
                  value={userData.phone}
                />
              </div>
              <div className=" w-full lg:w-1/4 p-2">
                <label htmlFor="last_name">Last Name:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  type="text"
                  disabled
                  value={userData.lastName}
                />
                <label className="mt-6 inline-block" htmlFor="last_name">Email Address:</label>
                <input
                   className="flex h-12 outline-none border border-solid border-gray-300 bg-gray-200 w-full  p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                   type="text"
                  disabled
                  value={userData.email}
                />
              </div>
            </div>
            <div className="flex gap-5 items-center justify-center ">
              <label htmlFor="gender">Gender:</label>
              <Radio
                name="gender"
                label="Male"
                color="black"
                disabled={!editing}
                checked={formData.gender === "Male"}
                value="Male" // Value corresponds to the selected option
                onChange={handleChange}
                className="bg-white"
              />
              <Radio
                name="gender"
                label="Female"
                color="black"
                disabled={!editing}
                checked={formData.gender === "Female"}
                value="Female" // Value corresponds to the selected option
                onChange={handleChange}
                className="bg-white"
              />
            </div>
          </div>
        )}

        <div className="flex gap-10 items-center justify-center">
          {editing ? (
            <Button
              onClick={toggleEditing}
              className="mt-4 h-12 px-12 py-2 rounded-none uppercase shadow-none"
            >
              Cancel
            </Button>
          ) : (
            <Button
              onClick={toggleEditing}
              className="mt-4 h-12 px-12 py-2 rounded-none text-white uppercase shadow-none"
            >
              Edit
            </Button>
          )}

          {editing && (
            <Button
              className="mt-4 h-12 px-12 py-2 rounded-none text-white uppercase shadow-none"
              onClick={handleUpdateUserData}
            >
              Save
            </Button>
          )}
        </div>
      </div>



      <div className="inline-block">
        <Link to={"/account"} className="flex items-center bg-black w-auto py-4 px-8 text-white gap-2 justify-center">
          <ChevronLeftIcon className="h-4 w-4 " />
          <Typography>Account</Typography>
        </Link>
      </div> 



      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && (
          <Toast
            className={`text-white px-4 py-2 rounded-md flex items-center ${toastMessage.startsWith("Sorry") ? "bg-red-500" : "bg-green-500"
              }`}
            icon={
              toastMessage.startsWith("Sorry") ? (
                <ExclamationCircleIcon className="w-5 h-5 mr-2" />
              ) : (
                <CheckBadgeIcon className="w-5 h-5 mr-2" />
              )
            }
            message={toastMessage}
          />
        )}
      </div>

    </div>
  );
}

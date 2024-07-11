import React, { useState, useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import axios from "axios";
import { useAdminAuth } from "../../config/AdminAuth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAdminToken, accessToken, setExpiry } = useAdminAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validateForm = () => {
    // Reset error on validation
    setError("");

    // Validate email
    const isValidEmail = emailRegex.test(formData.email);
    if (!isValidEmail) {
      setError("Invalid email address");
      return false;
    }
    // Validate password
    if (formData.password == "") {
      setError("Password cannot be empty");
      return false;
    }
    return true;
  };

  // useEffect(() => {
  //   if (localStorage.getItem("adminToken")) {
  //     navigate("/admin");
  //   } else {
  //     navigate("/superuserAuth");
  //   }
  //   // // Check if there's an access token in localStorage
  //   // const accessToken1 = localStorage.getItem("accessToken");
  //   // if (accessToken1) {
  //   //   // Set the token in the auth context
  //   //   setToken(accessToken1);
  //   //   // Redirect to the desired page (e.g., dashboard)
  //   //   navigate("/");
  //   // }
  // }, [navigate, setAdminToken]);

  // console.log("......", accessToken);

  useEffect(() => {
    // Check if there's an access token in localStorage
    const accessToken1 = sessionStorage.getItem("adminToken");
    if (accessToken1) {
      // Set the token in the auth context
      setAdminToken(accessToken1);
      // Redirect to the desired page (e.g., dashboard)
      navigate("/admin");
    }
  }, [navigate, setAdminToken]);

  const handleLogin = async () => {
    setLoading(true);
    const data = { email: formData.email, password: formData.password };
    const url = `${process.env.REACT_APP_API_URL}/admin/authAdmin/login`;

    try {
      const response = await axios.post(url, data);
      if (response.data.success) {
        sessionStorage.setItem("adminToken", response.data.token);
        navigate("/admin");
      }
    } catch (error) {
      // Handle login failure (display error message, etc.)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin();
    } else {
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <>
      <section className="p-3 h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center  md:mx-0 md:my-0">
        {loading && <Loader />}
        {/* <ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
			/> */}

        <div className="md:w-1/3 max-w-sm">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Superuser Login</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your email below to login to your account
            </p>
          </div>
          {error && (
            <Alert className="mb-2 bg-red-500 text-white ">{error}</Alert>
          )}
          <div className="space-y-4">
            <div className="space-y-2"></div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center"></div>
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Password
            </label>
            <input
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            {/* <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-1"
          type="number"
          placeholder="OTP"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
        /> */}
            {/* <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input className="mr-1" type="checkbox" />
              <span>Remember Me</span>
            </label>
            <button
              className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
              onClick={() => {
                navigate("/forgotPassword");
              }}
            >
              Forgot Password?
            </button>
          </div> */}
            <div className="text-center md:text-left">
              <Button
                variant="gradient"
                className="w-full"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

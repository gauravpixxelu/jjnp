import React, { useState, useEffect } from "react";
import { Alert, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { useAuth } from "../config/AuthContext";
import OTPForm from "./OTPForm";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Toast from "../components/Toast";
import Topbar from "../components/Topbar";

export default function Login() {
  const [toggleOTP, setToggleOTP] = useState(false);
  const navigate = useNavigate();
  const { setToken, accessToken, setExpiry } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    userId: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


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

  useEffect(() => {
    // Check if there's an access token in localStorage
    const accessToken1 = localStorage.getItem("accessToken");
    if (accessToken1) {
      // Set the token in the auth context
      setToken(accessToken1);
      // Redirect to the desired page (e.g., dashboard)
      navigate("/");
    }
  }, [navigate, setToken]);

  const handleLogin = async () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiry");
    setLoading(true);

    try {
      const response = await axios.post(
        `https://jjnps.com/api/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.otpVerification) {
        setToggleOTP(true);
        setFormData({
          ...formData,
          userId: response.data.data.userId,
          email: response.data.data.email,
        });
      } else if (!response.data.success) {
        setToggleOTP(false);
      } else {
        setToggleOTP(false);
        localStorage.setItem("accessToken", response.data.authToken);
        localStorage.setItem("expiry", response.data.tokenExpire);

        setToken(response.data.authToken, response.data.tokenExpire);

        setLoading(false);
        // toast.success("Login successful")
        setProgress(100);
        setToastMessage(response.data.message);

        setTimeout(() => {
          navigate("/account");
        }, 1000);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during login");
        setToastMessage("Sorry " + error.response.data.message);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const errorTime = setTimeout(() => {
      setError("");
    }, 5000);
    clearTimeout(errorTime);
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleLogin();
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (toastMessage) {
      // Set a timeout to remove the toast after 4000 milliseconds (4 seconds)
      const toastTimer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      // Clear both timeouts if the component unmounts or if toastMessage or isExploding changes
      return () => {
        clearTimeout(toastTimer);
      };
    }
  }, [toastMessage]);
  return (
    <>
      <Topbar progress={progress} />

      {toggleOTP && (
        <div>
          <OTPForm userId={formData.userId} email={formData.email} />
        </div>
      )}
      <section className="flex flex-col md:flex-row justify-between items-center md:mx-0 md:my-0 bg-gray-100">
        {loading && <Loader />}

        <div className="w-full" >
          <img className="w-full" src="./login-img.jpg" alt=""/>
        </div>

        <div className="w-full m-0 ">
        <div className="max-w-[450px] m-auto p-4 lg:p-0">
          <div className="space-y-2 mb-6">
            <h1 className="text-[24px] font-normal">Login</h1>
            <p className="text-gray-500 dark:text-gray-400 font-normal"> Enter your email below to login to your account </p>
          </div>
          {error && (
            <Alert className="mb-2 bg-red-500 text-white">{error}</Alert>
          )}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email Address
              </label>
              <input
                className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Enter Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <div className="relative">
                <input
                  className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center px-2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-black" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5 text-black" />
                  )}
                </button>
              </div>
                <button
                  className="ml-auto block text-sm text-black underline underline-offset-4"
                  onClick={() => {
                    navigate("/forgotPassword");
                  }}
                >
                  Forgot your password?
                </button>              
            </div>
          </div>
          <div className="mt-4 flex justify-between font-semibold text-sm">
          </div>
          <div className="text-center md:text-left">
            <Button
              className="w-full h-12 w-full rounded-none shadow-none"
              onClick={handleSubmit}
            >
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <button
              className="text-red-600 underline underline-offset-4 uppercase"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </div>
        </div>
      </section>
      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </>
  );
}

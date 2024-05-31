import React, { useEffect, useState } from "react";
import {
  Button,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import Loader from "../components/Loader";
import { useNavigate, Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import OTPForm from "./OTPForm";
import { useAuth } from "../config/AuthContext";


function Register() {
  const navigate = useNavigate();
  const { setToken, accessToken, setExpiry } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [toggleOTP, setToggleOTP] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleOpen = () => setOpen(!open);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    name: "",
  });

  const nameRegex = /^[a-zA-Z\s]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\s*\d{10}\s*$/;

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
    const isValidPassword = passwordRegex.test(formData.password);
    if (!isValidPassword) {
      setError("Password must meet the following criteria:");
      return false;
    }

    // Confirm Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Phone validation
    const isValidPhone = phoneRegex.test(formData.phone.trim());
    if (!isValidPhone) {
      setError("Invalid phone number");
      return false;
    }

    // Validate name
    const isValidFirstName = nameRegex.test(formData.firstName);
    const isvalidLastName = nameRegex.test(formData.lastName);
    if (!isValidFirstName && !isvalidLastName) {
      setError("Invalid name");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/signup`,
        {
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          firstName: formData.firstName,
          lastName: formData.lastName,
          gender: "Male",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // const {
      //   data: {
      //     data: { userId },
      //   },
      // } = response;
      // setFormData({ ...formData, userId });
      if (response.data.otpVerification) {
        setToggleOTP(true);
        setFormData({
          ...formData,
          userId: response.data.data.userId,
          email: response.data.data.email,
        });
        setLoading(false);
      }
      else if (!response.data.success) {
        setToggleOTP(false);
      }
      else {
        setToggleOTP(false);
        localStorage.setItem("accessToken", response.data.authToken);
        localStorage.setItem("expiry", response.data.tokenExpire);

        setToken(response.data.authToken, response.data.tokenExpire);

        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        handleOpen();

      }
    } catch (error) {
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        await handleRegister();
      } catch (error) {

      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {toggleOTP && (
        <div>
          <OTPForm userId={formData.userId} email={formData.email} />
        </div>
      )}
      <section className="flex flex-col md:flex-row justify-between items-center md:mx-0 md:my-0 bg-gray-100">
        {loading && <Loader />}

        <div className="w-full" >
          <img src="./register-img.jpg" alt="" />
        </div>


        <div className="w-full m-0 ">
        <div className="max-w-[450px] m-auto p-4 lg:p-0">
            <div className="space-y-2 mb-6">
              <h1 className="text-[24px] font-normal">Register</h1>
              <p className="text-gray-500 dark:text-gray-400 font-normal">Enter your details to create account</p>
            </div>
            {error && (
              <Alert color="red">
                {error.includes("Password must meet the following criteria:") ? (
                  <div>
                    <p>Password must meet the following criteria:</p>
                    <ul className="mt-2 ml-2 list-inside list-disc">
                      <li>At least 8 characters</li>
                      <li>At least one lowercase letter</li>
                      <li>At least one uppercase letter</li>
                      <li>At least one digit</li>
                      <li>At least one special character: (@, $, !, %, *, ?, &)</li>
                    </ul>
                  </div>
                ) : (
                  error
                )}
              </Alert>
            )}{" "}

            <div className="flex w-full flex-col gap-3">

              <input
                className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />

              <input
                className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />

              <input
                className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="phone"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <input
                className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

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

              <div className="relative">
                <input
                  className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="text-center md:text-left">
                <Button
                  className="w-full h-12 w-full rounded-none shadow-none"
                  onClick={handleSubmit}
                >
                  Register
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <button
                lassName="text-red-600 underline underline-offset-4 uppercase"
                onClick={() => {
                  navigate("/login");
                }} 
              >
                Login
            </button>
            </div>
          </div>
        </div>

        <Dialog open={open} size="xs" handler={handleOpen}>
          <div className="flex items-center justify-between">
            <DialogHeader className="flex flex-col items-start">
              <Typography className="mb-1" variant="h4">
                Successfully registered!
              </Typography>
            </DialogHeader>
          </div>
          <DialogFooter className="space-x-2">
            <center>
              <Link to="/login" onClick={handleOpen}>
                Login
              </Link>
            </center>
          </DialogFooter>
        </Dialog>
      </section>
    </>
  );
}

export default Register;
import React, { useState, useEffect } from "react";
import { Alert, Input, Button } from "@material-tailwind/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import Loader from "../components/Loader";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const validateForm = () => {
    // Reset error on validation
    setError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate email
    const isValidEmail = emailRegex.test(email) || email == "";
    if (!isValidEmail) {
      setError("Invalid email address");
      return false;
    }

    return true;
  };

  useEffect(() => {
    const errorTime = setTimeout(() => {
      setError("");
    }, 5000);
    clearTimeout(errorTime);
  }, [error]);

  const navigate = useNavigate();
  let location = useLocation();
  let token = location.search.split("=")[1];
  const handleForgotPassword = async (e) => {
    setLoading(true);
    validateForm();
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgotpassword`,
        {
          email: email,
          password: password,
          sendEmail: false,
          token: token,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      setToastMessage(response.data.message);
      setTimeout(() => {
        navigate('/login')
      }, 1000)
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setToastMessage("Sorry " + error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const sendEmail = async (e) => {
    setLoading(true);

    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/forgotpassword`,
        {
          email: email,
          sendEmail: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success) {
        setToastMessage("Password reset mail sent!");
        setLoading(false);
        const mailTimer = setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setToastMessage(error.response.data.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirm_password") {
      setConfirmPassword(e.target.value);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 5000);
  }, [error]);

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  
  return (
    <div className="relative">
      {loading && (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      )}
      {!token && (
        <div>
          {" "}
          <section className="flex flex-col md:flex-row justify-between items-center md:mx-0 md:my-0 bg-gray-100">

            <div className="w-full">
              <img className="w-full" src="./forget.jpg" alt="" />
            </div>

            <div className="w-full m-0 ">
            <div className="max-w-[450px] m-auto p-4 lg:p-0">
                <div className="space-y-2 mb-6">
                  <h1 className="text-[24px] font-normal">Forgot Password</h1>
                  <p className="text-gray-500 dark:text-gray-400 font-normal"> Enter your email to reset your password</p>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Enter Email Address
                    </label>
                    <div className="relative">
                      <input
                        className="flex h-12 outline-none w-full bg-background p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                        type="email" placeholder="Email Address " name="email" value={email} onChange={(e) =>
                          setEmail(e.target.value)}
                      />

                    </div>
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                    </div>
                    <div className="text-center md:text-left">
                      <Button className="w-full h-12 w-full rounded-none shadow-none" type="submit" onClick={sendEmail}>
                        Reset
                      </Button>
                    </div>
                    <div className="mt-8 text-center">
                      {" "}
                      <button
                        className="underline underline-offset-4"
                        onClick={() => {
                          navigate("/login");
                        }}
                      >
                        Back to Login
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {token && (
        <div>
          {" "}
          <section className="flex flex-col gap-1 items-center justify-center">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold">Reset Password</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Enter your details to reset password
              </p>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full">
              {error && (
                <Alert className="mb-2 bg-red-500 text-white ">{error}</Alert>
              )}{" "}
              <div className=" flex flex-col gap-3 mb-5">
                <Input
                  variant="outlined"
                  label="Email Address"
                  onChange={handleChange}
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                />
                <Input
                  variant="outlined"
                  label="Password"
                  onChange={handleChange}
                  type="password"
                  value={password}
                  name="password"
                  placeholder="Enter Password"
                />
                <Input
                  variant="outlined"
                  label="Confirm Password"
                  onChange={handleChange}
                  type="password"
                  name="confirm_password"
                  value={confirm_password}
                  placeholder="Enter Confirm Password"
                />
              </div>
              {password != confirm_password && (
                <span className="text-red-600">Passwords does not match</span>
              )}
              {password && password == confirm_password && (
                <span className="text-green-600">Passwords Match</span>
              )}
              <div className="text-center md:text-left">
                <Button
                  variant="gradient "
                  className="w-full"
                  type="submit"
                  onClick={handleForgotPassword}
                >
                  Reset
                </Button>
              </div>
              <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                <button
                  className="text-red-600 hover:underline hover:underline-offset-4"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  Login
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}

export default ForgotPassword;

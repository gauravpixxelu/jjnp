import React, { useState, useRef } from "react";
import Loader from "../components/Loader";
import axios from "axios";
import { useAuth } from "../config/AuthContext";
import { useNavigate } from "react-router-dom";

const OTPForm = (props) => {
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [otp, setOTP] = useState({
    digit1: "",
    digit2: "",
    digit3: "",
    digit4: "",
    digit5: "",
    digit6: "",
  });
  const { setToken, accessToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = async () => {
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/validate`,
        {
          userId: props.userId,
          otp: Object.values(otp).join(""),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.authToken);
        localStorage.setItem("expiry", response.data.tokenExpire);

        setToken(response.data.authToken, response.data.tokenExpire);
        setOTP({
          digit1: "",
          digit2: "",
          digit3: "",
          digit4: "",
          digit5: "",
          digit6: "",
        });
        setToken(response.data.authToken);
        // localStorage.setItem("accessToken", accessToken);
        setLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
      setLoading(false);
    }
  };

  const handleResendOTP = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/resendotp`,
        {
          userId: props.userId,
          email: props.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setLoading(false);
        setOTP({
          digit1: "",
          digit2: "",
          digit3: "",
          digit4: "",
          digit5: "",
          digit6: "",
        });
        setError("");
      } else {
        setLoading(false);
        setError("An error occured while sending OTP. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during login"
      );
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {props.email}</p>
            </div>
          </div>

          <div>
            <form action="" method="post">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={(el) => (inputRefs.current[index] = el)} // Store input element references in an array
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5  rounded-xl border border-gray-400  text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        value={otp[`digit${index + 1}`]}
                        onChange={(e) => {
                          setOTP({
                            ...otp,
                            [`digit${index + 1}`]: e.target.value,
                          });
                          if (
                            e.target.value &&
                            index < inputRefs.current.length - 1
                          ) {
                            inputRefs.current[index + 1].focus(); // Move focus to the next input
                          }
                        }}
                        maxLength={1}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col space-y-5">
                  {error && <p className="text-red-500">{error}</p>}
                  <div>
                    <button
                      onClick={handleEmailVerification}
                      disabled={
                        loading || Object.values(otp).some((value) => !value)
                      }
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      {loading ? <Loader /> : "Verify Account"}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn&apos;t receive code?</p>{" "}
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button onClick={handleResendOTP}>Resend</button>
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
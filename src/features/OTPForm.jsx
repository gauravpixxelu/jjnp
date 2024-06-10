import React, { useState, useRef, useEffect } from "react";
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
  const { setToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleEmailVerification = async (e) => {
    e.preventDefault();
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
        setLoading(false);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        setError(response.data.message || "An error occurred during verification");
        setLoading(false);
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during verification"
      );
      setLoading(false);
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setError("An error occurred while sending OTP. Please try again.");
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during resend"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen justify-center overflow-hidden p-16">
      <div className="relative bg-white p-12 mx-auto w-full max-w-lg rounded-2xl border border-black-600">
        <div className="mx-auto flex w-full max-w-md flex-col">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="font-bold text-3xl mb-2">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row font-medium text-gray-400 text-md">
              <p>We have sent a code to your email {props.email}</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleEmailVerification}>
              <div className="flex flex-col">
                <div className="flex flex-row items-center justify-between mx-auto w-full gap-2 my-10">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div key={index} className="w-16 h-16">
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="w-full h-full flex flex-col items-center justify-center text-center outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-black-400"
                        type="text"
                        value={otp[`digit${index + 1}`]}
                        onChange={(e) => {
                          const { value } = e.target;
                          if (/^\d*$/.test(value)) {
                            setOTP({
                              ...otp,
                              [`digit${index + 1}`]: value,
                            });
                            if (value && index < inputRefs.current.length - 1) {
                              inputRefs.current[index + 1].focus();
                            }
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
                      type="submit"
                      disabled={
                        loading || Object.values(otp).some((value) => !value)
                      }
                      className="flex flex-row items-center justify-center text-center w-full border rounded-md uppercase outline-none py-5 bg-black border-none text-white text-md shadow-sm "
                    >
                      {loading ? <Loader /> : "Verify Account"}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn't receive code?</p>
                    <button
                      className="flex flex-row items-center text-red-600 uppercase underline underline-offset-2"
                      onClick={handleResendOTP}
                      disabled={loading}
                    >
                      Resend
                    </button>
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

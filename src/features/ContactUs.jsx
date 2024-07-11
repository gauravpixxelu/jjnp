import React, { useState, useEffect } from "react";
import { Button, Input, Textarea } from "@material-tailwind/react";
import Toast from "../components/Toast";
import {
  ArrowLeftCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../components/Topbar";

function ContactUs() {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("");
  const [progress, setProgress] = useState(30);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handlSendMeaage = async () => {
    if (!contactData.message.trim()) {
      setToastMessage("Please enter a message.");
      return;
    }

    const accessToken1 = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/support/contact`,
        {
          token: accessToken1,
          message: contactData.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToastMessage(response.data.message);

      // Clear the message field after sending
      setContactData({ ...contactData, message: "" });
    } catch (error) {
      setToastMessage("Error sending message. Please try again later.");
    }
  };

  useEffect(() => {
    setProgress(100);
    if (toastMessage) {
      const toastTimer = setTimeout(() => {
        setToastMessage("");
      }, 4000);

      return () => {
        clearTimeout(toastTimer);
      };
    }
  }, [toastMessage]);

  return (
    <section className="relative">
      <Topbar progress={progress} />

      <div className="relative bg-cover bg-center flex items-center justify-center min-h-[170px] lg:min-h-[400px]" style={{ backgroundImage: `url(./contact/contact-banner.png)` }}>
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative z-10 text-white text-center">
            <h1 className="text-2xl lg:text-5xl font-bold">Contact Us</h1>
          </div>
        </div>

      <div className="py-8 px-4 lg:py-16">
        <div className="relative">
          <div className="text-center">
            <h3 className="text-black text-[24px] lg:text-[36px]">Contact Information</h3>
            <p className="text-gray-700 text-[14px] lg:text-[18px]">Reach out to us directly.</p>
          </div>
          <div className="flex justify-center gap-4 mt-4 flex-wrap lg:gap-6 lg:mt-8 lg:flex-nowrap ">
            <div className="border bg-FBFBFB w-[400px] text-center px-16 py-8">
              <img className="m-auto mb-4" src="./contact/call.svg" alt="" />
              <p className="mb-2">Reach our customer service team during business hours.</p>
              <p>01169653836</p>
            </div>
            <div className="border bg-FBFBFB w-[400px] text-center px-16 py-8">
              <img className="m-auto mb-4" src="./contact/msg.svg" alt="" />
              <p className="mb-2">We'll get back to you within 2 business days.</p>
              <p>support@example.com</p>
            </div>
          </div>
        </div>

        <div className="relative mt-16 max-w-[900px] mx-auto">
          <div className="text-center">
            <h3 className="text-black text-[24px] lg:text-[36px]">Contact Us</h3>
            <p className="text-gray-700 text-[14px] lg:text-[18px]">We are here to help. Please fill out the form below and we will get back to you as soon as possible.</p>
          </div>
          <div className="mt-8">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Full Name
              </label>
              <input
                className="flex h-12 outline-none w-full bg-gray-100 p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Full Name"
                name="name"
              />
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email Address
              </label>
              <input
                className="flex h-12 outline-none w-full bg-gray-100 p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="email"
                placeholder="Email Address"
                name="email"
              />
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Message
              </label>
              <textarea
                className="flex h-36 outline-none w-full bg-gray-100 p-4 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                type="textarea"
                placeholder="Message Us"
                name="message"
              />
            </div>

            <div className="text-center md:text-left mt-6">
              <Button
                className="h-12 rounded-none shadow-none text-sm px-20 font-normal"
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-[61000]">
          <Toast message={toastMessage} />
        </div>
      )}
    </section>
  );
}

export default ContactUs;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import Topbar from "../../../components/Topbar";

export default function PlaceOrder() {
  const navigate = useNavigate();

  const location = useLocation();
  const address = location.state.selectedAddress;
  const name = location.state.name;
  const phone = location.state.phone;
  const email = location.state.email;

  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [progress, setProgress] = useState(30);

  const getTotalPrice = () => {
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
    // Set cartTotal state
    setCartTotal(Math.floor(totalPrice));
  };

  const handleGetCartData = async () => {
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/products/getcart`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setCartItems(response.data.cart);
      setProgress(100);
    } catch (error) {}
  };

  // Function to calculate total price of all items in the cart

  const amount = parseInt(cartTotal) * 100;
  const currency = "INR";
  const receiptId = "JJnP's";

  const paymentHandler = async (e) => {
    if (cartTotal == 0) {
      alert("Sorry cant complete your order please try again");
      navigate("/productList");
    }
    const accessToken1 = localStorage.getItem("accessToken");
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/payments/pretransaction`,

      {
        amount,
        currency,
        receipt: receiptId,
        token: accessToken1,

        items: cartItems,
        pincode: address.pincode,
        city: address.city,
        state: address.state,
        phone: phone,
        address: "INDIA",
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("pree:");
    console.log(res);
    var options = {
      key: "rzp_live_ic4TgLDfatm82g", // Put the key in environemt variable
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "JJnP's Corp", //your business name
      image: "/black-logo.png",
      order_id: res.data.order.id, //This is a sample Order ID. Pass the id obtained in the response of Step 1
      handler: async function (response) {
        const data = {
          orderId: res.data.order.id,
          ...response,
          token: accessToken1,
        };
        const validateRes = await fetch(
          `${process.env.REACT_APP_API_URL}/payments/posttransaction`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log("post:");
        console.log(jsonRes);
        if (jsonRes.success) {
          navigate("/orders");
        }
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: name, //your customer's name
        email: email,
        contact: phone, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", async function (response) {
      alert("Payment failed: " + response.error.description);

      // Close the Razorpay payment window
      rzp1.close();

      // Send a request to the backend to delete the created order
      try {
        const orderId = response.error.metadata.order_id;
        const paymentId = response.error.metadata.payment_id;

        const deleteOrderResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/order/deleteorder`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderId, paymentId }),
          }
        );

        const res = await deleteOrderResponse.json();
      } catch (error) {}
    });
    rzp1.open();
    e.preventDefault();

    localStorage.setItem("lastSelectedTab", "My Orders");
  };

  useEffect(() => {
    handleGetCartData();
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {" "}
      {cartItems && (
        <div className="p-3">
          <Topbar progress={progress} />

          <Card className="p-3">
            <CardHeader color="transparent" floated={false} shadow={false}>
              <Typography variant="h3"> Cart Checkout</Typography>
            </CardHeader>

            <CardHeader color="transparent" floated={false} shadow={false}>
              <Typography variant="h4" color="">
                Order Summary
              </Typography>
            </CardHeader>
            {cartItems.map((item, index) => (
              <CardBody className="p-4 flex flex-col" key={index}>
                <div className="p-3  w-full rounded-lg">
                  <Typography color="black">{item.title}</Typography>
                  <Typography color="black">x{item.quantity}</Typography>
                  <Typography color="black">
                    {item.price.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </Typography>
                </div>
              </CardBody>
            ))}
          </Card>

          <Card>
            <CardHeader color="transparent" floated={false} shadow={false}>
              <Typography variant="h4" color="black">
                Delivery Address
              </Typography>
            </CardHeader>
            <CardBody className="p-4 flex flex-col">
              <div>
                <Typography color="black">{name}</Typography>
                <Typography color="black">{phone}</Typography>
                <Typography color="black">{email}</Typography>
              </div>
              <div className="w-11/12">
                <span>
                  {address.address}, {address.city} , {address.state},{" "}
                  {address.pincode},
                </span>
              </div>
            </CardBody>
            <div className="p-3">
              <Typography variant="h5" color="black">
                Price Details
              </Typography>
              <div className="flex w-full ">
                <p> Price Total: {cartItems.length + " "} item(s)</p>
                <Typography color="black" className="ml-auto">
                  {cartTotal.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                  })}
                </Typography>
              </div>
            </div>

            <div className="flex justify-end items-center p-2">
              <Button onClick={paymentHandler}>Pay Now</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

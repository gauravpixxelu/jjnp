import React, { useRef, useState, useEffect } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Avatar,
  Badge,
  Separator,
  Chip,
} from "@material-tailwind/react";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "../../../components/Toast";
export default function ViewReturnedOrders() {
  const location = useLocation();
  const order = location.state.order;
  console.log(order);
  const product = order.products;
  const contentRef = useRef(null);
  const [pdfData, setPdfData] = useState("");
  const isLast = false;
  const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";
  const [toastMessage, setToastMessage] = useState("");
  console.log(order);
  // useEffect(() => {
  //   // Check if order status is "delivered"
  //   if (order.status === "Paid" && !invoiceGenerated) {
  //     handleSaveInvoice();
  //   }
  // }, [order.status, invoiceGenerated]);
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
    <div className="flex items-center justify-center p-2">
      <Card className="w-full p-3 border-2 border-gray-800 rounded-md">
        <div className="flex items-center justify-center p-2">
          <CardBody className="space-y-6">
            <div className="">
              <p className="">
                <span>
                  {" "}
                  <span className="font-bold">Order ID:</span> {order.orderId}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="space-y-2 text-gray-900">
                <div className="flex items-center space-x-2">
                  <label className="w-1/4 font-bold" htmlFor="customer">
                    Customer:
                  </label>
                  <div className="flex items-center space-x-2">
                    <div>{order.name}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="w-1/4 font-bold" htmlFor="email">
                    Email:
                  </label>
                  <div className="flex items-center space-x-2">
                    <div>{order.email}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="w-1/4 font-bold" htmlFor="phone">
                    Phone:
                  </label>
                  <div className="flex items-center space-x-2">
                    <div>{order.phone}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <label className="w-1/4 font-bold" htmlFor="address">
                    Address:
                  </label>
                  <div className="flex items-center space-x-2">
                    <div>
                      {order.city},{order.state},{order.address},{order.pincode}
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-2 flex flex-col gap-1 items-center justify-center">
                <div className=" space-x-2 flex gap-1 items-start justify-start w-full">
                  <label className="font-bold" htmlFor="date">
                    Order date:
                  </label>
                  <div className="ml-auto">
                    {new Intl.DateTimeFormat("en-US", {
                      dateStyle: "long",
                      timeStyle: "medium",
                    }).format(new Date(order.createdAt))}
                  </div>
                </div>
                <div className="flex gap-4 items-start justify-start w-full">
                  <label className="font-bold" htmlFor="status">
                    Payment Status:
                  </label>
                  <p className="">{order.status}</p>
                </div>
                <div className="flex gap-4 items-start justify-start w-full">
                  <label className="font-bold" htmlFor="status">
                    Delivery Status:
                  </label>
                  <p className="">{order.deliveryStatus}</p>
                </div>
                <div className="flex gap-4 items-start justify-start w-full">
                  <label className="font-bold" htmlFor="status">
                    Return Reason:
                  </label>
                  <p className="">{order.returnReason}</p>
                </div>
                <div className="flex gap-4 items-start justify-start w-full">
                  <label className="font-bold" htmlFor="status">
                    Explaination:
                  </label>
                  <p className="">{order.returnReason}</p>
                </div>
                {/* <div className="flex items-center justify-center ">
                  <label className="w-1/3" htmlFor="status">
                    Delivery Status
                  </label>
                  <Chip
                    className="text-white bg-blue-600"
                    value={order.deliveryStatus}
                  >
                    {order.deliveryStatus}
                  </Chip>
                </div> */}
              </div>
            </div>

            <div className="flex items-end justify-end ml-auto">
              <div className="overflow-auto">
                <table className="table-fixed w-full">
                  <thead>
                    <tr className="text-base font-bold">
                      <td className={classes}>Image Proof</td>
                      <td className={classes}>Product</td>
                      <td className={classes}>Price</td>
                      <td className={classes}>Quantity</td>
                      <td className={classes}>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((product, index) => (
                      <tr key={product.productId}>
                        {order.returnImages.map((product, index) => (
                          <tr key={product.productId}>
                            <td className={classes}>
                              {/* Display product image */}
                              <img
                                alt={product.title}
                                className="aspect-square w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-lg object-cover border"
                                src={
                                  product.images.length > 0
                                    ? product.images[index]
                                    : "placeholder_image_url"
                                }
                              />
                            </td>
                          </tr>
                        ))}
                        <td className={classes}>
                          <div>
                            <div className="font-medium">{product.title}</div>
                            <div className="text-md">{product.color}</div>
                          </div>
                        </td>
                        <td className={classes}>{parseInt(product.price)}</td>
                        <td className={classes}>{product.quantity}</td>
                        {/* <td className={classes}>{order.amount}</td> */}
                        <td className={classes}>{parseInt(product.price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardBody>
        </div>
        <div>
          <Link to={"/admin"}>
            <p className="text-center bg-black p-2 text-white m-auto cursor-pointer w-max">
              Back
            </p>
          </Link>
        </div>
      </Card>
      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}

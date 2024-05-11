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
import html2pdf from "html2pdf.js";
import axios from "axios";
import Toast from "../../components/Toast";

export default function ManageOrderDetails() {
  const location = useLocation();
  const order = location.state.order;
  const product = order.products;
  const contentRef = useRef(null);
  const [pdfData, setPdfData] = useState("");
  const isLast = false;
  const classes = isLast ? "p-2" : "p-2 border-b border-blue-gray-50";
  const [invoiceGenerated, setInvoiceGenerated] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handlePrint = () => {
    const content = `
    <div style="text-align: left; padding: 10px;">
    <div style="border: 2px solid #888; border-radius: 8px; padding: 10px;">
    <div style="text-align: center"><h4>Invoice</h4></div>
      <div style="margin-bottom: 5px; font-weight: bold;">Order ID: #${order.orderId}</div>
      <div style="margin-bottom: 20px; font-weight: bold;">Invoice ID: #sqwklhdiu1bwjfg</div>

      <div style="display: flex; justify-content: space-evenly;">
      <div style="margin-bottom: 20px;">
        <div style="padding: 5px;"><b>Customer:</b> ${order.customer_name}</div>
        <div  style="padding: 5px;"><b>Email:</b> ${order.email}</div>
        <div  style="padding: 5px;"><b>Phone:</b> ${order.phone}</div>
       
      </div>
      <div  style="padding: 5px;"><b>Address</b> <br/> ${order.address}</div>
      </div>
      <div style="margin-bottom: 20px;">
        <div><b>Order date:</b> ${order.placed_date}</div>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; text-align: left">
        <thead>
          <tr style="background-color: #f0f0f0;">
            <th style="padding: 8px;">Product</th>
            <th style="padding: 8px;">Price</th>
            <th style="padding: 8px;">Quantity</th>
            <th style="padding: 8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 8px;">
              <div><b>${order.product_name}</b></div>
              <div style="font-size: 12px; color: #888;">${order.color}</div>
            </td>
            <td style="padding: 8px;">${order.price}</td>
            <td style="padding: 8px;">${order.qty}</td>
            <td style="padding: 8px;">$12.00</td>
          </tr>
        </tbody>
      </table>
      <div style="margin-bottom: 20px; text-align:center">
        <div style="padding: 5px; text-align: right"><b>Subtotal:</b> $95.00</div>
        <div style="padding: 5px;  text-align: right;"><b>Shipping:</b> $10.00</div>
        <div style="padding: 5px; text-align: right;"><b>Tax (10%):</b> $10.50</div>
        <div style="padding: 5px; text-align: right;"><b>Total:</b> $115.50</div>
      </div>
      <div>
        <div><b>Payment method:</b> Credit card</div>
      </div>
    </div>
  </div>
    `;

    const thermalContent = `<div style="text-align: center; ">
    <div style="width: 200px; max-width: 200px; display: inline-block; border: 1px solid black; padding: 5px;">
      <p style="text-align: center;">
      <b>INVOICE </b> <br>
      
        
      </p>
      
     <p>
      <b>Shipping/Billing Address</b> <br/>  <p style="text-align: justify">
      ${order.name} <br/>${order.city},${order.state}, <br/>${
      order.address
    },<br/> ${order.pincode}
      </p>
       </p>

       <p style="text-align: left">
      <b> Phone No.:</b> ${order.phone} 
      <b>Order ID: </b> # ${order.orderId} 
      </p>
       </p>
       
       <div style="border-top: 1px solid black; width: 200px;"/>
      <table style="border-collapse: collapse;">
        <thead>
          <tr>
            <th style="width: 40px; max-width: 40px; word-break: break-all;">Qty.</th>
            <th style="width: 75px; max-width: 75px;">Description</th>
            <th style="width: 40px; max-width: 40px; word-break: break-all;">Amt.</th>
          </tr>
        </thead>
        <tbody>
        ${product
          .map(
            (product) => `
          <tr key=${product.productId}>
            <td style="width: 40px; max-width: 40px; word-break: break-all;">
              ${product.quantity}
            </td>
            <td style="width: 75px; max-width: 75px;">
              ${product.title}
            </td>
            <td style="width: 50px; max-width: 40px; word-break: break-all;">
              ${product.price}
            </td>
          </tr>
        `
          )
          .join("")}
        
        
          
    </tr>
          <tr style="border-top: 1px solid gray; width: 200px;"/>
         <tr>
            <td style="width: 40px; max-width: 40px; word-break: break-all;"></td>
            <td style="width: 75px; max-width: 75px;"><b>Total:</b></td>
            <td style="width: 50px; max-width: 40px; word-break: break-all;">${
              order.amount
            }</td>
          </tr>
        </tbody>
      </table>
      <div style="border-top: 1px solid black; width: 200px;"/>

      <p class="centered">
        Thanks for your purchase!
        <br>noms
      </p>
    </div>
  </div>
  `;

    const printWindow = window.open("", "_blank");
    printWindow.document.write(thermalContent);
    printWindow.document.close();
    printWindow.print();
  };
  const handlePrint1 = async () => {
    try {
      const content = contentRef.current.innerHTML;

      const pdf = await html2pdf().from(content).toPdf().get("pdf");
      const pdfData = btoa(pdf.output());
      setPdfData(pdfData);
      return pdfData;
    } catch (error) {
      console.error("Error generating PDF:", error);
      throw new Error("Failed to generate PDF");
    }
  };

  const handleSaveInvoice = async () => {
    const pdfData = await handlePrint1();
    // setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/payments/invoice`,
        {
          orderId: order.orderId,
          invoiceNumber: order.orderId,
          pdfData: pdfData,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setInvoiceGenerated(true);

      setToastMessage(response.data.message + "..!");

      // setFormData({ ...formData, userId });
      // console.log(formData.userId);
      // localStorage.setItem("accessToken", response.data.authToken);
      // setToken(response.data.authToken);
      // setLoading(false);
      // navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setToastMessage("Sorry " + error.response.data.message);

      // setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

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

  const handleDownloadInvoice = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/payments/getinvoice`,
        {
          token: accessToken,
          orderId: order.orderId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Decode the base64 string to binary data
      const binaryData = atob(response.data.invoice.pdf);
      // Convert the binary data to a Uint8Array
      const uint8Array = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      // Create a blob from the Uint8Array
      const blob = new Blob([uint8Array], { type: "application/pdf" });
      // Create a blob URL for the invoice PDF
      const url = window.URL.createObjectURL(blob);
      // Create a temporary link element to trigger download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${order.orderId}.pdf`);
      // Trigger the click event on the link to start download
      document.body.appendChild(link);
      link.click();
      // Remove the link from the DOM
      document.body.removeChild(link);
      // Show success toast message
      setToastMessage("Invoice downloaded successfully");
    } catch (error) {
      // Show error toast message
      setToastMessage("Failed to download invoice. Please try again later.");
    }
  };
  return (
    <div className="flex items-center justify-center p-2">
      <Card className="w-full p-3 border-2 border-gray-800 rounded-md">
        <div className="flex items-center justify-center p-2" ref={contentRef}>
          <CardBody className="space-y-6">
            <div className="flex items-center justify-center">
              <img src="/black-logo.png" alt="" className="h-24 w-28" />
            </div>
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
                      <td className={classes}>Image</td>
                      <td className={classes}>Product</td>
                      <td className={classes}>Price</td>
                      <td className={classes}>Quantity</td>
                      <td className={classes}>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map((product, index) => (
                      <tr key={product.productId}>
                        <td className={classes}>
                          <img
                            alt={product.title}
                            className="aspect-square w-20 h-20 lg:w-24 lg:h-24 overflow-hidden rounded-lg object-cover border"
                            src={order.orderImages[index].images[0]}
                          />
                        </td>
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
                    {/* Additional table rows */}
                    <tr>
                      <td className={classes}></td>
                      <td className={classes}></td>
                      <td className={classes}></td>
                      <td className={classes}></td>
                      <td className={classes}>{order.amount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <label className="w-1/3 font-bold" htmlFor="subtotal">
                  Subtotal
                </label>
                <div>{order.amount}</div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 font-bold" htmlFor="shipping">
                  Shipping
                </label>
                <div>0.00</div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 font-bold" htmlFor="tax">
                  Tax (0%)
                </label>
                <div>0</div>
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 font-bold" htmlFor="total">
                  Total
                </label>
                <div className="font-bold">{order.amount}</div>
              </div>
            </div>
            <div></div>
            <div className="flex items-center space-x-2">
              <label className="w-1/3 font-bold" htmlFor="payment">
                Payment method
              </label>
              <div>Credit card</div>
            </div>
            <div className="text-center font-bold">
              <p>Thank You For Shopping With Us!</p>
            </div>
          </CardBody>
        </div>
        <CardFooter>
          <div className="flex justify-end items-center space-x-2">
            <div>
              <Link to={"/admin"}>
                <p className="text-center  p-2 text-black cursor-pointer w-max rounded-md ">
                  Back
                </p>
              </Link>
            </div>
            <Button variant="outlined">Refund</Button>
            <Button onClick={() => handleSaveInvoice()}>Save Invoice</Button>
          </div>
        </CardFooter>
      </Card>
      <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
        {toastMessage && <Toast message={toastMessage} />}
      </div>
    </div>
  );
}

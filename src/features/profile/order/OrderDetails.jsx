import React, { useState, useEffect } from "react";
import {
  Typography,
  CardFooter,
  Stepper,
  Step,
  Chip,
  Card,
  CardHeader,
  CardBody,
  Button,
  Dialog,
  Select,
  Option,
  Tooltip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Textarea,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  HomeIcon,
  CogIcon,
  UserIcon,
  RocketLaunchIcon,
  TruckIcon,
  CheckBadgeIcon,
  ArrowUturnUpIcon,
} from "@heroicons/react/24/solid";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import Toast from "../../../components/Toast";
import axios from "axios";
import {
  ArrowPathRoundedSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const cancelReasons = [
  "Ordered wrong product",
  "Size too long or short",
  "Color is not like in the photos",
  "I did not like the product",
];

const returnReasons = [
  "Color change",
  "Damaged or defective",
  "Used product",
  "Delivered but not received",
  "Wrong product",
  "Size too long or short",
  "Color is not like in the photos",
  "I did not like the product",
];

export default function OrderDetails() {
  const navigate = useNavigate();

  const { id } = useParams(); // Get product id from URL
  const location = useLocation();
  const order = location.state.order;
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [toastMessage, setToastMessage] = useState("");
  const [accordianOpen, setAccordianOpen] = React.useState(0);
  const [cancelReason, setCancelReason] = useState("");
  const [returnReason, setReturnReason] = useState("");
  const [cancelExplanation, setCancelExplanation] = useState("");
  const [cancelImages, setCancelImages] = useState([]);
  const [cancelVideo, setCancelVideo] = useState(null);
  const [returnImages, setReturnImages] = useState([]);
  const [returnVideo, setReturnVideo] = useState(null);
  const [returnExplanation, setReturnExplanation] = useState("");
  const [complaintType, setComplaintType] = useState("");

  const handleComplaintTypeChange = (e) => {
    setComplaintType(e.target.value);
  };
  const [queryData, setQueryData] = useState({
    message: "",
  });
  const handleAccordianOpen = (value) =>
    setAccordianOpen(accordianOpen === value ? 0 : value);
  const handleImageUpload = (files) => {
    let selectedImages = Array.from(files).slice(0, 5); // Limit to 5 images
    setReturnImages([...returnImages, ...selectedImages]);
  };

  // Function to handle video selection
  const handleVideoUpload = (file) => {
    setReturnVideo(file);
  };

  // Function to remove image
  const removeImage = (index) => {
    let updatedImages = [...returnImages];
    updatedImages.splice(index, 1);
    setReturnImages(updatedImages);
  };

  // Function to remove video
  const removeVideo = () => {
    setReturnVideo(null);
  };

  const formattedCreateDateTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date(order.createdAt));

  const formattedUpdateDateTime = new Intl.DateTimeFormat("en-US", {
    dateStyle: "long",
    timeStyle: "medium",
  }).format(new Date(order.updatedAt));

  // Function to set active step based on order status
  const setActiveStepByStatus = (status) => {
    switch (status) {
      case "Unshipped":
        setActiveStep(0);
        break;
      case "Shipped":
        setActiveStep(1);
        break;
      case "Delivered":
        setActiveStep(2);
        break;
      case "Canceled":
        setActiveStep(1);
        break;
      case "Returned":
        setActiveStep(2);
        break;
      default:
        setActiveStep(0);
        break;
    }
  };

  // Set active step based on order status when component mounts
  useEffect(() => {
    setActiveStepByStatus(order.deliveryStatus);
  }, [order.status]);

  const handleCancelOrder = async () => {
    // setLoading(true);
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/cancelorder`,
        {
          token: accessToken1,
          orderId: order.orderId,
          reason: cancelReason,
          explanation: cancelExplanation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToastMessage(response.data.message);
      setCancelExplanation("");
      setCancelReason("");
      setTimeout(() => {
        navigate("/orders");
      }, 1000);

      // setFormData({ ...formData, userId });
      // localStorage.setItem("accessToken", response.data.authToken);
      // setToken(response.data.authToken);
      // setLoading(false);
      // navigate("/");
    } catch (error) {
      setToastMessage("Sorry " + error.response.data.message);

      // setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

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
  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }
  const handleReturnOrder = async () => {
    // setLoading(true);
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const returnImagesBase64 = await Promise.all(
        returnImages.map((file) => convertToBase64(file))
      );
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/order/returnorder`,
        {
          token: accessToken1,
          orderId: order.orderId,
          reason: returnReason,
          returnImages: returnImagesBase64,
          explanation: returnExplanation,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToastMessage(response.data.message + "..!");
      setReturnImages([]);
      setReturnReason("");
      setReturnExplanation("");
      setTimeout(() => {
        navigate("/orders");
      }, 1000);

      // setFormData({ ...formData, userId });
      // localStorage.setItem("accessToken", response.data.authToken);
      // setToken(response.data.authToken);
      // setLoading(false);
      // navigate("/");
    } catch (error) {
      setToastMessage("Sorry " + error.response.data.message);

      // setLoading(false);
    } finally {
      // setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    // Check if the message is empty
    if (!queryData.message.trim()) {
      setToastMessage("Please enter a message.");
      return;
    }

    // Get the access token from local storage
    const accessToken1 = localStorage.getItem("accessToken");
    try {
      // Send a POST request to the /support/complaint endpoint
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/support/complaint`,
        {
          token: accessToken1,
          orderId: order.orderId,
          customer: order.name,
          phone: order.phone,
          complaintType: complaintType, // Change complaintType as needed
          description: queryData.message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Set toast message with the response message
      setToastMessage(response.data.message);
      handleOpen();
      // Clear the message field after sending
      setQueryData({ ...queryData, message: "" });
    } catch (error) {
      // Handle error
      setToastMessage("Error sending message. Please try again later.");
    }
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="p-3">
      <div>
        <Link to={"/orders"} className="flex items-center">
          <ChevronLeftIcon className="h-5 w-5 " />
          <Typography>Orders</Typography>
        </Link>
        <p className="text-2xl text-center text-slate-400 mb-5">
          Order Details
        </p>
        <div className="ml-auto p-2">
          <p className=" text-sm cursor-pointer" onClick={handleOpen}>
            Need help with something?
          </p>
        </div>
      </div>
      <div className="p-2">
        <Card
          color="transparent"
          shadow={false}
          className="w-full p-2 border border-gray-500 rounded-none overflow-auto mb-4 "
        >
          <div className="border-b border-gray-400 mb-3 pb-2 lg:flex ">
            <p>Order ID - {order.orderId}</p>
            <p className="lg:ml-auto">Created At: {formattedCreateDateTime}</p>
          </div>
          <div className="flex items-center justify-center mb-3">
            {order.products.map((item, index) => (
              <CardBody key={index} className="p-0 w-96 ">
                <div>
                  <div className="flex gap-2">
                    <div className="">
                      <p>Product Summary</p>
                      <Typography variant="h4">
                        <span className="text-justify text-black flex items-center gap-1">
                          <p className="text-lg">{item.title}</p>{" "}
                          <p className="text-sm text-gray-600">
                            x{item.quantity}
                          </p>
                        </span>
                      </Typography>
                      <Typography
                        variant="h6"
                        className="font-bold"
                        color="black"
                      >
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="font-bold"
                        color="black"
                      >
                        <span className="text-justify text-black flex items-center gap-1">
                          <p>{item.size},</p> <p>{item.color}</p>
                        </span>
                      </Typography>
                      <p className="text-xs w-fit">
                        <Chip variant="ghost" value={item.slug} />
                      </p>
                    </div>

                    {order.orderImages.length > 0 && (
                      <img
                        key={index} // Assuming 'index' is defined elsewhere in your code
                        src={order.orderImages[index].images[0]} // Accessing the 'index' element directly
                        className="h-28 w-28 lg:h-48 lg:w-48 rounded-md ml-auto"
                        alt={`Product ${order.name}`}
                      />
                    )}
                  </div>
                </div>
              </CardBody>
            ))}
          </div>
          <div className="w-full h-px bg-gray-400 "></div>
          <CardFooter className="w-full ">
            <div className="flex lg:flwx-row flex-col items-center justify-between gap-6">
              <div>
                <p>Payment Summary</p>
                <p className="text-lg">
                  <span className="text-black font-bold"> Order Total: </span>
                  <span className="text-gray-700 font-800">
                    {order.amount.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </p>
                <p className="text-lg flex items-center gap-2 mb-3">
                  <span className="text-black font-bold">
                    {" "}
                    Payment Status:{" "}
                  </span>
                  <span className="text-gray-700"> {order.status} </span>
                  <span>
                    <CheckBadgeIcon className="w-5 h-5 text-black" />
                  </span>
                </p>
              </div>
              <div>
                Delivery Address
                <div className="flex w-full flex-col gap-0.5">
                  <div className="flex items-center justify-between">
                    <Typography variant="h5" color="blue-gray">
                      {order.name}
                    </Typography>
                  </div>
                  <Typography color="blue-gray">{order.phone}</Typography>
                </div>
                <div className="mb-4">
                  <span>
                    {order.city} , {order.state}, {order.address},{" "}
                    {order.pincode}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full h-px bg-gray-400 "></div>
            <div className="w-full px-2 lg:px-24 py-4 ">
              {order.deliveryStatus === "Canceled" &&
                order.deliveryStatus !== "Returned" && (
                  <div>
                    <Stepper
                      activeStep={activeStep}
                      isLastStep={(value) => setIsLastStep(value)}
                      isFirstStep={(value) => setIsFirstStep(value)}
                    >
                      <Step>
                        <RocketLaunchIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.5rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                          >
                            Order Placed
                          </Typography>
                        </div>
                      </Step>
                      <Step>
                        <TruckIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.5rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                          >
                            Order Canceled
                          </Typography>
                        </div>
                      </Step>
                    </Stepper>
                  </div>
                )}
              {order.deliveryStatus === "Returned" &&
                order.deliveryStatus !== "Canceled" && (
                  <div>
                    <Stepper
                      activeStep={activeStep}
                      isLastStep={(value) => setIsLastStep(value)}
                      isFirstStep={(value) => setIsFirstStep(value)}
                    >
                      <Step>
                        <RocketLaunchIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.5rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                          >
                            Order Placed
                          </Typography>
                        </div>
                      </Step>
                      <Step>
                        <CheckBadgeIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.8rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                          >
                            Delivered on{" "}
                            {new Date(order.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Typography>
                        </div>
                      </Step>
                      <Step>
                        <ArrowUturnUpIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.8rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                          >
                            Return request submitted
                          </Typography>
                        </div>
                      </Step>
                      <Step>
                        <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.8rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 3 ? "blue-gray" : "gray"}
                          >
                            Return request accepted
                          </Typography>
                        </div>
                      </Step>
                    </Stepper>
                  </div>
                )}
              {order.deliveryStatus !== "Canceled" &&
                order.deliveryStatus !== "Returned" && (
                  <div>
                    <Stepper
                      activeStep={activeStep}
                      isLastStep={(value) => setIsLastStep(value)}
                      isFirstStep={(value) => setIsFirstStep(value)}
                    >
                      <Step>
                        <RocketLaunchIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.5rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 0 ? "blue-gray" : "gray"}
                          >
                            Order Placed
                          </Typography>
                        </div>
                      </Step>
                      <Step>
                        <TruckIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.5rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 1 ? "blue-gray" : "gray"}
                          >
                            Order Shipped
                          </Typography>
                        </div>
                      </Step>
                      <Step>
                        <CheckBadgeIcon className="h-5 w-5" />
                        <div className="absolute lg:-bottom-[2.5rem] lg:w-max -bottom-[3.5rem] w-fit text-center">
                          <Typography
                            variant="small"
                            color={activeStep === 2 ? "blue-gray" : "gray"}
                          >
                            Order Delivered
                          </Typography>
                        </div>
                      </Step>
                    </Stepper>
                  </div>
                )}
              <div className="mt-32 flex justify-between">
                {/* <Button onClick={handlePrev} disabled={isFirstStep}>
                    Prev
                  </Button>
                  <Button onClick={handleNext} disabled={isLastStep}>
                    Next
                  </Button> */}
              </div>
            </div>
            {order.deliveryStatus === "Delivered" && (
              <div className="flex flex-col gap-3">
                <Button
                  className="w-fit ml-auto"
                  variant="gradient"
                  onClick={() => handleDownloadInvoice()}
                >
                  Download Invoice
                </Button>
                <Accordion open={accordianOpen === 1} className="w-full">
                  <AccordionHeader
                    onClick={() => handleAccordianOpen(1)}
                    className="text-sm"
                  >
                    Return order?
                  </AccordionHeader>
                  <AccordionBody className="">
                    <div className="flex-col">
                      {/* Here's where you can map over radio buttons */}
                      <p>Please select reason for return:</p>
                      {returnReasons.map((reason, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            type="radio"
                            id={`reason${index}`}
                            name="returnReason"
                            value={reason}
                            onChange={(e) => setReturnReason(e.target.value)}
                          />
                          <label htmlFor={`reason${index}`} className="ml-1">
                            {reason}
                          </label>
                        </div>
                      ))}

                      {returnReason && (
                        <div className="mt-2">
                          {returnReason === "Color change" ||
                          returnReason === "Used product" ||
                          returnReason === "Wrong product" ||
                          returnReason === "Color is not like in the photos" ? (
                            <div>
                              <label
                                htmlFor="photoProof"
                                className="file-input-label"
                              >
                                <span className="file-input-button bg-gray-800 text-white py-2 px-4 rounded cursor-pointer">
                                  Choose Images
                                </span>
                                <input
                                  type="file"
                                  id="photoProof"
                                  accept="image/*"
                                  onChange={(e) =>
                                    handleImageUpload(e.target.files)
                                  }
                                  multiple
                                  className="hidden"
                                />
                              </label>
                              <p className="mt-3">
                                You can select up to 5 images
                              </p>
                            </div>
                          ) : null}
                          {/* Show selected video */}
                          {returnVideo && (
                            <div className="video-preview flex gap-2 relative">
                              <video controls className="h-32 w-32">
                                <source
                                  src={URL.createObjectURL(returnVideo)}
                                  type="video/mp4"
                                />
                              </video>
                              <button
                                className="absolute top-0 right-0 p-px"
                                onClick={() => removeVideo()}
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </button>
                            </div>
                          )}

                          {/* Show selected images */}
                          <div className="flex gap-2 flex-wrap w-full">
                            {returnImages.map((image, index) => (
                              <div
                                key={index}
                                className="image-preview flex gap-2 relative"
                              >
                                <img
                                  src={URL.createObjectURL(image)}
                                  alt={`Image ${index}`}
                                  className="h-20 w-20"
                                />
                                <button
                                  onClick={() => removeImage(index)}
                                  className="absolute top-0 right-0 p-px"
                                >
                                  <XMarkIcon className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                          {returnReason === "Damaged or defective" && (
                            <div>
                              <label
                                htmlFor="videoProof"
                                className="file-input-label"
                              >
                                <span className="file-input-button mt-4 bg-gray-800 text-white py-2 px-4 rounded cursor-pointer">
                                  Choose Video
                                </span>
                                <input
                                  type="file"
                                  id="videoProof"
                                  accept="video/*"
                                  onChange={(e) =>
                                    handleVideoUpload(e.target.files[0])
                                  }
                                  className="hidden"
                                />
                              </label>
                            </div>
                          )}
                          <br />
                          {/* Ask for explanation */}
                          <Textarea
                            value={returnExplanation}
                            onChange={(e) =>
                              setReturnExplanation(e.target.value)
                            }
                            variant="outlined"
                            label="Explanation for the above concern"
                            className="w-full"
                            required
                          />
                          {returnReason === "Damaged or defective" &&
                            !returnVideo && (
                              <p className="text-red-500">
                                Please upload a video for this reason
                              </p>
                            )}
                          {returnReason !== "Damaged or defective" &&
                            returnImages.length === 0 && (
                              <p className="text-red-500">
                                Please upload images for this reason
                              </p>
                            )}

                          <Button
                            className="w-full mt-2"
                            variant="text"
                            onClick={() => handleReturnOrder()}
                            disabled={
                              !returnReason ||
                              !returnExplanation ||
                              (returnReason === "Damaged or defective" &&
                                !returnVideo) ||
                              (returnReason !== "Damaged or defective" &&
                                returnImages.length === 0)
                            }
                          >
                            Request for return
                          </Button>
                        </div>
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              </div>
            )}

            {order.deliveryStatus === "Unshipped" &&
              order.status !== "Canceled" && (
                <Accordion open={accordianOpen === 1} className="w-full">
                  <AccordionHeader
                    onClick={() => handleAccordianOpen(1)}
                    className="text-sm"
                  >
                    Cancel order?
                  </AccordionHeader>
                  <AccordionBody className="">
                    <div className="flex-col">
                      <p>Please select reason for cancel:</p>
                      {/* Here's where you can map over radio buttons */}
                      {cancelReasons.map((reason, index) => (
                        <div key={index} className="flex items-center">
                          <input
                            className="text-black"
                            type="radio"
                            id={`reason${index}`}
                            name="cancelReason"
                            value={reason}
                            onChange={(e) => setCancelReason(e.target.value)}
                          />
                          <label htmlFor={`reason${index}`} className="ml-1">
                            {reason}
                          </label>
                        </div>
                      ))}

                      {/* Show selected images */}

                      {/* Show selected video */}

                      {cancelReason && (
                        <div className="mt-2">
                          <br />
                          {/* Ask for explanation */}
                          <div className="lg:w-1/4">
                            <Textarea
                              value={cancelExplanation}
                              onChange={(e) =>
                                setCancelExplanation(e.target.value)
                              }
                              variant="outlined"
                              label="Explanation for the above concern"
                              className="w-full "
                              required
                            />

                            <Button
                              className="w-full mt-2"
                              variant="text"
                              onClick={() => handleCancelOrder()}
                              disabled={
                                cancelReason === "" || cancelExplanation === ""
                              }
                            >
                              Cancel Order
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              )}
          </CardFooter>

          <div className="ml-auto">
            {/* <p className=" text-sm cursor-pointer" onClick={handleOpen}>
              Having trouble ?{" "}
            </p> */}
            <p className=" text-xs">
              Last Updated At: {formattedUpdateDateTime}
            </p>
          </div>
        </Card>
      </div>

      <div className="flex overflow-auto items-center justify-end">
        <div className="overflow-auto h-full">
          <Dialog
            size="lg"
            open={open}
            handler={handleOpen}
            className="bg-transparent shadow-none overflow-auto"
          >
            <Card className="mx-auto w-full overflow-auto">
              <CardBody className="flex flex-col gap-4 overflow-auto">
                <h3>Having trouble?</h3>
                <p>Enter your complaint.</p>
                <div className="flex flex-col lg:flex-row items-center justify-center">
                  <div className="w-full">
                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-5"
                      value={order.orderId}
                      type="text"
                      disabled
                    />
                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-5"
                      placeholder="State"
                      type="text"
                      value={order.name}
                    />
                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-5"
                      placeholder="State"
                      type="text"
                      value={order.phone}
                    />
                  </div>
                </div>

                <div className="">
                  <Textarea
                    className="w-full border border-1 border-gray-400 h-24"
                    label="Write to us"
                    value={queryData.message}
                    onChange={(e) =>
                      setQueryData({
                        ...queryData,
                        message: e.target.value,
                      })
                    }
                    error={toastMessage ? true : false}
                  />
                  {toastMessage && (
                    <p className="text-sm mt-1">{toastMessage}</p>
                  )}
                </div>
                <div className="">
                  <select
                    value={complaintType}
                    onChange={handleComplaintTypeChange}
                    className="w-full border border-1 border-gray-400 h-10 px-2"
                  >
                    <option value="">Select Complaint Type</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Product Quality">Product Quality</option>
                    <option value="Payment Issue">Payment Issue</option>
                    {/* Add more options as needed */}
                  </select>
                  {/* Other form elements */}
                </div>
              </CardBody>
              <CardFooter className="pt-0 overflow-auto">
                <div className="flex items-center justify-center">
                  <Button variant="text" onClick={handleOpen} className="mr-3">
                    Cancel
                  </Button>
                  <Button
                    variant="gradient"
                    // color="orange"
                    onClick={() => handleSendMessage()}
                  >
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>
            {/* <div className="lg:hidden fixed bottom-16 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
              {toastMessage && <Toast message={toastMessage} />}
            </div> */}
          </Dialog>
          <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
            {toastMessage && <Toast message={toastMessage} />}
          </div>
        </div>
      </div>
    </div>
  );
}

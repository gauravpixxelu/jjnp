import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
  Dialog,
  Select,
  Option,
  Tooltip,
} from "@material-tailwind/react";
import { State } from "country-state-city";
import {
  PlusIcon,
  PencilIcon,
  ArchiveBoxXMarkIcon,
  ChevronLeftIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Toast from "../../components/Toast";
import {
  CheckBadgeIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate, Link } from "react-router-dom";
import Topbar from "../../components/Topbar";
import Pincode from "react-pincode";

export default function Address() {
  const [open, setOpen] = useState(false);
  const [stateData, setStateData] = useState([]);
  const [editing, setEditing] = useState(false); // Flag to indicate if editing mode is active
  const [pincodeData, setPincodeData] = useState({});
  const [progress, setProgress] = useState(30);

  const [addressData, setAddressData] = useState({
    name: "",
    mobile: "",
    state: "",
    city: "",
    pincode: "",
    landmark: "",
    address: "",
  });

  const setPincodeData1 = (data) => {
    setPincodeData(data);
    console.log(data);
    setAddressData({
      ...addressData,
      city: data.city,
      state: data.stateName,
      pincode: data.pincode,
    });
  };

  const handlePincodeChange = (event) => {
    const selectedPincode = event.target.value;
    setAddressData({
      ...addressData,
      pincode: selectedPincode,
    });
  };
  const [getAddressData, setGetAddressData] = useState([]);
  const [addressError, setAddressError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const handleOpen = () => setOpen((cur) => !cur);

  const handleChange = (selectedOption) => {
    setAddressData({ ...addressData, state: selectedOption }); // Assuming 'selectedOption' contains the value you want to set
  };

  const handlAddAddress = async () => {
    // Check if pincode and address are provided
    // if (addressData.pincode === "" || addressData.address === "") {
    //   setAddressError("Pincode and Address are required.");
    //   return;
    // }

    // Convert pincodeData keys to an array
    // const availablePincodes = Object.keys(pincodeData);

    // Check if the pincode exists in the availablePincodes array
    // if (!availablePincodes.includes(addressData.pincode)) {
    //   setAddressError("Sorry, we are not operating in this zone yet.");
    //   return;
    // }

    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/updateaddress`,
        {
          token: accessToken1,
          address: addressData.address,
          pincode: addressData.pincode,
          city: addressData.city,
          state: addressData.state,
          phone: addressData.mobile,
          name: addressData.name,
          email: getAddressData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToastMessage(response.data.message);

      handleGetAddress();

      // Clear the error when the form is submitted successfully
      setAddressError("");

      // setTableRows(mappedProducts);
      // setLoading(false);
      handleOpen();
      // navigate("/");
    } catch (error) {
      setAddressError(error.response.data.message);
      setToastMessage("Sorry " + error.response.data.message);

      // setLoading(false);

      setTimeout(() => {
        setAddressError("");
      }, 3000);
    } finally {
      // setLoading(false);
    }
  };

  const handleGetPincodes = async () => {
    const accessToken1 = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getpincodes`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // setPincodeData(response.data);
    } catch (error) {
      console.error("Error fetching pincodes:", error);
      // Handle the error as needed, for example, show a message to the user
    }
  };

  const handleGetAddress = async () => {
    const accessToken1 = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/profile/getaddress`,
        {
          token: accessToken1,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(pincodeData);
      setGetAddressData(response.data.address);

      setProgress(100);
    } catch (error) {
      setToastMessage("Soryy", error.response.message);
    }
  };

  const handleDeleteAddress = async (id, pincode) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/profile/deleteaddress`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            token: accessToken,
            addressId: id,
            pincode: pincode,
          },
        }
      );
      setToastMessage(response.data.message + "..!");

      handleGetAddress();
      // handleGetAddress(); // Refresh cart data after removal
    } catch (error) {
      // Handle error
    }
  };
  // Function to handle edit address
  const handleEditAddress = (address) => {
    setAddressData({
      // Populate the form with the details of the address to be edited
      name: address.name,
      mobile: address.phone, // Use 'phone' property for mobile number
      state: address.state,
      city: address.city,
      pincode: address.pincode,
      landmark: address.landmark,
      address: address.address,
      emial: address.email,
    });
    setEditing(true); // Set editing mode to true
    handleOpen(); // Open the dialog
  };

  // Fetch states data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const states = State.getStatesOfCountry("IN").map((state) => ({
        value: state.name,
        displayValue: state.name,
      }));
      setStateData(states);
    };
    fetchData();
  }, []);

  useEffect(() => {
    handleGetAddress();
  }, []);

  useEffect(() => {
    handleGetPincodes();
    if (!open) {
      // Reset the addressData state when the dialog is closed
      setAddressData({
        name: "",
        mobile: "",
        state: "",
        city: "",
        pincode: "",
        landmark: "",
        address: "",
      });
      // Reset the editing mode
      setEditing(false);
    }
  }, [open]);

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
      <Topbar progress={progress} />

      
      <div className="relative mb-2">
        <div className="bg-black h-[200px] flex items-center justify-center">
          <Typography
            color="white"
            className="absolute text-center text-white opacity-100 Capitalize text-[36px]"
          >
             Shipping Addresses
          </Typography>
        </div>
      </div>

      {/* Existing addresses */}
      <Card
        color="transparent"
        shadow={false}
        className="w-full lg:py-12 overflow-auto rounded-none flex items-center justify-center m-4 py-0"
      >
        <CardBody className="p-0 flex gap-2 flex-wrap ">
          {""}
          {getAddressData &&
            getAddressData.address &&
            getAddressData.address.map((address, index) => (
              <div key={index} className="mb-4">
                <Card
                  color="transparent"
                  shadow={false}
                  className="w-full lg:w-96 lg:h-60  bg-gray-100 rounded-none overflow-hidden w-auto h-auto"
                >
                  <CardBody className="p-4 text-center overflow-auto">
                    <div className="flex flex-row">
                      <Button
                        variant="text"
                        className="p-1"
                        onClick={() =>
                          handleEditAddress(address, getAddressData)
                        }
                      >
                        <PencilIcon className="h-5 w-5 text-gray-700" />
                      </Button>

                      <Button
                        variant="text"
                        className="p-1"
                        onClick={() => {
                          handleDeleteAddress(address._id, address.pincode);
                        }}
                      >
                        <TrashIcon className="h-5 w-5 ml-1 text-gray-700" />
                      </Button>
                    </div>
                    <div>
                      <div className="flex w-full text-center flex-col text-black gap-2 mb-3">
                        <p className="text-2xl uppercase">{address.name} </p>
                        <p className="text-sm">{address.phone}</p>
                      </div>
                    </div>
                    <span className="text-center">
                      {address.address}, {address.city} , {address.state},{" "}
                      {address.pincode},
                    </span>
                  </CardBody>
                </Card>
              </div>
            ))}
          <Card
            color="transparent"
            shadow={false}
            className="w-full lg:w-96 h-60  bg-gray-100 rounded-none flex justify-center items-center"
          >
            <CardBody className="p-4 flex flex-col justify-center items-center">
              <span
                className="flex flex-row items-center justify-center gap-1 cursor-pointer"
                onClick={handleOpen}
              >
                <PlusIcon className="h-6 w-6 text-black" />
                <p className="text-black uppercase">Add New Address</p>
              </span>
              <p className="text-sm text-center">
                Add a new address for hassle-free and seamless shipping
              </p>
            </CardBody>
          </Card>
        </CardBody>
      </Card>

      {/* New address form */}
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
                <Typography variant="h4" color="blue-gray">
                  {editing ? "Edit Address" : "New Address"}{" "}
                  {/* Display different title based on editing mode */}
                </Typography>
                <Typography
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Enter your detailed address.
                </Typography>
                {addressError && (
                  <Typography color="red" className="text-sm mt-2">
                    {addressError}
                  </Typography>
                )}
                
                <div className="flex flex-col items-center justify-center">
                  <div className="w-full p-px mt-5">
                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mb-5"
                      placeholder="Name"
                      type="text"
                      value={addressData.name}
                      onChange={(e) =>
                        setAddressData({ ...addressData, name: e.target.value })
                      }
                    />
                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded "
                      placeholder="Mobile Number"
                      type="text"
                      value={addressData.mobile}
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          mobile: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="w-full p-px mt-4">
                    <Pincode
                      invalidError="Please check pincode"
                      lengthError="check length"
                      getData={(data) => setPincodeData1(data)}
                      showArea={false}
                      showRegion={false}
                      showState={false}
                      showCity={false}
                      showDistrict={false}
                      pincodeInput={{
                        width: "100%",
                        height: "100%",
                        border: "1px solid #C0C0C0",
                        borderRadius: "3px",
                        padding: "8px",
                      }}
                    />
                  </div>

                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-5"
                      placeholder="City"
                      type="text"
                      value={addressData.city}
                      disabled
                      onChange={(e) =>
                        setAddressData({ ...addressData, city: e.target.value })
                      }
                    />
                  
                    <input
                      className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-5"
                      placeholder="State"
                      type="text"
                      value={addressData.state}
                      disabled
                      onChange={(e) =>
                        setAddressData({
                          ...addressData,
                          state: e.target.value,
                        })
                      }
                    />

                  <textarea
                    className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-5"
                    placeholder="Address"
                    type="text"
                    value={addressData.address}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        address: e.target.value,
                      })
                    }
                  />
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
                    onClick={handlAddAddress}
                  >
                    Save
                  </Button>
                </div>
              </CardFooter>
            </Card>

          </Dialog>
          <div className="fixed bottom-4 right-4 transition ease-in-out delay-300 -translate-y-1 scale-110 duration-700 z-[61000]">
            {toastMessage && <Toast message={toastMessage} />}
          </div>
        </div>
      </div>


      <div className="inline-block">
        <Link to={"/account"} className="flex items-center bg-black w-auto py-4 px-8 text-white gap-2 justify-center">
          <ChevronLeftIcon className="h-4 w-4 " />
          <Typography>Account</Typography>
        </Link>
      </div>
    </div>
  );
}

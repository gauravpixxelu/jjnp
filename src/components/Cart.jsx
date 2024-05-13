import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaceFrownIcon,
  FaceSmileIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../config/AuthContext";

export default function Cart({ handleDrawer, drawerOpen }) {
  const navigate = useNavigate();
  const isLoggedIn = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const getTotalPrice = () => {
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
      return total + item.price;
    }, 0);
    // Set cartTotal state
    setCartTotal(Math.round(totalPrice));
  };

  const handleRemoveItem = async (slug, quantity) => {
    const accessToken1 = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/removecart`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            token: accessToken1,
            slug: slug,
            quantity: quantity,
          },
        }
      );
      handleGetCartData();
    } catch (error) {}
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
    } catch (_) {
      // Catch block intentionally left empty to ignore errors
    }
  };

  const handleClearCart = async () => {
    const accessToken1 = localStorage.getItem("accessToken");
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/clearcart`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            token: accessToken1,
          },
        }
      );
      setCartItems([]); // Clear the cart items state
      setCartTotal(0); // Reset cart total
      // handleDrawer();
      handleGetCartData();
    } catch (error) {
      // Handle error
    }
  };

  const increaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;
    setCartItems(updatedCartItems);
    getTotalPrice(); // Recalculate total price
  };

  const decreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);
      getTotalPrice(); // Recalculate total price
    }
  };

  const handleQuantityChange = async (index, newQuantity) => {
    const updatedCartItems = [...cartItems];

    // Calculate the difference between the new value and the current quantity
    const quantityDifference = newQuantity - updatedCartItems[index].quantity;

    // Update the quantity of the item
    updatedCartItems[index].quantity += quantityDifference;

    if (updatedCartItems[index].quantity < 1) {
      // Remove the item from the cart if quantity becomes zero
      handleRemoveItem(updatedCartItems[index].slug, 1);
      return;
    }
    // Update the database with the updated cart item
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`${process.env.REACT_APP_API_URL}/products/addtocart`, {
        token: accessToken,
        slug: updatedCartItems[index].slug,
        size: updatedCartItems[index].selectedSize,
        color: updatedCartItems[index].selectedColor,
        quantity: updatedCartItems[index].quantity,
      });
    } catch (error) {
      // Handle error
    }

    setCartItems(updatedCartItems);
    getTotalPrice(); // Recalculate total price
    handleGetCartData();
  };

  const handleRemoveItem1 = async (slug, quantity) => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/products/removeCartItem`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            token: accessToken,
            slug: slug,
            quantity: quantity,
          },
        }
      );
      handleGetCartData(); // Refresh cart data after removal
    } catch (error) {
      // Handle error
    }
  };

  const handleGoToShop = () => {
    handleDrawer();
    navigate("/productList");
  };
  useEffect(() => {
    if (isLoggedIn) {
      // Check if user is logged in
      handleGetCartData();
    } else {
      setCartItems([]); // Clear cart if user is not logged in
    }
  }, [handleDrawer, isLoggedIn]);

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  return (
    <>
      <div className={`cart ${drawerOpen ? "open" : ""}`}>
        <Drawer
          open={drawerOpen}
          onClose={handleDrawer}
          placement="right"
          className="p-4 overflow-auto drawer-gd"
        >
          <div className="absolute top-0 right-0">
            <IconButton variant="text" color="blue-gray" onClick={handleDrawer}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
          <div>
            <div className="flex flex-col ">
              <Typography variant="h4" className="text-center">
                Shopping Bag{" "}
              </Typography>
              {cartItems.length > 0 && (
                <Typography className="h6" color="gray">
                  Your items
                </Typography>
              )}
            </div>
            {cartItems.length === 0 ? (
              <div className="flex items-center justify-center flex-col gap-10 mt-8">
                <div>
                  <img
                    src="/emptyCart.png"
                    alt=""
                    className="grayscale aspect-video w-full h-full"
                  />
                  <Typography className="text-gray-500 text-center">
                    Your bag is empty
                  </Typography>
                </div>
                <div className="">
                  <Button className="mt-4 inline-block bg-black text-white rounded-none font-normal px-12 py-4 uppercase text-[12px]" onClick={() => handleGoToShop()}>
                    Go to Shop
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1 bg-slate-300">
                  {cartItems.map((item, index) => (
                    <div key={index} className="p-2 bg-gray-100 ">
                      <div className="flex justify-end items-end ml-auto">
                        <button
                          onClick={() => {
                            handleRemoveItem(item.slug, item.quantity);
                          }}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                      <Typography variant="h5">{item.title}</Typography>
                      <div className="flex">
                        <Typography variant="small" color="gray">
                          Color: {item.color}
                        </Typography>
                        <Typography
                          variant="small"
                          color="gray"
                          className="ml-auto"
                        >
                          x{item.quantity}
                        </Typography>
                      </div>
                      <Typography variant="small" color="gray">
                        Size: {item.size}
                      </Typography>

                      <div className="flex items-end justify-end">
                        <button
                          className="text-xl"
                          onClick={() => handleQuantityChange(index, -1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="w-8 text-center"
                          min="1"
                          disabled
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              index,
                              parseInt(e.target.value) - item.quantity
                            )
                          }
                        />
                        <button
                          className="text-xl "
                          onClick={() => handleQuantityChange(index, 1)}
                        >
                          +
                        </button>
                      </div>
                      <h4>
                        Total:{" "}
                        {item.price.toLocaleString("en-IN", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </h4>
                    </div>
                  ))}
                  <p className="ml-auto">
                    Cart Total:{" "}
                    {cartTotal.toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })}
                    <br />
                    {cartItems.length + " "} items
                  </p>
                </div>
                <div className="flex items-center justify-center mt-5 gap-1">
                  <Button onClick={() => navigate("/checkout")}>
                    Checkout
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => {
                      handleClearCart();
                    }}
                  >
                    Clear Cart
                  </Button>
                </div>
              </>
            )}
          </div>
        </Drawer>
      </div>
    </>
  );
}

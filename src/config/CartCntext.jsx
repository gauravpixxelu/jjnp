import React, { createContext, useContext, useEffect, useState } from "react";
import { openDB, clearCartItems, removeCartItem, getCartItems, addCartItem } from "../config/IndexedDB";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart data from IndexedDB on component mount
  useEffect(() => {
    openDB()
      .then(() => getCartItems())
      .then((items) => setCartItems(items))
  }, []);

  // Save cart data to IndexedDB whenever cart items change
  useEffect(() => {
    openDB()
      .then(() => clearCartItems())
      .then(() => {
        cartItems.forEach(item => {
          addCartItem(item); // Corrected function call
        });
      })
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

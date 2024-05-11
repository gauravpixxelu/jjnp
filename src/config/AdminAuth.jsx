import { createContext, useContext, useState, useEffect } from "react";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("adminToken") || null
  );
  const [expiry, setExpiry] = useState(
    localStorage.getItem("adminExpiry") || null
  );
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const setAdminToken = (token) => {
    setAccessToken(token);
    // setExpiry(expiryTime);
    setIsAdminLoggedIn(true);
    // localStorage.setItem("accessToken", token);
    // localStorage.setItem("expiry", expiryTime);
  };

  const logout = () => {
    setAccessToken(null);
    // setExpiry(null);
    // setIsAdminLoggedIn(false);
    sessionStorage.removeItem("adminToken");
    // localStorage.removeItem("expiry");
  };

  //   useEffect(() => {
  //     const token = localStorage.getItem("adminToken");
  //     const expiryTime = localStorage.getItem("adminExpiry");

  //     if (token && expiryTime) {
  //       const currentTime = Math.floor(Date.now() / 1000);

  //       if (token) {
  //         setIsAdminLoggedIn(true);
  //       } else {
  //         logout();
  //       }
  //     }
  //   }, []);
  return (
    <AdminAuthContext.Provider
      value={{ accessToken, setAdminToken, isAdminLoggedIn, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );
  const [expiry, setExpiry] = useState(localStorage.getItem("expiry") || null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setToken = (token, expiryTime) => {
    setAccessToken(token);
    setExpiry(expiryTime);
    setIsLoggedIn(true);
    // localStorage.setItem("accessToken", token);
    // localStorage.setItem("expiry", expiryTime);
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiry");
  };

  useEffect(() => {
    const token = accessToken;
    const expiryTime = expiry;

    if (token && expiryTime) {
      const currentTime = Math.floor(Date.now() / 1000);

      if (expiryTime > currentTime) {
        setIsLoggedIn(true);
      } else {
        logout();
      }
    }
  }, [accessToken, expiry]);
  return (
    <AuthContext.Provider value={{ accessToken, setToken, isLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

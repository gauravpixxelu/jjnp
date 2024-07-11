import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const navigateTo = useNavigate();

    // Your authentication logic here
    useEffect(() => {
      // Perform any necessary authentication checks
      // For example, check if the user is logged in or has valid credentials

      const isAuthenticated = localStorage.getItem("accessToken"); // Your authentication logic
      if (!isAuthenticated) {
        navigateTo("/login");
      }
    }, [navigateTo]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAuth;

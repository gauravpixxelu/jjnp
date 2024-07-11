import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAdminAuth = (WrappedComponent) => {
  const AuthHOC = (props) => {
    const navigateTo = useNavigate();

    // Your authentication logic here
    useEffect(() => {
      // Perform any necessary authentication checks
      // For example, check if the user is logged in or has valid credentials

      const isAuthenticated = sessionStorage.getItem("adminToken"); // Your authentication logic
      if (!isAuthenticated) {
        navigateTo("/superUserAuth");
      }
    }, [navigateTo]);

    return <WrappedComponent {...props} />;
  };

  return AuthHOC;
};

export default withAdminAuth;

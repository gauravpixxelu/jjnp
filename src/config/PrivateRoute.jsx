import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isLoggedIn ? (
            <Component key={props.location.key} {...props} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </>
  );
};

export default ProtectedRoute;

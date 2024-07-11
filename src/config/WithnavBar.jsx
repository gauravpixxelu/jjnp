import React from "react";
import { useLocation } from "react-router-dom";
import NavbarMenu from "../components/NavbarMenu"; // Import your NavbarMenu component
import NavBar from "../admin/NavBar"; // Import your NavBar component

function withNavbar(Component) {
  return function WrappedComponent(props) {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
      <>
        {!isAdminRoute ? <NavbarMenu /> : <NavBar />}
        <Component {...props} />
      </>
    );
  };
}

export default withNavbar;

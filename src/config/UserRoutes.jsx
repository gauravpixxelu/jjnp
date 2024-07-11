import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import Home from "../features/Home";
import Login from "../features/Login";
import Register from "../features/Register";
import ForgotPassword from "../features/ForgotPassword";
import Profile from "../features/profile/Profile";
import ProfileInfo from "../features/profile/ProfileInfo";
import OrderDetails from "../features/profile/order/OrderDetails";
import ProductList from "../features/shop/ProductList";
import ViewProduct from "../features/shop/ViewProduct";
import Checkout from "../features/profile/order/Checkout";
import PlaceOrder from "../features/profile/order/PlaceOrder";
import ContactUs from "../features/ContactUs";
import Address from "../features/profile/Address";
import Orders from "../features/profile/order/Orders";
import Wishlist from "../features/profile/Wishlist";
import { useAuth } from "./AuthContext";
import withNavbar from "./WithnavBar";
import ProtectedRoute from "./PrivateRoute";
import withAuth from "./withAuth";
import Home from "../components/animation/sections/Home";
import FAQ from "../features/Faqs";
import ProductCare from "../components/ProductCare";
import AboutUs from "../components/AboutUs";
import TermsnPrivacy from "../components/TermsnPrivacy";
import CancellationPolicy from "../components/CancellationPolicy";
import ReturnPolicy from "../components/ReturnPolicy";
import OTPForm from "../features/OTPForm";


function UserRoutes() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // Store the current route in local storage when the user navigates to a new page
  const handleRouteChange = (newRoute) => {
    localStorage.setItem("currentRoute", window.location.pathname);
  };

  const HomeWithNavbar = withNavbar(Home);
  const LoginWithNavbar = withNavbar(Login);
  const RegisterWithNavbar = withNavbar(Register);
  const ForgotPasswordWithNavbar = withNavbar(ForgotPassword);
  const ProfileWithNavbar = withNavbar(Profile);
  const ProfileInfoWithNavbar = withNavbar(ProfileInfo);
  const OrderDetailsWithNavbar = withNavbar(OrderDetails);
  const ProductListWithNavbar = withNavbar(ProductList);
  const ViewProductWithNavbar = withNavbar(ViewProduct);
  const ChekoutWithNavbar = withNavbar(Checkout);
  const AddressWithNavbar = withNavbar(Address);
  const OrdersWithNavbar = withNavbar(Orders);
  const ContactUsWithNavbar = withNavbar(ContactUs);
  const WishlistWithNavbar = withNavbar(Wishlist);
  const PlaceOrderWithNavbar = withNavbar(PlaceOrder);
  const FAQWithNavbar = withNavbar(FAQ);
  const ProductCareWithNavbar = withNavbar(ProductCare);
  const AboutUsWithNavbar = withNavbar(AboutUs);
  const TermsnPrivacyWithNavbar = withNavbar(TermsnPrivacy);
  const ReturnPolicyWithNavbar = withNavbar(ReturnPolicy);
  const CancellationPolicyWithNavbar = withNavbar(CancellationPolicy);
  const OTPFormWithNavbar = withNavbar(OTPForm);

  //protected routes
  const ProtectedAccount = withAuth(ProfileWithNavbar);
  const ProtectedProfileInfo = withAuth(ProfileInfoWithNavbar);
  const ProtectedOrderDetails = withAuth(OrderDetailsWithNavbar);
  // const ProtectedProductList = withAuth(ProductListWithNavbar);
  const ProtectedViewProduct = withAuth(ViewProductWithNavbar);
  const ProtectedCheckout = withAuth(ChekoutWithNavbar);
  const ProtectedAddress = withAuth(AddressWithNavbar);
  const ProtectedOrders = withAuth(OrdersWithNavbar);
  const ProtectedContactUs = withAuth(ContactUsWithNavbar);
  const ProtectedWishlist = withAuth(WishlistWithNavbar);
  const ProtectedPlaceOrder = withAuth(PlaceOrderWithNavbar);

  return (
    <Routes>

      <Route
        path="/"
        element={<HomeWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />

      <Route
        path="otp-form"
        element={<OTPFormWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />

      <Route
        path="/account"
        element={<ProtectedAccount />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="login"
        element={<LoginWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="register"
        element={<RegisterWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="/faqs"
        element={<FAQWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="forgotPassword"
        element={<ForgotPasswordWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="profileInfo"
        element={<ProtectedProfileInfo />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="orderDetails/:id"
        element={<ProtectedOrderDetails />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="productList"
        element={<ProductListWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="viewProduct/:id"
        element={<ViewProductWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="checkout"
        element={<ProtectedCheckout />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="placeOrder"
        element={<ProtectedPlaceOrder />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="contactUs"
        element={<ContactUsWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />

      <Route
        path="addresses"
        element={<ProtectedAddress />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="orders"
        element={<ProtectedOrders />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="wishlist"
        element={<ProtectedWishlist />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="product-care"
        element={<ProductCareWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="about-us"
        element={<AboutUsWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="terms"
        element={<TermsnPrivacyWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="return-policy"
        element={<ReturnPolicyWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
      <Route
        path="cancellation-policy"
        element={<CancellationPolicyWithNavbar />}
        onChange={(e) => handleRouteChange(e.pathname)}
      />
    </Routes>
  );
}

export default UserRoutes;

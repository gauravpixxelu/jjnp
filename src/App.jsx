import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./config/AuthContext";
import { AdminAuthProvider } from "./config/AdminAuth";
import UserRoutes from "./config/UserRoutes";
import AdminRoutes from "./config/AdminRoutes";
import { Footer } from "./components/Footer";
import ReturnPolicy from "./components/ReturnPolicy";
import AboutUs from "./components/AboutUs";
import FAQ from "./components/FAQ";
import ProductCare from "./components/ProductCare";
import TermsnPrivacy from "./components/TermsnPrivacy";
import Wishlist from "./features/profile/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="return-policy" element={<ReturnPolicy />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="faq" element={<FAQ />} />{" "}
        <Route path="product-care" element={<ProductCare />} />
        <Route path="terms" element={<TermsnPrivacy />} />
        <Route path="wishlist" element={<Wishlist />} />

      </Routes>
      <AuthProvider>
        <UserRoutes />
      </AuthProvider>
      <AdminAuthProvider>
        <AdminRoutes />
      </AdminAuthProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

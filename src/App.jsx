import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./config/AuthContext";
import { AdminAuthProvider } from "./config/AdminAuth";
import UserRoutes from "./config/UserRoutes";
import AdminRoutes from "./config/AdminRoutes";
import { Footer } from "./components/Footer";


function App() {
  return (
    <BrowserRouter>

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

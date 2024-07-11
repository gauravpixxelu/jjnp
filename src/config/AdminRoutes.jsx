import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../admin/screens/AdminLogin";
import Admin from "../admin/Admin";
import AddProduct from "../admin/products/AddProduct";
import Customers from "../admin/Customers";
import ManageOrderDetails from "../admin/orders/ManageOrderDetails";
import { useAdminAuth } from "./AdminAuth";
import withNavbar from "./WithnavBar";
import withAdminAuth from "./WithAdminAuth";
import ViewReturnedOrders from "../admin/orders/Returned/ViewReturnDetails";


function AdminRoutes() {
  const { isAdminLoggedIn } = useAdminAuth();
  const AddProductWithNavbar = withNavbar(AddProduct);
  const AdminWithNavbar = withNavbar(Admin);
  const CustomersWithNavbar = withNavbar(Customers);

  const ProtectedAdmin = withAdminAuth(AdminWithNavbar);
  const ProtectedAddProduct = withAdminAuth(AddProductWithNavbar);
  const ProtectedCustomers = withAdminAuth(CustomersWithNavbar);
  const ProtectedManageOrderDetails = withAdminAuth(ManageOrderDetails);
  const ProtectedViewReturnedOrders = withAdminAuth(ViewReturnedOrders);


  return (
    <Routes>
      <Route path="superuserAuth" element={<AdminLogin />} />

      {/* Only render admin routes if isAdminLoggedIn is true */}

      <Route path="admin" element={<ProtectedAdmin />} />
      <Route path="addProduct" element={<ProtectedAddProduct />} />
      <Route path="admin/customers" element={<ProtectedCustomers />} />
      <Route path="manageOrder/:id" element={<ProtectedManageOrderDetails />} />
      <Route path="manageReturnOrder/:id" element={<ProtectedViewReturnedOrders />} />
      {/* Render UserRoutes */}
    </Routes>
  );
}

export default AdminRoutes;

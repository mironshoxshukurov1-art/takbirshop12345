import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MyProvider } from "./context/MyContext";

import Home from "./Components/Home";
import Loginpage from "./Components/Loginpage";
import Contact from "./Components/Contact";
import Profil from "./Components/Profil";
import Cart from "./Components/Cart";
import About from "./Components/About";
import Payment from "./Components/Payment";
import SignUp from "./Components/Signup";
import ProductDetail from "./ProductDetail";
import Xaridlarim from "./Components/Xaridlarim";
import Savatcha from "./Components/Savatcha";


import AdminLayout from "./Admin/AdminLayout";
import AdminDashboard from "./Admin/AdminDashboard";
import AdminProducts from "./Admin/AdminProducts";
import AdminOrders from "./Admin/AdminOrders";
import AdminUsers from "./Admin/AdminUsers";
import AdminCategories from "./Admin/AdminCategories";
import AdminReviews from "./Admin/AdminReviews";
import AdminPayments from "./Admin/AdminPayments";
import AdminDelivery from "./Admin/AdminDelivery";
import AdminSettings from "./Admin/AdminSettings";
import { Toaster } from "react-hot-toast";
import Help from "./Components/Help";



export default function App() {
  return (
      <MyProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Profil" element={<Profil />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/About" element={<About />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Xaridlarim" element={<Xaridlarim />} />
          <Route path="/Savatcha" element={<Savatcha />} />
          <Route path="/Help" element={<Help />} />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="delivery" element={<AdminDelivery />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Routes>
      </MyProvider>
    
  );
}
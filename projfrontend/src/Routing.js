import React from "react";

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoute from "./auth/helper/AdminRoute";

import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import { isAuthenticated } from "./auth/helper";
import PrivateRoute from "./auth/helper/PrivateRoute";
import AddCategory from "./admin/AddCategory";
import ManageCategories from "./admin/ManageCategories";
import AddProduct from "./admin/AddProduct";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* user dashboard route */}
        <Route
          path="/user/dashboard"
          element={
            isAuthenticated() ? (
              <UserDashBoard />
            ) : (
              <Navigate
                to="/"
                state={{ from: window.location.pathname }}
                replace
              />
            )
          }
        ></Route>

        <Route
          path="/admin/dashboard"
          element={
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
              <AdminDashBoard />
            ) : (
              <Navigate
                to="/"
                state={{ from: window.location.pathname }}
                replace
              />
            )
          }
        ></Route>

        <Route
          path="/admin/create/category"
          element={
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
              <AddCategory />
            ) : (
              <Navigate
                to="/"
                state={{ from: window.location.pathname }}
                replace
              />
            )
          }
        ></Route>

        <Route
          path="/admin/categories"
          element={
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
              <ManageCategories />
            ) : (
              <Navigate
                to="/"
                state={{ from: window.location.pathname }}
                replace
              />
            )
          }
        ></Route>

        <Route
          path="/admin/create/product"
          element={
            isAuthenticated() && isAuthenticated().user.role === 1 ? (
              <AddProduct />
            ) : (
              <Navigate
                to="/"
                state={{ from: window.location.pathname }}
                replace
              />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;

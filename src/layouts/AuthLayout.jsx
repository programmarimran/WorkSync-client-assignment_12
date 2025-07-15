import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/navbar/Navbar";

const AuthLayout = () => {
  return (
    <>
    <Navbar></Navbar>
      <Outlet></Outlet>
    </>
  );
};

export default AuthLayout;

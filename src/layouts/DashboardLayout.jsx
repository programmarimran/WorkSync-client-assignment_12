import React from "react";
import { Outlet } from "react-router";
import Navbar from "../shared/navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      
    </div>
  );
};

export default DashboardLayout;

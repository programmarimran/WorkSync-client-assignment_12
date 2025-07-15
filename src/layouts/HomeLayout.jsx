import React from "react";
import Navbar from "../shared/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/footer/Footer";


const HomeLayout = () => {
  return (
    <>
      <div className="w-11/12 mx-auto">
        <Navbar></Navbar>
      </div>
      <main className=" w-11/12 mx-auto min-h-[calc(100vh-100px)]">
        <Outlet></Outlet>
      </main>
      <div className="w-11/12 mx-auto">
        <Footer></Footer>
      </div>
    </>
  );
};

export default HomeLayout;

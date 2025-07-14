import React from "react";
import Navbar from "../shared/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/footer/Footer";


const HomeLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <main className=" w-11/12 mx-auto min-h-[calc(100vh-100px)]">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};

export default HomeLayout;

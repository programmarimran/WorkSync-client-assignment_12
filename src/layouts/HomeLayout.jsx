import React from "react";
import Navbar from "../shared/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/footer/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import useScrollLevel from "../hooks/usescrollLevel";

const HomeLayout = () => {
  const level = useScrollLevel([70, 500]);
  const textClasses = ["text-black", "text-white backdrop-blur-lg ", "text-red"];
  return (
    <>
      <div
        className={`${textClasses[level]} w-11/12 mx-auto sticky top-0 z-50`}
      >
        <Navbar></Navbar>
      </div>
      <main className="  w-11/12 mx-auto min-h-[calc(100vh-100px)]">
        <Outlet></Outlet>
      </main>
      <div className="w-11/12 mx-auto">
        <Footer></Footer>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default HomeLayout;

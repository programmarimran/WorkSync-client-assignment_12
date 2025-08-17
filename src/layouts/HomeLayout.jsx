import React from "react";
import Navbar from "../shared/navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../shared/footer/Footer";
import ScrollToTopButton from "../components/ScrollToTopButton";
import useScrollLevel from "../hooks/usescrollLevel";

const HomeLayout = () => {
  const level = useScrollLevel([70, 400]);
  const textClasses = [
    "text-black dark:text-white",
    "text-primary dark:text-white backdrop-blur-sm ",
    // "text-black  dark:text-white bg-gray-100 dark:bg-gray-600 shadow",
    "text-white  dark:text-white bg-neutral  shadow",
  ];
  return (
    <>
      <div className={`${textClasses[level]}  sticky top-0 z-50`}>
        <div className="w-11/12  mx-auto ">
          <Navbar></Navbar>
        </div>
      </div>
      <div className="bg-gray-100 dark:bg-black/10">
        <main className=" w-11/12 mx-auto  min-h-[calc(100vh-100px)]">
          <Outlet></Outlet>
        </main>
      </div>
      <div className=" ">
        <Footer></Footer>
      </div>
      <ScrollToTopButton />
    </>
  );
};

export default HomeLayout;

import { NavLink } from "react-router";
// import { FaArrowRightFromBracket } from "react-icons/fa6";
// import Hambarger from "../hambarger/Hambarger";
import logo from "../../assets/logo.png";
import ThemeToggle from "../themeToggle/ThemeToggle";
import NavProfile from "../navProfile/NavProfile";
import NavHamburgerDrawer from "./NavHamburgerDrawer";
import useAuth from "../../hooks/useAuth";
import { LiaServicestack } from "react-icons/lia";
import { Home, LayoutDashboard, MessageCircle } from "lucide-react";
import useScrollLevel from "../../hooks/usescrollLevel";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import { FaQuestion } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { FcAbout } from "react-icons/fc";

const Navbar = () => {
  const level = useScrollLevel([70, 400]);
  const textClasses = [
    "text-black dark:text-white",
    "text-white   ",
    "text-white ",
  ];
  const { user, logoutUser } = useAuth();
  // console.log(user);
  const { scrollToSection } = useSmoothScroll();

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  flex items-center gap-1"
              : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
          }
        >
          <Home size={18} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  flex items-center gap-1"
              : "flex hover:bg-primary/90 hover:text-white items-center gap-1"
          }
        >
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/contact-us"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  flex items-center gap-1"
              : "flex hover:bg-primary/90 hover:text-white  items-center gap-1"
          }
        >
          <MessageCircle size={18} /> Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  flex items-center gap-1"
              : "flex hover:bg-primary/90 hover:text-white  items-center gap-1"
          }
        >
          <FcAbout size={18} /> About
        </NavLink>
      </li>
      <li className=" hidden xl:block">
        <button
          onClick={() => scrollToSection("services")}
          className="flex items-center gap-1 hover:text-primary"
        >
          <LiaServicestack size={16} /> Services
        </button>
      </li>
      <li className=" hidden xl:block">
        <button
          onClick={() => scrollToSection("faq")}
          className="flex items-center gap-1 hover:text-primary"
        >
          <FaQuestion size={16} /> FAQ
        </button>
      </li>
      <li className=" hidden xl:block">
        <button
          onClick={() => scrollToSection("review")}
          className="flex items-center gap-1 hover:text-primary"
        >
          <MdRateReview size={16} /> Review
        </button>
      </li>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <div className=" flex items-center">
          {/* <Hambarger></Hambarger> */}
          <NavHamburgerDrawer></NavHamburgerDrawer>
          <div>
            <div className=" flex md:gap-1 items-center">
              <img className=" w-12" src={logo} alt="" />
              <h2
                className={`hidden ${textClasses[level]}   md:flex font-poppins -ml-1 text-lg md:text-3xl font-bold`}
              >
                Work<span className="text-[#00ADB5] dark:text-primary text-4xl">S</span>ync
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle></ThemeToggle>

        <NavProfile user={user} logoutUser={logoutUser}></NavProfile>
      </div>
    </div>
  );
};

export default Navbar;

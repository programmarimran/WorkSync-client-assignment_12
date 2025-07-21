import { NavLink } from "react-router";
// import { FaArrowRightFromBracket } from "react-icons/fa6";
// import Hambarger from "../hambarger/Hambarger";
import logo from "../../assets/logo.png";
import ThemeToggle from "../themeToggle/ThemeToggle";
import NavProfile from "../navProfile/NavProfile";
import NavHamburgerDrawer from "./NavHamburgerDrawer";
import useAuth from "../../hooks/useAuth";
import { Home, LayoutDashboard, ListTodo, MessageCircle } from "lucide-react";
import useScrollLevel from "../../hooks/usescrollLevel";

const Navbar = () => {
    const level = useScrollLevel([70, 400]);
  const textClasses = [
    "text-black dark:text-white",
    "text-white   ",
    "text-black  dark:text-white ",
  ];
  const { user, logoutUser } = useAuth();
  // console.log(user);

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
              <h2 className= {`hidden ${textClasses[level]}   md:flex font-poppins -ml-1 text-lg md:text-3xl font-bold`}>
                Work<span className="text-primary text-4xl">S</span>ync
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-2">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle></ThemeToggle>

        <NavProfile user={user} logoutUser={logoutUser}></NavProfile>
      </div>
    </div>
  );
};

export default Navbar;

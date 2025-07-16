import { NavLink } from "react-router";
import { FaArrowRightFromBracket } from "react-icons/fa6";
// import Hambarger from "../hambarger/Hambarger";
import Logo from "../logo/Logo";
import ThemeToggle from "../themeToggle/ThemeToggle";
import NavProfile from "../navProfile/NavProfile";
import NavHamburgerDrawer from "./NavHamburgerDrawer";
import useAuth from "../../hooks/useAuth";
import { Home, LayoutDashboard, ListTodo, MessageCircle } from "lucide-react";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  console.log(user);

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  flex items-center gap-1"
              : "flex hover:bg-primary/10 items-center gap-1"
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
              : "flex hover:bg-primary/10 items-center gap-1"
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
              : "flex hover:bg-primary/10  items-center gap-1"
          }
        >
          <MessageCircle size={18} /> Contact Us
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/work-sheet"
          className={({ isActive }) =>
            isActive
              ? "bg-primary text-white  flex items-center gap-1"
              : "flex hover:bg-primary/10 items-center gap-1 "
          }
        >
          <ListTodo size={18} /> Work Sheet
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
            <Logo></Logo>
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

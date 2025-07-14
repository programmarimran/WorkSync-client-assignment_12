import { use } from "react";
import AuthContext from "../../contexts/auth/AuthContext";
import { NavLink } from "react-router";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import Hambarger from "../hambarger/Hambarger";
import Logo from "../logo/Logo";
import ThemeToggle from "../themeToggle/ThemeToggle";
import NavProfile from "../navProfile/NavProfile";

const Navbar = () => {
  const { user, logoutUser } = use(AuthContext);
  console.log(user)

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/services"}>All Services</NavLink>
      </li>
      <li>
        <NavLink to={"/about"}>About</NavLink>
      </li>
      <li>
        <NavLink to={"/contact"}>Contact</NavLink>
      </li>
      <li>
        <NavLink to={"/dashboard"}>
          Dashboard
          <FaArrowRightFromBracket />
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar">
      <div className="navbar-start">
        <Hambarger></Hambarger>
      <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggle></ThemeToggle>

        <NavProfile
          user={user}
          logoutUser={logoutUser}
        ></NavProfile>
      </div>
    </div>
  );
};

export default Navbar;
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import DashboardHambarger from "./DashboardHambarger";
import ThemeToggle from "../themeToggle/ThemeToggle";

const DashboardNavbar = () => {
  const { logoutUser, loading } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout it!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
      }
    });
  };

  const links = (
    <>
      <li className="my-1">
        <NavLink className="link-hover" to={"/"}>
          Home Page
        </NavLink>
      </li>
      <li className="my-1">
        <NavLink className="link-hover" to={"/dashboard/all-services"}>
          All services
        </NavLink>
      </li>

      {loading && (
        <>
          <li className="my-1">
            <NavLink className="link-hover" to={"/add-recipes"}>
              <span className="loading loading-dots loading-xl"></span>
            </NavLink>
          </li>
          <li className="my-1">
            <NavLink className="link-hover" to={"/my-recipes"}>
              <span className="loading loading-dots loading-xl"></span>
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar border p-0 justify-between">
      {/* Navbar Start */}
      <div className=" border">dfd
        <div className=" lg:hidden">
          <DashboardHambarger></DashboardHambarger>
        </div>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex border">
        <ul className="menu gap-4 menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar Middle for md only */}

      {/* Navbar End */}
      <div className="navbar-end gap-2 md:gap-3">
        <ThemeToggle />

        <button onClick={handleLogout} className=" btn btn-primary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;

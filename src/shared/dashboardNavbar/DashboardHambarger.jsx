import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Logo from "../logo/Logo";
import ThemeToggle from "../themeToggle/ThemeToggle";

const DashboardHamburgerDrawer = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef();
  const { user, logoutUser } = useAuth();

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

  useEffect(() => {
    function handleClickOutside(event) {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    }
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="">
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="focus:outline-none"
      >
        <svg
          className="w-10 h-10 text-gray-700 dark:text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 flex ">
          {/* Left Drawer */}
          <div
            ref={drawerRef}
            className="w-72 h-full backdrop-blur-sm bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col justify-between relative"
          >
            {/* X Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-2 right-2 text-2xl font-bold text-black dark:text-white"
            >
              ✕
            </button>

            <div className="pt-10">
              <div className=" flex gap-1 items-center">
                <Logo />
                <h2 className=" md:hidden font-poppins -ml-2 text-3xl font-bold">
                  Work<span className="text-primary text-4xl">S</span>ync
                </h2>
              </div>
              <div className="mb-4 text-center">
                {user?.photoURL && (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-16 h-16 mx-auto rounded-full border-2 border-primary"
                  />
                )}
                <h2 className="text-lg font-semibold mt-2">
                  {user?.displayName || "User Name"}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <ThemeToggle />
              </div>
              <div className="divider"></div>

              <ul className="menu p-4 space-y-2">
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "active font-bold" : ""
                    }
                  >
                    Dashboard Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/work-sheet"
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? "active font-bold" : ""
                    }
                  >
                    Work Sheet
                  </NavLink>
                </li>
              </ul>
            </div>

            <div className="p-4">
              <button
                onClick={handleLogout}
                className="btn w-full btn-primary text-xl"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="flex-1 backdrop-blur-xs"
          ></div>
        </div>
      )}
    </div>
  );
};

export default DashboardHamburgerDrawer;

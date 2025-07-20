import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import Logo from "../logo/Logo";
import ThemeToggle from "../themeToggle/ThemeToggle";
import { FaEdit } from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";
import {
  MdHome,
  MdDashboard,
  MdWork,
  MdPayment,
  MdPeople,
  MdTrendingUp,
  MdOutlineManageAccounts,
  MdOutlineAttachMoney,
  MdContactMail,
} from "react-icons/md";
const DashboardHamburgerDrawer = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef();
  const { user, logoutUser } = useAuth();
  const { role } = useUserRole();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout it!",
      buttonsStyling: false,
      customClass: {
        confirmButton: "bg-primary mr-1 text-white px-4 py-2 rounded",
        cancelButton: "bg-red-500 ml-1 text-white px-4 py-2 rounded",
      },
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
            className="overflow-auto scrollbar-hide w-72 h-full backdrop-blur-sm bg-white dark:bg-gray-900 shadow-lg p-4 flex flex-col justify-between relative"
          >
            {/* X Button */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-2 right-2 text-2xl font-bold text-black dark:text-white"
            >
              ✕
            </button>

            <div className="pt-10 ">
              <div className=" backdrop-blur-2xl sticky top-0 z-50">
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
                  <div className=" flex items-center justify-center">
                    <h2 className="text-lg mx-5 font-semibold mt-2">
                      {user?.displayName || "User Name"}
                    </h2>
                    <Link
                      onClick={() => setMobileMenuOpen(false)}
                      to={"/dashboard/profile-update"}
                    >
                      <FaEdit className=" text-primary" size={25} />
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                  <ThemeToggle />
                </div>
                <div className="divider"></div>
              </div>

              {/* Nav Links */}
              <ul className="menu p-4 z-10 space-y-2">
                {/* Common Links */}
                <li>
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "active font-bold" : ""
                    }
                  >
                    <MdHome className="inline-block mr-2" />
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={() => setMobileMenuOpen(false)}
                    to="/dashboard"
                    className={({ isActive }) =>
                      isActive ? "active font-bold" : ""
                    }
                  >
                    <MdDashboard className="inline-block mr-2" />
                    Dashboard Overview
                  </NavLink>
                </li>

                {/* Employee Panel */}
                {role === "Employee" && (
                  <>
                    <p className="text-xs uppercase font-semibold text-gray-400 ml-2 mt-4">
                      👷 Employee Panel
                    </p>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/work-sheet"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdWork className="inline-block mr-2" />
                        Daily Work Sheet
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/payment-history"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdPayment className="inline-block mr-2" />
                        Payment Records
                      </NavLink>
                    </li>
                  </>
                )}

                {/* HR Panel */}
                {role === "HR" && (
                  <>
                    <p className="text-xs uppercase font-semibold text-gray-400 ml-2 mt-4">
                      🧑‍💼 HR Panel
                    </p>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/employee-list"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdPeople className="inline-block mr-2" />
                        Verified Employees
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/progress"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdTrendingUp className="inline-block mr-2" />
                        Employee Progress
                      </NavLink>
                    </li>
                  </>
                )}

                {/* Admin Panel */}
                {role === "admin" && (
                  <>
                    <p className="text-xs uppercase font-semibold text-gray-400 ml-2 mt-4">
                      👑 Admin Panel
                    </p>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/all-employee-list"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdOutlineManageAccounts className="inline-block mr-2" />
                        All Employees
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/admin-payroll"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdOutlineAttachMoney className="inline-block mr-2" />
                        Payroll Settings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setMobileMenuOpen(false)}
                        to="/dashboard/contac-message"
                        className={({ isActive }) =>
                          isActive ? "active font-bold" : ""
                        }
                      >
                        <MdContactMail className="inline-block mr-2" />
                        Contact Messages
                      </NavLink>
                    </li>
                  </>
                )}
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

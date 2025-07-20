import { Outlet, NavLink, Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaEdit } from "react-icons/fa";
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

import Logo from "../shared/logo/Logo";
import ThemeToggle from "../shared/themeToggle/ThemeToggle";
import Swal from "sweetalert2";
import "./Layout.css";
import DashboardNavbar from "../shared/dashboardNavbar/Dashboardnavbar";
import useUserRole from "../hooks/useUserRole";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();

  const { user, logoutUser } = useAuth();
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
  if (roleLoading) {
    return (
      <motion.h2
        className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Please wait...
      </motion.h2>
    );
  }
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
        {/*  Top Navbar */}

        <div className=" bg-base-100  lg:hidden z-50  sticky top-0">
          <div className=" w-11/12 mx-auto">
            <DashboardNavbar></DashboardNavbar>
          </div>
        </div>

        {/* Nested Page Content */}
        <div className="p-4 flex-1 w-11/12 mx-auto">
          <Outlet />
        </div>
      </div>
      {/* side bar */}
      <div className="drawer-side shadow dark:shadow scrollbar-hide">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <div className="flex flex-col justify-between h-full w-72">
          {/* Top Part */}
          <div>
            <div className="sticky top-0 z-10  bg-base-100">
              <Logo />
              {/* User Info */}
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
                  <Link to={"/dashboard/profile-update"}>
                    <FaEdit className=" text-primary" size={25} />
                  </Link>
                </div>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <ThemeToggle />
              </div>
              <div className="divider"></div>
            </div>

            {/* Nav Links */}
            <ul className="menu p-4 z-0 space-y-2">
              {/* Common Links */}
              <li>
                <NavLink
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

          {/* Bottom Part */}
          <div className="p-4">
            <button
              onClick={handleLogout}
              className="btn w-full btn-primary text-xl"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

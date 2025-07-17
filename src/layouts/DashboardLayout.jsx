import { Outlet, NavLink } from "react-router";
import useAuth from "../hooks/useAuth";
import Logo from "../shared/logo/Logo";
import ThemeToggle from "../shared/themeToggle/ThemeToggle";
import Swal from "sweetalert2";
import "./Layout.css";
import DashboardNavbar from "../shared/dashboardNavbar/Dashboardnavbar";
const DashboardLayout = () => {
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
  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col bg-base-100 min-h-screen">
        {/* 🧭 Top Navbar */}

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
                <h2 className="text-lg font-semibold mt-2">
                  {user?.displayName || "User Name"}
                </h2>
                <p className="text-sm text-gray-500">{user?.email}</p>
                <ThemeToggle />
              </div>
              <div className="divider"></div>
            </div>

            {/* Nav Links */}
            <ul className="menu p-4 z-0 space-y-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active font-bold" : ""
                  }
                >
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
                  Dashboard Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/work-sheet"
                  className={({ isActive }) =>
                    isActive ? "active font-bold" : ""
                  }
                >
                  Work Sheet
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={({ isActive }) =>
                    isActive ? "active font-bold" : ""
                  }
                >
                  Payment History
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/employee-list"
                  className={({ isActive }) =>
                    isActive ? "active font-bold" : ""
                  }
                >
                  EmployeeListPage
                </NavLink>
              </li>

              {/* Add more links here */}
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

import { Link } from "react-router";
import useAuth from "../../../../hooks/useAuth";
import useUserRole from "../../../../hooks/useUserRole";
import AdminDashboard from "../adminDashboard/AdminDashboardHOme";
import EmployeeDashboard from "../employeeDashboard/EmployeeDashboard";
import HrDashboardHome from "../hrDashboardHome/HrDashboardHome";

const DashboardHome = () => {
  const { user } = useAuth();
  const { role, roleLoading } = useUserRole();

  if (!user) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }
  if (roleLoading) {
    return <p className="text-center mt-10">Loading dashboard...</p>;
  }

  if (role === "Employee") {
    return <EmployeeDashboard />;
  } else if (role === "HR") {
    return <HrDashboardHome />;
  } else if (role === "admin") {
    return <AdminDashboard />;
  } else {
    return (
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-center mt-10 text-red-500">
          Unknown role: Access Denied
        </h1>
        <Link to={"/update-profile"}>
          <button
            type="submit"
            className="group cursor-pointer mx-auto relative mt-5 bg-gradient-to-r from-primary via-secondary to-primary hover:from-secondary hover:via-primary hover:to-secondary text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/50 shadow-2xl hover:shadow-3xl shadow-primary/25 dark:shadow-primary/40 overflow-hidden"
          >
            {/* Button shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <span className="relative z-10 flex items-center justify-center gap-3 text-lg">
              {/* <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                /> */}
              {/* </svg> */}
              Please Set your role and profile
            </span>

            {/* Button glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
          </button>
        </Link>
      </div>
    );
  }
};

export default DashboardHome;

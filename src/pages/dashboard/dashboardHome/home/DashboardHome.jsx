
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
  } 
  else if (role === "HR") {
    return <HrDashboardHome />;
  } 
  else if (role === "admin") {
    return <AdminDashboard />;
  } 
  else
     {
    return (
      <div className="text-center mt-10 text-red-500">
        Unknown role: Access Denied
      </div>
    );
  }
};

export default DashboardHome;

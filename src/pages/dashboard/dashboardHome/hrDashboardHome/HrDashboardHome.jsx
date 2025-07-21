import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { GiClick } from "react-icons/gi";
import { FileText } from "lucide-react";

const HrDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["hr-dashboard-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/hr/dashboard/summary`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading dashboard...</p>;

  return (
    <div className="py-4 px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link to={"/dashboard/employee-list"}>
        <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Verified Employees</h2>
          <p className="text-2xl text-blue-500">{data?.verifiedEmployees}</p>
        </div>
      </Link>

      <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl">
        <h2 className="text-lg font-semibold">Today’s Attendance</h2>
        <p className="text-2xl text-green-500">{data?.todayAttendance}</p>
      </div>

      <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl">
        <h2 className="text-lg font-semibold">Pending Payroll</h2>
        <p className="text-2xl text-red-500">{data?.pendingPayrolls}</p>
      </div>

      <Link to={"/dashboard/progress"}>
        <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl hover:shadow-lg transition">
          <h2 className="text-lg font-semibold">Employee Progress</h2>
          <p className="text-2xl text-red-500">
            <GiClick className="text-primary" size={30} />
          </p>
        </div>
      </Link>

      <Link
        to="/dashboard/profile-update"
        className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow hover:shadow-md transition group col-span-1"
      >
        <FileText
          className="text-blue-500 mb-4 group-hover:scale-110 transition"
          size={36}
        />
        <h3 className="font-semibold text-lg mb-1">My Profile</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your personal info & updates.
        </p>
      </Link>

      <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl col-span-1 md:col-span-2">
        <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
        <ul className="list-disc pl-5 space-y-1">
          {data?.recentActivities.map((activity, i) => (
            <li key={i}>
              {activity.task || "No Title"} –{" "}
              {new Date(activity.submittedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HrDashboardHome;

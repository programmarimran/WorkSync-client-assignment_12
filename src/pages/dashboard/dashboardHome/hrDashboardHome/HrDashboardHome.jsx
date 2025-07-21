import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { GiClick } from "react-icons/gi";
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
    <div className="p-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Link to={"/dashboard/employee-list"}>
        <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl">
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
        <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl">
          <h2 className="text-lg font-semibold">Employee Progress</h2>
          <p className="text-2xl text-red-500">
            <GiClick className=" text-primary" size={30} />
          </p>
        </div>
      </Link>
      <div className="bg-white dark:bg-slate-800 shadow-md p-4 rounded-xl col-span-2">
        <h2 className="text-lg font-semibold mb-2">Recent Activities</h2>
        <ul className="list-disc pl-5 space-y-1">
          {data?.recentActivities.map((activity, i) => (
            <li key={i}>
              {activity.task || "No Title"} -{" "}
              {new Date(activity.submittedAt).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HrDashboardHome;
